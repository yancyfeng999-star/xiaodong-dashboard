import React, { useState } from 'react'
import { motion } from 'framer-motion'

const KnowledgeBase: React.FC = () => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root', 'dev', 'design']))

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId)
    } else {
      newExpanded.add(nodeId)
    }
    setExpandedNodes(newExpanded)
  }

  const treeData = {
    id: 'root',
    name: 'skills/',
    type: 'folder',
    count: '11个技能',
    children: [
      {
        id: 'dev',
        name: '开发工具',
        type: 'folder',
        count: '3个',
        children: [
          { id: 'skill-creator', name: 'skill-creator', type: 'skill', version: 'v2.1.0', status: 'active', desc: '技能创建工具' },
          { id: 'code-simplifier', name: 'code-simplifier', type: 'skill', version: 'v1.0.0', status: 'active', desc: '代码简化工具' },
          { id: 'parallel_tools', name: 'parallel_tools', type: 'skill', version: 'v1.0.0', status: 'active', desc: '并行任务工具' },
        ]
      },
      {
        id: 'design',
        name: '设计工具',
        type: 'folder',
        count: '3个',
        children: [
          { id: 'frontend-design', name: 'frontend-design', type: 'skill', version: 'v3.0.0', status: 'active', desc: '前端设计工具' },
          { id: 'web-design-guidelines', name: 'web-design-guidelines', type: 'skill', version: 'v2.0.0', status: 'active', desc: '网页设计指南' },
          { id: 'kpi-dashboard-design', name: 'kpi-dashboard-design', type: 'skill', version: 'v1.2.0', status: 'active', desc: 'KPI仪表板设计' },
        ]
      },
      {
        id: 'utils',
        name: '实用工具',
        type: 'folder',
        count: '2个',
        children: [
          { id: 'find-skills', name: 'find-skills', type: 'skill', version: 'v1.0.0', status: 'active', desc: '技能发现工具' },
          { id: 'apple-notes', name: 'apple-notes', type: 'skill', version: 'v1.0.0', status: 'active', desc: 'Apple笔记管理' },
        ]
      },
      {
        id: 'data',
        name: '数据处理',
        type: 'folder',
        count: '2个',
        children: [
          { id: 'data-visualization', name: 'data-visualization', type: 'skill', version: 'v1.5.0', status: 'active', desc: '数据可视化工具' },
          { id: 'content-quality-auditor', name: 'content-quality-auditor', type: 'skill', version: 'v1.0.0', status: 'active', desc: '内容质量审计' },
        ]
      },
      {
        id: 'doc',
        name: '文档处理',
        type: 'folder',
        count: '1个',
        children: [
          { id: 'docs-cog', name: 'docs-cog', type: 'skill', version: 'v1.2.0', status: 'active', desc: '文档处理工具' },
        ]
      },
    ]
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
      case 'pending': return <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
      default: return <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
    }
  }

  const renderTree = (node: any, depth = 0) => {
    const isExpanded = expandedNodes.has(node.id)
    const hasChildren = node.children && node.children.length > 0

    return (
      <div key={node.id}>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: depth * 0.05 }}
          className={`flex items-center py-1.5 px-2 hover:bg-white/5 cursor-pointer transition-colors ${
            depth > 0 ? 'ml-4 border-l border-white/10' : ''
          }`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => hasChildren && toggleNode(node.id)}
        >
          {/* Expand/Collapse Icon */}
          {hasChildren ? (
            <span className="w-4 h-4 flex items-center justify-center text-white/50 mr-1">
              {isExpanded ? '▼' : '▶'}
            </span>
          ) : (
            <span className="w-4 mr-1"></span>
          )}

          {/* Icon */}
          <span className="mr-2">
            {node.type === 'folder' ? (isExpanded ? '📂' : '📁') : '🎯'}
          </span>

          {/* Name */}
          <div className="flex-1 min-w-0">
            <span className={`text-xs truncate ${node.type === 'folder' ? 'font-medium text-white' : 'text-white/80'}`}>
              {node.name}
            </span>
            {node.desc && !hasChildren && (
              <span className="text-[10px] text-white/40 ml-2 truncate">{node.desc}</span>
            )}
          </div>

          {/* Count/Version/Status */}
          {hasChildren && node.count && (
            <span className="text-[10px] text-white/50 ml-2">{node.count}</span>
          )}
          {!hasChildren && node.version && (
            <span className="text-[10px] text-white/40 ml-2">{node.version}</span>
          )}
          {!hasChildren && getStatusIcon(node.status)}
        </motion.div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div>
            {node.children.map((child: any) => renderTree(child, depth + 1))}
          </div>
        )}
      </div>
    )
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
        <span className="text-xs text-white/60">{treeData.count}</span>
      </div>

      {/* Tree View */}
      <div className="max-h-[240px] overflow-y-auto rounded-lg border border-white/10 bg-white/5">
        {renderTree(treeData)}
      </div>

      {/* Stats */}
      <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-4 gap-2 text-center">
        <div className="metric-card">
          <div className="text-base font-bold text-white">11</div>
          <div className="text-[10px] text-white/50">总技能</div>
        </div>
        <div className="metric-card">
          <div className="text-base font-bold text-blue-400">5</div>
          <div className="text-[10px] text-white/50">分类</div>
        </div>
        <div className="metric-card">
          <div className="text-base font-bold text-emerald-400">11</div>
          <div className="text-[10px] text-white/50">运行中</div>
        </div>
        <div className="metric-card">
          <div className="text-base font-bold text-purple-400">0</div>
          <div className="text-[10px] text-white/50">待更新</div>
        </div>
      </div>
    </motion.div>
  )
}

export default KnowledgeBase