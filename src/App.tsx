import { motion } from 'framer-motion'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import SystemStatus from './components/SystemStatus'
import ThreadPool from './components/ThreadPool'
import TaskQueue from './components/TaskQueue'
import DataMetrics from './components/DataMetrics'
import KnowledgeBase from './components/KnowledgeBase'
import Schedule from './components/Schedule'

function App() {
  return (
    <div className="min-h-screen">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Header />
        
        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 py-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Features */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Dashboard />
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <ThreadPool />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <TaskQueue />
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Schedule />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <DataMetrics />
              </motion.div>
            </div>
            
            {/* Right Column - Monitoring & Knowledge */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <SystemStatus />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <KnowledgeBase />
              </motion.div>
            </div>
          </div>
        </motion.main>
        
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 py-6 border-t border-white/10 text-center text-white/60 text-sm"
        >
          <p className="animate-pulse">小东AI助手展示面板 • 最后更新: {new Date().toLocaleTimeString('zh-CN')}</p>
          <p className="mt-1">东品西选电商服务（成都）有限公司 • 数据实时更新中...</p>
          <div className="mt-3 flex justify-center space-x-4">
            <a 
              href="http://localhost:3000/xiaodong-dashboard/" 
              className="text-white/70 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              🔄 刷新页面
            </a>
            <span className="text-white/30">•</span>
            <a 
              href="https://github.com/yancyfeng999-star/xiaodong-dashboard" 
              className="text-white/70 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              📁 查看源代码
            </a>
            <span className="text-white/30">•</span>
            <span className="text-green-400 animate-pulse">
              🟢 系统运行正常
            </span>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}

export default App