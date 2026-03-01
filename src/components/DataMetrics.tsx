import React from 'react'
import { motion } from 'framer-motion'

const DataMetrics: React.FC = () => {
  const platforms = [
    { name: '亚马逊', icon: '🛒', count: '12,500', growth: '+12%', color: 'from-orange-500/20 to-orange-600/20' },
    { name: 'TikTok', icon: '🎵', count: '8,500', growth: '+18%', color: 'from-pink-500/20 to-pink-600/20' },
    { name: 'Shopee', icon: '🛍️', count: '9,200', growth: '+8%', color: 'from-red-500/20 to-red-600/20' },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-white">📊 数据统计</h2>
        <span className="text-xs text-white/60">5.2TB</span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        {platforms.map((platform, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`metric-card bg-gradient-to-br ${platform.color}`}
          >
            <div className="text-center">
              <div className="text-lg mb-1">{platform.icon}</div>
              <div className="text-sm font-bold text-white">{platform.count}</div>
              <div className="text-[10px] text-white/60">{platform.name}</div>
              <div className="text-[10px] text-emerald-400 mt-0.5">{platform.growth}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {['数据爬取', '数据清洗', '分析报告', '同步飞书'].map((task, i) => (
          <div key={i} className="metric-card text-center">
            <div className="text-xs text-white/80">{task}</div>
            <div className="progress-bar mt-1">
              <div className="progress-fill" style={{ width: `${[100, 85, 60, 45][i]}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default DataMetrics