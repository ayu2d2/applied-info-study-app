'use client';

import React, { useState } from 'react';

interface CalculationTool {
  id: string;
  name: string;
  description: string;
  formula: string;
}

const calculationTools: CalculationTool[] = [
  {
    id: 'throughput',
    name: 'スループット計算',
    description: 'ネットワークの実効転送速度を計算',
    formula: 'スループット = データサイズ ÷ 転送時間'
  },
  {
    id: 'cpu_utilization',
    name: 'CPU使用率計算',
    description: 'CPUの使用率を計算',
    formula: 'CPU使用率 = (実行時間 ÷ 総時間) × 100'
  },
  {
    id: 'disk_access',
    name: 'ディスクアクセス時間',
    description: 'ハードディスクのアクセス時間を計算',
    formula: '平均アクセス時間 = シーク時間 + 回転待ち時間 + データ転送時間'
  },
  {
    id: 'network_delay',
    name: 'ネットワーク遅延',
    description: 'パケットの往復時間を計算',
    formula: 'RTT = 伝播遅延 × 2 + 処理遅延'
  }
];

export default function CalculationTools() {
  const [selectedTool, setSelectedTool] = useState('throughput');
  
  // スループット計算
  const [dataSize, setDataSize] = useState(1000);
  const [transferTime, setTransferTime] = useState(10);
  
  // CPU使用率計算
  const [executionTime, setExecutionTime] = useState(80);
  const [totalTime, setTotalTime] = useState(100);
  
  // ディスクアクセス時間
  const [seekTime, setSeekTime] = useState(5);
  const [rotationTime, setRotationTime] = useState(4.17);
  const [dataTransferTime, setDataTransferTime] = useState(1);
  
  // ネットワーク遅延
  const [distance, setDistance] = useState(1000);
  const [processingDelay, setProcessingDelay] = useState(5);

  const calculateThroughput = () => {
    return (dataSize / transferTime).toFixed(2);
  };

  const calculateCPUUtilization = () => {
    return ((executionTime / totalTime) * 100).toFixed(2);
  };

  const calculateDiskAccess = () => {
    return (seekTime + rotationTime + dataTransferTime).toFixed(2);
  };

  const calculateNetworkDelay = () => {
    const lightSpeed = 300000; // km/ms
    const propagationDelay = distance / lightSpeed;
    return ((propagationDelay * 2) + processingDelay).toFixed(4);
  };

  const renderCalculationTool = () => {
    switch (selectedTool) {
      case 'throughput':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">スループット計算</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    データサイズ (MB): {dataSize}
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={dataSize}
                    onChange={(e) => setDataSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    転送時間 (秒): {transferTime}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="60"
                    value={transferTime}
                    onChange={(e) => setTransferTime(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">計算結果</h4>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {calculateThroughput()} MB/秒
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  計算式: {dataSize} MB ÷ {transferTime} 秒
                </div>
              </div>
            </div>
          </div>
        );

      case 'cpu_utilization':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">CPU使用率計算</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    実行時間 (ms): {executionTime}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={executionTime}
                    onChange={(e) => setExecutionTime(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    総時間 (ms): {totalTime}
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="200"
                    value={totalTime}
                    onChange={(e) => setTotalTime(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">計算結果</h4>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {calculateCPUUtilization()}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  計算式: ({executionTime} ÷ {totalTime}) × 100
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${calculateCPUUtilization()}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'disk_access':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">ディスクアクセス時間計算</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    シーク時間 (ms): {seekTime}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="0.1"
                    value={seekTime}
                    onChange={(e) => setSeekTime(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    平均回転待ち時間 (ms): {rotationTime}
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="8"
                    step="0.1"
                    value={rotationTime}
                    onChange={(e) => setRotationTime(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    データ転送時間 (ms): {dataTransferTime}
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.1"
                    value={dataTransferTime}
                    onChange={(e) => setDataTransferTime(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">計算結果</h4>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {calculateDiskAccess()} ms
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <div>シーク時間: {seekTime} ms</div>
                  <div>回転待ち時間: {rotationTime} ms</div>
                  <div>データ転送時間: {dataTransferTime} ms</div>
                  <div className="border-t pt-1 mt-2">
                    合計: {seekTime} + {rotationTime} + {dataTransferTime}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'network_delay':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">ネットワーク遅延計算</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    距離 (km): {distance}
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="20000"
                    step="100"
                    value={distance}
                    onChange={(e) => setDistance(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    処理遅延 (ms): {processingDelay}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={processingDelay}
                    onChange={(e) => setProcessingDelay(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">計算結果</h4>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {calculateNetworkDelay()} ms
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <div>距離: {distance} km</div>
                  <div>光速: 300,000 km/ms</div>
                  <div>伝播遅延: {(distance / 300000).toFixed(4)} ms</div>
                  <div>往復: {((distance / 300000) * 2).toFixed(4)} ms</div>
                  <div>処理遅延: {processingDelay} ms</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        応用情報でよく出る計算問題
      </h2>
      
      {/* ツール選択 */}
      <div className="mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {calculationTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                selectedTool === tool.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tool.name}
            </button>
          ))}
        </div>
      </div>

      {/* 選択されたツールの表示 */}
      <div className="mb-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            {calculationTools.find(tool => tool.id === selectedTool)?.description}
          </p>
          <div className="text-xs font-mono text-gray-500 dark:text-gray-400">
            {calculationTools.find(tool => tool.id === selectedTool)?.formula}
          </div>
        </div>
      </div>

      {/* 計算ツール */}
      {renderCalculationTool()}
    </div>
  );
}
