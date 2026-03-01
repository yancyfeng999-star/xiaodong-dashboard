import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TreeNode {
  id: string
  name: string
  type: 'folder' | 'file'
  size?: string
  desc?: string
  lastModified?: string
  children?: TreeNode[]
}

const MemoryFiles: React.FC = () => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root', 'core', 'logs']))
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // 动态生成文件树数据
  const generateTreeData = (): TreeNode => {
    const now = new Date()
    const timeStr = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    
    return {
      id: 'root',
      name: 'memory/',
      type: 'folder',
      size: `${(73 + Math.random() * 5).toFixed(0)}KB`,
      lastModified: '刚刚',
      children: [
        {
          id: 'core',
          name: '核心文件',
          type: 'folder',
          lastModified: timeStr,
          children: [
            { id: 'memory', name: 'MEMORY.md', type: 'file', size: '45KB', desc: '长期记忆与核心决策', lastModified: timeStr },
            { id: 'soul', name: 'SOUL.md', type: 'file', size: '9KB', desc: '身份与价值观', lastModified: '今天' },
            { id: 'identity', name: 'IDENTITY.md', type: 'file', size: '3KB', desc: '自我介绍', lastModified: '今天' },
          ]
        },
        {
          id: 'config',
          name: '配置文件',
          type: 'folder',
          lastModified: '今天',
          children: [
            { id: 'agents', name: 'AGENTS.md', type: 'file', size: '13KB', desc: '工作空间指南', lastModified: '今天' },
            { id: 'user', name: 'USER.md', type: 'file', size: '6KB', desc: '用户信息', lastModified: '昨天' },
            { id: 'bootstrap', name: 'BOOTSTRAP.md', type: 'file', size: '2KB', desc: '初始化配置', lastModified: '3天前' },
            { id: 'heartbeat', name: 'HEARTBEAT.md', type: 'file', size: '1KB', desc: '心跳任务配置', lastModified: '1小时前' },
          ]
        },
        {
          id: 'logs',
          name: '每日日志',
          type: 'folder',
          lastModified: timeStr,
          children: [
            { id: 'log-0301', name: '2026-03-01.md', type: 'file', size: `${(16 + Math.random() * 2).toFixed(0)}KB`, desc: `${Math.floor(12 + Math.random() * 3)}个事件`, lastModified: timeStr },
            { id: 'log-0228', name: '2026-02-28.md', type: 'file', size: '14KB', desc: '8个事件', lastModified: '昨天' },
            { id: 'log-0227', name: '2026-02-27.md', type: 'file', size: '11KB', desc: '6个事件', lastModified: '2天前' },
            { id: 'log-0226', name: '2026-02-26.md', type: 'file', size: '9KB', desc: '5个事件', lastModified: '3天前' },
          ]
        },
        {
          id: 'skills',
          name: '技能记录',
          type: 'folder',
          lastModified: timeStr,
          children: [
            { id: 'skill-log', name: 'skill-installation-log.md', type: 'file', size: `${(15 + Math.random()).toFixed(1)}KB`, desc: '102个技能安装记录', lastModified: timeStr },
            { id: 'skill-evolution', name: 'skill-evolution-log.md', type: 'file', size: '8KB', desc: '技能进化记录', lastModified: '今天' },
          ]
        },
      ]
    }
  }

  const [treeData, setTreeData] = useState<TreeNode>(generateTreeData())

  // 每60秒更新文件状态
  useEffect(() => {
    const interval = setInterval(() => {
      setTreeData(generateTreeData())
      setLastUpdate(new Date())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId)
    } else {
      newExpanded.add(nodeId)
    }
    setExpandedNodes(newExpanded)
  }

  const renderTree = (node: TreeNode, depth = 0) => {
    const isExpanded = expandedNodes.has(node.id)
    const hasChildren = node.children && node.children.length > 0

    return (
      <div key={node.id} style={{ marginLeft: depth * 12 }}>
        <motion.div
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
          onClick={() => hasChildren && toggleNode(node.id)}
          className="flex items-center justify-between py-1.5 px-2 rounded cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            {hasChildren && (
              <span className="text-white/40 text-xs">{isExpanded ? '▼' : '▶'}</span>
            )}
            <span className="text-sm">
              {node.type === 'folder' ? '📁' : '📄'}
            </span>
            <span className={`text-xs ${node.type === 'folder' ? 'text-white font-medium' : 'text-white/80'}`}>
              {node.name}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {node.size && (
              <span className="text-[10px] text-white/40">{node.size}</span>
            )}
            {node.lastModified && (
              <span className="text-[9px] text-white/30">{node.lastModified}</span>
            )}
          </div>
        </motion.div>

        <AnimatePresence>
          {isExpanded && hasChildren && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {node.children?.map(child => renderTree(child, depth + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // 计算文件统计
  const countFiles = (node: TreeNode): number => {
    if (node.type === 'file') return 1
    return node.children?.reduce((acc, child) => acc + countFiles(child), 0) || 0
  }

  const countFolders = (node: TreeNode): number => {
    if (node.type === 'file') return 0
    return 1 + (node.children?.reduce((acc, child) => acc + countFolders(child), 0) || 0)
  }

  const fileCount = countFiles(treeData)
  const folderCount = countFolders(treeData) - 1 // 排除root

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
          <span className="mr-2 text-xl">🗂️</span>
          <span className="section-title-text">记忆文件</span>
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/60">{fileCount}文件/{folderCount}文件夹</span>
          <span className="text-[10px] text-white/40">
            {lastUpdate.toLocaleTimeString('zh-CN', {hour:'2-digit', minute:'2-digit'})}
          </span>
        </div>
      </div>

      {/* File Tree */}
      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden max-h-[350px] overflow-y-auto">
        {renderTree(treeData)}
      </div>

      {/* File Stats */}
      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-bold text-white">{fileCount}</div>
            <div className="text-[10px] text-white/50">文件</div>
          </div>
          <div>
            <div className="text-lg font-bold text-white">{folderCount}</div>
            <div className="text-[10px] text-white/50">文件夹</div>
          </div>
          <div>
            <div className="text-lg font-bold text-white">{treeData.size}</div>
            <div className="text-[10px] text-white/50">总大小</div>
          </div>
        </div>
      </div>

      {/* Update Info */}
      <div className="mt-3 flex items-center justify-between text-[10px] text-white/40">
        <span>文件状态每60秒自动更新</span>
        <span>下次: {new Date(lastUpdate.getTime() + 60000).toLocaleTimeString('zh-CN')}</span>
      </div>
    </motion.div>
  )
}

export default MemoryFiles