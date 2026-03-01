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
      icon: 'A', 
      color: 'from-orange-500 to-amber-500',
      crawled: 12547,
      valid: 11892,
      feishu: 9876,
      growth: '+12%',
      countries: ['US', 'UK', 'DE', 'JP']
    },
    { 
      name: 'TikTok Shop', 
      icon: 'TikTok', 
      color: 'from-pink-500 to-rose-500',
      crawled: 8542,
      valid: 8123,
      feishu: 6543,
      growth: '+18%',
      countries: ['US', 'UK', 'SG', 'ID']
    },
    { 
      name: 'Shopee', 
      icon: 'S', 
      color: 'from-red-500 to-orange-500',
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
        <div className="relative bg-slate-900/80 rounded-lg h-52 overflow-hidden border border-white/20">
          {/* World Map Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-900/50 to-slate-900/80"></div>
          
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={`h-${i}`} className="absolute w-full h-px bg-white/20" style={{ top: `${(i + 1) * 12}%` }}></div>
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={`v-${i}`} className="absolute h-full w-px bg-white/20" style={{ left: `${(i + 1) * 12}%` }}></div>
            ))}
          </div>
          
          {/* Country Markers with Labels */}
          {countries.map((country, index) => (
            <motion.div
              key={country.code}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="absolute group cursor-pointer"
              style={{ left: `${country.x}%`, top: `${country.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div className="relative flex flex-col items-center">
                {/* Pulse effect */}
                <div className="absolute w-4 h-4 bg-emerald-400/30 rounded-full animate-ping"></div>
                {/* Marker */}
                <div className="relative w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_12px_rgba(52,211,153,0.8)] border-2 border-white"></div>
                {/* Country code label */}
                <div className="mt-1 text-[9px] font-bold text-white bg-black/50 px-1 rounded">{country.code}</div>
                {/* Tooltip on hover */}
                <div className="absolute bottom-full mb-2 hidden group-hover:block z-10">
                  <div className="bg-slate-800 text-white text-[10px] px-2 py-1 rounded shadow-lg border border-emerald-500/30 whitespace-nowrap">
                    <div className="font-bold">{country.name}</div>
                    <div className="text-emerald-400">{country.count.toLocaleString()}条数据</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Map Title */}
          <div className="absolute top-3 left-3">
            <div className="text-[10px] text-white/40">全球数据覆盖</div>
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-3 right-3 bg-black/40 rounded-lg p-2 border border-white/10">
            <div className="text-[9px] text-white/60 mb-1">数据分布</div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span className="text-[9px] text-white/70">活跃市场</span>
            </div>
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
              <div className={`w-10 h-10 mx-auto rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center text-white font-bold text-sm mb-1`}>
                {platform.icon === 'TikTok' ? 'TT' : platform.icon}
              </div>
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