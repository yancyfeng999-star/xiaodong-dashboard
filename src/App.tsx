import React, { useState } from 'react'
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

const tabs = [
  { id: 'overview', label: '概览', icon: '📊' },
  { id: 'data', label: '数据', icon: '📈' },
  { id: 'system', label: '系统', icon: '⚙️' },
  { id: 'schedule', label: '日程', icon: '📅' },
  { id: 'library', label: '库', icon: '📚' },
]

function App() {
  const [activeTab, setActiveTab] = useState('overview')

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
              <MemoryFiles />
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