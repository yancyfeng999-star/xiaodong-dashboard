import React from 'react'
import { motion } from 'framer-motion'

const Header: React.FC = () => {
  const stats = [
    { label: '在线', value: '3天', icon: '⏱️' },
    { label: '任务', value: '1,248', icon: '✅' },
    { label: '数据', value: '5.2TB', icon: '💾' },
    { label: '技能', value: '15+', icon: '🎯' },
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
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border border-white"></div>
          </motion.div>
          
          <div>
            <h1 className="text-xl font-bold text-white">
              小东 AI助手
            </h1>
            <p className="text-xs text-white/60">东品西选电商服务（成都）有限公司</p>
          </div>
        </div>
        
        {/* Right: Stats */}
        <div className="flex items-center space-x-2">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="metric-card text-center min-w-[70px]"
            >
              <div className="metric-value text-base">{stat.value}</div>
              <div className="metric-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Bottom Status Bar */}
      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center">
            <div className="status-indicator status-online animate-pulse-slow"></div>
            <span className="text-white/80">运行中</span>
          </div>
          <span className="text-white/40">|</span>
          <span className="text-white/60">KIMI2.5</span>
          <span className="text-white/40">|</span>
          <span className="text-white/60">{new Date().toLocaleTimeString('zh-CN')}</span>
        </div>
        
        <div className="flex space-x-2">
          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-200 text-xs rounded-full border border-emerald-500/30">
            在线
          </span>
          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-200 text-xs rounded-full border border-blue-500/30">
            实时
          </span>
        </div>
      </div>
    </motion.header>
  )
}

export default Header