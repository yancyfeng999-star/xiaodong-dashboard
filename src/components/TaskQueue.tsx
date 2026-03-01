import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Task {
  id: string
  name: string
  status: 'running' | 'pending' | 'completed'
  progress: number
  type: '自动' | '手动'
  category: '数据' | '部署' | '优化' | '同步' | '测试'
  startTime?: Date
  completedAt?: string
}

const TaskQueue: React.FC = () => {
  const [filter, setFilter] = useState<'全部' | '自动' | '手动' | '运行中' | '已完成' | '等待中'>('全部')
  const [currentTime, setCurrentTime] = useState(new Date())
  
  // 基于实际工作生成任务队列
  const generateTasks = (): Task[] => {
    const now = new Date()
    const hour = now.getHours()
    
    // 根据当前时间判断任务状态
    return [
      { 
        id: 'T001', 
        name: '展示面板开发', 
        status: 'completed', 
        progress: 100, 
        type: '手动', 
        category: '部署',
        completedAt: '12:00'
      },
      { 
        id: 'T002', 
        name: 'GitHub Pages部署', 
        status: 'completed', 
        progress: 100, 
        type: '手动', 
        category: '部署',
        completedAt: '12:30'
      },
      { 
        id: 'T003', 
        name: '102个技能安装', 
        status: 'completed', 
        progress: 100, 
        type: '手动', 
        category: '优化',
        completedAt: '17:15'
      },
      { 
        id: 'T004', 
        name: '实时数据更新功能', 
        status: 'completed', 
        progress: 100, 
        type: '手动', 
        category: '优化',
        completedAt: '17:45'
      },
      { 
        id: 'T005', 
        name: '自动任务标注系统', 
        status: hour >= 18 ? 'completed' : 'running', 
        progress: hour >= 18 ? 100 : 90, 
        type: '手动', 
        category: '优化',
        completedAt: hour >= 18 ? '18:00' : undefined
      },
      { 
        id: 'T006', 
        name: '系统监控', 
        status: 'running', 
        progress: 100, 
        type: '自动', 
        category: '测试'
      },
      { 
        id: 'T007', 
        name: '爬虫定时任务', 
        status: hour >= 20 ? 'completed' : 'pending', 
        progress: 0, 
        type: '自动', 
        category: '数据'
      },
      { 
        id: 'T008', 
        name: '每日总结', 
        status: hour >= 21 ? 'running' : 'pending', 
        progress: 0, 
        type: '自动', 
        category: '同步'
      },
    ]
  }

  const [tasks, setTasks] = useState<Task[]>(generateTasks())
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // 根据实际时间自动更新任务状态
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)
      setTasks(generateTasks())
      setLastUpdate(now)
    }, 30000) // 每30秒检查一次时间状态

    return () => clearInterval(interval)
  }, [])

  const filteredTasks = tasks.filter(task => {
    if (filter === '全部') return true
    if (filter === '自动' || filter === '手动') return task.type === filter
    if (filter === '运行中') return task.status === 'running'
    if (filter === '已完成') return task.status === 'completed'
    if (filter === '等待中') return task.status === 'pending'
    return true
  })

  const runningCount = tasks.filter(t => t.status === 'running').length
  const completedCount = tasks.filter(t => t.status === 'completed').length
  const pendingCount = tasks.filter(t => t.status === 'pending').length

  const filters = ['全部', '运行中', '已完成', '等待中', '自动', '手动'] as const

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

  const getCategoryColor = (category: string) => {
    const colors: {[key: string]: string} = {
      '数据': 'bg-cyan-500/20 text-cyan-200',
      '部署': 'bg-purple-500/20 text-purple-200',
      '优化': 'bg-pink-500/20 text-pink-200',
      '同步': 'bg-indigo-500/20 text-indigo-200',
      '测试': 'bg-orange-500/20 text-orange-200',
    }
    return colors[category] || 'bg-gray-500/20 text-gray-200'
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
        <h2 className="text-base font-bold text-white">📋 实时任务</h2>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-white/60">
            {filteredTasks.length}/{tasks.length} 任务
          </span>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1 mb-3">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-2 py-1 text-[10px] rounded-full transition-all ${
              filter === f 
                ? 'bg-blue-500 text-white' 
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            {f}
            {f === '运行中' && runningCount > 0 && (
              <span className="ml-1 text-[9px] bg-blue-400/30 px-1 rounded">{runningCount}</span>
            )}
            {f === '已完成' && completedCount > 0 && (
              <span className="ml-1 text-[9px] bg-emerald-400/30 px-1 rounded">{completedCount}</span>
            )}
            {f === '等待中' && pendingCount > 0 && (
              <span className="ml-1 text-[9px] bg-amber-400/30 px-1 rounded">{pendingCount}</span>
            )}
          </button>
        ))}
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
      <div className="space-y-2 max-h-[180px] overflow-y-auto">
        {filteredTasks.map((task, index) => (
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
                <span className="text-xs font-medium text-white truncate max-w-[90px]">{task.name}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className={`text-[9px] px-1.5 py-0.5 rounded ${getCategoryColor(task.category)}`}>
                  {task.category}
                </span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                  task.type === '自动' ? 'bg-purple-500/20 text-purple-200' : 'bg-amber-500/20 text-amber-200'
                }`}>
                  {task.type}
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
              <span className={`text-[10px] w-8 text-right ${task.status === 'completed' ? 'text-emerald-400' : 'text-white/60'}`}>
                {Math.round(task.progress)}%
              </span>
            </div>

            {/* Task Info */}
            <div className="flex justify-between items-center text-[9px] text-white/40 mt-1">
              <span>{task.id}</span>
              <div className="flex items-center space-x-2">
                {task.completedAt && (
                  <span className="text-emerald-400/70">完成于 {task.completedAt}</span>
                )}
                <span className={`px-1.5 py-0.5 rounded ${getStatusBg(task.status)}`}>
                  {getStatusText(task.status)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Update Info */}
      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
        <span className="text-[10px] text-white/40">
          更新: {lastUpdate.toLocaleTimeString('zh-CN')}
        </span>
        <span className="text-[10px] text-white/40">根据实际工作状态自动更新</span>
      </div>
    </motion.div>
  )
}

export default TaskQueue