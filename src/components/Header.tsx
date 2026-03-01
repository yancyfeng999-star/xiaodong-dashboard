import React from 'react'
import { motion } from 'framer-motion'

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <motion.div
              className="relative"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl font-bold">东</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </motion.div>
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900">小东 AI助手</h1>
              <p className="text-gray-600">东品西选电商服务（成都）有限公司 • 专业跨境电商助手</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <span className="status-indicator status-online">🟢 在线</span>
                <span className="text-sm text-gray-500">负载: 轻量</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">可接收新指令 • 多线程运作中</p>
            </div>
            
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
              刷新数据
            </button>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="metric-card">
            <span className="metric-value">8</span>
            <span className="metric-label">今日完成任务</span>
          </div>
          <div className="metric-card">
            <span className="metric-value">2</span>
            <span className="metric-label">进行中任务</span>
          </div>
          <div className="metric-card">
            <span className="metric-value">3</span>
            <span className="metric-label">等待中任务</span>
          </div>
          <div className="metric-card">
            <span className="metric-value">2.07x</span>
            <span className="metric-label">并行加速比</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header