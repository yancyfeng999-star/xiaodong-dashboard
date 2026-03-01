import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const KnowledgeBase: React.FC = () => {
  const [filter, setFilter] = useState('全部')
  const [lastUpdate, setLastUpdate] = useState(new Date())
  
  // 102个技能的分类统计（基于实际安装）
  const skillCategories = [
    { name: '开发', count: 18, color: 'text-emerald-400 bg-emerald-500/20' },
    { name: '爬虫', count: 15, color: 'text-teal-400 bg-teal-500/20' },
    { name: '数据', count: 14, color: 'text-pink-400 bg-pink-500/20' },
    { name: '设计', count: 12, color: 'text-purple-400 bg-purple-500/20' },
    { name: '系统', count: 10, color: 'text-red-400 bg-red-500/20' },
    { name: '工具', count: 9, color: 'text-blue-400 bg-blue-500/20' },
    { name: '分析', count: 8, color: 'text-orange-400 bg-orange-500/20' },
    { name: '数据库', count: 7, color: 'text-lime-400 bg-lime-500/20' },
    { name: '文档', count: 5, color: 'text-amber-400 bg-amber-500/20' },
    { name: '发现', count: 2, color: 'text-cyan-400 bg-cyan-500/20' },
    { name: '优化', count: 2, color: 'text-indigo-400 bg-indigo-500/20' },
  ]

  // 精选展示的技能（21个代表性技能）
  const featuredSkills = [
    { name: 'mac-system-monitor', category: '系统', desc: 'Mac系统监控', version: '1.0.0', lastUsed: '刚刚' },
    { name: 'network-monitor', category: '系统', desc: '网络流量监控', version: '1.0.0', lastUsed: '刚刚' },
    { name: 'postgres-manager', category: '数据库', desc: 'PostgreSQL管理', version: '1.0.0', lastUsed: '1小时前' },
    { name: 'redis-cli', category: '数据库', desc: 'Redis缓存操作', version: '1.0.0', lastUsed: '2小时前' },
    { name: 'find-skills', category: '发现', desc: '技能发现工具', version: '1.0.0', lastUsed: '今天' },
    { name: 'docs-cog', category: '文档', desc: '文档处理工具', version: '1.2.0', lastUsed: '今天' },
    { name: 'skill-creator', category: '开发', desc: '技能创建工具', version: '2.1.0', lastUsed: '今天' },
    { name: 'frontend-design', category: '设计', desc: '前端设计工具', version: '3.0.0', lastUsed: '今天' },
    { name: 'code-simplifier', category: '开发', desc: '代码简化工具', version: '1.0.0', lastUsed: '今天' },
    { name: 'parallel_tools', category: '优化', desc: '并行任务工具', version: '1.0.0', lastUsed: '今天' },
    { name: 'data-visualization', category: '数据', desc: '数据可视化工具', version: '1.5.0', lastUsed: '今天' },
    { name: 'kpi-dashboard-design', category: '设计', desc: 'KPI仪表板设计', version: '1.2.0', lastUsed: '今天' },
    { name: 'apple-notes', category: '工具', desc: 'Apple笔记管理', version: '1.0.0', lastUsed: '昨天' },
    { name: 'content-quality-auditor', category: '分析', desc: '内容质量审计', version: '1.0.0', lastUsed: '昨天' },
    { name: 'amazon-scraper', category: '爬虫', desc: 'Amazon商品爬取', version: '1.0.0', lastUsed: '4小时前' },
    { name: 'xpr-web-scraping', category: '爬虫', desc: '网页数据抓取', version: '1.0.0', lastUsed: '3小时前' },
    { name: 'shopee-scraper', category: '爬虫', desc: 'Shopee数据爬取', version: '1.0.0', lastUsed: '5小时前' },
    { name: 'tiktok-scraper', category: '爬虫', desc: 'TikTok视频抓取', version: '1.0.0', lastUsed: '6小时前' },
    { name: 'cron-scheduler', category: '工具', desc: '定时任务调度', version: '1.0.0', lastUsed: '今天' },
    { name: 'data-analysis', category: '数据', desc: '数据分析工具', version: '1.0.0', lastUsed: '今天' },
    { name: 'api-tester', category: '开发', desc: 'API接口测试', version: '1.0.0', lastUsed: '今天' },
  ]

  // 根据筛选显示技能
  const filteredSkills = filter === '全部' 
    ? featuredSkills 
    : featuredSkills.filter(s => s.category === filter)

  // 每30秒更新使用状态
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const categories = ['全部', ...skillCategories.map(c => c.name)]
  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.count, 0)

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
          <span className="text-xs text-white/60">{totalSkills} 技能</span>
          <span className="text-[10px] text-white/40">
            {lastUpdate.toLocaleTimeString('zh-CN', {hour:'2-digit', minute:'2-digit'})}
          </span>
        </div>
      </div>

      {/* Total Stats */}
      <div className="mb-4 p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-white/10">
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <div className="text-3xl font-bold text-white">{totalSkills}</div>
            <div className="text-xs text-white/60">总技能数</div>
          </div>
          <div className="w-px h-12 bg-white/20"></div>
          <div className="text-center flex-1">
            <div className="text-3xl font-bold text-emerald-400">{skillCategories.length}</div>
            <div className="text-xs text-white/60">分类</div>
          </div>
          <div className="w-px h-12 bg-white/20"></div>
          <div className="text-center flex-1">
            <div className="text-3xl font-bold text-blue-400">{featuredSkills.length}</div>
            <div className="text-xs text-white/60">常用</div>
          </div>
        </div>
      </div>

      {/* Category Stats Grid */}
      <div className="mb-4">
        <div className="text-xs text-white/60 mb-2">技能分类统计</div>
        <div className="grid grid-cols-3 gap-2 max-h-[150px] overflow-y-auto">
          {skillCategories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              className="metric-card text-center p-2"
            >
              <div className={`text-sm font-bold ${cat.color.split(' ')[0]}`}>{cat.count}</div>
              <div className="text-[10px] text-white/50">{cat.name}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-1 mb-3">
        {categories.slice(0, 8).map((cat) => (
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

      {/* Featured Skills */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-white/60">精选技能展示</span>
          <span className="text-[10px] text-white/40">显示 {filteredSkills.length} 个</span>
        </div>
        <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto">
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
                <span className="text-xs font-medium text-white truncate max-w-[80px]">{skill.name}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                  skillCategories.find(c => c.name === skill.category)?.color || 'text-gray-400 bg-gray-500/20'
                }`}>
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
      </div>

      {/* Update Info */}
      <div className="mt-3 flex items-center justify-between text-[10px] text-white/40 pt-3 border-t border-white/10">
        <span>共安装 {totalSkills} 个技能</span>
        <span>更新: {lastUpdate.toLocaleTimeString('zh-CN')}</span>
      </div>
    </motion.div>
  )
}

export default KnowledgeBase