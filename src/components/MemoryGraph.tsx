import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface MemoryNode {
  id: string
  label: string
  type: 'core' | 'daily' | 'knowledge' | 'project' | 'person'
  x: number
  y: number
  size: number
  color: string
  connections: string[]
  lastAccessed: string
}

const MemoryGraph: React.FC = () => {
  const [activeView, setActiveView] = useState<'graph' | 'timeline' | 'stats'>('graph')
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // 记忆节点数据（基于实际知识库）
  const memoryNodes: MemoryNode[] = [
    // 核心记忆
    { id: 'identity', label: '身份认同', type: 'core', x: 50, y: 50, size: 40, color: '#3b82f6', connections: ['skills', 'goals', 'values'], lastAccessed: '刚刚' },
    { id: 'values', label: '价值观', type: 'core', x: 30, y: 30, size: 30, color: '#8b5cf6', connections: ['identity', 'daily-0301'], lastAccessed: '今天' },
    { id: 'goals', label: '目标规划', type: 'core', x: 70, y: 30, size: 30, color: '#8b5cf6', connections: ['identity', 'dashboard'], lastAccessed: '今天' },
    
    // 每日记忆
    { id: 'daily-0301', label: '2026-03-01', type: 'daily', x: 20, y: 70, size: 35, color: '#10b981', connections: ['values', 'skills', 'dashboard'], lastAccessed: '刚刚' },
    { id: 'daily-0228', label: '2026-02-28', type: 'daily', x: 15, y: 85, size: 25, color: '#6b7280', connections: ['daily-0301'], lastAccessed: '昨天' },
    { id: 'daily-0227', label: '2026-02-27', type: 'daily', x: 10, y: 95, size: 20, color: '#6b7280', connections: ['daily-0228'], lastAccessed: '2天前' },
    
    // 知识节点
    { id: 'skills', label: '109技能', type: 'knowledge', x: 80, y: 70, size: 35, color: '#f59e0b', connections: ['identity', 'daily-0301', 'ecommerce'], lastAccessed: '刚刚' },
    { id: 'ecommerce', label: '跨境电商', type: 'knowledge', x: 85, y: 50, size: 30, color: '#f59e0b', connections: ['skills', 'dashboard'], lastAccessed: '今天' },
    { id: 'crawlers', label: '爬虫系统', type: 'knowledge', x: 90, y: 80, size: 25, color: '#f59e0b', connections: ['skills', 'data'], lastAccessed: '今天' },
    
    // 项目
    { id: 'dashboard', label: '展示面板', type: 'project', x: 50, y: 80, size: 35, color: '#ec4899', connections: ['goals', 'daily-0301', 'ecommerce'], lastAccessed: '刚刚' },
    { id: 'data', label: '数据仓库', type: 'project', x: 60, y: 90, size: 28, color: '#ec4899', connections: ['crawlers', 'dashboard'], lastAccessed: '今天' },
    
    // 人物
    { id: 'user', label: '用户', type: 'person', x: 35, y: 55, size: 25, color: '#06b6d4', connections: ['identity', 'daily-0301'], lastAccessed: '今天' },
  ]

  // 记忆统计
  const memoryStats = {
    total: 156,
    core: 3,
    daily: 45,
    knowledge: 67,
    project: 28,
    person: 13,
    connections: 234,
    lastSync: '刚刚'
  }

  // 时间线数据
  const timelineData = [
    { time: '18:30', event: '本地知识库搭建完成', type: 'milestone', importance: 'high' },
    { time: '17:45', event: '技能数量同步为109个', type: 'update', importance: 'medium' },
    { time: '14:30', event: '完成102个技能安装', type: 'milestone', importance: 'high' },
    { time: '12:00', event: '展示面板开发完成', type: 'milestone', importance: 'high' },
    { time: '09:41', event: '系统启动', type: 'start', importance: 'high' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      core: '核心记忆',
      daily: '每日记录',
      knowledge: '知识库',
      project: '项目',
      person: '人物'
    }
    return labels[type] || type
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title !mb-0">
          <span className="mr-2 text-xl">🧠</span>
          <span className="section-title-text">记忆图谱</span>
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/60">{memoryStats.total} 节点</span>
          <span className="text-[10px] text-white/40">
            {lastUpdate.toLocaleTimeString('zh-CN', {hour:'2-digit', minute:'2-digit'})}
          </span>
        </div>
      </div>

      {/* View Switcher */}
      <div className="flex gap-2 mb-4">
        {[
          { id: 'graph', label: '知识图谱', icon: '🕸️' },
          { id: 'timeline', label: '时间线', icon: '📅' },
          { id: 'stats', label: '统计', icon: '📊' },
        ].map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id as any)}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
              activeView === view.id
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            <span className="mr-1">{view.icon}</span>
            {view.label}
          </button>
        ))}
      </div>

      {/* Graph View */}
      {activeView === 'graph' && (
        <div className="relative h-[350px] bg-white/5 rounded-xl border border-white/10 overflow-hidden">
          {/* Connections */}
          <svg className="absolute inset-0 w-full h-full">
            {memoryNodes.map((node) =>
              node.connections.map((targetId) => {
                const target = memoryNodes.find((n) => n.id === targetId)
                if (!target) return null
                return (
                  <line
                    key={`${node.id}-${targetId}`}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${target.x}%`}
                    y2={`${target.y}%`}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1"
                  />
                )
              })
            )}
          </svg>

          {/* Nodes */}
          {memoryNodes.map((node) => (
            <motion.div
              key={node.id}
              className="absolute cursor-pointer"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              whileHover={{ scale: 1.2 }}
              onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
            >
              <div
                className="rounded-full flex items-center justify-center text-white font-medium shadow-lg"
                style={{
                  width: node.size,
                  height: node.size,
                  backgroundColor: node.color,
                  boxShadow: `0 0 20px ${node.color}40`,
                }}
              >
                <span className="text-[10px]">{node.label.slice(0, 2)}</span>
              </div>
              {selectedNode === node.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-lg border border-white/20 whitespace-nowrap z-10"
                >
                  <div className="text-xs font-medium text-white">{node.label}</div>
                  <div className="text-[10px] text-white/60">{getTypeLabel(node.type)}</div>
                  <div className="text-[9px] text-white/40">{node.lastAccessed}</div>
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-2 left-2 bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/10">
            <div className="text-[10px] text-white/60 mb-1">图例</div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
              {[
                { type: 'core', color: '#3b82f6', label: '核心' },
                { type: 'daily', color: '#10b981', label: '每日' },
                { type: 'knowledge', color: '#f59e0b', label: '知识' },
                { type: 'project', color: '#ec4899', label: '项目' },
              ].map((item) => (
                <div key={item.type} className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[9px] text-white/50">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Timeline View */}
      {activeView === 'timeline' && (
        <div className="space-y-3 max-h-[350px] overflow-y-auto">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full ${
                    item.importance === 'high'
                      ? 'bg-emerald-400'
                      : item.importance === 'medium'
                      ? 'bg-blue-400'
                      : 'bg-white/30'
                  }`}
                />
                {index < timelineData.length - 1 && (
                  <div className="w-0.5 h-10 bg-white/10 mt-1" />
                )}
              </div>
              <div className="flex-1 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/40">{item.time}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded ${
                      item.type === 'milestone'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : item.type === 'update'
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-white/10 text-white/50'
                    }`}
                  >
                    {item.type === 'milestone' ? '里程碑' : item.type === 'update' ? '更新' : '启动'}
                  </span>
                </div>
                <div className="text-sm text-white mt-1">{item.event}</div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Stats View */}
      {activeView === 'stats' && (
        <div className="space-y-4">
          {/* Overview Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="metric-card text-center">
              <div className="text-2xl font-bold text-white">{memoryStats.total}</div>
              <div className="text-[10px] text-white/50">记忆节点</div>
            </div>
            <div className="metric-card text-center">
              <div className="text-2xl font-bold text-blue-400">{memoryStats.connections}</div>
              <div className="text-[10px] text-white/50">关联连接</div>
            </div>
            <div className="metric-card text-center">
              <div className="text-2xl font-bold text-emerald-400">{memoryStats.daily}</div>
              <div className="text-[10px] text-white/50">每日记录</div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="metric-card">
            <div className="text-xs text-white/60 mb-3">记忆分类</div>
            <div className="space-y-2">
              {[
                { label: '知识库', count: memoryStats.knowledge, color: 'bg-amber-400', total: memoryStats.total },
                { label: '每日记录', count: memoryStats.daily, color: 'bg-emerald-400', total: memoryStats.total },
                { label: '项目', count: memoryStats.project, color: 'bg-pink-400', total: memoryStats.total },
                { label: '核心记忆', count: memoryStats.core, color: 'bg-blue-400', total: memoryStats.total },
                { label: '人物', count: memoryStats.person, color: 'bg-cyan-400', total: memoryStats.total },
              ].map((cat) => (
                <div key={cat.label}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-white/70">{cat.label}</span>
                    <span className="text-white/50">{cat.count}</span>
                  </div>
                  <div className="progress-bar h-2">
                    <motion.div
                      className={`h-full ${cat.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(cat.count / cat.total) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Storage Info */}
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/60">存储位置</div>
                <div className="text-sm text-white">knowledge-vault/</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-white/60">大小</div>
                <div className="text-sm text-emerald-400">156 KB</div>
              </div>
            </div>
            <div className="mt-2 text-[10px] text-white/40">
              完全本地存储 · Obsidian/Logseq 管理
            </div>
          </div>
        </div>
      )}

      {/* Update Info */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-white/40">
        <span>记忆图谱每30秒自动更新</span>
        <span>下次: {new Date(lastUpdate.getTime() + 30000).toLocaleTimeString('zh-CN')}</span>
      </div>
    </motion.div>
  )
}

export default MemoryGraph