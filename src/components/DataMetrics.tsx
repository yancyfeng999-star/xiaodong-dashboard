import React from 'react'

const DataMetrics: React.FC = () => {
  const dataStats = [
    { label: '产品数据', value: '1,245', unit: '条', trend: 'up', change: '+12%' },
    { label: '爬虫任务', value: '3', unit: '平台', trend: 'stable', change: '每日' },
    { label: '知识记忆', value: '128', unit: '条', trend: 'up', change: '+8' },
    { label: '技能安装', value: '12', unit: '个', trend: 'up', change: '+5' },
  ]

  const warehouseData = [
    { platform: '亚马逊', count: 520, growth: 15 },
    { platform: 'TikTok Shop', count: 385, growth: 25 },
    { platform: 'Shopee', count: 340, growth: 18 },
  ]

  const dailyTasks = [
    { time: '02:00', task: '亚马逊BSR抓取', status: 'completed' },
    { time: '03:00', task: 'TikTok Shop抓取', status: 'completed' },
    { time: '04:00', task: 'Shopee抓取', status: 'completed' },
    { time: '06:00', task: '每日记忆学习', status: 'completed' },
    { time: '09:00', task: 'AI晨报', status: 'completed' },
    { time: '09:10', task: '跨境电商晨报', status: 'completed' },
    { time: '10:00', task: '选品工作流', status: 'completed' },
  ]

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">📊 数据统计</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {dataStats.map((stat, index) => (
          <div key={index} className="metric-card">
            <div className="flex items-center justify-between">
              <span className="metric-value">{stat.value}</span>
              {stat.trend === 'up' && (
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                  ↗ {stat.change}
                </span>
              )}
              {stat.trend === 'stable' && (
                <span className="text-xs font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded">
                  → {stat.change}
                </span>
              )}
            </div>
            <span className="metric-label">
              {stat.label}
              {stat.unit && <span className="text-gray-400"> • {stat.unit}</span>}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 数据仓库统计 */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">📦 数据仓库</h3>
          <div className="space-y-3">
            {warehouseData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                  <span className="font-medium text-gray-900">{item.platform}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-900 font-medium">{item.count}条</span>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                    +{item.growth}%
                  </span>
                </div>
              </div>
            ))}
            
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                💾 数据存储位置: <code className="text-xs">/Users/dpxx/.openclaw/workspace/data_warehouse/</code>
              </p>
            </div>
          </div>
        </div>

        {/* 每日任务完成情况 */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">✅ 今日任务完成</h3>
          <div className="space-y-2">
            {dailyTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${task.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-900">{task.task}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">{task.time}</span>
                  {task.status === 'completed' && (
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">完成</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-800">今日完成率</span>
              <span className="text-lg font-bold text-green-700">100%</span>
            </div>
            <div className="w-full h-2 bg-green-100 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900">🔍 数据能力</h3>
            <p className="text-sm text-gray-600 mt-1">
              支持多平台数据采集、向量数据库存储、实时数据分析
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded">LanceDB</span>
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">Pandas</span>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">SQLite</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataMetrics