import React from 'react'
import { motion } from 'framer-motion'

const DataMetrics: React.FC = () => {
  // 详细数据统计
  const dataStats = {
    totalCrawled: 30247,
    validData: 28456,
    invalidData: 1791,
    feishuSynced: 21580,
    feishuPending: 6876,
  }

  // 平台详细数据
  const platformData = [
    { 
      name: '亚马逊', 
      icon: '🛒', 
      crawled: 12547,
      valid: 11892,
      feishu: 9876,
      growth: '+12%',
      countries: ['US', 'UK', 'DE', 'JP']
    },
    { 
      name: 'TikTok Shop', 
      icon: '🎵', 
      crawled: 8542,
      valid: 8123,
      feishu: 6543,
      growth: '+18%',
      countries: ['US', 'UK', 'SG', 'ID']
    },
    { 
      name: 'Shopee', 
      icon: '🛍️', 
      crawled: 9158,
      valid: 8441,
      feishu: 5161,
      growth: '+8%',
      countries: ['SG', 'MY', 'TH', 'VN', 'ID', 'PH']
    },
  ]

  // 覆盖的国家
  const countries = [
    { code: 'US', name: '美国', count: 21080, x: 20, y: 35 },
    { code: 'UK', name: '英国', count: 8920, x: 45, y: 25 },
    { code: 'DE', name: '德国', count: 6540, x: 48, y: 28 },
    { code: 'JP', name: '日本', count: 4320, x: 82, y: 32 },
    { code: 'SG', name: '新加坡', count: 12150, x: 75, y: 55 },
    { code: 'MY', name: '马来西亚', count: 8760, x: 74, y: 58 },
    { code: 'TH', name: '泰国', count: 7230, x: 73, y: 52 },
    { code: 'VN', name: '越南', count: 5890, x: 76, y: 50 },
    { code: 'ID', name: '印尼', count: 9870, x: 78, y: 62 },
    { code: 'PH', name: '菲律宾', count: 4320, x: 80, y: 48 },
  ]

  const tasks = [
    { name: '数据爬取', progress: 100, count: '30,247条' },
    { name: '数据清洗', progress: 94, count: '28,456条有效' },
    { name: '同步飞书', progress: 71, count: '21,580条' },
    { name: '多维表格', progress: 65, count: '19,680条' },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-white">📊 数据中心</h2>
        <span className="text-xs text-white/60">总数据: {dataStats.totalCrawled.toLocaleString()}条</span>
      </div>

      {/* Data Overview Cards */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="metric-card text-center">
          <div className="text-lg font-bold text-blue-400">{dataStats.totalCrawled.toLocaleString()}</div>
          <div className="text-[10px] text-white/50">爬取总数</div>
        </div>
        <div className="metric-card text-center">
          <div className="text-lg font-bold text-emerald-400">{dataStats.validData.toLocaleString()}</div>
          <div className="text-[10px] text-white/50">有效数据</div>
        </div>
        <div className="metric-card text-center">
          <div className="text-lg font-bold text-purple-400">{dataStats.feishuSynced.toLocaleString()}</div>
          <div className="text-[10px] text-white/50">飞书同步</div>
        </div>
        <div className="metric-card text-center">
          <div className="text-lg font-bold text-amber-400">{dataStats.feishuPending.toLocaleString()}</div>
          <div className="text-[10px] text-white/50">待同步</div>
        </div>
      </div>

      {/* World Map - Simplified */}
      <div className="mb-4">
        <div className="text-label mb-2">覆盖区域 (10个国家/地区)</div>
        <div className="relative bg-slate-800/50 rounded-lg p-4 h-48 overflow-hidden border border-white/10">
          {/* Simplified World Map Dots */}
          <div className="absolute inset-0 opacity-20">
            {/* Grid lines */}
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="absolute w-full h-px bg-white/10" style={{ top: `${i * 10}%` }}></div>
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="absolute h-full w-px bg-white/10" style={{ left: `${i * 10}%` }}></div>
            ))}
          </div>
          
          {/* Country Markers */}
          {countries.map((country, index) => (
            <motion.div
              key={country.code}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="absolute group cursor-pointer"
              style={{ left: `${country.x}%`, top: `${country.y}%` }}
            >
              <div className="relative">
                <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse"></div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block whitespace-nowrap">
                  <div className="bg-slate-700 text-white text-[10px] px-2 py-1 rounded shadow-lg border border-white/20">
                    {country.name}: {country.count.toLocaleString()}条
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Legend */}
          <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
            {countries.slice(0, 6).map(c => (
              <span key={c.code} className="text-[9px] px-1.5 py-0.5 bg-white/10 rounded text-white/70">
                {c.code}
              </span>
            ))}
            <span className="text-[9px] px-1.5 py-0.5 bg-white/10 rounded text-white/70">+4</span>
          </div>
        </div>
      </div>

      {/* Platform Details */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {platformData.map((platform, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="metric-card"
          >
            <div className="text-center mb-2">
              <div className="text-xl">{platform.icon}</div>
              <div className="text-xs font-medium text-white">{platform.name}</div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-white/50">爬取:</span>
                <span className="text-white">{platform.crawled.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-white/50">有效:</span>
                <span className="text-emerald-400">{platform.valid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-white/50">飞书:</span>
                <span className="text-purple-400">{platform.feishu.toLocaleString()}</span>
              </div>
              <div className="progress-bar mt-1">
                <div className="progress-fill" style={{ width: `${(platform.feishu / platform.valid) * 100}%` }}></div>
              </div>
              <div className="flex justify-between text-[10px] text-white/40">
                <span>同步率: {Math.round((platform.feishu / platform.valid) * 100)}%</span>
                <span className="text-emerald-400">{platform.growth}</span>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {platform.countries.map(c => (
                <span key={c} className="text-[8px] px-1 bg-white/10 rounded text-white/60">{c}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Task Progress */}
      <div>
        <div className="text-label mb-2">数据处理流程</div>
        <div className="grid grid-cols-2 gap-2">
          {tasks.map((task, i) => (
            <div key={i} className="metric-card">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-white/80">{task.name}</span>
                <span className="text-[10px] text-white/50">{task.count}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${task.progress}%` }}></div>
              </div>
              <div className="text-[10px] text-white/40 mt-1">{task.progress}% 完成</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default DataMetrics