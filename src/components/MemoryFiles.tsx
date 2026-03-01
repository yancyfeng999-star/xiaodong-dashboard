import React, { useState } from 'react'
import { motion } from 'framer-motion'

const MemoryFiles: React.FC = () => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root', 'core', 'logs']))

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
    name: 'memory/',
    type: 'folder',
    size: '73KB',
    children: [
      {
        id: 'core',
        name: '核心文件',
        type: 'folder',
        children: [
          { id: 'memory', name: 'MEMORY.md', type: 'file', size: '45KB', desc: '长期记忆与核心决策' },
          { id: 'soul', name: 'SOUL.md', type: 'file', size: '9KB', desc: '身份与价值观' },
        ]
      },
      {
        id: 'config',
        name: '配置文件',
        type: 'folder',
        children: [
          { id: 'agents', name: 'AGENTS.md', type: 'file', size: '13KB', desc: '工作空间指南' },
          { id: 'user', name: 'USER.md', type: 'file', size: '6KB', desc: '用户信息' },
          { id: 'bootstrap', name: 'BOOTSTRAP.md', type: 'file', size: '2KB', desc: '初始化配置' },
          { id: 'heartbeat', name: 'HEARTBEAT.md', type: 'file', size: '1KB', desc: '心跳任务配置' },
        ]
      },
      {
        id: 'logs',
        name: '每日日志',
        type: 'folder',
        children: [
          { id: 'log-0301', name: '2026-03-01.md', type: 'file', size: '16KB', desc: '12个事件' },
          { id: 'log-0228', name: '2026-02-28.md', type: 'file', size: '14KB', desc: '8个事件' },
          { id: 'log-0227', name: '2026-02-27.md', type: 'file', size: '11KB', desc: '6个事件' },
          { id: 'log-0226', name: '2026-02-26.md', type: 'file', size: '9KB', desc: '5个事件' },
          { id: 'log-0225', name: '2026-02-25.md', type: 'file', size: '8KB', desc: '4个事件' },
        ]
      },
    ]
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
            {node.type === 'folder' ? (isExpanded ? '📂' : '📁') : '📄'}
          </span>

          {/* Name */}
          <div className="flex-1 min-w-0">
            <span className={`text-xs truncate ${node.type === 'folder' ? 'font-medium text-white' : 'text-white/80'}`}>
              {node.name}
            </span>
            {node.desc && (
              <span className="text-[10px] text-white/40 ml-2 truncate">{node.desc}</span>
            )}
          </div>

          {/* Size */}
          {node.size && (
            <span className="text-[10px] text-white/50 ml-2">{node.size}</span>
          )}
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
        <h2 className="text-base font-bold text-white">📁 记忆文件</h2>
        <span className="text-xs text-white/60">{treeData.size}</span>
      </div>

      {/* Tree View */}
      <div className="max-h-[280px] overflow-y-auto rounded-lg border border-white/10 bg-white/5">
        {renderTree(treeData)}
      </div>

      {/* Stats */}
      <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
        <div className="metric-card">
          <div className="text-lg font-bold text-white">11</div>
          <div className="text-[10px] text-white/50">总文件</div>
        </div>
        <div className="metric-card">
          <div className="text-lg font-bold text-blue-400">3</div>
          <div className="text-[10px] text-white/50">文件夹</div>
        </div>
        <div className="metric-card">
          <div className="text-lg font-bold text-emerald-400">8</div>
          <div className="text-[10px] text-white/50">文档</div>
        </div>
      </div>
    </motion.div>
  )
}

export default MemoryFiles