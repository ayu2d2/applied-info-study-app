'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface SDLCPhase {
  id: number;
  name: string;
  description: string;
  deliverables: string[];
  duration: string;
  color: string;
}

interface ProjectMetric {
  name: string;
  description: string;
  formula: string;
  example: string;
}

const waterfallPhases: SDLCPhase[] = [
  {
    id: 1,
    name: '要件定義',
    description: 'システムに求められる機能・性能・制約を明確化',
    deliverables: ['要件定義書', '機能仕様書', 'ユースケース図'],
    duration: '15%',
    color: 'bg-red-500'
  },
  {
    id: 2,
    name: '外部設計',
    description: 'ユーザーから見えるシステムの設計',
    deliverables: ['外部設計書', '画面設計書', 'インターフェース設計書'],
    duration: '20%',
    color: 'bg-orange-500'
  },
  {
    id: 3,
    name: '内部設計',
    description: 'システム内部の詳細設計',
    deliverables: ['内部設計書', 'データベース設計書', 'プログラム設計書'],
    duration: '20%',
    color: 'bg-yellow-500'
  },
  {
    id: 4,
    name: 'プログラミング',
    description: '設計に基づいたコーディング',
    deliverables: ['ソースコード', 'プログラム仕様書', '単体テスト仕様書'],
    duration: '20%',
    color: 'bg-green-500'
  },
  {
    id: 5,
    name: 'テスト',
    description: 'システムの品質確認と不具合修正',
    deliverables: ['テスト計画書', 'テスト仕様書', 'テスト結果報告書'],
    duration: '20%',
    color: 'bg-blue-500'
  },
  {
    id: 6,
    name: '運用・保守',
    description: 'システムの稼働と継続的な改善',
    deliverables: ['運用マニュアル', '保守計画書', '変更管理書'],
    duration: '5%',
    color: 'bg-purple-500'
  }
];

const projectMetrics: ProjectMetric[] = [
  {
    name: '生産性',
    description: '開発者一人当たりの成果物の量',
    formula: '成果物の量 ÷ 工数',
    example: '1000行 ÷ 10人月 = 100行/人月'
  },
  {
    name: '品質密度',
    description: '成果物に含まれる欠陥の密度',
    formula: '欠陥数 ÷ 成果物の量',
    example: '50個 ÷ 1000行 = 0.05個/行'
  },
  {
    name: 'スケジュール効率',
    description: '計画に対する実績の効率',
    formula: '計画工数 ÷ 実績工数',
    example: '100人月 ÷ 120人月 = 0.83'
  },
  {
    name: 'コスト効率',
    description: '予算に対する実績の効率',
    formula: '計画コスト ÷ 実績コスト',
    example: '1000万円 ÷ 1200万円 = 0.83'
  }
];

const designPatterns = [
  {
    name: 'MVC (Model-View-Controller)',
    description: 'アプリケーションを3つの層に分離',
    components: ['Model: データとビジネスロジック', 'View: 表示・UI', 'Controller: 制御・処理'],
    benefits: '保守性向上、分業しやすい、テストしやすい'
  },
  {
    name: 'Singleton',
    description: 'クラスのインスタンスを1つだけに制限',
    components: ['プライベートコンストラクタ', 'インスタンス生成メソッド', '唯一のインスタンス'],
    benefits: 'リソース管理、設定管理に有効'
  },
  {
    name: 'Observer',
    description: 'オブジェクトの状態変化を他のオブジェクトに通知',
    components: ['Subject: 監視される側', 'Observer: 監視する側', '通知メカニズム'],
    benefits: '疎結合、イベント駆動プログラミング'
  }
];

export default function DevelopmentPage() {
  const [selectedPhase, setSelectedPhase] = useState<SDLCPhase | null>(null);
  const [activeTab, setActiveTab] = useState<'sdlc' | 'metrics' | 'patterns' | 'quality'>('sdlc');
  const [projectProgress, setProjectProgress] = useState({
    planned: 50,
    actual: 45
  });

  const calculateCPI = () => {
    return (projectProgress.planned / projectProgress.actual).toFixed(2);
  };

  const getProgressColor = (cpi: number) => {
    if (cpi >= 1.0) return 'text-green-600';
    if (cpi >= 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-orange-600 hover:text-orange-800 flex items-center mb-4">
            ← ホームに戻る
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            システム開発
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            ソフトウェア開発ライフサイクルとプロジェクト管理について学習しましょう
          </p>
        </div>

        {/* タブナビゲーション */}
        <div className="mb-8">
          <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('sdlc')}
              className={`pb-2 px-4 font-medium ${
                activeTab === 'sdlc'
                  ? 'border-b-2 border-orange-500 text-orange-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              SDLC
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`pb-2 px-4 font-medium ${
                activeTab === 'metrics'
                  ? 'border-b-2 border-orange-500 text-orange-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              メトリクス
            </button>
            <button
              onClick={() => setActiveTab('patterns')}
              className={`pb-2 px-4 font-medium ${
                activeTab === 'patterns'
                  ? 'border-b-2 border-orange-500 text-orange-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              設計パターン
            </button>
            <button
              onClick={() => setActiveTab('quality')}
              className={`pb-2 px-4 font-medium ${
                activeTab === 'quality'
                  ? 'border-b-2 border-orange-500 text-orange-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              品質管理
            </button>
          </div>
        </div>

        {/* SDLCタブ */}
        {activeTab === 'sdlc' && (
          <div className="space-y-8">
            {/* ウォーターフォールモデル */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                ウォーターフォールモデル
              </h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <div className="space-y-2">
                    {waterfallPhases.map((phase, index) => (
                      <div key={phase.id}>
                        <div
                          className={`${phase.color} text-white p-4 rounded-lg cursor-pointer hover:opacity-80 transition-opacity`}
                          onClick={() => setSelectedPhase(phase)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{phase.name}</span>
                            <span className="text-sm opacity-75">{phase.duration}</span>
                          </div>
                        </div>
                        {index < waterfallPhases.length - 1 && (
                          <div className="flex justify-center">
                            <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-gray-400"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {selectedPhase ? (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                        {selectedPhase.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {selectedPhase.description}
                      </p>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                        主な成果物:
                      </h4>
                      <ul className="space-y-1">
                        {selectedPhase.deliverables.map((deliverable, index) => (
                          <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center text-gray-500 dark:text-gray-400">
                      左の工程をクリックして詳細を確認してください
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* アジャイル vs ウォーターフォール */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                開発手法の比較
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                    ウォーターフォール
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">特徴</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• 順次進行型</li>
                        <li>• 前工程完了後に次工程</li>
                        <li>• 詳細な計画・文書化</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">適用場面</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• 要件が明確で変更が少ない</li>
                        <li>• 大規模・長期プロジェクト</li>
                        <li>• 規制・標準が厳しい</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                    アジャイル
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">特徴</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• 反復・漸進型</li>
                        <li>• 短期間での機能追加</li>
                        <li>• 柔軟性・適応性重視</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">適用場面</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• 要件変更が頻繁</li>
                        <li>• 中小規模・短期プロジェクト</li>
                        <li>• 革新的・実験的</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* メトリクスタブ */}
        {activeTab === 'metrics' && (
          <div className="space-y-8">
            {/* プロジェクトメトリクス */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                プロジェクトメトリクス
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {projectMetrics.map((metric, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                      {metric.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {metric.description}
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded p-3 mb-2">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">計算式:</div>
                      <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                        {metric.formula}
                      </code>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3">
                      <div className="text-xs text-blue-600 dark:text-blue-400 mb-1">例:</div>
                      <code className="text-sm font-mono text-blue-800 dark:text-blue-300">
                        {metric.example}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CPI計算ツール */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                コストパフォーマンス指標（CPI）計算ツール
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      出来高（EV: Earned Value）: {projectProgress.planned}万円
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={projectProgress.planned}
                      onChange={(e) => setProjectProgress({...projectProgress, planned: parseInt(e.target.value)})}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      実コスト（AC: Actual Cost）: {projectProgress.actual}万円
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={projectProgress.actual}
                      onChange={(e) => setProjectProgress({...projectProgress, actual: parseInt(e.target.value)})}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    計算結果
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">CPI =</span>
                      <span className={`font-bold ${getProgressColor(parseFloat(calculateCPI()))}`}>
                        {calculateCPI()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {parseFloat(calculateCPI()) >= 1.0 ? 
                        '🟢 予算内で進行中' : 
                        parseFloat(calculateCPI()) >= 0.8 ? 
                        '🟡 注意が必要' : 
                        '🔴 予算超過'}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      CPI = EV ÷ AC<br/>
                      1.0以上: 効率的<br/>
                      1.0未満: 非効率
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 設計パターンタブ */}
        {activeTab === 'patterns' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              主要な設計パターン
            </h2>
            <div className="space-y-6">
              {designPatterns.map((pattern, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                    {pattern.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {pattern.description}
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">構成要素:</h4>
                      <ul className="space-y-1">
                        {pattern.components.map((component, idx) => (
                          <li key={idx} className="flex items-start text-gray-600 dark:text-gray-300">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></div>
                            <span className="text-sm">{component}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">メリット:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {pattern.benefits}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 品質管理タブ */}
        {activeTab === 'quality' && (
          <div className="space-y-8">
            {/* テスト工程 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                テスト工程（V字モデル）
              </h2>
              <div className="relative">
                <div className="grid grid-cols-5 gap-4 mb-8">
                  <div className="text-center">
                    <div className="bg-red-500 text-white p-3 rounded-lg mb-2">要件定義</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">何を作るか</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-orange-500 text-white p-3 rounded-lg mb-2">外部設計</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">どう見せるか</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-yellow-500 text-white p-3 rounded-lg mb-2">内部設計</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">どう作るか</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-500 text-white p-3 rounded-lg mb-2">実装</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">コーディング</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-500 text-white p-3 rounded-lg mb-2">単体テスト</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">部品テスト</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 ml-8">
                  <div className="text-center">
                    <div className="bg-indigo-500 text-white p-3 rounded-lg mb-2">結合テスト</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">内部設計検証</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-500 text-white p-3 rounded-lg mb-2">システムテスト</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">外部設計検証</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-pink-500 text-white p-3 rounded-lg mb-2">受入テスト</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">要件定義検証</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gray-500 text-white p-3 rounded-lg mb-2">運用開始</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">本番稼働</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 品質特性 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                ISO/IEC 25010 品質特性
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: '機能性', desc: '指定された条件下で動作する能力', icon: '⚙️' },
                  { name: '性能効率性', desc: 'リソースを効率的に使用する能力', icon: '🚀' },
                  { name: '互換性', desc: '他のシステムと情報交換する能力', icon: '🔗' },
                  { name: '使用性', desc: 'ユーザーが効率的に利用できる能力', icon: '👤' },
                  { name: '信頼性', desc: '指定された条件下で機能を維持する能力', icon: '🛡️' },
                  { name: 'セキュリティ', desc: '情報を保護する能力', icon: '🔒' },
                  { name: '保守性', desc: '修正・改善しやすい能力', icon: '🔧' },
                  { name: '移植性', desc: '他の環境に移行できる能力', icon: '📦' }
                ].map((quality, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">{quality.icon}</div>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                      {quality.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {quality.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
