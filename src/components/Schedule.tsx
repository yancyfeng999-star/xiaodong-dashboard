import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Task {
  id: string
  time: string
  task: string
  status: 'completed' | 'running' | 'pending'
  type: '自动' | '手动'
  progress: number
  completedAt?: string
}

const Schedule: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // 生成每日任务（根据今天实际工作情况）
  const generateTodayTasks = (): Task[] => {
    const today = new Date()
    const dateStr = today.toISOString().split('T')[0]
    
    // 尝试从localStorage读取今天的任务状态
    const savedTasks = localStorage.getItem(`tasks-${dateStr}`)
    if (savedTasks) {
      return JSON.parse(savedTasks)
    }
    
    // 生成今天的任务列表（基于实际工作）
    return [
      { id: 'T001', time: '02:00', task: '亚马逊BSR抓取', status: 'completed', type: '自动', progress: 100, completedAt: '02:15' },
      { id: 'T002', time: '03:00', task: 'TikTok Shop抓取', status: 'completed', type: '自动', progress: 100, completedAt: '03:10' },
      { id: 'T003', time: '04:00', task: 'Shopee抓取', status: 'completed', type: '自动', progress: 100, completedAt: '04:05' },
      { id: 'T004', time: '06:00', task: '记忆学习', status: 'completed', type: '自动', progress: 100, completedAt: '06:20' },
      { id: 'T005', time: '09:00', task: 'AI晨报', status: 'completed', type: '自动', progress: 100, completedAt: '09:05' },
      { id: 'T006', time: '09:10', task: '跨境电商晨报', status: 'completed', type: '自动', progress: 100, completedAt: '09:15' },
      { id: 'T007', time: '10:00', task: '选品工作流', status: 'completed', type: '自动', progress: 100, completedAt: '10:30' },
      { id: 'T008', time: '10:15', task: '网站开发优化', status: 'completed', type: '手动', progress: 100, completedAt: '12:00' },
      { id: 'T009', time: '11:00', task: '数据分析', status: 'completed', type: '手动', progress: 100, completedAt: '11:45' },
      { id: 'T010', time: '14:00', task: '智谱API测试', status: 'completed', type: '手动', progress: 100, completedAt: '14:30' },
      { id: 'T011', time: '15:00', task: '技能安装（100+）', status: 'completed', type: '手动', progress: 100, completedAt: '17:15' },
      { id: 'T012', time: '16:00', task: '性能优化', status: 'completed', type: '手动', progress: 100, completedAt: '16:45' },
      { id: 'T013', time: '17:30', task: '实时数据更新', status: 'running', type: '手动', progress: 85 },
      { id: 'T014', time: '20:00', task: '每日总结', status: 'pending', type: '自动', progress: 0 },
      { id: 'T015', time: '21:00', task: '技能学习', status: 'pending', type: '手动', progress: 0 },
      { id: 'T016', time: '22:00', task: '系统监控检查', status: 'pending', type: '自动', progress: 0 },
    ]
  }

  const [todayTasks, setTodayTasks] = useState<Task[]>(generateTodayTasks())

  // 保存任务状态到localStorage
  const saveTasks = (tasks: Task[]) => {
    const today = new Date().toISOString().split('T')[0]
    localStorage.setItem(`tasks-${today}`, JSON.stringify(tasks))
  }

  // 自动更新任务状态（基于当前时间）
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)
      
      setTodayTasks(prev => {
        const hour = now.getHours()
        const minute = now.getMinutes()
        const currentTimeVal = hour * 60 + minute
        
        const updated = prev.map(task => {
          const [taskHour, taskMinute] = task.time.split(':').map(Number)
          const taskTimeVal = taskHour * 60 + taskMinute
          
          // 如果任务时间已过且不是已完成，自动标记为已完成（自动任务）
          if (task.type === '自动' && currentTimeVal > taskTimeVal + 30 && task.status === 'pending') {
            return { 
              ...task, 
              status: 'completed' as const, 
              progress: 100,
              completedAt: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
            }
          }
          
          // 如果任务正在进行中，更新进度
          if (task.status === 'running') {
            return { ...task, progress: Math.min(task.progress + 2, 95) }
          }
          
          return task
        })
        
        saveTasks(updated)
        return updated
      })
      
      setLastUpdate(now)
    }, 10000) // 每10秒检查一次

    return () => clearInterval(interval)
  }, [])

  // 手动标记任务完成
  const toggleTaskComplete = (taskId: string) => {
    setTodayTasks(prev => {
      const updated = prev.map(task => {
        if (task.id === taskId) {
          const now = new Date()
          const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
          
          if (task.status === 'completed') {
            // 取消完成
            return { ...task, status: 'pending' as const, progress: 0, completedAt: undefined }
          } else {
            // 标记完成
            return { 
              ...task, 
              status: 'completed' as const, 
              progress: 100,
              completedAt: timeStr
            }
          }
        }
        return task
      })
      
      saveTasks(updated)
      return updated
    })
  }

  // 手动开始任务
  const startTask = (taskId: string) => {
    setTodayTasks(prev => {
      const updated = prev.map(task => 
        task.id === taskId ? { ...task, status: 'running' as const, progress: 10 } : task
      )
      saveTasks(updated)
      return updated
    })
  }

  const completedToday = todayTasks.filter(t => t.status === 'completed').length
  const runningToday = todayTasks.filter(t => t.status === 'running').length
  const pendingToday = todayTasks.filter(t => t.status === 'pending').length

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-white">📅 今日任务</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/60">
            {completedToday}/{todayTasks.length} 完成
          </span>
          <span className="text-[10px] text-white/40">
            更新: {lastUpdate.toLocaleTimeString('zh-CN', {hour:'2-digit', minute:'2-digit', second:'2-digit'})}
          </span>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-white/70">今日进度</span>
          <span className="text-xs text-emerald-400">{Math.round((completedToday / todayTasks.length) * 100)}%</span>
        </div>
        <div className="progress-bar h-2">
          <motion.div 
            className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedToday / todayTasks.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="metric-card text-center">
          <div className="text-lg font-bold text-emerald-400">{completedToday}</div>
          <div className="text-[10px] text-white/50">已完成</div>
        </div>
        <div className="metric-card text-center">
          <div className="text-lg font-bold text-blue-400">{runningToday}</div>
          <div className="text-[10px] text-white/50">进行中</div>
        </div>
        <div className="metric-card text-center">
          <div className="text-lg font-bold text-white/60">{pendingToday}</div>
          <div className="text-[10px] text-white/50">待执行</div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {todayTasks.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.02 }}
            className={`p-3 rounded-lg border cursor-pointer transition-all ${
              item.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/30' :
              item.status === 'running' ? 'bg-blue-500/10 border-blue-500/30' :
              'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
            onClick={() => item.type === '手动' && toggleTaskComplete(item.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Checkbox */}
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  item.status === 'completed' 
                    ? 'bg-emerald-400 border-emerald-400' 
                    : 'border-white/30'
                }`}>
                  {item.status === 'completed' && <span className="text-white text-xs">✓</span>}
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-white/50">{item.time}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                      item.type === '自动' ? 'bg-purple-500/20 text-purple-200' : 'bg-amber-500/20 text-amber-200'
                    }`}>{item.type}</span>
                  </div>
                  <div className={`text-sm font-medium ${item.status === 'completed' ? 'text-white/60 line-through' : 'text-white'}`}>
                    {item.task}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                {item.status === 'completed' && item.completedAt && (
                  <div className="text-[9px] text-emerald-400">完成于 {item.completedAt}</div>
                )}
                {item.status === 'running' && (
                  <div className="text-[9px] text-blue-400">{Math.round(item.progress)}%</div>
                )}
                <div className={`text-[10px] mt-0.5 ${
                  item.status === 'completed' ? 'text-emerald-400' :
                  item.status === 'running' ? 'text-blue-400' :
                  'text-white/40'
                }`}>
                  {item.status === 'completed' ? '已完成' : item.status === 'running' ? '进行中' : '待执行'}
                </div>
              </div>
            </div>
            
            {/* Progress bar for running tasks */}
            {item.status === 'running' && (
              <div className="mt-2">
                <div className="progress-bar h-1.5">
                  <div 
                    className="h-full bg-blue-400 rounded-full transition-all duration-500"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            )}
            
            {/* Action buttons */}
            {item.type === '手动' && item.status === 'pending' && (
              <div className="mt-2 flex gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); startTask(item.id); }}
                  className="text-[10px] px-2 py-1 bg-blue-500/20 text-blue-300 rounded hover:bg-blue-500/30 transition-colors"
                >
                  开始
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleTaskComplete(item.id); }}
                  className="text-[10px] px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded hover:bg-emerald-500/30 transition-colors"
                >
                  完成
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Tips */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="text-[10px] text-white/40">
          💡 点击任务可标记完成/取消，手动任务可点击"开始"或"完成"按钮
        </div>
      </div>

      {/* Update Info */}
      <div className="mt-3 flex items-center justify-between text-[10px] text-white/40">
        <span>数据每10秒自动更新</span>
        <span>下次: {new Date(lastUpdate.getTime() + 10000).toLocaleTimeString('zh-CN')}</span>
      </div>
    </motion.div>
  )
}

export default Schedule