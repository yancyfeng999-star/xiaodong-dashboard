import React from 'react';
import APIBalanceMonitor from '../components/APIBalanceMonitor';

export default function BalancePage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">API余额监控</h1>
      <APIBalanceMonitor />
    </div>
  );
}
