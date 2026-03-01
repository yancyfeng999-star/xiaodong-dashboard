import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Header: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [currentTime, setCurrentTime] = useState(new Date())
  const [uptime, setUptime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  
  // 固定启动时间：2026-03-01 09:41:00（今天第一次启动时间）
  const [startTime] = useState(() => {
    // 尝试从localStorage读取，如果没有则使用固定时间
    const savedStart = localStorage.getItem('xiaodong-start-time')
    if (savedStart) {
      return new Date(savedStart)
    }
    // 首次启动时间：今天 09:41:00
    const start = new Date('2026-03-01T09:41:00')
    localStorage.setItem('xiaodong-start-time', start.toISOString())
    return start
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      const now = new Date()
      const diff = now.getTime() - startTime.getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      setUptime({ days, hours, minutes, seconds })
    }, 1000)
    return () => clearInterval(timer)
  }, [startTime])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      setLastUpdate(new Date())
      window.location.reload()
    }, 1000)
  }

  const stats = [
    { label: '在线', value: `${uptime.days}d ${uptime.hours}h ${uptime.minutes}m ${uptime.seconds}s`, shortLabel: '在线', icon: '⏱️' },
    { label: '任务', value: '1,248', shortLabel: '任务', icon: '✅' },
    { label: '数据', value: '5.2TB', shortLabel: '数据', icon: '💾' },
    { label: '技能', value: '124', shortLabel: '技能', icon: '🎯' },
  ]

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="header-card mx-2 md:mx-3 mt-2 md:mt-3 mb-4 md:mb-5"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 md:gap-4">
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-3 md:gap-4">
          <motion.div
            animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30">
              <span className="text-white text-xl md:text-2xl font-bold">东</span>
            </div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-0.5 -right-0.5 w-3 h-3 md:w-3.5 md:h-3.5 bg-emerald-400 rounded-full border-2 border-white shadow-lg"
            />
          </motion.div>
          
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-xl md:text-2xl font-bold text-white tracking-tight"
            >
              小东
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-xs md:text-sm text-white/50 font-medium"
            >
              跨境电商专家
            </motion.p>
          </div>
        </div>
        
        {/* Right: Stats & Refresh */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-1 md:pb-0 scrollbar-hide"
        >
          <div className="flex items-center gap-1.5 md:gap-2">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.08 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="metric-card text-center min-w-[65px] md:min-w-[90px] cursor-default flex-shrink-0 p-2 md:p-4"
                title={stat.label === '在线' ? stat.value : undefined}
              >
                <div className="text-base md:text-lg mb-0.5">{stat.icon}</div>
                <div className="metric-value text-xs md:text-base truncate">{stat.value}</div>
                <div className="metric-label text-[9px] md:text-[10px]">{stat.shortLabel}</div>
              </motion.div>
            ))}
          </div>
          
          <motion.button
            onClick={handleRefresh}
            disabled={isRefreshing}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm transition-all flex-shrink-0 ${
              isRefreshing 
                ? 'bg-white/10 text-white/40 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50'
            }`}
          >
            {isRefreshing ? '...' : '刷新'}
          </motion.button>
        </motion.div>
      </div>
      
      {/* Status Bar with Time */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/10"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
          <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm flex-wrap">
            <div className="flex items-center">
              <span className="status-indicator status-online w-2 h-2 md:w-2.5 md:h-2.5" />
              <span className="text-white/70 font-medium">实时</span>
            </div>
            <span className="text-white/20 hidden sm:inline">|</span>
            <div className="flex items-center">
              <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-emerald-400 mr-1.5 md:mr-2 shadow-[0_0_10px_rgba(52,211,153,0.6)] animate-pulse" />
              <span className="text-white/70 font-medium">VPN</span>
            </div>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="text-white/60 font-medium">KIMI2.5</span>
          </div>
          
          <div className="text-right">
            <div className="text-base md:text-xl font-bold text-white tracking-tight">
              {currentTime.toLocaleTimeString('zh-CN', { hour12: false, hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-xs md:text-sm text-white/60 font-medium hidden sm:block">
              {currentTime.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.header>
  )
}

export default Header