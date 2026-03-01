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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧列 */}
          <div className="lg:col-span-2 space-y-6">
            <Dashboard />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ThreadPool />
              <TaskQueue />
            </div>
            <Schedule />
            <DataMetrics />
          </div>
          
          {/* 右侧列 */}
          <div className="space-y-6">
            <SystemStatus />
            <KnowledgeBase />
          </div>
        </div>
      </main>
      <footer className="mt-12 py-6 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>小东AI助手展示面板 • 最后更新: {new Date().toLocaleTimeString('zh-CN')}</p>
        <p className="mt-1">东品西选电商服务（成都）有限公司 • 数据每1分钟更新</p>
      </footer>
    </div>
  )
}

export default App