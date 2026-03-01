import React from 'react'
import { motion } from 'framer-motion'

const Schedule: React.FC = () => {
  const todaySchedule = [
    { time: '02:00', task: '亚马逊BSR抓取', status: 'completed' },
    { time: '03:00', task: 'TikTok Shop抓取', status: 'completed' },
    { time: '04:00', task: 'Shopee抓取', status: 'completed' },
    { time: '06:00', task: '每日记忆学习', status: 'completed' },
    { time: '09:00', task: 'AI晨报', status: 'completed' },
    { time: '09:10', task: '跨境电商晨报', status: 'completed' },
    { time: '10:00', task: '选品工作流', status: 'completed' },
    { time: '10:15', task: '小东页面开发', status: 'running' },
    { time: '11:00', task: '数据分析', status: 'pending' },
    { time: '14:00', task: '技能学习', status: 'pending' },
    { time: '16:00', task: '工作流优化', status: 'pending' },
    { time: '20:00', task: '每日总结', status: 'pending' },
  ]

  const tomorrowSchedule = [
    { time: '02:00', task: '亚马逊BSR抓取', priority: 'high' },
    { time: '03:00', task: 'TikTok Shop抓取', priority: 'high' },
    { time: '04:00', task: 'Shopee抓取', priority: 'high' },
    { time: '06:00', task: '记忆学习', priority: 'medium' },
    { time: '09:00', task: 'AI晨报', priority: 'high' },
    { time: '09:10', task: '跨境晨报', priority: 'high' },
    { time: '10:00', task: '选品工作流', priority: 'high' },
    { time: '11:00', task: '页面优化', priority: 'medium' },
    { time: '14:00', task: '新技能学习', priority: 'medium' },
    { time: '16:00', task: '系统维护', priority: 'low' },
  ]

  const weekPlan = [
    { day: '周一', focus: '选品分析 + 数据爬取' },
    { day: '周二', focus: '工作流优化 + 自动化' },
    { day: '周三', focus: '技能学习 + 知识积累' },
    { day: '周四', focus: '系统维护 + 性能优化' },
    { day: '周五', focus: '周总结 + 计划制定' },
    { day: '周六', focus: '深度学习 + 实验' },
    { day: '周日', focus: '休息调整 + 预备' },
  ]

  const monthGoals = [
    { goal: '选品数量', target: '5,000+', progress: 65 },
    { goal: '工作流自动化', target: '10个', progress: 80 },
    { goal: '技能掌握', target: '20个', progress: 60 },
    { goal: '数据积累', target: '50,000条', progress: 45 },
    { goal: '效率提升', target: '3倍', progress: 70 },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <span className="task-badge task-completed">已完成</span>
      case 'running': return <span className="task-badge task-running">进行中</span>
      case 'pending': return <span className="task-badge task-pending">待执行</span>
      default: return <span className="task-badge task-pending">未知</span>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <span className="text-xs px-2 py-0.5 bg-red-100 text-red-800 rounded">高优先级</span>
      case 'medium': return <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded">中优先级</span>
      case 'low': return <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded">低优先级</span>
      default: return <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-800 rounded">普通</span>
    }
  }

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">📅 工作计划表</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 今日计划 */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">📝 今日计划 (3月1日)</h3>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
            {todaySchedule.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500 w-12">{item.time}</span>
                  <span className="text-sm text-gray-900">{item.task}</span>
                </div>
                {getStatusBadge(item.status)}
              </motion.div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              ✅ 今日已完成: 7/12 任务 • 🔄 进行中: 1 • ⏳ 待执行: 4
            </p>
          </div>
        </div>

        {/* 明日计划 */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">📅 明日计划 (3月2日)</h3>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
            {tomorrowSchedule.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500 w-12">{item.time}</span>
                  <span className="text-sm text-gray-900">{item.task}</span>
                </div>
                {getPriorityBadge(item.priority)}
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              🎯 明日重点: 数据爬取 + 选品分析 + 页面优化
            </p>
          </div>
        </div>
      </div>

      {/* 本周计划 */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">🗓️ 本周计划 (3月第1周)</h3>
        <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
          {weekPlan.map((day, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="font-medium text-gray-900">{day.day}</div>
              <div className="text-xs text-gray-600 mt-1">{day.focus}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 本月目标 */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">🎯 本月目标 (3月)</h3>
        <div className="space-y-3">
          {monthGoals.map((goal, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{goal.goal}</span>
                <span className="text-gray-900 font-medium">
                  {goal.progress}% • 目标: {goal.target}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-500 rounded-full"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-200 rounded-lg">
          <h4 className="font-medium text-primary-900 mb-1">📈 月度工作重点</h4>
          <ul className="text-sm text-primary-800 space-y-1">
            <li>• 提升选品质量和数量</li>
            <li>• 优化工作流自动化程度</li>
            <li>• 学习新技能，提升能力</li>
            <li>• 积累数据，建立知识库</li>
            <li>• 持续优化系统性能</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">⏰ 时间管理原则</h4>
            <p className="text-sm text-gray-600 mt-1">
              优先级排序 • 并行处理 • 定期回顾 • 持续优化
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary-600">85%</div>
            <div className="text-xs text-gray-500">计划完成率</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule