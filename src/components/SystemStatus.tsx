import React from 'react'

const SystemStatus: React.FC = () => {
  const systemMetrics = [
    { label: 'CPU使用率', value: 12, unit: '%', color: 'bg-green-500', max: 100 },
    { label: '内存使用', value: 4.2, unit: 'GB', color: 'bg-blue-500', max: 16 },
    { label: '磁盘空间', value: 120, unit: 'GB', color: 'bg-purple-500', max: 512 },
    { label: '运行时间', value: '3天2小时', unit: '', color: 'bg-yellow-500' },
  ]

  const processes = [
    { name: 'OpenClaw', status: 'running', cpu: 8, memory: 2.1 },
    { name: 'Python爬虫', status: 'idle', cpu: 0.5, memory: 0.8 },
    { name: 'Node.js服务', status: 'running', cpu: 3, memory: 1.2 },
    { name: '数据库', status: 'running', cpu: 1, memory: 0.5 },
  ]

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">🖥️ 系统状态</h2>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">系统健康</span>
            <span className="text-green-600 text-sm font-medium">🟢 正常</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {systemMetrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-gray-600">{metric.label}</span>
                  <span className="font-semibold text-gray-900">
                    {metric.value}
                    {metric.unit && <span className="text-sm text-gray-500"> {metric.unit}</span>}
                  </span>
                </div>
                
                {metric.max && (
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${metric.color} rounded-full`}
                      style={{ width: `${(metric.value / metric.max) * 100}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">关键进程</h3>
          <div className="space-y-2">
            {processes.map((process, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${process.status === 'running' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-900">{process.name}</span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>CPU: {process.cpu}%</span>
                  <span>内存: {process.memory}GB</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700">📊 性能指标</span>
            <span className="text-xs text-gray-500">更新时间: 10:03</span>
          </div>
          
          <div className="mt-2 space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>API响应时间</span>
              <span className="font-medium text-green-600">&lt;100ms</span>
            </div>
            <div className="flex justify-between">
              <span>页面加载时间</span>
              <span className="font-medium text-green-600">&lt;2s</span>
            </div>
            <div className="flex justify-between">
              <span>数据更新延迟</span>
              <span className="font-medium text-green-600">&lt;10s</span>
            </div>
            <div className="flex justify-between">
              <span>资源占用</span>
              <span className="font-medium text-green-600">最低优先级</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            💡 <span className="font-medium">性能优化:</span> 数据更新频率已优化，按需更新，最小化性能影响。
          </p>
        </div>
      </div>
    </div>
  )
}

export default SystemStatus