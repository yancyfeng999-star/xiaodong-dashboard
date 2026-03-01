import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KnowledgeContent: React.FC = () => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>('cross-border')
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // 动态生成知识主题数据
  const generateTopics = () => {
    const now = new Date()
    const timeStr = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    
    return [
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
        lastUpdated: `今天 ${timeStr}`,
        progress: Math.min(85 + Math.random() * 5, 100),
        learning: Math.floor(45 + Math.random() * 10),
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
        lastUpdated: `今天 ${timeStr}`,
        progress: Math.min(90 + Math.random() * 5, 100),
        learning: Math.floor(50 + Math.random() * 10),
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
          '监控告警系统',
        ],
        lastUpdated: `今天 ${timeStr}`,
        progress: Math.min(75 + Math.random() * 10, 95),
        learning: Math.floor(40 + Math.random() * 15),
      },
      {
        id: 'frontend',
        category: '前端',
        title: '前端开发',
        icon: '💻',
        items: [
          'React组件开发',
          'TypeScript类型系统',
          'Tailwind CSS样式',
          'Framer Motion动画',
          '响应式设计',
          'GitHub Pages部署',
        ],
        lastUpdated: `今天 ${timeStr}`,
        progress: Math.min(88 + Math.random() * 7, 100),
        learning: Math.floor(35 + Math.random() * 20),
      },
      {
        id: 'ai-models',
        category: 'AI',
        title: 'AI模型管理',
        icon: '🤖',
        items: [
          'Kimi2.5长上下文',
          'DeepSeek代码生成',
          '多模型路由策略',
          'API成本控制',
          '模型性能对比',
          'Prompt工程技巧',
        ],
        lastUpdated: `今天 ${timeStr}`,
        progress: Math.min(80 + Math.random() * 10, 95),
        learning: Math.floor(30 + Math.random() * 20),
      },
    ]
  }

  const [topics, setTopics] = useState(generateTopics())

  // 每60秒更新学习进度
  useEffect(() => {
    const interval = setInterval(() => {
      setTopics(prev => prev.map(topic => ({
        ...topic,
        progress: Math.min(topic.progress + Math.random() * 2, 100),
        learning: Math.min(topic.learning + Math.floor(Math.random() * 3), 100),
        lastUpdated: `今天 ${new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`
      })))
      setLastUpdate(new Date())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="section-title !mb-0">
          <span className="mr-2 text-xl">📚</span>
          <span className="section-title-text">知识内容</span>
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/60">{topics.length}个主题</span>
          <span className="text-[10px] text-white/40">
            {lastUpdate.toLocaleTimeString('zh-CN', {hour:'2-digit', minute:'2-digit'})}
          </span>
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-2 max-h-[350px] overflow-y-auto">
        {topics.map((topic) => (
          <motion.div
            key={topic.id}
            whileHover={{ scale: 1.01 }}
            className={`rounded-xl border transition-all ${
              expandedTopic === topic.id 
                ? 'bg-white/10 border-white/20' 
                : 'bg-white/5 border-white/10 hover:bg-white/8'
            }`}
          >
            <div 
              onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
              className="p-3 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{topic.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-white">{topic.title}</div>
                    <div className="flex items-center space-x-2 text-[10px] text-white/40">
                      <span className="px-1.5 py-0.5 bg-white/10 rounded">{topic.category}</span>
                      <span>{topic.items.length}个知识点</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] text-white/30">{topic.lastUpdated}</span>
                  <span className="text-white/40 text-xs">{expandedTopic === topic.id ? '▼' : '▶'}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-2">
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="text-white/50">掌握度: {Math.round(topic.progress)}%</span>
                  <span className="text-blue-400">学习中: {topic.learning}%</span>
                </div>
                <div className="flex gap-1">
                  <div className="flex-1 progress-bar h-1">
                    <motion.div 
                      className="h-full bg-emerald-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${topic.progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="flex-1 progress-bar h-1">
                    <motion.div 
                      className="h-full bg-blue-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${topic.learning}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {expandedTopic === topic.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 pt-1 border-t border-white/10">
                    <div className="grid grid-cols-2 gap-1.5">
                      {topic.items.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center space-x-1.5 text-xs text-white/70"
                        >
                          <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                          <span className="truncate">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="metric-card">
            <div className="text-lg font-bold text-emerald-400">
              {Math.round(topics.reduce((acc, t) => acc + t.progress, 0) / topics.length)}%
            </div>
            <div className="text-[10px] text-white/50">平均掌握度</div>
          </div>
          <div className="metric-card">
            <div className="text-lg font-bold text-blue-400">
              {Math.round(topics.reduce((acc, t) => acc + t.learning, 0) / topics.length)}%
            </div>
            <div className="text-[10px] text-white/50">平均学习进度</div>
          </div>
        </div>
      </div>

      {/* Update Info */}
      <div className="mt-3 flex items-center justify-between text-[10px] text-white/40">
        <span>学习进度每60秒自动更新</span>
        <span>下次: {new Date(lastUpdate.getTime() + 60000).toLocaleTimeString('zh-CN')}</span>
      </div>
    </motion.div>
  )
}

export default KnowledgeContent