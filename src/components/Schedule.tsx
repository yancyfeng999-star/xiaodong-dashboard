import React from 'react'
import { motion } from 'framer-motion'

const Schedule: React.FC = () => {
  // 今日任务
  const todayTasks = [
    { time: '02:00', task: '亚马逊BSR抓取', status: 'completed', type: '自动' },
    { time: '03:00', task: 'TikTok Shop抓取', status: 'completed', type: '自动' },
    { time: '04:00', task: 'Shopee抓取', status: 'completed', type: '自动' },
    { time: '06:00', task: '记忆学习', status: 'completed', type: '自动' },
    { time: '09:00', task: 'AI晨报', status: 'completed', type: '自动' },
    { time: '09:10', task: '跨境电商晨报', status: 'completed', type: '自动' },
    { time: '10:00', task: '选品工作流', status: 'completed', type: '自动' },
    { time: '10:15', task: '网站开发优化', status: 'running', type: '手动' },
    { time: '11:00', task: '数据分析', status: 'pending', type: '手动' },
    { time: '14:00', task: '智谱API测试', status: 'pending', type: '手动' },
    { time: '16:00', task: '性能优化', status: 'pending', type: '手动' },
    { time: '20:00', task: '每日总结', status: 'pending', type: '自动' },
  ]

  // 本周计划
  const weekPlan = [
    { day: '周一', focus: '选品分析', progress: 100, tasks: '12/12' },
    { day: '周二', focus: '网站开发', progress: 85, tasks: '8/10' },
    { day: '周三', focus: 'API集成', progress: 60, tasks: '6/10' },
    { day: '周四', focus: '性能优化', progress: 30, tasks: '3/10' },
    { day: '周五', focus: '测试部署', progress: 10, tasks: '1/8' },
    { day: '周六', focus: '深度学习', progress: 0, tasks: '0/6' },
    { day: '周日', focus: '休息调整', progress: 0, tasks: '0/4' },
  ]

  // 本月目标
  const monthGoals = [
    { goal: '选品数量', target: 5000, current: 3250, unit: '个' },
    { goal: '工作流自动化', target: 10, current: 8, unit: '个' },
    { goal: '技能掌握', target: 15, current: 11, unit: '个' },
    { goal: '数据积累', target: 50000, current: 30200, unit: '条' },
  ]

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
        <span className="text-xs text-white/60">日/周/月视图</span>
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
              <div className={`text-[10px] mt-1 ${
                item.status === 'completed' ? 'text-emerald-400' :
                item.status === 'running' ? 'text-blue-400' :
                'text-white/40'
              }`}>
                {item.status === 'completed' ? '✓ 完成' : item.status === 'running' ? '● 进行中' : '○ 等待'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Weekly Plan */}
      <div className="mb-4">
        <div className="text-label mb-2">本周计划</div>
        <div className="grid grid-cols-7 gap-1">
          {weekPlan.map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              className={`p-2 rounded-lg text-center ${
                day.progress === 100 ? 'bg-emerald-500/10 border border-emerald-500/30' :
                day.progress > 0 ? 'bg-blue-500/10 border border-blue-500/30' :
                'bg-white/5 border border-white/10'
              }`}
            >
              <div className="text-[10px] text-white/60">{day.day}</div>
              <div className="text-xs font-medium text-white truncate">{day.focus}</div>
              <div className="progress-bar mt-1">
                <div className="progress-fill" style={{ width: `${day.progress}%` }}></div>
              </div>
              <div className="text-[10px] text-white/50 mt-1">{day.tasks}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Monthly Goals */}
      <div>
        <div className="text-label mb-2">月度目标</div>
        <div className="space-y-2">
          {monthGoals.map((goal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              className="metric-card"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-white/80">{goal.goal}</span>
                <span className="text-xs text-white/60">{goal.current}/{goal.target} {goal.unit}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(goal.current / goal.target) * 100}%` }}></div>
              </div>
              <div className="flex justify-between text-[10px] text-white/50 mt-1">
                <span>进度: {Math.round((goal.current / goal.target) * 100)}%</span>
                <span>剩余: {goal.target - goal.current} {goal.unit}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Schedule