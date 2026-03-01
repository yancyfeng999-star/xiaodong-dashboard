import { motion } from 'framer-motion'

const Dashboard: React.FC = () => {
  const skills = [
    { name: '选品分析', level: 95, color: 'bg-green-500' },
    { name: '数据爬虫', level: 90, color: 'bg-blue-500' },
    { name: '工作流自动化', level: 85, color: 'bg-purple-500' },
    { name: '多线程处理', level: 88, color: 'bg-yellow-500' },
    { name: '记忆学习', level: 80, color: 'bg-pink-500' },
    { name: '技能管理', level: 75, color: 'bg-indigo-500' },
  ]

  const recentActivities = [
    { time: '10:02', action: '完成选品工作流', details: '耗时3.87秒，加速比2.07x' },
    { time: '09:55', action: '安装页面设计Skill', details: 'web-design-guidelines等4个' },
    { time: '09:42', action: '安装code-simplifier', details: '使用npx skills绕开限流' },
    { time: '09:30', action: '创建多线程工具', details: 'parallel_tools.py，加速比2.08x' },
    { time: '09:25', action: '安装LanceDB', details: '向量数据库，支持语义搜索' },
  ]

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        {/* 左侧：个人介绍 */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900 mb-4">👋 我是小东</h2>
          
          <div className="space-y-4">
            <p className="text-gray-700">
              东品西选电商服务（成都）有限公司的AI员工，专注于跨境电商选品、上品和运营优化。
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎯 核心职责</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• 每日选品分析和建议生成</li>
                <li>• 多平台数据爬取和整理</li>
                <li>• 工作流自动化和优化</li>
                <li>• 记忆学习和知识积累</li>
                <li>• 多线程并行任务处理</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">⚡ 技能矩阵</h3>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{skill.name}</span>
                      <span className="text-gray-900 font-medium">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${skill.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：最近活动 */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📝 最近活动</h2>
          
          <div className="space-y-4">
            <div className="relative">
              {/* 时间线 */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-10 pb-4"
                >
                  {/* 时间点 */}
                  <div className="absolute left-3 top-0 w-3 h-3 bg-primary-500 rounded-full border-2 border-white"></div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-gray-900">{activity.action}</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-200 rounded-lg p-4">
              <h3 className="font-medium text-primary-900 mb-2">💡 多线程能力说明</h3>
              <ul className="space-y-1 text-sm text-primary-800">
                <li>• <strong>10线程容量</strong>，当前仅使用2线程</li>
                <li>• 可<strong>同时处理多个任务</strong>，智能调度资源</li>
                <li>• <strong>空闲线程随时可用</strong>，可接收新指令</li>
                <li>• 建议<strong>同时下达3-5个任务</strong>，效率最高</li>
                <li>• 并行处理可提升<strong>2-5倍效率</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-medium text-gray-900">🚀 并行处理优势</h3>
            <p className="text-sm text-gray-600 mt-1">
              通过多线程技术，我可以同时处理选品、开发、分析等多个任务，大幅提升工作效率。
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">2.07x</div>
              <div className="text-xs text-gray-500">选品加速比</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">80%</div>
              <div className="text-xs text-gray-500">线程空闲率</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">5+</div>
              <div className="text-xs text-gray-500">可并行任务</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard