import React from 'react'
import { motion } from 'framer-motion'

const ThreadPool: React.FC = () => {
  const threads = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    active: i < 4,
    task: i < 4 ? ['选品', '页面', '数据', 'API'][i] : null
  }))

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title !mb-0">
          <span className="mr-2">🧵</span>
          线程池
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-400 font-semibold">4</span>
          <span className="text-xs text-white/40">/</span>
          <span className="text-xs text-white/60 font-medium">10 活跃</span>
        </div>
      </div>

      {/* Thread Grid */}
      <div className="grid grid-cols-5 gap-3 mb-4">
        {threads.map((thread, i) => (
          <motion.div 
            key={thread.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 + i * 0.05, type: 'spring', stiffness: 300 }}
            className="flex flex-col items-center"
          >
            <motion.div 
              whileHover={{ scale: 1.15 }}
              className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center text-xs font-bold transition-all ${
                thread.active 
                  ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 border-emerald-300 text-white shadow-lg shadow-emerald-500/30' 
                  : 'bg-white/5 border-white/20 text-white/30'
              }`}
            >
              {thread.id}
            </motion.div>
            {thread.task && (
              <span className="text-[10px] text-white/60 font-medium mt-1.5">{thread.task}</span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-white/50 font-medium">线程使用率</span>
          <span className="text-white font-semibold">40%</span>
        </div>
        <div className="progress-bar">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '40%' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="progress-fill" 
          />
        </div>
      </div>
    </motion.div>
  )
}

export default ThreadPool