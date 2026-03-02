import React, { useState, useEffect } from 'react';

interface BalanceData {
  timestamp: string;
  platforms: {
    [key: string]: {
      status: string;
      platform?: string;
      balance?: number | string;
      currency?: string;
      message?: string;
    }
  };
}

export default function APIBalanceMonitor() {
  const [currentData, setCurrentData] = useState<BalanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const fetchData = async () => {
    try {
      const currentRes = await fetch('/data/api_balance_current.json');
      if (currentRes.ok) {
        const current = await currentRes.json();
        setCurrentData(current);
        setLastUpdate(current.timestamp);
      }
    } catch (error) {
      console.error('获取余额数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getAlerts = () => {
    const alerts: string[] = [];
    if (currentData) {
      Object.entries(currentData.platforms).forEach(([key, data]) => {
        if (data.status === 'ok' && typeof data.balance === 'number') {
          const threshold = key === 'openrouter' ? 1 : 10;
          if (data.balance < threshold) {
            alerts.push(`${data.platform || key} 余额不足: ${data.balance} ${data.currency}`);
          }
        }
      });
    }
    return alerts;
  };

  const alerts = getAlerts();

  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-center text-white/60">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
          加载余额数据...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10">
      {/* 标题 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">💰</span>
          <h3 className="text-lg font-semibold text-white">API余额监控</h3>
        </div>
        <div className="text-xs text-white/40">
          更新: {lastUpdate}
          <button onClick={fetchData} className="ml-2 px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-white/60 text-xs">
            刷新
          </button>
        </div>
      </div>

      {/* 告警 */}
      {alerts.length > 0 && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <span>⚠️</span>
            <div>
              {alerts.map((alert, idx) => (
                <div key={idx}>{alert}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 余额卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {currentData && Object.entries(currentData.platforms).map(([key, data]) => {
          const isLow = data.status === 'ok' && typeof data.balance === 'number' && 
            (key === 'openrouter' ? data.balance < 1 : data.balance < 10);
          
          return (
            <div 
              key={key} 
              className={`p-4 rounded-lg border ${isLow ? 'bg-red-500/10 border-red-500/30' : 'bg-white/5 border-white/10'}`}
            >
              <div className="text-xs text-white/50 mb-1">{data.platform || key}</div>
              {data.status === 'ok' ? (
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-bold text-white">
                      {typeof data.balance === 'number' 
                        ? `${data.balance.toFixed(2)} ${data.currency}`
                        : `${data.balance}`
                      }
                    </div>
                    <div className={`text-xs mt-1 ${isLow ? 'text-red-400' : 'text-green-400'}`}>
                      {isLow ? '⚠️ 余额不足' : '✅ 余额充足'}
                    </div>
                  </div>
                  {isLow && <span className="text-red-500 text-lg">⚠️</span>}
                </div>
              ) : (
                <div className="text-red-400 text-sm">{data.message || '查询失败'}</div>
              )}
            </div>
          );
        })}
      </div>

      {/* 说明 */}
      <div className="mt-4 text-xs text-white/30">
        <p>• 每10分钟自动更新 • 保留7天历史记录</p>
      </div>
    </div>
  );
}
