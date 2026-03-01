import React from 'react'
import { motion } from 'framer-motion'

const KnowledgeBase: React.FC = () => {
  // 实际技能列表 - 15个
  const skills = [
    { name: 'find-skills', category: '工具', desc: '技能发现' },
    { name: 'docs-cog', category: '文档', desc: '文档处理' },
    { name: 'skill-creator', category: '开发', desc: '技能创建' },
    { name: 'frontend-design', category: '设计', desc: '前端设计' },
    { name: 'code-simplifier', category: '开发', desc: '代码简化' },
    { name: 'parallel_tools', category: '优化', desc: '并行处理' },
    { name: 'web-design', category: '设计', desc: '网页设计' },
    { name: 'data-viz', category: '数据', desc: '数据可视化' },
    { name: 'kpi-dashboard', category: '设计', desc: 'KPI仪表板' },
    { name: 'apple-notes', category: '工具', desc: 'Apple笔记' },
    { name: 'content-audit', category: '分析', desc: '内容审计' },
    { name: 'web-search', category: '工具', desc: '网络搜索' },
    { name: 'web-fetch', category: '工具', desc: '网页获取' },
    { name: 'browser-control', category: '工具', desc: '浏览器控制' },
    { name: 'memory-search', category: '工具', desc: '记忆搜索' },
  ]

  const memoryFiles = [
    { name: 'MEMORY.md', size: '45KB', type: '核心' },
    { name: 'AGENTS.md', size: '13KB', type: '配置' },
    { name: 'SOUL.md', size: '9KB', type: '核心' },
    { name: 'USER.md', size: '6KB', type: '配置' },
  ]

  const getCategoryColor = (cat: string) => {
    const colors: {[key: string]: string} = {
      '工具': 'bg-blue-500/20 text-blue-200 border-blue-500/30',
      '文档': 'bg-amber-500/20 text-amber-200 border-amber-500/30',
      '开发': 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30',
      '设计': 'bg-purple-500/20 text-purple-200 border-purple-500/30',
      '优化': 'bg-cyan-500/20 text-cyan-200 border-cyan-500/30',
      '数据': 'bg-pink-500/20 text-pink-200 border-pink-500/30',
      '分析': 'bg-orange-500/20 text-orange-200 border-orange-500/30',
    }
    return colors[cat] || 'bg-gray-500/20 text-gray-200 border-gray-500/30'
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-white">🧠 知识库</h2>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-white/60">15技能</span>
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="mb-4">
        <div className="text-label mb-2">已安装技能</div>
        <div className="grid grid-cols-3 gap-2">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              className="skill-card cursor-pointer"
              title={`${skill.name}: ${skill.desc}`}
            >
              <div className={`text-[10px] px-1.5 py-0.5 rounded inline-block mb-1 border ${getCategoryColor(skill.category)}`}>
                {skill.category}
              </div>
              <div className="text-xs font-medium text-white truncate">{skill.name}</div>
              <div className="text-[10px] text-white/50 truncate">{skill.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Memory Files */}
      <div className="mb-3">
        <div className="text-label mb-2">记忆文件</div>
        <div className="grid grid-cols-2 gap-2">
          {memoryFiles.map((file, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
              className="metric-card flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm">📄</span>
                <div>
                  <div className="text-xs font-medium text-white">{file.name}</div>
                  <div className="text-[10px] text-white/50">{file.type}</div>
                </div>
              </div>
              <span className="text-xs text-white/60">{file.size}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="pt-3 border-t border-white/10">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="metric-card">
            <div className="metric-value text-lg">15</div>
            <div className="metric-label">技能</div>
          </div>
          <div className="metric-card">
            <div className="metric-value text-lg">4</div>
            <div className="metric-label">记忆文件</div>
          </div>
          <div className="metric-card">
            <div className="metric-value text-lg">73KB</div>
            <div className="metric-label">总大小</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default KnowledgeBase