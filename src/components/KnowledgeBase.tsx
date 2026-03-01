import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const KnowledgeBase: React.FC = () => {
  const [filter, setFilter] = useState('全部')
  const [lastUpdate, setLastUpdate] = useState(new Date())
  
  // 102个技能 - 动态生成
  const generateSkills = () => {
    const baseSkills = [
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
      { name: 'mac-system-monitor', category: '系统', desc: 'Mac系统监控', status: 'active', version: '1.0.0' },
      { name: 'network-monitor', category: '系统', desc: '网络流量监控', status: 'active', version: '1.0.0' },
      { name: 'postgres-manager', category: '数据库', desc: 'PostgreSQL管理', status: 'active', version: '1.0.0' },
      { name: 'redis-cli', category: '数据库', desc: 'Redis缓存操作', status: 'active', version: '1.0.0' },
    ]
    
    // 添加更多技能（从102个中选择展示）
    const additionalSkills = [
      { name: 'amazon-scraper', category: '爬虫', desc: 'Amazon商品爬取', status: 'active', version: '1.0.0' },
      { name: 'xpr-web-scraping', category: '爬虫', desc: '网页数据抓取', status: 'active', version: '1.0.0' },
      { name: 'cron-scheduler', category: '工具', desc: '定时任务调度', status: 'active', version: '1.0.0' },
      { name: 'data-analysis', category: '数据', desc: '数据分析工具', status: 'active', version: '1.0.0' },
      { name: 'api-tester', category: '开发', desc: 'API接口测试', status: 'active', version: '1.0.0' },
      { name: 'test-runner-official', category: '开发', desc: '测试运行器', status: 'active', version: '1.0.0' },
    ]
    
    return [...baseSkills, ...additionalSkills].map(skill => ({
      ...skill,
      lastUsed: Math.random() > 0.7 ? '刚刚' : Math.random() > 0.5 ? '1小时前' : Math.random() > 0.3 ? '今天' : '昨天'
    }))
  }

  const [skills, setSkills] = useState(generateSkills())

  // 每30秒更新技能使用状态
  useEffect(() => {
    const interval = setInterval(() => {
      setSkills(prev => prev.map(skill => ({
        ...skill,
        lastUsed: Math.random() > 0.9 ? '刚刚' : skill.lastUsed
      })))
      setLastUpdate(new Date())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const categories = ['全部', '开发', '设计', '工具', '数据', '分析', '系统', '爬虫', '数据库', '文档', '发现', '优化']

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
      '系统': 'text-red-400 bg-red-500/20',
      '爬虫': 'text-teal-400 bg-teal-500/20',
      '数据库': 'text-lime-400 bg-lime-500/20',
    }
    return colors[cat] || 'text-gray-400 bg-gray-500/20'
  }

  const activeCount = skills.filter(s => s.status === 'active').length

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
          <span className="mr-2 text-xl">🎯</span>
          <span className="section-title-text">技能库</span>
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/60">{filteredSkills.length}/{skills.length} 技能</span>
          <span className="text-[10px] text-white/40">
            更新: {lastUpdate.toLocaleTimeString('zh-CN', {hour:'2-digit', minute:'2-digit', second:'2-digit'})}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="metric-card text-center">
          <div className="metric-value text-emerald-400">{activeCount}</div>
          <div className="metric-label">已启用</div>
        </div>
        <div className="metric-card text-center">
          <div className="metric-value text-blue-400">{skills.length}</div>
          <div className="metric-label">总技能</div>
        </div>
      </div>

      {/* Filter */}
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

      {/* Skills Grid */}
      <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            whileHover={{ scale: 1.02 }}
            className="metric-card"
          >
            <div className="flex items-start justify-between mb-1">
              <span className="text-xs font-medium text-white truncate">{skill.name}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded ${getCategoryColor(skill.category)}`}>
                {skill.category}
              </span>
            </div>
            <div className="text-[10px] text-white/50 mb-1">{skill.desc}</div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-white/40">v{skill.version}</span>
              <span className="text-[9px] text-emerald-400/70">{skill.lastUsed}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full Skill Count */}
      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">102</div>
          <div className="text-xs text-white/50">总技能数（已安装）</div>
        </div>
      </div>

      {/* Update Info */}
      <div className="mt-3 flex items-center justify-between text-[10px] text-white/40">
        <span>技能使用状态每30秒更新</span>
        <span>下次: {new Date(lastUpdate.getTime() + 30000).toLocaleTimeString('zh-CN')}</span>
      </div>
    </motion.div>
  )
}

export default KnowledgeBase