'use client';

import { useState } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
  explanation: string;
}

interface PerformanceData {
  cpu: number[];
  memory: number[];
  disk: number[];
  network: number[];
}

export default function PerformancePage() {
  const [selectedMetric, setSelectedMetric] = useState('cpu');
  const [performanceData] = useState<PerformanceData>({
    cpu: [45, 52, 48, 61, 55, 67, 59, 72, 68, 74],
    memory: [68, 72, 71, 75, 78, 82, 79, 85, 88, 84],
    disk: [23, 28, 31, 29, 35, 32, 38, 41, 39, 44],
    network: [156, 142, 168, 174, 159, 183, 171, 195, 188, 201]
  });

  const [calculationInputs, setCalculationInputs] = useState({
    throughput: { dataSize: '1000', time: '10' },
    cpuUtilization: { busyTime: '80', totalTime: '100' },
    responseTime: { queueTime: '2', serviceTime: '1' },
    efficiency: { dataBytes: '1000', headerBytes: '20' }
  });

  // パフォーマンス分析問題
  const performanceQuestions: Question[] = [
    {
      id: 1,
      question: "CPUの使用率が80%、メモリ使用率が60%のシステムで、応答時間が遅くなる主な原因は何ですか？",
      options: [
        "CPU処理能力不足",
        "メモリ不足",
        "ディスクI/O待機",
        "ネットワーク遅延"
      ],
      correct: 0,
      category: "システム性能",
      explanation: "CPU使用率が80%と高いため、CPU処理能力が主なボトルネックになっています。"
    },
    {
      id: 2,
      question: "100Mbpsの回線で1GBのデータを転送する理論上の時間は？",
      options: ["8秒", "10秒", "80秒", "100秒"],
      correct: 2,
      category: "ネットワーク性能",
      explanation: "1GB = 8000Mbit、8000Mbit ÷ 100Mbps = 80秒"
    },
    {
      id: 3,
      question: "仮想メモリシステムでページフォルト率が10%の場合、システムの状態はどう評価できますか？",
      options: [
        "正常",
        "やや悪い", 
        "悪い",
        "非常に悪い"
      ],
      correct: 2,
      category: "メモリ管理",
      explanation: "ページフォルト率が10%は高すぎて、頻繁にディスクアクセスが発生し性能が悪化します。"
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const metrics = {
    cpu: { name: 'CPU使用率', unit: '%', color: 'bg-red-500', threshold: 70 },
    memory: { name: 'メモリ使用率', unit: '%', color: 'bg-blue-500', threshold: 80 },
    disk: { name: 'ディスクI/O', unit: '%', color: 'bg-green-500', threshold: 50 },
    network: { name: 'ネットワーク', unit: 'Mbps', color: 'bg-purple-500', threshold: 150 }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === performanceQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < performanceQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const calculateThroughput = () => {
    const dataSize = parseFloat(calculationInputs.throughput.dataSize);
    const time = parseFloat(calculationInputs.throughput.time);
    return (dataSize / time).toFixed(2);
  };

  const calculateCpuUtilization = () => {
    const busyTime = parseFloat(calculationInputs.cpuUtilization.busyTime);
    const totalTime = parseFloat(calculationInputs.cpuUtilization.totalTime);
    return ((busyTime / totalTime) * 100).toFixed(1);
  };

  const calculateResponseTime = () => {
    const queueTime = parseFloat(calculationInputs.responseTime.queueTime);
    const serviceTime = parseFloat(calculationInputs.responseTime.serviceTime);
    return (queueTime + serviceTime).toFixed(1);
  };

  const calculateEfficiency = () => {
    const dataBytes = parseFloat(calculationInputs.efficiency.dataBytes);
    const headerBytes = parseFloat(calculationInputs.efficiency.headerBytes);
    return ((dataBytes / (dataBytes + headerBytes)) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            📊 システム性能分析
          </h1>
          
          <p className="text-lg text-center mb-8 text-gray-600 dark:text-gray-300">
            システムパフォーマンスの監視と分析、計算問題を学習しましょう
          </p>

          {/* パフォーマンス監視ダッシュボード */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              📈 リアルタイムモニタリング
            </h2>
            
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              {Object.entries(metrics).map(([key, metric]) => (
                <button
                  key={key}
                  onClick={() => setSelectedMetric(key)}
                  className={`p-4 rounded-lg transition-all duration-200 ${
                    selectedMetric === key 
                      ? `${metric.color} text-white shadow-lg` 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="text-2xl font-bold">
                    {performanceData[key as keyof PerformanceData][9]}{metric.unit}
                  </div>
                  <div className="text-sm opacity-90">{metric.name}</div>
                </button>
              ))}
            </div>

            {/* パフォーマンスグラフ */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                {metrics[selectedMetric as keyof typeof metrics].name}の推移
              </h3>
              <div className="flex items-end space-x-2 h-32">
                {performanceData[selectedMetric as keyof PerformanceData].map((value, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className={`w-full ${metrics[selectedMetric as keyof typeof metrics].color} rounded-t transition-all duration-300`}
                      style={{ 
                        height: `${(value / Math.max(...performanceData[selectedMetric as keyof PerformanceData])) * 100}%`,
                        minHeight: '8px'
                      }}
                    />
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {value}{metrics[selectedMetric as keyof typeof metrics].unit}
                    </div>
                  </div>
                ))}
              </div>
              {performanceData[selectedMetric as keyof PerformanceData][9] > metrics[selectedMetric as keyof typeof metrics].threshold && (
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
                  <div className="text-red-700 dark:text-red-400 text-sm">
                    ⚠️ 警告: {metrics[selectedMetric as keyof typeof metrics].name}が閾値({metrics[selectedMetric as keyof typeof metrics].threshold}{metrics[selectedMetric as keyof typeof metrics].unit})を超えています
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 計算ツール */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              🧮 性能計算ツール
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* スループット計算 */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  スループット計算
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      データサイズ (MB)
                    </label>
                    <input
                      type="number"
                      value={calculationInputs.throughput.dataSize}
                      onChange={(e) => setCalculationInputs({
                        ...calculationInputs,
                        throughput: { ...calculationInputs.throughput, dataSize: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      転送時間 (秒)
                    </label>
                    <input
                      type="number"
                      value={calculationInputs.throughput.time}
                      onChange={(e) => setCalculationInputs({
                        ...calculationInputs,
                        throughput: { ...calculationInputs.throughput, time: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3">
                    <div className="text-blue-800 dark:text-blue-200 font-semibold">
                      スループット: {calculateThroughput()} MB/秒
                    </div>
                  </div>
                </div>
              </div>

              {/* CPU使用率計算 */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  CPU使用率計算
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      CPU実行時間 (ms)
                    </label>
                    <input
                      type="number"
                      value={calculationInputs.cpuUtilization.busyTime}
                      onChange={(e) => setCalculationInputs({
                        ...calculationInputs,
                        cpuUtilization: { ...calculationInputs.cpuUtilization, busyTime: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      総時間 (ms)
                    </label>
                    <input
                      type="number"
                      value={calculationInputs.cpuUtilization.totalTime}
                      onChange={(e) => setCalculationInputs({
                        ...calculationInputs,
                        cpuUtilization: { ...calculationInputs.cpuUtilization, totalTime: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-3">
                    <div className="text-red-800 dark:text-red-200 font-semibold">
                      CPU使用率: {calculateCpuUtilization()}%
                    </div>
                  </div>
                </div>
              </div>

              {/* 応答時間計算 */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  応答時間計算
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      キューイング時間 (秒)
                    </label>
                    <input
                      type="number"
                      value={calculationInputs.responseTime.queueTime}
                      onChange={(e) => setCalculationInputs({
                        ...calculationInputs,
                        responseTime: { ...calculationInputs.responseTime, queueTime: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      サービス時間 (秒)
                    </label>
                    <input
                      type="number"
                      value={calculationInputs.responseTime.serviceTime}
                      onChange={(e) => setCalculationInputs({
                        ...calculationInputs,
                        responseTime: { ...calculationInputs.responseTime, serviceTime: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3">
                    <div className="text-green-800 dark:text-green-200 font-semibold">
                      応答時間: {calculateResponseTime()}秒
                    </div>
                  </div>
                </div>
              </div>

              {/* 伝送効率計算 */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  伝送効率計算
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      データ部 (バイト)
                    </label>
                    <input
                      type="number"
                      value={calculationInputs.efficiency.dataBytes}
                      onChange={(e) => setCalculationInputs({
                        ...calculationInputs,
                        efficiency: { ...calculationInputs.efficiency, dataBytes: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ヘッダ部 (バイト)
                    </label>
                    <input
                      type="number"
                      value={calculationInputs.efficiency.headerBytes}
                      onChange={(e) => setCalculationInputs({
                        ...calculationInputs,
                        efficiency: { ...calculationInputs.efficiency, headerBytes: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-3">
                    <div className="text-purple-800 dark:text-purple-200 font-semibold">
                      伝送効率: {calculateEfficiency()}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 性能問題クイズ */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              🎯 性能分析問題
            </h2>
            
            {currentQuestion < performanceQuestions.length ? (
              <div>
                <div className="mb-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    問題 {currentQuestion + 1} / {performanceQuestions.length}
                  </span>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    カテゴリ: {performanceQuestions[currentQuestion].category}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    {performanceQuestions[currentQuestion].question}
                  </h3>
                  
                  <div className="space-y-3">
                    {performanceQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                          showResult
                            ? index === performanceQuestions[currentQuestion].correct
                              ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:border-green-600 dark:text-green-200'
                              : index === selectedAnswer && index !== performanceQuestions[currentQuestion].correct
                              ? 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:border-red-600 dark:text-red-200'
                              : 'bg-gray-100 border-gray-300 text-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
                            : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {showResult && (
                  <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">解説</h4>
                    <p className="text-blue-700 dark:text-blue-300">
                      {performanceQuestions[currentQuestion].explanation}
                    </p>
                  </div>
                )}

                {showResult && (
                  <button
                    onClick={nextQuestion}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    次の問題
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  お疲れさまでした！
                </h3>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                  {score} / {performanceQuestions.length} 正解
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  正解率: {((score / performanceQuestions.length) * 100).toFixed(1)}%
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
