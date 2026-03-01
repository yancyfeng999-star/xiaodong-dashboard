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
    // Simulate refresh
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
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="header-card mx-2 mt-2 mb-4"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left: Title */}
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">东</span>
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border border-white animate-pulse"></div>
          </motion.div>
          
          <div>
            <h1 className="text-xl font-bold text-white">
              小东 AI助手
            </h1>
            <p className="text-xs text-white/60">东品西选电商服务（成都）有限公司</p>
          </div>
        </div>
        
        {/* Right: Stats & Refresh */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="metric-card text-center min-w-[60px]"
              >
                <div className="metric-value text-base">{stat.value}</div>
                <div className="metric-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          
          {/* Refresh Button */}
          <motion.button
            onClick={handleRefresh}
            disabled={isRefreshing}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${
              isRefreshing 
                ? 'bg-white/10 text-white/50 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25'
            }`}
          >
            {isRefreshing ? '刷新中...' : '刷新'}
          </motion.button>
        </div>
      </div>
      
      {/* Time & Date - Fixed */}
      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center">
              <div className="status-indicator status-online animate-pulse"></div>
              <span className="text-white/80">实时连接</span>
            </div>
            <span className="text-white/40">|</span>
            <span className="text-white/60">KIMI2.5</span>
            <span className="text-white/40">|</span>
            <span className="text-white/60">
              更新: {lastUpdate.toLocaleTimeString('zh-CN')}
            </span>
          </div>
          
          {/* Fixed Time Display */}
          <div className="text-right">
            <div className="text-lg font-bold text-white">
              {currentTime.toLocaleTimeString('zh-CN', { hour12: false })}
            </div>
            <div className="text-xs text-white/70">
              {currentTime.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header