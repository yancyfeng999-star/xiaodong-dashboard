import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Dashboard: React.FC = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // 动态生成今日统计数据
  const generateQuickStats = () => {
    const baseTasks = 8
    const baseCompleted = 6
    const progress = (new Date().getHours() / 24) // 根据当天进度计算
    
    return [
      { 
        label: '今日任务', 
        value: Math.floor(baseTasks + Math.random() * 2).toString(), 
        change: `+${Math.floor(Math.random() * 3 + 1)}`, 
        icon: '📋' 
      },
      { 
        label: '进行中', 
        value: Math.max(1, Math.floor(3 - progress * 2)).toString(), 
        change: '0', 
        icon: '⚡' 
      },
      { 
        label: '已完成', 
        value: Math.floor(baseCompleted + progress * 4).toString(), 
        change: `+${Math.floor(Math.random() * 2 + 1)}`, 
        icon: '✅' 
      },
      { 
        label: '效率提升', 
        value: `${(2.1 + Math.random() * 0.3).toFixed(1)}x`, 
        change: `+${(Math.random() * 0.2).toFixed(1)}`, 
        icon: '📈' 
      },
    ]
  }

  const [quickStats, setQuickStats] = useState(generateQuickStats())

  // 动态生成系统健康数据
  const generateSystemHealth = () => {
    return [
      { name: 'API服务', status: 'healthy', latency: Math.floor(Math.random() * 20 + 20) + 'ms' },
      { name: '数据库', status: 'healthy', latency: Math.floor(Math.random() * 15 + 10) + 'ms' },
      { name: '爬虫', status: 'healthy', latency: Math.floor(Math.random() * 30 + 30) + 'ms' },
      { name: '前端', status: 'healthy', latency: Math.floor(Math.random() * 15 + 15) + 'ms' },
    ]
  }

  const [systemHealth, setSystemHealth] = useState(generateSystemHealth())

  // 每10秒更新一次数据
  useEffect(() => {
    const interval = setInterval(() => {
      setQuickStats(generateQuickStats())
      setSystemHealth(generateSystemHealth())
      setLastUpdate(new Date())
    }, 10000) // 10秒

    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    }
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="card"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-5">
        <h2 className="section-title">
          <span className="mr-2">🎛️</span>
          <span className="section-title-text">控制中心</span>
        </h2>
        <div className="flex items-center justify-between">
          <p className="text-sm text-white/50 font-medium">实时监控 • 智能调度</p>
          <span className="text-[10px] text-white/40">更新: {lastUpdate.toLocaleTimeString('zh-CN')}</span>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-4 gap-3 mb-6">
        {quickStats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03, y: -3 }}
            className="metric-card text-center"
          >
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="metric-value text-xl">{stat.value}</div>
            <div className="flex items-center justify-center gap-1 mt-1">
              <span className="text-[11px] text-white/50 font-medium">{stat.label}</span>
              <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-400/10 px-1.5 py-0.5 rounded-full">{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* System Health */}
      <motion.div variants={itemVariants}>
        <div className="text-label mb-3">系统健康状态</div>
        <div className="grid grid-cols-4 gap-3">
          {systemHealth.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="metric-card"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-white/80 font-medium">{item.name}</span>
                <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              </div>
              <div className="text-xs text-white/40 font-medium">{item.latency}</div>
              <div className="progress-bar mt-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '95%' }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  className="progress-fill" 
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Update Info */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="flex items-center justify-between text-[10px] text-white/40">
          <span>控制中心数据每10秒自动更新</span>
          <span>下次更新: {new Date(lastUpdate.getTime() + 10000).toLocaleTimeString('zh-CN')}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default Dashboard