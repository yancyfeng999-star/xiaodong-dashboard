import React from 'react'

const ThreadPool: React.FC = () => {
  const threads = [
    { id: 1, status: 'active', task: '选品分析', progress: 45 },
    { id: 2, status: 'active', task: '页面开发', progress: 30 },
    { id: 3, status: 'idle', task: '空闲', progress: 0 },
    { id: 4, status: 'idle', task: '空闲', progress: 0 },
    { id: 5, status: 'idle', task: '空闲', progress: 0 },
    { id: 6, status: 'idle', task: '空闲', progress: 0 },
    { id: 7, status: 'idle', task: '空闲', progress: 0 },
    { id: 8, status: 'idle', task: '空闲', progress: 0 },
    { id: 9, status: 'idle', task: '空闲', progress: 0 },
    { id: 10, status: 'idle', task: '空闲', progress: 0 },
  ]

  const activeThreads = threads.filter(t => t.status === 'active').length
  const utilization = (activeThreads / threads.length) * 100

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">🧵 线程池状态</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">使用率: {utilization.toFixed(0)}%</span>
          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full transition-all duration-300"
              style={{ width: `${utilization}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>容量: {threads.length}线程</span>
          <span>使用中: {activeThreads}线程</span>
        </div>
        
        <div className="grid grid-cols-5 gap-3">
          {threads.map(thread => (
            <div key={thread.id} className="flex flex-col items-center">
              <div className={`thread-indicator ${thread.status === 'active' ? 'thread-active' : 'thread-idle'}`}></div>
              <span className="text-xs text-gray-500 mt-1 text-center">
                {thread.task}
              </span>
              {thread.status === 'active' && (
                <div className="w-full h-1 bg-gray-200 rounded-full mt-1 overflow-hidden">
                  <div 
                    className="h-full bg-primary-500 rounded-full"
                    style={{ width: `${thread.progress}%` }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-700">🟢 活跃线程:</span>
          <div className="flex space-x-2">
            {threads.filter(t => t.status === 'active').map(thread => (
              <span key={thread.id} className="task-badge task-running">
                {thread.task}
              </span>
            ))}
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          <p>• 可同时处理多个任务，智能调度资源</p>
          <p>• 空闲线程等待新指令，随时可用</p>
          <p>• 建议: 可同时下达3-5个新任务</p>
        </div>
      </div>
    </div>
  )
}

export default ThreadPool