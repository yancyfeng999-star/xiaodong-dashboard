import React, { useState } from 'react'
import { motion } from 'framer-motion'

const KnowledgeContent: React.FC = () => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>('cross-border')

  const knowledgeTopics = [
    {
      id: 'cross-border',
      category: '电商',
      title: '跨境电商运营',
      icon: '🛒',
      items: [
        '亚马逊FBA运营策略',
        'TikTok Shop短视频营销',
        'Shopee东南亚市场',
        '产品选品方法论',
        '竞品分析技巧',
        '广告投放优化',
      ],
      lastUpdated: '2026-03-01',
      progress: 85,
    },
    {
      id: 'data-analysis',
      category: '数据',
      title: '数据分析',
      icon: '📊',
      items: [
        'Python数据分析',
        'Pandas数据处理',
        '数据可视化技巧',
        '趋势预测模型',
        '销售数据分析',
        '用户行为分析',
      ],
      lastUpdated: '2026-03-01',
      progress: 90,
    },
    {
      id: 'automation',
      category: '自动化',
      title: '自动化工作流',
      icon: '⚙️',
      items: [
        '定时任务调度',
        '爬虫自动化',
        '数据同步机制',
        'API集成方法',
        '错误处理策略',
        '并行任务优化',
      ],
      lastUpdated: '2026-02-28',
      progress: 80,
    },
    {
      id: 'frontend',
      category: '前端',
      title: '前端开发',
      icon: '💻',
      items: [
        'React组件设计',
        'Tailwind CSS样式',
        '响应式布局',
        'Framer Motion动画',
        'TypeScript类型',
        'Vite构建工具',
      ],
      lastUpdated: '2026-03-01',
      progress: 75,
    },
    {
      id: 'ai-models',
      category: 'AI',
      title: 'AI模型应用',
      icon: '🤖',
      items: [
        'KIMI2.5长上下文',
        'DeepSeek代码生成',
        '智谱AI成本分析',
        '模型路由策略',
        'Prompt工程技巧',
        '多模型协作',
      ],
      lastUpdated: '2026-03-01',
      progress: 70,
    },
  ]

  const categories = ['全部', '电商', '数据', '自动化', '前端', 'AI']
  const [filter, setFilter] = useState('全部')

  const filteredTopics = filter === '全部' 
    ? knowledgeTopics 
    : knowledgeTopics.filter(t => t.category === filter)

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-white">📚 知识库</h2>
        <span className="text-xs text-white/60">{filteredTopics.length}个主题</span>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-1 mb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-2 py-1 text-[10px] rounded-full transition-all ${
              filter === cat 
                ? 'bg-white/30 text-white' 
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Knowledge Topics */}
      <div className="space-y-2 max-h-[280px] overflow-y-auto">
        {filteredTopics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="rounded-lg border border-white/10 overflow-hidden"
          >
            {/* Topic Header */}
            <div 
              className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
              onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{topic.icon}</span>
                <div>
                  <div className="text-sm font-medium text-white">{topic.title}</div>
                  <div className="text-[10px] text-white/50">{topic.items.length}个知识点 • 更新于{topic.lastUpdated}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-16">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${topic.progress}%` }}></div>
                  </div>
                </div>
                <span className="text-xs text-white/60">{topic.progress}%</span>
                <span className="text-white/50">{expandedTopic === topic.id ? '▼' : '▶'}</span>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedTopic === topic.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-white/5"
              >
                <div className="p-3 grid grid-cols-2 gap-2">
                  {topic.items.map((item, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-white/70">
                      <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
        <div className="metric-card">
          <div className="text-lg font-bold text-white">{knowledgeTopics.length}</div>
          <div className="text-[10px] text-white/50">知识主题</div>
        </div>
        <div className="metric-card">
          <div className="text-lg font-bold text-blue-400">
            {knowledgeTopics.reduce((sum, t) => sum + t.items.length, 0)}
          </div>
          <div className="text-[10px] text-white/50">知识点</div>
        </div>
        <div className="metric-card">
          <div className="text-lg font-bold text-emerald-400">
            {Math.round(knowledgeTopics.reduce((sum, t) => sum + t.progress, 0) / knowledgeTopics.length)}%
          </div>
          <div className="text-[10px] text-white/50">平均掌握</div>
        </div>
      </div>
    </motion.div>
  )
}

export default KnowledgeContent