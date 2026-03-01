import React from 'react'
import { motion } from 'framer-motion'

const Dashboard: React.FC = () => {
  const systemHealth = [
    { name: 'API服务', status: 'healthy', latency: '28ms' },
    { name: '数据库', status: 'healthy', latency: '12ms' },
    { name: '爬虫', status: 'healthy', latency: '45ms' },
    { name: '前端', status: 'healthy', latency: '18ms' },
  ]

  const quickStats = [
    { label: '今日任务', value: '8', change: '+3', icon: '📋' },
    { label: '进行中', value: '2', change: '0', icon: '⚡' },
    { label: '已完成', value: '6', change: '+2', icon: '✅' },
    { label: '效率提升', value: '2.1x', change: '+0.3', icon: '📈' },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card"
    >
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-lg font-bold text-white">控制中心</h1>
        <p className="text-xs text-white/60">实时监控 • 智能调度</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {quickStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="metric-card text-center"
          >
            <div className="text-lg mb-0.5">{stat.icon}</div>
            <div className="metric-value">{stat.value}</div>
            <div className="flex items-center justify-center space-x-1">
              <span className="text-[10px] text-white/50">{stat.label}</span>
              <span className="text-[10px] text-emerald-400">{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* System Health */}
      <div>
        <div className="text-label mb-2">系统健康</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {systemHealth.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
              className="metric-card"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-white/80">{item.name}</span>
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
              </div>
              <div className="text-xs text-white/50">{item.latency}</div>
              <div className="progress-bar mt-1">
                <div className="progress-fill" style={{ width: '95%' }}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Dashboard