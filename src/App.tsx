import { motion } from 'framer-motion'
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
import APIManager from './components/APIManager'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-700 to-slate-800">
      {/* Subtle Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-3 py-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-4">
              <Dashboard />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ThreadPool />
                <TaskQueue />
              </div>
              
              <Schedule />
              <DataMetrics />
            </div>
            
            {/* Right Column */}
            <div className="space-y-4">
              <SystemStatus />
              <APIManager />
              <KnowledgeBase />
              <KnowledgeContent />
              <MemoryFiles />
            </div>
          </div>
        </main>
        
        <footer className="mt-8 py-4 border-t border-white/5 text-center text-xs text-white/40">
          <p>小东AI助手展示面板 • {new Date().toLocaleTimeString('zh-CN')}</p>
          <p className="mt-1">东品西选电商服务（成都）有限公司</p>
        </footer>
      </div>
    </div>
  )
}

export default App