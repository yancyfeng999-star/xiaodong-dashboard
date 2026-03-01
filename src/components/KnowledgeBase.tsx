import React, { useState } from 'react'
import { motion } from 'framer-motion'

const KnowledgeBase: React.FC = () => {
  const [filter, setFilter] = useState('全部')
  
  // 实际安装的11个技能
  const skills = [
    { name: 'find-skills', category: '发现', desc: '技能发现工具', status: 'active', version: '1.0.0' },
    { name: 'docs-cog', category: '文档', desc: '文档处理工具', status: 'active', version: '1.2.0' },
    { name: 'skill-creator', category: '开发', desc: '技能创建工具', status: 'active', version: '2.1.0' },
    { name: 'frontend-design', category: '设计', desc: '前端设计工具', status: 'active', version: '3.0.0' },
    { name: 'code-simplifier', category: '开发', desc: '代码简化工具', status: 'active', version: '1.0.0' },
    { name: 'parallel_tools', category: '优化', desc: '并行任务工具', status: 'active', version: '1.0.0' },
    { name: 'web-design-guidelines', category: '设计', desc: '网页设计指南', status: 'active', version: '2.0.0' },
    { name: 'data-visualization', category: '数据', desc: '数据可视化工具', status: 'active', version: '1.5.0' },
    { name: 'kpi-dashboard-design', category: '设计', desc: 'KPI仪表板设计', status: 'active', version: '1.2.0' },
    { name: 'apple-notes', category: '工具', desc: 'Apple笔记管理', status: 'active', version: '1.0.0' },
    { name: 'content-quality-auditor', category: '分析', desc: '内容质量审计', status: 'active', version: '1.0.0' },
  ]

  const categories = ['全部', '开发', '设计', '工具', '数据', '分析', '文档', '发现', '优化']

  const filteredSkills = filter === '全部' ? skills : skills.filter(s => s.category === filter)

  const getCategoryColor = (cat: string) => {
    const colors: {[key: string]: string} = {
      '开发': 'text-emerald-400 bg-emerald-500/20',
      '设计': 'text-purple-400 bg-purple-500/20',
      '工具': 'text-blue-400 bg-blue-500/20',
      '数据': 'text-pink-400 bg-pink-500/20',
      '分析': 'text-orange-400 bg-orange-500/20',
      '文档': 'text-amber-400 bg-amber-500/20',
      '发现': 'text-cyan-400 bg-cyan-500/20',
      '优化': 'text-indigo-400 bg-indigo-500/20',
    }
    return colors[cat] || 'text-gray-400 bg-gray-500/20'
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
        <h2 className="text-base font-bold text-white">🎯 技能库</h2>
        <span className="text-xs text-white/60">{filteredSkills.length}/11 技能</span>
      </div>

      {/* Filter Tabs */}
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

      {/* Skills Table */}
      <div className="overflow-hidden rounded-lg border border-white/10">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-white/10 text-[10px] text-white/60 font-medium">
          <div className="col-span-4">技能名称</div>
          <div className="col-span-2">分类</div>
          <div className="col-span-4">描述</div>
          <div className="col-span-2 text-right">状态</div>
        </div>
        
        {/* Table Body - Scrollable */}
        <div className="max-h-[200px] overflow-y-auto">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              className="grid grid-cols-12 gap-2 px-3 py-2 border-b border-white/5 hover:bg-white/5 transition-colors items-center"
            >
              <div className="col-span-4">
                <div className="text-xs font-medium text-white truncate">{skill.name}</div>
                <div className="text-[10px] text-white/40">v{skill.version}</div>
              </div>
              <div className="col-span-2">
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${getCategoryColor(skill.category)}`}>
                  {skill.category}
                </span>
              </div>
              <div className="col-span-4">
                <div className="text-[10px] text-white/60 truncate">{skill.desc}</div>
              </div>
              <div className="col-span-2 text-right">
                <span className="flex items-center justify-end space-x-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                  <span className="text-[10px] text-emerald-400">运行中</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-4 gap-2 text-center">
        <div className="metric-card">
          <div className="text-lg font-bold text-white">11</div>
          <div className="text-[10px] text-white/50">总技能</div>
        </div>
        <div className="metric-card">
          <div className="text-lg font-bold text-emerald-400">8</div>
          <div className="text-[10px] text-white/50">分类</div>
        </div>
        <div className="metric-card">
          <div className="text-lg font-bold text-blue-400">11</div>
          <div className="text-[10px] text-white/50">运行中</div>
        </div>
        <div className="metric-card">
          <div className="text-lg font-bold text-purple-400">0</div>
          <div className="text-[10px] text-white/50">待更新</div>
        </div>
      </div>
    </motion.div>
  )
}

export default KnowledgeBase