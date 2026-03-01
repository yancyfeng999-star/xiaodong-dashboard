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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-white">🧵 线程池</h2>
        <span className="text-xs text-white/60">4/10 活跃</span>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-3">
        {threads.map((thread) => (
          <div key={thread.id} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold
              ${thread.active 
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200' 
                : 'bg-white/5 border-white/20 text-white/40'}`}>
              {thread.id}
            </div>
            {thread.task && (
              <span className="text-[10px] text-white/60 mt-1">{thread.task}</span>
            )}
          </div>
        ))}
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: '40%' }}></div>
      </div>
      <div className="flex justify-between text-[10px] text-white/50 mt-1">
        <span>使用率: 40%</span>
        <span>10线程</span>
      </div>
    </motion.div>
  )
}

export default ThreadPool