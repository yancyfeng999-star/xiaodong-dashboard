import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface API {
  name: string
  provider: string
  status: 'active' | 'limited' | 'inactive'
  category: '大模型' | '搜索' | '数据' | '部署' | '工具'
  balance?: string
  rateLimit: string
  lastUsed: string
  features: string[]
}

const APIManager: React.FC = () => {
  const [filter, setFilter] = useState<'全部' | '大模型' | '搜索' | '数据' | '部署' | '工具'>('全部')

  const apis: API[] = [
    {
      name: 'KIMI2.5',
      provider: 'Moonshot',
      status: 'active',
      category: '大模型',
      balance: '¥200',
      rateLimit: '无限制',
      lastUsed: '刚刚',
      features: ['长上下文', '中文优化', '200K tokens']
    },
    {
      name: 'DeepSeek Chat',
      provider: 'DeepSeek',
      status: 'active',
      category: '大模型',
      rateLimit: '高并发',
      lastUsed: '2分钟前',
      features: ['代码生成', '低成本', '快速响应']
    },
    {
      name: '智谱AI',
      provider: 'Zhipu',
      status: 'limited',
      category: '大模型',
      balance: '免费额度',
      rateLimit: '1000次/天',
      lastUsed: '未使用',
      features: ['GLM-4', '中文理解', '性价比']
    },
    {
      name: 'Brave Search',
      provider: 'Brave',
      status: 'active',
      category: '搜索',
      rateLimit: '2000次/月',
      lastUsed: '5分钟前',
      features: ['隐私保护', '实时搜索', '无广告']
    },
    {
      name: 'Web Fetch',
      provider: '本地',
      status: 'active',
      category: '数据',
      rateLimit: '无限制',
      lastUsed: '10分钟前',
      features: ['网页抓取', '内容提取', 'Markdown']
    },
    {
      name: 'GitHub API',
      provider: 'GitHub',
      status: 'active',
      category: '部署',
      rateLimit: '5000次/小时',
      lastUsed: '刚刚',
      features: ['代码托管', '自动部署', 'Pages']
    },
    {
      name: 'Feishu API',
      provider: 'Lark',
      status: 'active',
      category: '工具',
      rateLimit: '100次/秒',
      lastUsed: '15分钟前',
      features: ['多维表格', '消息推送', '协作']
    },
    {
      name: 'Browser Control',
      provider: '本地',
      status: 'active',
      category: '工具',
      rateLimit: '无限制',
      lastUsed: '30分钟前',
      features: ['自动化', '截图', 'PDF生成']
    },
  ]

  const filteredAPIs = filter === '全部' ? apis : apis.filter(api => api.category === filter)

  const categories = ['全部', '大模型', '搜索', '数据', '部署', '工具'] as const

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]'
      case 'limited': return 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]'
      default: return 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.6)]'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '正常'
      case 'limited': return '受限'
      default: return '停用'
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: {[key: string]: string} = {
      '大模型': 'bg-purple-500/20 text-purple-200 border-purple-500/30',
      '搜索': 'bg-blue-500/20 text-blue-200 border-blue-500/30',
      '数据': 'bg-cyan-500/20 text-cyan-200 border-cyan-500/30',
      '部署': 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30',
      '工具': 'bg-amber-500/20 text-amber-200 border-amber-500/30',
    }
    return colors[category] || 'bg-gray-500/20 text-gray-200'
  }

  const activeCount = apis.filter(a => a.status === 'active').length
  const limitedCount = apis.filter(a => a.status === 'limited').length
  const inactiveCount = apis.filter(a => a.status === 'inactive').length

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-white">🔌 API管理</h2>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-white/60">{activeCount}/{apis.length} 可用</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1 mb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-2 py-1 text-[10px] rounded-full transition-all ${
              filter === cat 
                ? 'bg-blue-500 text-white' 
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="metric-card text-center">
          <div className="text-base font-bold text-emerald-400">{activeCount}</div>
          <div className="text-[10px] text-white/50">正常</div>
        </div>
        <div className="metric-card text-center">
          <div className="text-base font-bold text-amber-400">{limitedCount}</div>
          <div className="text-[10px] text-white/50">受限</div>
        </div>
        <div className="metric-card text-center">
          <div className="text-base font-bold text-red-400">{inactiveCount}</div>
          <div className="text-[10px] text-white/50">停用</div>
        </div>
      </div>

      {/* API List */}
      <div className="space-y-2 max-h-[280px] overflow-y-auto">
        {filteredAPIs.map((api, index) => (
          <motion.div
            key={api.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="metric-card hover:bg-white/10 transition-colors"
          >
            {/* API Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className={`w-2.5 h-2.5 rounded-full ${getStatusColor(api.status)}`}></span>
                <span className="text-sm font-bold text-white">{api.name}</span>
                <span className="text-[10px] text-white/50">({api.provider})</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getCategoryColor(api.category)}`}>
                  {api.category}
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  api.status === 'active' ? 'bg-emerald-500/20 text-emerald-200' :
                  api.status === 'limited' ? 'bg-amber-500/20 text-amber-200' :
                  'bg-red-500/20 text-red-200'
                }`}>
                  {getStatusText(api.status)}
                </span>
              </div>
            </div>

            {/* API Details */}
            <div className="grid grid-cols-2 gap-2 text-[10px] mb-2">
              {api.balance && (
                <div className="text-white/60">
                  余额: <span className="text-white">{api.balance}</span>
                </div>
              )}
              <div className="text-white/60">
                限制: <span className="text-white">{api.rateLimit}</span>
              </div>
              <div className="text-white/60">
                最近: <span className="text-white">{api.lastUsed}</span>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-1">
              {api.features.map((feature, i) => (
                <span key={i} className="text-[9px] px-1.5 py-0.5 bg-white/10 rounded text-white/70">
                  {feature}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Usage Note */}
      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="text-[10px] text-white/40">
          💡 智能路由: 本地 → KIMI → DeepSeek → 其他API
        </div>
      </div>
    </motion.div>
  )
}

export default APIManager