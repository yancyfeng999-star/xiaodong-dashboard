import React from 'react'
import { motion } from 'framer-motion'

const TaskQueue: React.FC = () => {
  const tasks = [
    { id: 'T001', name: '智谱AI测试', status: 'running', progress: 65 },
    { id: 'T002', name: 'GitHub部署', status: 'running', progress: 40 },
    { id: 'T003', name: '性能优化', status: 'pending', progress: 0 },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-white">📋 任务队列</h2>
        <span className="text-xs text-white/60">2/3 进行中</span>
      </div>

      <div className="space-y-2">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="metric-card"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${task.status === 'running' ? 'bg-blue-400 animate-pulse' : 'bg-amber-400'}`}></span>
                <span className="text-xs font-medium text-white">{task.name}</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${task.status === 'running' ? 'bg-blue-500/20 text-blue-200' : 'bg-amber-500/20 text-amber-200'}`}>
                {task.status === 'running' ? '运行中' : '等待中'}
              </span>
            </div>
            {task.status === 'running' && (
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${task.progress}%` }}></div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default TaskQueue