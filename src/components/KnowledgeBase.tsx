import React from 'react'

const KnowledgeBase: React.FC = () => {
  const memoryFiles = [
    { name: 'MEMORY.md', size: '8.2KB', updated: '今日', items: 45 },
    { name: 'daily_tasks_log.md', size: '4.1KB', updated: '10:03', items: 32 },
    { name: 'skill_evolution_log.md', size: '3.5KB', updated: '09:55', items: 28 },
    { name: 'learning_log.md', size: '2.8KB', updated: '06:00', items: 15 },
  ]

  const installedSkills = [
    { name: 'frontend-design', category: '设计', installs: '109.8K' },
    { name: 'web-design-guidelines', category: '设计', installs: '136.7K' },
    { name: 'data-visualization', category: '数据', installs: '4.1K' },
    { name: 'kpi-dashboard-design', category: '数据', installs: '2.9K' },
    { name: 'find-skills', category: '工具', installs: '-' },
    { name: 'skill-creator', category: '工具', installs: '54.1K' },
    { name: 'code-simplifier', category: '工具', installs: '1.1K' },
    { name: 'docs-cog', category: '文档', installs: '-' },
  ]

  const learningTopics = [
    { topic: 'LanceDB向量数据库', progress: 100, status: '掌握' },
    { topic: '多线程并行处理', progress: 95, status: '熟练' },
    { topic: 'Python数据分析', progress: 90, status: '熟练' },
    { topic: 'React前端开发', progress: 85, status: '学习中' },
    { topic: '电商选品策略', progress: 88, status: '熟练' },
  ]

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">📚 知识库</h2>
      
      <div className="space-y-6">
        {/* 记忆文件 */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">💾 记忆文件</h3>
          <div className="space-y-2">
            {memoryFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded flex items-center justify-center">
                    <span className="text-primary-600 text-sm">MD</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{file.name}</div>
                    <div className="text-xs text-gray-500">{file.items}条记录</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-900">{file.size}</div>
                  <div className="text-xs text-gray-500">更新: {file.updated}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 已安装技能 */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">🛠️ 已安装Skill</h3>
          <div className="grid grid-cols-2 gap-2">
            {installedSkills.map((skill, index) => (
              <div key={index} className="bg-gray-50 rounded p-2">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-900 truncate">{skill.name}</span>
                  {skill.installs !== '-' && (
                    <span className="text-xs text-gray-500">{skill.installs}</span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">{skill.category}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 学习进度 */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">🎓 学习进度</h3>
          <div className="space-y-3">
            {learningTopics.map((topic, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{topic.topic}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    topic.status === '掌握' ? 'bg-green-100 text-green-800' :
                    topic.status === '熟练' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {topic.status}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-500 rounded-full"
                    style={{ width: `${topic.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">🧠 记忆系统</h4>
              <p className="text-xs text-gray-600 mt-1">每日6:00自动学习，持续积累知识</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary-600">173</div>
              <div className="text-xs text-gray-500">总记忆条目</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KnowledgeBase