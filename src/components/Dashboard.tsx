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
          控制中心
        </h2>
        <p className="text-sm text-white/50 font-medium">实时监控 • 智能调度</p>
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
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/80 font-medium">{item.name}</span>
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
    </motion.div>
  )
}

export default Dashboard