import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Schedule: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // 动态生成今日任务（基于当前时间）
  const generateTodayTasks = () => {
    const hour = currentTime.getHours()
    const tasks = [
      { time: '02:00', task: '亚马逊BSR抓取', status: 'completed', type: '自动', progress: 100 },
      { time: '03:00', task: 'TikTok Shop抓取', status: 'completed', type: '自动', progress: 100 },
      { time: '04:00', task: 'Shopee抓取', status: 'completed', type: '自动', progress: 100 },
      { time: '06:00', task: '记忆学习', status: 'completed', type: '自动', progress: 100 },
      { time: '09:00', task: 'AI晨报', status: 'completed', type: '自动', progress: 100 },
      { time: '09:10', task: '跨境电商晨报', status: 'completed', type: '自动', progress: 100 },
      { time: '10:00', task: '选品工作流', status: 'completed', type: '自动', progress: 100 },
      { time: '10:15', task: '网站开发优化', status: hour >= 17 ? 'completed' : hour >= 10 ? 'running' : 'pending', type: '手动', progress: hour >= 17 ? 100 : Math.min(((hour - 10) * 60 + currentTime.getMinutes()) / 420 * 100, 95) },
      { time: '11:00', task: '数据分析', status: hour >= 12 ? 'completed' : hour >= 11 ? 'running' : 'pending', type: '手动', progress: hour >= 12 ? 100 : hour >= 11 ? Math.min((currentTime.getMinutes() / 60) * 100, 90) : 0 },
      { time: '14:00', task: '智谱API测试', status: hour >= 15 ? 'completed' : hour >= 14 ? 'running' : 'pending', type: '手动', progress: hour >= 15 ? 100 : hour >= 14 ? Math.min((currentTime.getMinutes() / 60) * 100, 85) : 0 },
      { time: '16:00', task: '性能优化', status: hour >= 17 ? 'completed' : hour >= 16 ? 'running' : 'pending', type: '手动', progress: hour >= 17 ? 100 : hour >= 16 ? Math.min((currentTime.getMinutes() / 60) * 100, 80) : 0 },
      { time: '20:00', task: '每日总结', status: hour >= 20 ? 'running' : 'pending', type: '自动', progress: hour >= 20 ? Math.min(((hour - 20) * 60 + currentTime.getMinutes()) / 60 * 100, 100) : 0 },
    ]
    return tasks
  }

  const [todayTasks, setTodayTasks] = useState(generateTodayTasks())

  // 动态生成本周计划（基于实际完成进度）
  const generateWeekPlan = () => {
    const dayOfWeek = currentTime.getDay() || 7 // 1-7
    return [
      { day: '周一', focus: '选品分析', progress: 100, tasks: '12/12', status: dayOfWeek > 1 ? 'completed' : dayOfWeek === 1 ? 'running' : 'pending' },
      { day: '周二', focus: '网站开发', progress: dayOfWeek > 2 ? 100 : dayOfWeek === 2 ? Math.min(85 + Math.random() * 10, 100) : 0, tasks: dayOfWeek > 2 ? '10/10' : dayOfWeek === 2 ? '9/10' : '0/10', status: dayOfWeek > 2 ? 'completed' : dayOfWeek === 2 ? 'running' : 'pending' },
      { day: '周三', focus: 'API集成', progress: dayOfWeek > 3 ? 100 : dayOfWeek === 3 ? Math.min(60 + Math.random() * 15, 90) : 0, tasks: dayOfWeek > 3 ? '10/10' : dayOfWeek === 3 ? '7/10' : '0/10', status: dayOfWeek > 3 ? 'completed' : dayOfWeek === 3 ? 'running' : 'pending' },
      { day: '周四', focus: '性能优化', progress: dayOfWeek > 4 ? 100 : dayOfWeek === 4 ? Math.min(30 + Math.random() * 20, 60) : 0, tasks: dayOfWeek > 4 ? '8/8' : dayOfWeek === 4 ? '3/8' : '0/8', status: dayOfWeek > 4 ? 'completed' : dayOfWeek === 4 ? 'running' : 'pending' },
      { day: '周五', focus: '测试部署', progress: dayOfWeek > 5 ? 100 : dayOfWeek === 5 ? Math.min(10 + Math.random() * 15, 40) : 0, tasks: dayOfWeek > 5 ? '8/8' : dayOfWeek === 5 ? '1/8' : '0/8', status: dayOfWeek > 5 ? 'completed' : dayOfWeek === 5 ? 'running' : 'pending' },
      { day: '周六', focus: '深度学习', progress: dayOfWeek > 6 ? 100 : dayOfWeek === 6 ? Math.random() * 30 : 0, tasks: dayOfWeek > 6 ? '6/6' : dayOfWeek === 6 ? '1/6' : '0/6', status: dayOfWeek > 6 ? 'completed' : dayOfWeek === 6 ? 'running' : 'pending' },
      { day: '周日', focus: '休息调整', progress: dayOfWeek === 7 ? Math.random() * 20 : 0, tasks: dayOfWeek === 7 ? '0/4' : '0/4', status: dayOfWeek === 7 ? 'running' : 'pending' },
    ]
  }

  const [weekPlan, setWeekPlan] = useState(generateWeekPlan())

  // 动态生成本月目标（持续增长）
  const generateMonthGoals = () => {
    const dayOfMonth = currentTime.getDate()
    const progress = dayOfMonth / 31 // 本月进度
    return [
      { goal: '选品数量', target: 5000, current: Math.min(3250 + Math.floor(progress * 1000), 5000), unit: '个' },
      { goal: '工作流自动化', target: 10, current: Math.min(8 + Math.floor(progress * 2), 10), unit: '个' },
      { goal: '技能掌握', target: 15, current: Math.min(11 + Math.floor(progress * 3), 15), unit: '个' },
      { goal: '数据积累', target: 50000, current: Math.min(30200 + Math.floor(progress * 10000), 50000), unit: '条' },
    ]
  }

  const [monthGoals, setMonthGoals] = useState(generateMonthGoals())

  // 每30秒更新一次数据
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)
      setTodayTasks(generateTodayTasks())
      setWeekPlan(generateWeekPlan())
      setMonthGoals(generateMonthGoals())
      setLastUpdate(now)
    }, 30000) // 30秒

    return () => clearInterval(interval)
  }, [])

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
        <h2 className="text-base font-bold text-white">📅 任务调度</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/60">日/周/月视图</span>
          <span className="text-[10px] text-white/40">更新: {lastUpdate.toLocaleTimeString('zh-CN', {hour:'2-digit', minute:'2-digit', second:'2-digit'})}</span>
        </div>
      </div>

      {/* Today's Summary */}
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

      {/* Today's Tasks */}
      <div className="mb-4">
        <div className="text-label mb-2">今日计划 ({todayTasks.length}个任务)</div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {todayTasks.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              className={`p-2 rounded-lg border ${
                item.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/30' :
                item.status === 'running' ? 'bg-blue-500/10 border-blue-500/30' :
                'bg-white/5 border-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-white/50">{item.time}</span>
                <span className={`text-[10px] px-1 rounded ${
                  item.type === '自动' ? 'bg-purple-500/20 text-purple-200' : 'bg-amber-500/20 text-amber-200'
                }`}>{item.type}</span>
              </div>
              <div className="text-xs font-medium text-white truncate">{item.task}</div>
              
              {/* Progress bar for running tasks */}
              {item.status === 'running' && (
                <div className="mt-1">
                  <div className="progress-bar h-1">
                    <div 
                      className="h-full bg-blue-400 rounded-full transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <div className="text-[8px] text-blue-400 mt-0.5">{Math.round(item.progress)}%</div>
                </div>
              )}
              
              <div className={`text-[10px] mt-1 ${
                item.status === 'completed' ? 'text-emerald-400' :
                item.status === 'running' ? 'text-blue-400' :
                'text-white/40'
              }`}>
                {item.status === 'completed' ? '✓ 已完成' : item.status === 'running' ? '▶ 进行中' : '○ 待执行'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Week Plan */}
      <div className="mb-4">
        <div className="text-label mb-2">本周计划</div>
        <div className="space-y-2">
          {weekPlan.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`metric-card ${item.status === 'running' ? 'border-blue-500/30' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-medium ${item.status === 'completed' ? 'text-emerald-400' : item.status === 'running' ? 'text-blue-400' : 'text-white/60'}`}>
                    {item.day}
                  </span>
                  <span className="text-xs text-white/80">{item.focus}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] text-white/40">{item.tasks}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    item.status === 'completed' ? 'bg-emerald-500/20 text-emerald-200' :
                    item.status === 'running' ? 'bg-blue-500/20 text-blue-200' :
                    'bg-white/10 text-white/40'
                  }`}>
                    {item.status === 'completed' ? '完成' : item.status === 'running' ? '进行中' : '待开始'}
                  </span>
                </div>
              </div>
              <div className="mt-1.5 progress-bar h-1.5">
                <motion.div 
                  className={`h-full rounded-full ${
                    item.status === 'completed' ? 'bg-emerald-400' :
                    item.status === 'running' ? 'bg-blue-400' :
                    'bg-white/20'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Month Goals */}
      <div>
        <div className="text-label mb-2">本月目标</div>
        <div className="grid grid-cols-2 gap-2">
          {monthGoals.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="metric-card"
            >
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-white/70">{item.goal}</span>
                <span className="text-xs font-bold text-white">{item.current.toLocaleString()}/{item.target.toLocaleString()}{item.unit}</span>
              </div>
              <div className="progress-bar">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.current / item.target) * 100}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              </div>
              <div className="text-[10px] text-white/40 mt-1">
                完成度: {Math.round((item.current / item.target) * 100)}%
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Update Info */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="flex items-center justify-between text-[10px] text-white/40">
          <span>数据每30秒自动更新</span>
          <span>下次更新: {new Date(lastUpdate.getTime() + 30000).toLocaleTimeString('zh-CN')}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default Schedule