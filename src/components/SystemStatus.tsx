import React from 'react'
import { motion } from 'framer-motion'

const SystemStatus: React.FC = () => {
  const metrics = [
    { label: 'CPU', value: 12, unit: '%', color: 'bg-emerald-400' },
    { label: '内存', value: 4.2, unit: 'GB', color: 'bg-blue-400' },
    { label: '磁盘', value: 120, unit: 'GB', color: 'bg-purple-400' },
    { label: '网络', value: 28, unit: 'ms', color: 'bg-amber-400' },
  ]

  const processes = [
    { name: 'OpenClaw', cpu: 8.2, mem: 2.1 },
    { name: 'Python爬虫', cpu: 0.5, mem: 0.8 },
    { name: 'Node API', cpu: 3.1, mem: 1.2 },
    { name: '数据库', cpu: 1.0, mem: 0.5 },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-white">🖥️ 系统监控</h2>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-white/60">健康</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {metrics.map((m, i) => (
          <div key={i} className="metric-card">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-white/70">{m.label}</span>
              <span className="text-sm font-bold text-white">{m.value}{m.unit}</span>
            </div>
            <div className="progress-bar">
              <div className={`h-full rounded-full ${m.color}`} style={{ width: `${Math.min(m.value * 5, 100)}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Processes */}
      <div className="text-label mb-2">进程</div>
      <div className="space-y-1">
        {processes.map((p, i) => (
          <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
              <span className="text-white/80">{p.name}</span>
            </div>
            <div className="flex space-x-3 text-white/50">
              <span>CPU:{p.cpu}%</span>
              <span>Mem:{p.mem}G</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default SystemStatus