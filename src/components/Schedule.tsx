import React from 'react'
import { motion } from 'framer-motion'

const Schedule: React.FC = () => {
  const todayTasks = [
    { time: '02:00', task: '亚马逊BSR', status: 'completed' },
    { time: '03:00', task: 'TikTok Shop', status: 'completed' },
    { time: '04:00', task: 'Shopee', status: 'completed' },
    { time: '09:00', task: 'AI晨报', status: 'completed' },
    { time: '10:15', task: '页面开发', status: 'running' },
    { time: '11:00', task: '数据分析', status: 'pending' },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-white">📅 今日计划</h2>
        <span className="text-xs text-white/60">5/6 完成</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {todayTasks.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className={`p-2 rounded-lg border ${
              item.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/30' :
              item.status === 'running' ? 'bg-blue-500/10 border-blue-500/30' :
              'bg-white/5 border-white/10'
            }`}
          >
            <div className="text-[10px] text-white/50">{item.time}</div>
            <div className="text-xs font-medium text-white truncate">{item.task}</div>
            <div className={`text-[10px] mt-0.5 ${
              item.status === 'completed' ? 'text-emerald-400' :
              item.status === 'running' ? 'text-blue-400' :
              'text-white/40'
            }`}>
              {item.status === 'completed' ? '✓ 完成' : item.status === 'running' ? '● 进行中' : '○ 等待'}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Schedule