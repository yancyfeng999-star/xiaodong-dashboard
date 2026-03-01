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
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root', 'knowledge']))
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // 本地知识库文件树
  const generateTreeData = (): TreeNode => {
    const now = new Date()
    const timeStr = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    
    return {
      id: 'root',
      name: 'workspace/',
      type: 'folder',
      size: '156KB',
      lastModified: '刚刚',
      children: [
        {
          id: 'knowledge',
          name: 'knowledge-vault/ (本地知识库)',
          type: 'folder',
          lastModified: timeStr,
          children: [
            {
              id: 'inbox',
              name: '📋 00-Inbox/',
              type: 'folder',
              lastModified: timeStr,
              children: [
                { id: 'inbox-readme', name: 'README.md', type: 'file', size: '2KB', desc: '收件箱说明', lastModified: timeStr },
              ]
            },
            {
              id: 'memory',
              name: '🧠 01-Memory/',
              type: 'folder',
              lastModified: timeStr,
              children: [
                { 
                  id: 'memory-core', 
                  name: 'core/', 
                  type: 'folder', 
                  lastModified: timeStr,
                  children: [
                    { id: 'identity', name: 'identity.md', type: 'file', size: '3KB', desc: '核心身份记忆', lastModified: timeStr },
                    { id: 'values', name: 'values.md', type: 'file', size: '2KB', desc: '价值观', lastModified: '今天' },
                    { id: 'goals', name: 'goals.md', type: 'file', size: '4KB', desc: '目标规划', lastModified: '今天' },
                  ]
                },
                { 
                  id: 'memory-daily', 
                  name: 'daily/', 
                  type: 'folder', 
                  lastModified: timeStr,
                  children: [
                    { id: 'daily-0301', name: '2026-03-01.md', type: 'file', size: '8KB', desc: '今日记录（12个事件）', lastModified: timeStr },
                  ]
                },
              ]
            },
            {
              id: 'knowledge',
              name: '📚 02-Knowledge/',
              type: 'folder',
              lastModified: '今天',
              children: [
                { id: 'skills', name: 'skills/', type: 'folder', lastModified: '今天' },
                { id: 'tools', name: 'tools/', type: 'folder', lastModified: '今天' },
                { id: 'ecommerce', name: 'ecommerce/', type: 'folder', lastModified: '今天' },
              ]
            },
            {
              id: 'connect',
              name: '🔗 03-Connect/',
              type: 'folder',
              lastModified: timeStr,
              children: [
                { id: 'index', name: 'index.md', type: 'file', size: '5KB', desc: '知识图谱入口', lastModified: timeStr },
              ]
            },
            {
              id: 'data',
              name: '📊 04-Data/',
              type: 'folder',
              lastModified: '今天',
              children: [
                { id: 'crawlers', name: 'crawlers/', type: 'folder', lastModified: '今天' },
                { id: 'analytics', name: 'analytics/', type: 'folder', lastModified: '今天' },
              ]
            },
          ]
        },
        {
          id: 'legacy',
          name: 'legacy-memory/ (旧版记忆)',
          type: 'folder',
          lastModified: '今天',
          children: [
            { id: 'memory-md', name: 'MEMORY.md', type: 'file', size: '45KB', desc: '长期记忆与核心决策', lastModified: '今天' },
            { id: 'soul', name: 'SOUL.md', type: 'file', size: '9KB', desc: '身份与价值观', lastModified: '今天' },
            { id: 'identity-old', name: 'IDENTITY.md', type: 'file', size: '3KB', desc: '自我介绍', lastModified: '今天' },
            { id: 'daily-old', name: '2026-03-01.md', type: 'file', size: '16KB', desc: '旧版每日日志', lastModified: '今天' },
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
  const folderCount = countFolders(treeData) - 1

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

      {/* Local Storage Info */}
      <div className="mb-3 p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 text-xs">💾</span>
          <span className="text-xs text-white/80">所有记忆存储在本地 Markdown 文件</span>
        </div>
        <div className="text-[10px] text-white/50 mt-1">
          路径: /knowledge-vault/ | 工具: Obsidian + Logseq
        </div>
      </div>

      {/* File Tree */}
      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden max-h-[320px] overflow-y-auto">
        {renderTree(treeData)}
      </div>

      {/* File Stats */}
      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-bold text-white">{fileCount}</div>
            <div className="text-[10px] text-white/50">Markdown文件</div>
          </div>
          <div>
            <div className="text-lg font-bold text-white">{folderCount}</div>
            <div className="text-[10px] text-white/50">知识文件夹</div>
          </div>
          <div>
            <div className="text-lg font-bold text-white">156KB</div>
            <div className="text-[10px] text-white/50">本地存储</div>
          </div>
        </div>
      </div>

      {/* Knowledge Base Tools */}
      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="text-xs text-white/60 mb-2">知识库工具</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="metric-card text-center p-2">
            <div className="text-lg">💎</div>
            <div className="text-[10px] text-white/60">Obsidian</div>
          </div>
          <div className="metric-card text-center p-2">
            <div className="text-lg">🌳</div>
            <div className="text-[10px] text-white/60">Logseq</div>
          </div>
        </div>
      </div>

      {/* Update Info */}
      <div className="mt-3 flex items-center justify-between text-[10px] text-white/40">
        <span>本地文件每60秒自动更新</span>
        <span>完全离线存储</span>
      </div>
    </motion.div>
  )
}

export default MemoryFiles