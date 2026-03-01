import React, { useState } from 'react'
import { motion } from 'framer-motion'

const SystemStatus: React.FC = () => {
  const [showAllProcesses, setShowAllProcesses] = useState(false)

  // 系统资源 - 使用量和剩余量
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

  // 所有进程
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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-white">🖥️ 系统监控</h2>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-white/60">健康</span>
        </div>
      </div>

      {/* Resource Usage Cards */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {resources.map((res, i) => (
          <div key={i} className="metric-card">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-white/70">{res.label}</span>
              <div className="text-right">
                <div className="text-sm font-bold text-white">{res.usedVal}</div>
                <div className="text-[10px] text-white/50">/ {res.total}{res.unit}</div>
              </div>
            </div>
            
            {/* Usage Bar */}
            <div className="progress-bar mb-1">
              <div 
                className={`h-full bg-gradient-to-r ${res.color} rounded-full`}
                style={{ width: `${(res.used / res.total) * 100}%` }}
              ></div>
            </div>
            
            {/* Used/Free */}
            <div className="flex justify-between text-[10px]">
              <span className="text-white/50">已用: {res.usedVal}</span>
              <span className="text-emerald-400">剩余: {res.freeVal}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Process Table */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-label">进程列表</div>
          <button 
            onClick={() => setShowAllProcesses(!showAllProcesses)}
            className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
          >
            <span>{showAllProcesses ? '收起' : '展开'}</span>
            <span>{showAllProcesses ? '▲' : '▼'}</span>
            <span className="text-white/50">({allProcesses.length}个)</span>
          </button>
        </div>
        
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-1 px-2 py-1.5 bg-white/10 text-[10px] text-white/60 font-medium rounded-t-lg">
          <div className="col-span-4">进程名</div>
          <div className="col-span-2 text-right">PID</div>
          <div className="col-span-2 text-right">CPU</div>
          <div className="col-span-2 text-right">内存</div>
          <div className="col-span-2 text-right">状态</div>
        </div>
        
        {/* Table Body */}
        <div className={`overflow-hidden transition-all duration-300 ${showAllProcesses ? 'max-h-[300px]' : 'max-h-[140px]'} overflow-y-auto rounded-b-lg border border-white/10`}>
          {displayedProcesses.map((proc, i) => (
            <motion.div
              key={proc.pid}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
              className="grid grid-cols-12 gap-1 px-2 py-2 border-b border-white/5 hover:bg-white/5 transition-colors items-center text-xs"
            >
              <div className="col-span-4">
                <div className="text-white truncate">{proc.name}</div>
                <div className="text-[10px] text-white/40">{proc.uptime}</div>
              </div>
              <div className="col-span-2 text-right text-white/60">{proc.pid}</div>
              <div className="col-span-2 text-right text-white">{proc.cpu}%</div>
              <div className="col-span-2 text-right text-white">{proc.mem}GB</div>
              <div className="col-span-2 text-right">
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  proc.status === 'running' ? 'bg-emerald-500/20 text-emerald-200' : 'bg-gray-500/20 text-gray-300'
                }`}>
                  {proc.status === 'running' ? '运行' : '空闲'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Network Status */}
      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="text-label mb-2">网络状态</div>
        <div className="grid grid-cols-3 gap-2">
          <div className="metric-card text-center">
            <div className="text-sm font-bold text-white">28ms</div>
            <div className="text-[10px] text-white/50">延迟</div>
          </div>
          <div className="metric-card text-center">
            <div className="text-sm font-bold text-emerald-400">↓ 12.5MB</div>
            <div className="text-[10px] text-white/50">下载</div>
          </div>
          <div className="metric-card text-center">
            <div className="text-sm font-bold text-blue-400">↑ 3.2MB</div>
            <div className="text-[10px] text-white/50">上传</div>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="text-white/50">系统: <span className="text-white/80">macOS 15.3</span></div>
          <div className="text-white/50">架构: <span className="text-white/80">Apple Silicon</span></div>
          <div className="text-white/50">Node: <span className="text-white/80">v24.14.0</span></div>
          <div className="text-white/50">进程: <span className="text-white/80">{allProcesses.length}个</span></div>
        </div>
      </div>
    </motion.div>
  )
}

export default SystemStatus