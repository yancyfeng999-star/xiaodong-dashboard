import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface Model {
  name: string
  provider: string
  type: '本地' | '云端'
  status: 'active' | 'standby' | 'offline'
  category: '大模型' | '嵌入式' | '图像' | '代码'
  features: string[]
  context?: string
  cost?: string
  priority: number
}

const ModelManager: React.FC = () => {
  const [filter, setFilter] = useState<'全部' | '大模型' | '嵌入式' | '图像' | '代码' | '本地' | '云端'>('全部')

  const models: Model[] = [
    // 云端大模型
    {
      name: 'KIMI2.5',
      provider: 'Moonshot',
      type: '云端',
      status: 'active',
      category: '大模型',
      context: '200K',
      cost: '¥200已充值',
      priority: 1,
      features: ['长上下文', '中文优化', '200K tokens', '实时连接']
    },
    {
      name: 'DeepSeek Chat',
      provider: 'DeepSeek',
      type: '云端',
      status: 'active',
      category: '代码',
      context: '128K',
      cost: '按量付费',
      priority: 2,
      features: ['代码生成', '低成本', '快速响应', '中文支持']
    },
    {
      name: 'GPT-4o',
      provider: 'OpenAI',
      type: '云端',
      status: 'standby',
      category: '大模型',
      context: '128K',
      cost: '高成本',
      priority: 3,
      features: ['多模态', '英文优化', '推理强', '通用']
    },
    {
      name: 'Claude 3.5',
      provider: 'Anthropic',
      type: '云端',
      status: 'standby',
      category: '大模型',
      context: '200K',
      cost: '高成本',
      priority: 4,
      features: ['长上下文', '推理强', '安全性高', '英文']
    },
    {
      name: 'GLM-4-Flash',
      provider: '智谱AI',
      type: '云端',
      status: 'standby',
      category: '大模型',
      context: '128K',
      cost: '0.1元/百万tokens',
      priority: 5,
      features: ['极便宜', '中文好', '性价比高', '待注册']
    },
    {
      name: 'GPT-4.1 Mini',
      provider: 'laozhang',
      type: '云端',
      status: 'active',
      category: '大模型',
      context: '128K',
      cost: '按量付费',
      priority: 3,
      features: ['性价比高', '响应快', '中文支持', '已接入']
    },
    {
      name: 'Claude 3.5 Haiku',
      provider: 'laozhang',
      type: '云端',
      status: 'standby',
      category: '大模型',
      context: '200K',
      cost: '低成本',
      priority: 4,
      features: ['快速响应', '轻量级', '高效', '已接入']
    },
    // 本地模型
    {
      name: 'Llama 3.1',
      provider: 'Meta (本地)',
      type: '本地',
      status: 'standby',
      category: '大模型',
      context: '128K',
      cost: '免费',
      priority: 6,
      features: ['开源', '可私有化', '本地部署', '隐私安全']
    },
    {
      name: 'Mistral Large',
      provider: 'Mistral (本地)',
      type: '本地',
      status: 'offline',
      category: '大模型',
      context: '32K',
      cost: '免费',
      priority: 7,
      features: ['欧洲模型', '多语言', '开源', '未部署']
    },
    {
      name: 'CodeLlama',
      provider: 'Meta (本地)',
      type: '本地',
      status: 'standby',
      category: '代码',
      context: '16K',
      cost: '免费',
      priority: 8,
      features: ['代码专用', '开源', '本地运行', '离线可用']
    },
    {
      name: 'BERT-Embedding',
      provider: 'Google (本地)',
      type: '本地',
      status: 'active',
      category: '嵌入式',
      context: '512',
      cost: '免费',
      priority: 9,
      features: ['向量嵌入', '语义搜索', '本地计算', '已部署']
    },
    {
      name: 'Stable Diffusion',
      provider: 'Stability (本地)',
      type: '本地',
      status: 'standby',
      category: '图像',
      context: 'N/A',
      cost: '免费',
      priority: 10,
      features: ['图像生成', '开源', '本地运行', '未启用']
    },
  ]

  const filteredModels = filter === '全部' 
    ? models 
    : filter === '本地' 
      ? models.filter(m => m.type === '本地')
      : filter === '云端'
        ? models.filter(m => m.type === '云端')
        : models.filter(m => m.category === filter)

  const categories = ['全部', '大模型', '代码', '云端', '本地', '嵌入式', '图像'] as const

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]'
      case 'standby': return 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]'
      default: return 'bg-gray-400 shadow-[0_0_8px_rgba(156,163,175,0.6)]'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '使用中'
      case 'standby': return '待命'
      default: return '离线'
    }
  }

  const getTypeColor = (type: string) => {
    return type === '本地' 
      ? 'bg-purple-500/20 text-purple-200 border-purple-500/30' 
      : 'bg-blue-500/20 text-blue-200 border-blue-500/30'
  }

  const getCategoryColor = (category: string) => {
    const colors: {[key: string]: string} = {
      '大模型': 'bg-indigo-500/20 text-indigo-200',
      '代码': 'bg-cyan-500/20 text-cyan-200',
      '嵌入式': 'bg-pink-500/20 text-pink-200',
      '图像': 'bg-amber-500/20 text-amber-200',
    }
    return colors[category] || 'bg-gray-500/20 text-gray-200'
  }

  const activeCount = models.filter(m => m.status === 'active').length
  const localCount = models.filter(m => m.type === '本地').length
  const cloudCount = models.filter(m => m.type === '云端').length

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-white">🤖 模型管理</h2>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-white/60">{activeCount}/{models.length} 活跃</span>
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
                ? 'bg-indigo-500 text-white' 
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="metric-card text-center">
          <div className="text-base font-bold text-emerald-400">{activeCount}</div>
          <div className="text-[10px] text-white/50">使用中</div>
        </div>
        <div className="metric-card text-center">
          <div className="text-base font-bold text-purple-400">{localCount}</div>
          <div className="text-[10px] text-white/50">本地</div>
        </div>
        <div className="metric-card text-center">
          <div className="text-base font-bold text-blue-400">{cloudCount}</div>
          <div className="text-[10px] text-white/50">云端</div>
        </div>
      </div>

      {/* Model List */}
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {filteredModels.map((model, index) => (
          <motion.div
            key={model.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            className={`metric-card ${model.status === 'active' ? 'border-emerald-500/30' : ''} hover:bg-white/10 transition-colors`}
          >
            {/* Model Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className={`w-2.5 h-2.5 rounded-full ${getStatusColor(model.status)}`}></span>
                <span className="text-sm font-bold text-white">{model.name}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded border ${getTypeColor(model.type)}`}>
                  {model.type}
                </span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className={`text-[9px] px-1.5 py-0.5 rounded ${getCategoryColor(model.category)}`}>
                  {model.category}
                </span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                  model.status === 'active' ? 'bg-emerald-500/20 text-emerald-200' :
                  model.status === 'standby' ? 'bg-blue-500/20 text-blue-200' :
                  'bg-gray-500/20 text-gray-300'
                }`}>
                  {getStatusText(model.status)}
                </span>
              </div>
            </div>

            {/* Model Details */}
            <div className="grid grid-cols-3 gap-2 text-[10px] mb-2">
              <div className="text-white/50">
                提供商: <span className="text-white">{model.provider}</span>
              </div>
              {model.context && (
                <div className="text-white/50">
                  上下文: <span className="text-white">{model.context}</span>
                </div>
              )}
              {model.cost && (
                <div className="text-white/50">
                  成本: <span className="text-white">{model.cost}</span>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-1">
              {model.features.map((feature, i) => (
                <span key={i} className="text-[9px] px-1.5 py-0.5 bg-white/10 rounded text-white/70">
                  {feature}
                </span>
              ))}
            </div>

            {/* Priority Badge */}
            {model.priority <= 3 && (
              <div className="mt-2 text-[9px] text-emerald-400">
                ⭐ 优先级 {model.priority} - 智能路由首选
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Routing Info */}
      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="text-[10px] text-white/50 mb-1">🔄 智能路由策略</div>
        <div className="text-[10px] text-white/70">
          本地 → KIMI2.5 → DeepSeek → GPT-4.1 Mini → Claude 3.5 → GPT-4o → 其他
        </div>
      </div>
    </motion.div>
  )
}

export default ModelManager