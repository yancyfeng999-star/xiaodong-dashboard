import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const DataMetrics: React.FC = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // 动态生成数据统计（模拟实时增长）
  const generateDataStats = () => {
    const baseCrawled = 30247
    const baseValid = 28456
    const baseSynced = 21580
    
    // 根据当前时间计算增长量（每小时增加一些）
    const hour = new Date().getHours()
    const growth = hour * 50 // 每小时增加50条
    
    const totalCrawled = baseCrawled + growth + Math.floor(Math.random() * 20)
    const validData = Math.floor(totalCrawled * 0.94) // 94%有效率
    const invalidData = totalCrawled - validData
    const feishuSynced = baseSynced + Math.floor(growth * 0.7)
    const feishuPending = validData - feishuSynced
    
    return {
      totalCrawled,
      validData,
      invalidData,
      feishuSynced,
      feishuPending
    }
  }

  const [dataStats, setDataStats] = useState(generateDataStats())

  // 动态生成平台数据
  const generatePlatformData = () => {
    const baseData = [
      { name: '亚马逊', icon: 'A', color: 'from-orange-500 to-amber-500', baseCrawled: 12547, countries: ['US', 'UK', 'DE', 'JP'] },
      { name: 'TikTok Shop', icon: 'TikTok', color: 'from-pink-500 to-rose-500', baseCrawled: 8542, countries: ['US', 'UK', 'SG', 'ID'] },
      { name: 'Shopee', icon: 'S', color: 'from-red-500 to-orange-500', baseCrawled: 9158, countries: ['SG', 'MY', 'TH', 'VN', 'ID', 'PH'] },
    ]
    
    return baseData.map(p => {
      const growth = Math.floor(Math.random() * 30)
      const crawled = p.baseCrawled + growth
      const valid = Math.floor(crawled * (0.92 + Math.random() * 0.06))
      const feishu = Math.floor(valid * (0.75 + Math.random() * 0.15))
      
      return {
        ...p,
        crawled,
        valid,
        feishu,
        growth: `+${(Math.random() * 15 + 5).toFixed(0)}%`
      }
    })
  }

  const [platformData, setPlatformData] = useState(generatePlatformData())

  // 动态生成国家数据
  const generateCountryData = () => {
    const baseCountries = [
      { code: 'US', name: '美国', baseCount: 21080, x: 20, y: 35 },
      { code: 'UK', name: '英国', baseCount: 8540, x: 45, y: 28 },
      { code: 'DE', name: '德国', baseCount: 6230, x: 48, y: 32 },
      { code: 'JP', name: '日本', baseCount: 7890, x: 85, y: 38 },
      { code: 'SG', name: '新加坡', baseCount: 4560, x: 78, y: 58 },
      { code: 'MY', name: '马来西亚', baseCount: 3890, x: 76, y: 62 },
      { code: 'TH', name: '泰国', baseCount: 3240, x: 74, y: 55 },
      { code: 'VN', name: '越南', baseCount: 2980, x: 76, y: 52 },
      { code: 'ID', name: '印尼', baseCount: 5670, x: 80, y: 68 },
      { code: 'PH', name: '菲律宾', baseCount: 2130, x: 82, y: 58 },
    ]
    
    return baseCountries.map(c => ({
      ...c,
      count: c.baseCount + Math.floor(Math.random() * 50)
    }))
  }

  const [countryData, setCountryData] = useState(generateCountryData())

  // 每30秒更新一次数据
  useEffect(() => {
    const interval = setInterval(() => {
      setDataStats(generateDataStats())
      setPlatformData(generatePlatformData())
      setCountryData(generateCountryData())
      setLastUpdate(new Date())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // 处理流程进度（动态）
  const processSteps = [
    { name: '数据采集', status: 'running', progress: 100 },
    { name: '数据清洗', status: 'running', progress: 100 },
    { name: '数据验证', status: 'running', progress: 95 + Math.random() * 5 },
    { name: '数据存储', status: 'running', progress: 90 + Math.random() * 10 },
    { name: '飞书同步', status: 'running', progress: 75 + Math.random() * 15 },
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
        <h2 className="section-title">
          <span className="mr-2 text-xl">📊</span>
          <span className="section-title-text">数据中心</span>
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/60">实时监控</span>
          <span className="text-[10px] text-white/40">
            更新: {lastUpdate.toLocaleTimeString('zh-CN', {hour:'2-digit', minute:'2-digit', second:'2-digit'})}
          </span>
        </div>
      </div>

      {/* Data Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <motion.div whileHover={{ scale: 1.02 }} className="metric-card text-center">
          <div className="metric-value text-lg text-blue-400">{dataStats.totalCrawled.toLocaleString()}</div>
          <div className="metric-label">总采集</div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="metric-card text-center">
          <div className="metric-value text-lg text-emerald-400">{dataStats.validData.toLocaleString()}</div>
          <div className="metric-label">有效数据</div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="metric-card text-center">
          <div className="metric-value text-lg text-red-400">{dataStats.invalidData.toLocaleString()}</div>
          <div className="metric-label">无效数据</div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="metric-card text-center">
          <div className="metric-value text-lg text-cyan-400">{dataStats.feishuSynced.toLocaleString()}</div>
          <div className="metric-label">已同步</div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="metric-card text-center col-span-2 md:col-span-1">
          <div className="metric-value text-lg text-amber-400">{dataStats.feishuPending.toLocaleString()}</div>
          <div className="metric-label">待同步</div>
        </motion.div>
      </div>

      {/* Platform Stats */}
      <div className="mb-6">
        <div className="text-label mb-3">平台数据</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {platformData.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="metric-card"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center text-white text-xs font-bold`}>
                    {platform.icon.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-white">{platform.name}</span>
                </div>
                <span className="text-xs text-emerald-400 font-medium">{platform.growth}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-sm font-bold text-white">{platform.crawled.toLocaleString()}</div>
                  <div className="text-[10px] text-white/40">采集</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-emerald-400">{platform.valid.toLocaleString()}</div>
                  <div className="text-[10px] text-white/40">有效</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-cyan-400">{platform.feishu.toLocaleString()}</div>
                  <div className="text-[10px] text-white/40">同步</div>
                </div>
              </div>
              
              <div className="mt-2 flex gap-1">
                {platform.countries.map(c => (
                  <span key={c} className="text-[9px] px-1.5 py-0.5 bg-white/10 rounded text-white/60">{c}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* World Map Simulation */}
      <div className="mb-6">
        <div className="text-label mb-3">数据覆盖 - 10个国家</div>
        <div className="metric-card h-48 relative overflow-hidden">
          {/* Simple world map dots */}
          {countryData.map((country, index) => (
            <motion.div
              key={country.code}
              className="absolute"
              style={{ left: `${country.x}%`, top: `${country.y}%` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="group relative">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-white/10 backdrop-blur-md px-2 py-1 rounded text-[10px] text-white whitespace-nowrap border border-white/20">
                  {country.name}: {country.count.toLocaleString()}
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Country list */}
          <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1">
            {countryData.slice(0, 5).map(c => (
              <span key={c.code} className="text-[9px] px-2 py-1 bg-white/5 rounded text-white/60">
                {c.code}: {c.count.toLocaleString()}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Processing Pipeline */}
      <div>
        <div className="text-label mb-3">数据处理流程</div>
        <div className="space-y-2">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="metric-card"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/70">{step.name}</span>
                  {step.status === 'running' && (
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                  )}
                </div>
                <span className="text-xs text-white/60">{Math.round(step.progress)}%</span>
              </div>
              <div className="progress-bar h-1.5">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${step.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
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

export default DataMetrics