import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SystemStatus: React.FC = () => {
  const [showAllProcesses, setShowAllProcesses] = useState(false)

  const resources = [
    { 
      label: 'CPU', 
      used: 12, 
      total: 100,
      unit: '%',
      usedVal: '12%',
      freeVal: '88%',
      color: 'from-emerald-400 to-emerald-500'
    },
    { 
      label: '内存', 
      used: 4.2, 
      total: 16,
      unit: 'GB',
      usedVal: '4.2GB',
      freeVal: '11.8GB',
      color: 'from-blue-400 to-blue-500'
    },
    { 
      label: '磁盘', 
      used: 120, 
      total: 512,
      unit: 'GB',
      usedVal: '120GB',
      freeVal: '392GB',
      color: 'from-purple-400 to-purple-500'
    },
    { 
      label: '带宽', 
      used: 45, 
      total: 100,
      unit: '%',
      usedVal: '45%',
      freeVal: '55%',
      color: 'from-amber-400 to-orange-500'
    },
  ]

  const allProcesses = [
    { name: 'OpenClaw Gateway', cpu: 8.2, mem: 2.1, status: 'running', pid: '1024', uptime: '3天' },
    { name: 'Python爬虫服务', cpu: 0.5, mem: 0.8, status: 'idle', pid: '2048', uptime: '2天' },
    { name: 'Node.js API服务', cpu: 3.1, mem: 1.2, status: 'running', pid: '3072', uptime: '1天' },
    { name: 'SQLite数据库', cpu: 1.0, mem: 0.5, status: 'running', pid: '4096', uptime: '3天' },
    { name: 'React开发服务器', cpu: 2.3, mem: 0.9, status: 'running', pid: '5120', uptime: '2小时' },
    { name: 'Nginx反向代理', cpu: 0.8, mem: 0.3, status: 'running', pid: '6144', uptime: '5天' },
    { name: 'Redis缓存服务', cpu: 0.3, mem: 0.4, status: 'running', pid: '7168', uptime: '5天' },
    { name: 'Elasticsearch', cpu: 4.5, mem: 3.2, status: 'running', pid: '8192', uptime: '4天' },
    { name: 'Kibana监控', cpu: 1.2, mem: 0.8, status: 'running', pid: '9216', uptime: '4天' },
    { name: 'Docker容器', cpu: 2.1, mem: 1.5, status: 'running', pid: '10240', uptime: '6天' },
    { name: 'Git守护进程', cpu: 0.1, mem: 0.1, status: 'idle', pid: '11264', uptime: '7天' },
    { name: 'SSH服务', cpu: 0.2, mem: 0.2, status: 'running', pid: '12288', uptime: '10天' },
  ]

  const displayedProcesses = showAllProcesses ? allProcesses : allProcesses.slice(0, 5)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="section-title">
          <span className="mr-2 text-xl">🖥️</span>
          <span className="section-title-text">系统监控</span>
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-sm text-white/60 font-medium">健康</span>
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {resources.map((res, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.02 }}
            className="metric-card"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-white/70 font-medium">{res.label}</span>
              <div className="text-right">
                <div className="metric-value text-lg">{res.usedVal}</div>
                <div className="text-[10px] text-white/40 font-medium">/ {res.total}{res.unit}</div>
              </div>
            </div>
            
            <div className="progress-bar mb-2">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(res.used / res.total) * 100}%` }}
                transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                className={`h-full bg-gradient-to-r ${res.color} rounded-full`}
              />
            </div>
            
            <div className="flex justify-between text-[11px] font-medium">
              <span className="text-white/40">已用: {res.usedVal}</span>
              <span className="text-emerald-400">剩余: {res.freeVal}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Network Status */}
      <div className="mb-6">
        <div className="text-label mb-3">网络状态</div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="metric-card flex items-center justify-between"
          >
            <div>
              <div className="text-sm text-white/70 font-medium">VPN 状态</div>
              <div className="text-xs text-white/40 mt-0.5">Clash Verge</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
              <span className="text-sm font-semibold text-emerald-400">已连接</span>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="metric-card text-center">
            <div className="metric-value text-lg">28ms</div>
            <div className="metric-label">延迟</div>
          </motion.div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <motion.div whileHover={{ scale: 1.03 }} className="metric-card text-center">
            <div className="metric-value text-lg text-emerald-400">↓ 12.5MB</div>
            <div className="metric-label">下载</div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} className="metric-card text-center">
            <div className="metric-value text-lg text-blue-400">↑ 3.2MB</div>
            <div className="metric-label">上传</div>
          </motion.div>
        </div>
      </div>

      {/* Process Table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-label">进程列表</div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAllProcesses(!showAllProcesses)}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
          >
            <span>{showAllProcesses ? '收起' : '展开'}</span>
            <motion.span animate={{ rotate: showAllProcesses ? 180 : 0 }}>▼</motion.span>
            <span className="text-white/40">({allProcesses.length})</span>
          </motion.button>
        </div>
        
        {/* Table */}
        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
          <div className="grid grid-cols-12 gap-2 px-4 py-2.5 bg-white/5 text-[11px] text-white/50 font-semibold uppercase tracking-wider">
            <div className="col-span-4">进程名</div>
            <div className="col-span-2 text-right">PID</div>
            <div className="col-span-2 text-right">CPU</div>
            <div className="col-span-2 text-right">内存</div>
            <div className="col-span-2 text-right">状态</div>
          </div>
          
          <AnimatePresence>
            {displayedProcesses.map((proc, i) => (
              <motion.div
                key={proc.pid}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
                className="grid grid-cols-12 gap-2 px-4 py-2.5 border-t border-white/5 hover:bg-white/5 transition-colors items-center text-sm"
              >
                <div className="col-span-4">
                  <div className="text-white font-medium truncate">{proc.name}</div>
                  <div className="text-[10px] text-white/40">{proc.uptime}</div>
                </div>
                <div className="col-span-2 text-right text-white/50 font-mono text-xs">{proc.pid}</div>
                <div className="col-span-2 text-right text-white font-medium">{proc.cpu}%</div>
                <div className="col-span-2 text-right text-white font-medium">{proc.mem}GB</div>
                <div className="col-span-2 text-right">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    proc.status === 'running' 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                      : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                  }`}>
                    {proc.status === 'running' ? '运行' : '空闲'}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* System Info */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="grid grid-cols-4 gap-3 text-xs">
          <div className="text-white/40 font-medium">系统: <span className="text-white/80">macOS 15.3</span></div>
          <div className="text-white/40 font-medium">架构: <span className="text-white/80">Apple Silicon</span></div>
          <div className="text-white/40 font-medium">Node: <span className="text-white/80">v24.14.0</span></div>
          <div className="text-white/40 font-medium">进程: <span className="text-white/80">{allProcesses.length}个</span></div>
        </div>
      </div>
    </motion.div>
  )
}

export default SystemStatus