import React from 'react'
import { motion } from 'framer-motion'

const MemoryFiles: React.FC = () => {
  const files = [
    { name: 'MEMORY.md', size: '45KB', type: '核心', desc: '长期记忆与核心决策' },
    { name: 'AGENTS.md', size: '13KB', type: '配置', desc: '工作空间指南' },
    { name: 'SOUL.md', size: '9KB', type: '核心', desc: '身份与价值观' },
    { name: 'USER.md', size: '6KB', type: '配置', desc: '用户信息' },
    { name: 'BOOTSTRAP.md', size: '2KB', type: '启动', desc: '初始化配置' },
    { name: 'HEARTBEAT.md', size: '1KB', type: '定时', desc: '心跳任务配置' },
  ]

  const dailyLogs = [
    { date: '2026-03-01', size: '16KB', events: 12 },
    { date: '2026-02-28', size: '14KB', events: 8 },
    { date: '2026-02-27', size: '11KB', events: 6 },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-white">📁 记忆文件</h2>
        <span className="text-xs text-white/60">6文件</span>
      </div>

      {/* Core Files */}
      <div className="space-y-1.5 mb-3">
        {files.map((file, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <span className="text-sm">📄</span>
              <div>
                <div className="text-xs font-medium text-white">{file.name}</div>
                <div className="text-[10px] text-white/50">{file.desc}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-white/60">{file.size}</div>
              <div className={`text-[10px] px-1.5 py-0.5 rounded ${
                file.type === '核心' ? 'bg-red-500/20 text-red-200' :
                file.type === '配置' ? 'bg-blue-500/20 text-blue-200' :
                'bg-gray-500/20 text-gray-200'
              }`}>{file.type}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Daily Logs */}
      <div className="pt-3 border-t border-white/10">
        <div className="text-label mb-2">每日日志</div>
        <div className="space-y-1">
          {dailyLogs.map((log, index) => (
            <div key={index} className="flex items-center justify-between text-xs py-1">
              <span className="text-white/70">{log.date}</span>
              <div className="flex items-center space-x-3">
                <span className="text-white/50">{log.events} 事件</span>
                <span className="text-white/40">{log.size}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default MemoryFiles