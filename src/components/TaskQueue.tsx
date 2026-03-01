import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Task {
  id: string
  name: string
  status: 'running' | 'pending' | 'completed'
  progress: number
  type: '自动' | '手动'
  startTime?: Date
}

const TaskQueue: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 'T001', name: '智谱AI API测试', status: 'running', progress: 65, type: '手动', startTime: new Date() },
    { id: 'T002', name: 'GitHub Pages部署', status: 'running', progress: 40, type: '手动', startTime: new Date() },
    { id: 'T003', name: '网站性能优化', status: 'pending', progress: 0, type: '自动' },
    { id: 'T004', name: '数据爬取-亚马逊', status: 'pending', progress: 0, type: '自动' },
    { id: 'T005', name: '飞书多维表格同步', status: 'pending', progress: 0, type: '自动' },
  ])

  const [lastUpdate, setLastUpdate] = useState(new Date())

  // 模拟实时任务更新 - 每2秒更新一次
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prevTasks => {
        const newTasks = prevTasks.map(task => {
          // 运行中的任务进度增加
          if (task.status === 'running') {
            const newProgress = Math.min(task.progress + Math.random() * 8, 100)
            if (newProgress >= 100) {
              return { ...task, progress: 100, status: 'completed' as const }
            }
            return { ...task, progress: newProgress }
          }
          return task
        })

        // 自动启动等待中的任务
        const runningCount = newTasks.filter(t => t.status === 'running').length
        if (runningCount < 2) {
          const pendingTask = newTasks.find(t => t.status === 'pending')
          if (pendingTask) {
            pendingTask.status = 'running'
            pendingTask.startTime = new Date()
            pendingTask.progress = 5
          }
        }

        return newTasks
      })
      setLastUpdate(new Date())
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const runningCount = tasks.filter(t => t.status === 'running').length
  const completedCount = tasks.filter(t => t.status === 'completed').length
  const pendingCount = tasks.filter(t => t.status === 'pending').length

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-400 animate-pulse'
      case 'completed': return 'bg-emerald-400'
      default: return 'bg-amber-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running': return '运行中'
      case 'completed': return '已完成'
      default: return '等待中'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-500/20 text-blue-200'
      case 'completed': return 'bg-emerald-500/20 text-emerald-200'
      default: return 'bg-amber-500/20 text-amber-200'
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-white">📋 任务队列</h2>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-white/60">
            {runningCount}进行/{completedCount}完成/{pendingCount}等待
          </span>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="metric-card text-center">
          <div className="text-base font-bold text-blue-400">{runningCount}</div>
          <div className="text-[10px] text-white/50">进行中</div>
        </div>
        <div className="metric-card text-center">
          <div className="text-base font-bold text-emerald-400">{completedCount}</div>
          <div className="text-[10px] text-white/50">已完成</div>
        </div>
        <div className="metric-card text-center">
          <div className="text-base font-bold text-amber-400">{pendingCount}</div>
          <div className="text-[10px] text-white/50">等待中</div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-2 max-h-[200px] overflow-y-auto">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`metric-card ${task.status === 'running' ? 'border-blue-500/30' : ''}`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`}></span>
                <span className="text-xs font-medium text-white truncate max-w-[100px]">{task.name}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className={`text-[9px] px-1.5 py-0.5 rounded ${task.type === '自动' ? 'bg-purple-500/20 text-purple-200' : 'bg-amber-500/20 text-amber-200'}`}>
                  {task.type}
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${getStatusBg(task.status)}`}>
                  {getStatusText(task.status)}
                </span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="flex items-center space-x-2">
              <div className="flex-1 progress-bar">
                <div 
                  className={`progress-fill ${task.status === 'completed' ? 'bg-emerald-400' : ''}`}
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
              <span className="text-[10px] text-white/60 w-8 text-right">{Math.round(task.progress)}%</span>
            </div>

            {/* Task ID & Time */}
            <div className="flex justify-between text-[9px] text-white/40 mt-1">
              <span>{task.id}</span>
              {task.startTime && (
                <span>开始: {task.startTime.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Update Info */}
      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
        <span className="text-[10px] text-white/40">
          最后更新: {lastUpdate.toLocaleTimeString('zh-CN')}
        </span>
        <span className="text-[10px] text-white/40">每2秒自动刷新</span>
      </div>
    </motion.div>
  )
}

export default TaskQueue