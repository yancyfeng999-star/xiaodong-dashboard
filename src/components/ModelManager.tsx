import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
    {
      name: 'GPT-4o',
      provider: 'OpenAI',
      type: '云端',
      status: 'standby',
      category: '大模型',
      context: '128K',
      cost: '高成本',
      priority: 5,
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
      priority: 6,
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
      priority: 7,
      features: ['极便宜', '中文好', '性价比高', '待注册']
    },
    {
      name: 'Llama 3.1',
      provider: 'Local',
      type: '本地',
      status: 'standby',
      category: '大模型',
      priority: 8,
      features: ['开源', '隐私', '本地运行', '免费']
    },
    {
      name: 'Mistral',
      provider: 'Local',
      type: '本地',
      status: 'standby',
      category: '大模型',
      priority: 9,
      features: ['欧洲', '高效', '本地运行', '开源']
    },
    {
      name: 'CodeLlama',
      provider: 'Local',
      type: '本地',
      status: 'standby',
      category: '代码',
      priority: 10,
      features: ['代码专用', '本地', 'Meta开发', '免费']
    },
  ]

  const filteredModels = filter === '全部' 
    ? models 
    : models.filter(m => m.category === filter || m.type === filter)

  const activeCount = models.filter(m => m.status === 'active').length
  const localCount = models.filter(m => m.type === '本地').length
  const cloudCount = models.filter(m => m.type === '云端').length

  const filters: Array<'全部' | '大模型' | '代码' | '本地' | '云端'> = ['全部', '大模型', '代码', '本地', '云端']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]'
      case 'standby': return 'bg-amber-400'
      default: return 'bg-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '使用中'
      case 'standby': return '待命'
      default: return '离线'
    }
  }

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
          <span className="mr-2">🤖</span>
          模型管理
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-sm text-white/60 font-medium">{activeCount}个活跃</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <motion.div 
          whileHover={{ scale: 1.03 }}
          className="metric-card text-center"
        >
          <div className="metric-value text-emerald-400">{activeCount}</div>
          <div className="metric-label">使用中</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.03 }}
          className="metric-card text-center"
        >
          <div className="metric-value text-purple-400">{localCount}</div>
          <div className="metric-label">本地</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.03 }}
          className="metric-card text-center"
        >
          <div className="metric-value text-blue-400">{cloudCount}</div>
          <div className="metric-label">云端</div>
        </motion.div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filters.map((f) => (
          <motion.button
            key={f}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === f
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            {f}
          </motion.button>
        ))}
      </div>

      {/* Model List */}
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        <AnimatePresence mode="popLayout">
          {filteredModels.map((model, index) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.1)' }}
              className="p-3 rounded-xl bg-white/5 border border-white/10 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(model.status)}`} />
                  <div>
                    <div className="text-sm font-semibold text-white">{model.name}</div>
                    <div className="text-xs text-white/40">{model.provider}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    model.status === 'active' 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {getStatusText(model.status)}
                  </span>
                </div>
              </div>
              
              <div className="mt-2 flex flex-wrap gap-1">
                {model.features.slice(0, 3).map((feature, i) => (
                  <span key={i} className="text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Routing */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-label mb-2">智能路由策略</div>
        <div className="text-xs text-white/60 leading-relaxed font-medium">
          本地 → KIMI2.5 → DeepSeek → GPT-4.1 Mini → Claude 3.5 → GPT-4o → 其他
        </div>
      </div>
    </motion.div>
  )
}

export default ModelManager