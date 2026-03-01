import React from 'react'
import { motion } from 'framer-motion'

const Header: React.FC = () => {
  const stats = [
    { label: '在线时间', value: '3天2小时', icon: '⏱️', color: 'from-blue-500/20 to-cyan-500/20' },
    { label: '处理任务', value: '1,248个', icon: '✅', color: 'from-green-500/20 to-emerald-500/20' },
    { label: '数据总量', value: '5.2TB', icon: '💾', color: 'from-purple-500/20 to-pink-500/20' },
    { label: '技能数量', value: '12个', icon: '🎯', color: 'from-yellow-500/20 to-orange-500/20' },
  ]

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="header-card mx-4 mt-4 mb-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        {/* Left: Title and Description */}
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-4">
            <motion.div
              className="relative"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-3xl font-bold">东</span>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white/80 shadow-lg"></div>
            </motion.div>
            
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent"
              >
                小东 AI助手展示面板
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/80 text-lg"
              >
                东品西选电商服务（成都）有限公司 - 专业跨境电商助手系统
              </motion.p>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 mt-4"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-full text-green-200 text-sm font-medium border border-green-400/30">
              🟢 系统运行正常
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-full text-blue-200 text-sm font-medium border border-blue-400/30">
              ⚡ 实时数据更新
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full text-purple-200 text-sm font-medium border border-purple-400/30">
              🧠 智能学习中
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-full text-yellow-200 text-sm font-medium border border-yellow-400/30">
              🧵 多线程运作
            </span>
          </motion.div>
        </div>
        
        {/* Right: Stats */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-1 gap-3"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`metric-card bg-gradient-to-r ${stat.color}`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{stat.icon}</div>
                <div>
                  <div className="metric-value">{stat.value}</div>
                  <div className="metric-label">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Bottom Status Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6 pt-6 border-t border-white/10"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="status-indicator status-online animate-pulse"></div>
              <span className="text-white/80">实时连接</span>
            </div>
            <div className="hidden md:block text-white/50">•</div>
            <div className="text-white/80">
              最后心跳: {new Date().toLocaleTimeString('zh-CN')}
            </div>
            <div className="hidden md:block text-white/50">•</div>
            <div className="text-white/80 flex items-center">
              <span className="mr-2">负载:</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500/60 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-500/30 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-500/30 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-500/30 rounded-full"></div>
              </div>
              <span className="ml-2">轻量</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-sm text-white/60">
              版本: v1.0.0 • React 18 • TypeScript 5.9
            </div>
            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </motion.div>
    </motion.header>
  )
}

export default Header