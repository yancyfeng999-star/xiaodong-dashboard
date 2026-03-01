import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Header: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      setLastUpdate(new Date())
      window.location.reload()
    }, 1000)
  }

  const stats = [
    { label: '在线', value: '3天', icon: '⏱️' },
    { label: '任务', value: '1,248', icon: '✅' },
    { label: '数据', value: '5.2TB', icon: '💾' },
    { label: '技能', value: '11', icon: '🎯' },
  ]

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="header-card mx-3 mt-3 mb-5"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ 
              rotate: [0, 8, -8, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30">
              <span className="text-white text-2xl font-bold">东</span>
            </div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white shadow-lg"
            />
          </motion.div>
          
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-2xl font-bold text-white tracking-tight"
            >
              小东 AI助手
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-sm text-white/50 font-medium"
            >
              东品西选电商服务（成都）有限公司
            </motion.p>
          </div>
        </div>
        
        {/* Right: Stats & Refresh */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex items-center gap-3"
        >
          <div className="flex items-center gap-2">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.08 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="metric-card text-center min-w-[72px] cursor-default"
              >
                <div className="text-lg mb-0.5">{stat.icon}</div>
                <div className="metric-value text-lg">{stat.value}</div>
                <div className="metric-label text-[10px]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          
          <motion.button
            onClick={handleRefresh}
            disabled={isRefreshing}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              isRefreshing 
                ? 'bg-white/10 text-white/40 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50'
            }`}
          >
            {isRefreshing ? '刷新中...' : '刷新'}
          </motion.button>
        </motion.div>
      </div>
      
      {/* Status Bar with Time */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-4 pt-4 border-t border-white/10"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center">
              <span className="status-indicator status-online" />
              <span className="text-white/70 font-medium">实时连接</span>
            </div>
            <span className="text-white/20">|</span>
            <div className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 mr-2 shadow-[0_0_10px_rgba(52,211,153,0.6)] animate-pulse" />
              <span className="text-white/70 font-medium">VPN 已连接</span>
            </div>
            <span className="text-white/20">|</span>
            <span className="text-white/60 font-medium">KIMI2.5</span>
            <span className="text-white/20">|</span>
            <span className="text-white/60">
              更新 {lastUpdate.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>
          
          <div className="text-right">
            <div className="text-xl font-bold text-white tracking-tight">
              {currentTime.toLocaleTimeString('zh-CN', { hour12: false })}
            </div>
            <div className="text-sm text-white/60 font-medium">
              {currentTime.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.header>
  )
}

export default Header