import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import SystemStatus from './components/SystemStatus'
import ThreadPool from './components/ThreadPool'
import TaskQueue from './components/TaskQueue'
import DataMetrics from './components/DataMetrics'
import KnowledgeBase from './components/KnowledgeBase'
import MemoryFiles from './components/MemoryFiles'
import KnowledgeContent from './components/KnowledgeContent'
import Schedule from './components/Schedule'
import ModelManager from './components/ModelManager'
import MemoryGraph from './components/MemoryGraph'
import APIBalanceMonitor from './components/APIBalanceMonitor'

const tabs = [
  { id: 'overview', label: '概览', icon: '📊' },
  { id: 'data', label: '数据', icon: '📈' },
  { id: 'system', label: '系统', icon: '⚙️' },
  { id: 'schedule', label: '日程', icon: '📅' },
  { id: 'memory', label: '记忆', icon: '🧠' },
  { id: 'library', label: '库', icon: '📚' },
]

function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const [nextRefreshIn, setNextRefreshIn] = useState(600)

  // 全局定时刷新 - 每10分钟
  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date())
      console.log('🔄 全局数据刷新:', new Date().toLocaleString())
    }, 600000) // 10分钟

    // 倒计时显示
    const countdown = setInterval(() => {
      setNextRefreshIn(prev => {
        if (prev <= 0) return 600
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(interval)
      clearInterval(countdown)
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}分${secs}秒`
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-3 md:space-y-4"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
              <div className="lg:col-span-2 space-y-3 md:space-y-4">
                <Dashboard />
                <APIBalanceMonitor />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <ThreadPool />
                  <TaskQueue />
                </div>
              </div>
              <div className="space-y-3 md:space-y-4">
                <ModelManager />
              </div>
            </div>
          </motion.div>
        )
      
      case 'data':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-3 md:space-y-4"
          >
            <DataMetrics />
          </motion.div>
        )
      
      case 'system':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-3 md:space-y-4"
          >
            <SystemStatus />
          </motion.div>
        )
      
      case 'schedule':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-3 md:space-y-4"
          >
            <Schedule />
          </motion.div>
        )
      
      case 'memory':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-3 md:space-y-4"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
              <MemoryGraph />
              <MemoryFiles />
            </div>
          </motion.div>
        )
      
      case 'library':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-3 md:space-y-4"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
              <KnowledgeBase />
              <KnowledgeContent />
            </div>
          </motion.div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900">
      {/* Subtle Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10">
        <Header />
        
        {/* Auto Refresh Indicator */}
        <div className="container mx-auto px-2 md:px-3 max-w-7xl mt-2">
          <div className="flex items-center justify-between text-[10px] text-white/40 bg-white/5 rounded-lg px-3 py-1.5">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span>自动刷新开启</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>上次刷新: {lastRefresh.toLocaleTimeString('zh-CN')}</span>
              <span>下次刷新: {formatTime(nextRefreshIn)}</span>
            </div>
          </div>
        </div>
        
        {/* Tab Navigation - Mobile Optimized */}
        <div className="container mx-auto px-2 md:px-3 max-w-7xl mt-3 md:mt-4">
          <div className="flex space-x-1 bg-white/5 backdrop-blur-sm rounded-xl p-1 border border-white/10 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-1 md:space-x-2 px-2 md:px-4 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all min-w-[60px] md:min-w-0 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-base md:text-lg">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden text-[10px]">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content */}
        <main className="container mx-auto px-2 md:px-3 py-3 md:py-4 max-w-7xl">
          <AnimatePresence mode="wait">
            {renderTabContent()}
          </AnimatePresence>
        </main>
        
        <footer className="mt-6 md:mt-8 py-3 md:py-4 border-t border-white/5 text-center text-[10px] md:text-xs text-white/40">
          <p>小东 • 跨境电商专家 • {new Date().toLocaleTimeString('zh-CN')}</p>
          <p className="mt-0.5 md:mt-1">东品西选电商服务（成都）有限公司</p>
        </footer>
      </div>
    </div>
  )
}

export default App