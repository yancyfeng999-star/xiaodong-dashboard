import React from 'react'
import { motion } from 'framer-motion'

const KnowledgeBase: React.FC = () => {
  // 实际安装的11个技能
  const skills = [
    { name: 'find-skills', category: '发现', desc: '技能发现工具' },
    { name: 'docs-cog', category: '文档', desc: '文档处理工具' },
    { name: 'skill-creator', category: '开发', desc: '技能创建工具' },
    { name: 'frontend-design', category: '设计', desc: '前端设计工具' },
    { name: 'code-simplifier', category: '开发', desc: '代码简化工具' },
    { name: 'parallel_tools', category: '优化', desc: '并行任务工具' },
    { name: 'web-design-guidelines', category: '设计', desc: '网页设计指南' },
    { name: 'data-visualization', category: '数据', desc: '数据可视化' },
    { name: 'kpi-dashboard-design', category: '设计', desc: 'KPI仪表板' },
    { name: 'apple-notes', category: '工具', desc: 'Apple笔记管理' },
    { name: 'content-quality-auditor', category: '分析', desc: '内容质量审计' },
  ]

  const categories = ['发现', '文档', '开发', '设计', '优化', '数据', '工具', '分析']

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-white">🎯 技能库</h2>
        <span className="text-xs text-white/60">11个技能</span>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-1 mb-3">
        <span className="px-2 py-0.5 bg-white/20 text-white text-[10px] rounded-full">全部</span>
        {categories.map((cat, i) => (
          <span key={i} className="px-2 py-0.5 bg-white/5 text-white/60 text-[10px] rounded-full hover:bg-white/10 cursor-pointer">
            {cat}
          </span>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 gap-2">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-white truncate group-hover:text-blue-200 transition-colors">
                {skill.name}
              </span>
              <div className={`w-1.5 h-1.5 rounded-full ${
                skill.category === '开发' ? 'bg-emerald-400' :
                skill.category === '设计' ? 'bg-purple-400' :
                skill.category === '工具' ? 'bg-blue-400' :
                skill.category === '数据' ? 'bg-pink-400' :
                skill.category === '分析' ? 'bg-orange-400' :
                'bg-gray-400'
              }`}></div>
            </div>
            <div className="text-[10px] text-white/50 truncate">{skill.desc}</div>
            <div className="mt-1 text-[10px] px-1.5 py-0.5 bg-white/10 rounded inline-block text-white/70">
              {skill.category}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-lg font-bold text-white">11</div>
          <div className="text-[10px] text-white/50">总技能</div>
        </div>
        <div>
          <div className="text-lg font-bold text-emerald-400">8</div>
          <div className="text-[10px] text-white/50">分类</div>
        </div>
        <div>
          <div className="text-lg font-bold text-blue-400">100%</div>
          <div className="text-[10px] text-white/50">可用</div>
        </div>
      </div>
    </motion.div>
  )
}

export default KnowledgeBase