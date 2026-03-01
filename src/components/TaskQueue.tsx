import React from 'react'
import { motion } from 'framer-motion'

const TaskQueue: React.FC = () => {
  const tasks = [
    { id: 1, name: '选品工作流', status: 'running', startTime: '10:00', progress: 45 },
    { id: 2, name: '页面开发', status: 'running', startTime: '刚刚', progress: 30 },
    { id: 3, name: '数据分析', status: 'pending', startTime: '等待', progress: 0 },
    { id: 4, name: '记忆学习', status: 'pending', startTime: '等待', progress: 0 },
    { id: 5, name: '技能安装', status: 'pending', startTime: '等待', progress: 0 },
  ]

  const completedTasks = [
    { id: 6, name: 'AI晨报', status: 'completed', time: '09:00' },
    { id: 7, name: '跨境晨报', status: 'completed', time: '09:10' },
    { id: 8, name: 'LanceDB安装', status: 'completed', time: '09:25' },
    { id: 9, name: '多线程工具', status: 'completed', time: '09:30' },
    { id: 10, name: 'Skill安装', status: 'completed', time: '09:42' },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running': return <span className="task-badge task-running">进行中</span>
      case 'pending': return <span className="task-badge task-pending">等待中</span>
      case 'completed': return <span className="task-badge task-completed">已完成</span>
      default: return <span className="task-badge task-pending">未知</span>
    }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">📋 任务队列</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">总数: {tasks.length + completedTasks.length}</span>
          <span className="text-sm text-gray-600">进行中: {tasks.filter(t => t.status === 'running').length}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">当前任务</h3>
          <div className="space-y-3">
            {tasks.map(task => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(task.status)}
                    <span className="font-medium text-gray-900">{task.name}</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>开始: {task.startTime}</span>
                      <span>{task.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${task.progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">今日已完成</h3>
          <div className="grid grid-cols-2 gap-2">
            {completedTasks.map(task => (
              <div key={task.id} className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span className="text-sm text-gray-700">{task.name}</span>
                <span className="text-xs text-gray-500">{task.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700">🎯 指令接收状态:</span>
            <span className="text-green-600 text-sm font-medium">🟢 可接收新指令</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            • 当前负载: 轻量 (20%使用率)
            <br/>
            • 可同时处理: 3-5个新任务
            <br/>
            • 建议: 可下达多个指令，我会并行处理
          </p>
        </div>
      </div>
    </div>
  )
}

export default TaskQueue