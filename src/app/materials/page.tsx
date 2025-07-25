'use client';

import { useState } from 'react';
import Link from 'next/link';
import { importantFormulas, frequentTerms, calculationProblems, examTips } from '@/data/examData';

interface TermItem {
  layers?: string[];
  types?: string[];
  forms?: string[];
}

export default function StudyMaterialsPage() {
  const [activeTab, setActiveTab] = useState('diagrams');
  const [selectedCategory, setSelectedCategory] = useState('全て');
  const [selectedDiagram, setSelectedDiagram] = useState('osi-model');

  const categories = ['全て', 'ネットワーク', 'CPU', 'メモリ', 'ディスク', 'セキュリティ', 'データベース', 'システム開発', 'プロジェクト管理'];

  // 応用情報で重要な概念図解データ
  const conceptDiagrams = {
    'osi-model': {
      title: 'OSI参照モデル',
      category: 'ネットワーク',
      description: 'ネットワーク通信の7階層モデル - 試験頻出の基本概念',
      layers: [
        { level: 7, name: 'アプリケーション層', color: 'bg-red-100', description: 'HTTP、SMTP、FTP', protocols: ['HTTP', 'HTTPS', 'SMTP', 'POP3', 'FTP'] },
        { level: 6, name: 'プレゼンテーション層', color: 'bg-orange-100', description: '暗号化、圧縮', protocols: ['SSL/TLS', 'JPEG', 'MPEG'] },
        { level: 5, name: 'セッション層', color: 'bg-yellow-100', description: 'セッション管理', protocols: ['NetBIOS', 'RPC'] },
        { level: 4, name: 'トランスポート層', color: 'bg-green-100', description: 'TCP、UDP', protocols: ['TCP', 'UDP'] },
        { level: 3, name: 'ネットワーク層', color: 'bg-blue-100', description: 'IP、ルーティング', protocols: ['IP', 'ICMP', 'ARP'] },
        { level: 2, name: 'データリンク層', color: 'bg-indigo-100', description: 'Ethernet、スイッチ', protocols: ['Ethernet', 'PPP', 'フレームリレー'] },
        { level: 1, name: '物理層', color: 'bg-purple-100', description: '電気信号、ケーブル', protocols: ['光ファイバ', 'UTP', '無線'] }
      ]
    },
    'tcp-ip': {
      title: 'TCP/IP階層モデル',
      category: 'ネットワーク',
      description: 'インターネットの基盤となる4階層モデル',
      layers: [
        { level: 4, name: 'アプリケーション層', color: 'bg-red-100', description: 'HTTP、SMTP、DNS', detail: 'OSI 5-7層に相当' },
        { level: 3, name: 'トランスポート層', color: 'bg-green-100', description: 'TCP、UDP', detail: 'エンドツーエンド通信' },
        { level: 2, name: 'インターネット層', color: 'bg-blue-100', description: 'IP、ICMP', detail: 'ルーティング制御' },
        { level: 1, name: 'ネットワークインターフェース層', color: 'bg-purple-100', description: 'Ethernet', detail: 'OSI 1-2層に相当' }
      ]
    },
    'cpu-architecture': {
      title: 'CPU内部構造',
      category: 'CPU',
      description: 'コンピュータの中央処理装置の仕組み',
      components: [
        { name: '制御装置', color: 'bg-blue-100', description: '命令の解読と実行制御', detail: 'プログラムカウンタ、命令レジスタ' },
        { name: '演算装置', color: 'bg-green-100', description: '算術・論理演算', detail: 'ALU、アキュムレータ' },
        { name: 'レジスタ', color: 'bg-yellow-100', description: '高速記憶装置', detail: '汎用、インデックス、ベース' },
        { name: 'キャッシュメモリ', color: 'bg-red-100', description: '高速データアクセス', detail: 'L1、L2、L3キャッシュ' }
      ]
    },
    'memory-hierarchy': {
      title: 'メモリ階層',
      category: 'メモリ',
      description: '速度とコストのトレードオフによるメモリ構成',
      levels: [
        { name: 'レジスタ', speed: '最高速', cost: '最高価', capacity: '最小', color: 'bg-red-100' },
        { name: 'キャッシュ', speed: '高速', cost: '高価', capacity: '小', color: 'bg-orange-100' },
        { name: 'メインメモリ', speed: '中速', cost: '中価', capacity: '中', color: 'bg-yellow-100' },
        { name: '補助記憶', speed: '低速', cost: '安価', capacity: '大', color: 'bg-green-100' }
      ]
    },
    'database-architecture': {
      title: 'データベース3層スキーマ',
      category: 'データベース',
      description: 'データベース設計の基本構造',
      schemas: [
        { name: '外部スキーマ', color: 'bg-blue-100', description: 'ユーザビュー', detail: '利用者ごとの見え方' },
        { name: '概念スキーマ', color: 'bg-green-100', description: '論理構造', detail: '全体的なデータ構造' },
        { name: '内部スキーマ', color: 'bg-red-100', description: '物理構造', detail: '実際の格納方式' }
      ]
    },
    'security-layers': {
      title: '情報セキュリティの要素',
      category: 'セキュリティ',
      description: 'CIA triad - 情報セキュリティの基本要素',
      elements: [
        { name: '機密性 (Confidentiality)', color: 'bg-red-100', description: '許可されていない者からの情報保護', examples: ['暗号化', 'アクセス制御'] },
        { name: '完全性 (Integrity)', color: 'bg-green-100', description: '情報の正確性と完全性', examples: ['ハッシュ値', 'デジタル署名'] },
        { name: '可用性 (Availability)', color: 'bg-blue-100', description: '必要な時にアクセス可能', examples: ['冗長化', 'バックアップ'] }
      ]
    },
    'project-lifecycle': {
      title: 'システム開発ライフサイクル',
      category: 'システム開発',
      description: 'ウォーターフォールモデルの開発工程',
      phases: [
        { name: '要件定義', color: 'bg-red-100', description: 'システムに求められる機能・性能の定義', deliverable: '要件定義書' },
        { name: '基本設計', color: 'bg-orange-100', description: 'システムの全体構造設計', deliverable: '基本設計書' },
        { name: '詳細設計', color: 'bg-yellow-100', description: 'プログラムレベルの設計', deliverable: '詳細設計書' },
        { name: '実装', color: 'bg-green-100', description: 'プログラム作成・単体テスト', deliverable: 'プログラム' },
        { name: '結合テスト', color: 'bg-blue-100', description: 'モジュール間の結合確認', deliverable: 'テスト仕様書' },
        { name: '運用・保守', color: 'bg-purple-100', description: 'システムの維持・改善', deliverable: '運用手順書' }
      ]
    }
  };

  const filteredFormulas = selectedCategory === '全て' 
    ? importantFormulas 
    : importantFormulas.filter(formula => formula.category === selectedCategory);

  const filteredTerms = selectedCategory === '全て'
    ? frequentTerms
    : frequentTerms.filter(term => term.category === selectedCategory);

  const filteredProblems = selectedCategory === '全て'
    ? calculationProblems
    : calculationProblems.filter(problem => problem.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* ホームボタン */}
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              ホームに戻る
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            📚 重要知識まとめ
          </h1>
          
          <p className="text-lg text-center mb-8 text-gray-600 dark:text-gray-300">
            応用情報技術者試験によく出る重要な知識と計算問題をまとめました
          </p>

          {/* タブナビゲーション */}
          <div className="flex flex-wrap justify-center mb-8 space-x-2">
            {[
              { id: 'diagrams', label: '🎨 概念図解', icon: '🎨' },
              { id: 'formulas', label: '📐 重要公式', icon: '📐' },
              { id: 'terms', label: '📖 重要用語', icon: '📖' },
              { id: 'problems', label: '🧮 計算問題', icon: '🧮' },
              { id: 'tips', label: '💡 学習のコツ', icon: '💡' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 shadow-md'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* カテゴリフィルター */}
          {(activeTab === 'diagrams' || activeTab === 'formulas' || activeTab === 'terms' || activeTab === 'problems') && (
            <div className="mb-6">
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* コンテンツエリア */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            {activeTab === 'diagrams' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    🎨 概念図解で理解を深めよう
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    応用情報技術者試験で重要な概念を視覚的に学習できます
                  </p>
                </div>

                {/* 図解選択 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {Object.entries(conceptDiagrams)
                    .filter(([_, diagram]) => selectedCategory === '全て' || diagram.category === selectedCategory)
                    .map(([key, diagram]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedDiagram(key)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        selectedDiagram === key
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-lg transform scale-105'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md'
                      }`}
                    >
                      <h3 className="font-bold text-gray-800 dark:text-white mb-2">{diagram.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{diagram.description}</p>
                      <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full text-gray-600 dark:text-gray-300">
                        {diagram.category}
                      </span>
                    </button>
                  ))}
                </div>

                {/* 選択された図解の表示 */}
                {selectedDiagram && conceptDiagrams[selectedDiagram as keyof typeof conceptDiagrams] && (
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                      {conceptDiagrams[selectedDiagram as keyof typeof conceptDiagrams].title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                      {conceptDiagrams[selectedDiagram as keyof typeof conceptDiagrams].description}
                    </p>

                    {/* OSI参照モデル */}
                    {selectedDiagram === 'osi-model' && (
                      <div className="space-y-3">
                        {conceptDiagrams['osi-model'].layers.map((layer) => (
                          <div key={layer.level} className={`${layer.color} rounded-lg p-4 border-2 border-gray-300 shadow-md hover:shadow-lg transition-shadow`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl font-bold text-gray-800">
                                  {layer.level}
                                </div>
                                <div>
                                  <h4 className="text-lg font-bold text-gray-800">{layer.name}</h4>
                                  <p className="text-sm text-gray-600">{layer.description}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xs text-gray-500 mb-1">主要プロトコル</div>
                                <div className="flex flex-wrap gap-1">
                                  {layer.protocols.map((protocol) => (
                                    <span key={protocol} className="px-2 py-1 bg-white/80 rounded text-xs font-medium text-gray-700">
                                      {protocol}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TCP/IP階層モデル */}
                    {selectedDiagram === 'tcp-ip' && (
                      <div className="space-y-4">
                        {conceptDiagrams['tcp-ip'].layers.map((layer) => (
                          <div key={layer.level} className={`${layer.color} rounded-lg p-6 border-2 border-gray-300 shadow-md`}>
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-gray-800">
                                {layer.level}
                              </div>
                              <div className="flex-1">
                                <h4 className="text-xl font-bold text-gray-800 mb-2">{layer.name}</h4>
                                <p className="text-gray-600 mb-1">{layer.description}</p>
                                <p className="text-sm text-gray-500">{layer.detail}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CPU内部構造 */}
                    {selectedDiagram === 'cpu-architecture' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {conceptDiagrams['cpu-architecture'].components.map((component) => (
                          <div key={component.name} className={`${component.color} rounded-lg p-6 border-2 border-gray-300 shadow-md hover:shadow-lg transition-shadow`}>
                            <h4 className="text-lg font-bold text-gray-800 mb-3">{component.name}</h4>
                            <p className="text-gray-600 mb-3">{component.description}</p>
                            <div className="bg-white/80 rounded p-2">
                              <p className="text-sm text-gray-700 font-medium">{component.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* メモリ階層 */}
                    {selectedDiagram === 'memory-hierarchy' && (
                      <div className="space-y-4">
                        {conceptDiagrams['memory-hierarchy'].levels.map((level, index) => (
                          <div key={level.name} className={`${level.color} rounded-lg p-6 border-2 border-gray-300 shadow-md relative`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-lg font-bold text-gray-800">
                                  {index + 1}
                                </div>
                                <h4 className="text-xl font-bold text-gray-800">{level.name}</h4>
                              </div>
                              <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                  <div className="text-xs text-gray-500">速度</div>
                                  <div className="text-sm font-bold text-gray-700">{level.speed}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500">コスト</div>
                                  <div className="text-sm font-bold text-gray-700">{level.cost}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500">容量</div>
                                  <div className="text-sm font-bold text-gray-700">{level.capacity}</div>
                                </div>
                              </div>
                            </div>
                            {index < conceptDiagrams['memory-hierarchy'].levels.length - 1 && (
                              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-2xl text-gray-400">
                                ↓
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* データベース3層スキーマ */}
                    {selectedDiagram === 'database-architecture' && (
                      <div className="space-y-6">
                        {conceptDiagrams['database-architecture'].schemas.map((schema, index) => (
                          <div key={schema.name} className={`${schema.color} rounded-lg p-6 border-2 border-gray-300 shadow-md relative`}>
                            <div className="text-center">
                              <h4 className="text-xl font-bold text-gray-800 mb-2">{schema.name}</h4>
                              <p className="text-lg text-gray-600 mb-2">{schema.description}</p>
                              <p className="text-sm text-gray-500">{schema.detail}</p>
                            </div>
                            {index < conceptDiagrams['database-architecture'].schemas.length - 1 && (
                              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-2xl text-gray-400">
                                ↓
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* セキュリティ要素 */}
                    {selectedDiagram === 'security-layers' && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {conceptDiagrams['security-layers'].elements.map((element) => (
                          <div key={element.name} className={`${element.color} rounded-lg p-6 border-2 border-gray-300 shadow-md hover:shadow-lg transition-shadow`}>
                            <h4 className="text-lg font-bold text-gray-800 mb-3 text-center">{element.name}</h4>
                            <p className="text-gray-600 mb-4 text-center">{element.description}</p>
                            <div className="space-y-2">
                              <div className="text-sm font-medium text-gray-700">実装例:</div>
                              {element.examples.map((example) => (
                                <div key={example} className="bg-white/80 rounded p-2 text-center">
                                  <span className="text-sm text-gray-700">{example}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* システム開発ライフサイクル */}
                    {selectedDiagram === 'project-lifecycle' && (
                      <div className="space-y-4">
                        {conceptDiagrams['project-lifecycle'].phases.map((phase, index) => (
                          <div key={phase.name} className={`${phase.color} rounded-lg p-6 border-2 border-gray-300 shadow-md relative`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-lg font-bold text-gray-800">
                                  {index + 1}
                                </div>
                                <div>
                                  <h4 className="text-xl font-bold text-gray-800">{phase.name}</h4>
                                  <p className="text-gray-600">{phase.description}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xs text-gray-500">成果物</div>
                                <div className="bg-white/80 rounded px-3 py-1 text-sm font-medium text-gray-700">
                                  {phase.deliverable}
                                </div>
                              </div>
                            </div>
                            {index < conceptDiagrams['project-lifecycle'].phases.length - 1 && (
                              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-2xl text-gray-400">
                                ↓
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'formulas' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    📐 重要公式マスター
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    試験でよく出る計算公式を確実に覚えましょう
                  </p>
                </div>
                <div className="grid gap-6">
                  {filteredFormulas.map((formula, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-xl p-6 hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center space-x-2">
                          <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <span>{formula.name}</span>
                        </h3>
                        <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-md">
                          {formula.category}
                        </span>
                      </div>
                      <div className="bg-gradient-to-r from-gray-100 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 mb-4 border-l-4 border-blue-500">
                        <code className="text-lg font-mono text-purple-600 dark:text-purple-400 font-bold">
                          {formula.formula}
                        </code>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3 border-l-4 border-green-500">
                          <div className="text-sm font-bold text-green-800 dark:text-green-200 mb-1">💡 例題</div>
                          <div className="text-sm text-green-700 dark:text-green-300">{formula.example}</div>
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-3 border-l-4 border-yellow-500">
                          <div className="text-sm font-bold text-yellow-800 dark:text-yellow-200 mb-1">📝 ポイント</div>
                          <div className="text-sm text-yellow-700 dark:text-yellow-300">{formula.note}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    📖 重要用語辞典
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    試験に出る重要な技術用語をマスターしましょう
                  </p>
                </div>
                <div className="grid gap-6">
                  {filteredTerms.map((term, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-xl p-6 hover:shadow-xl transition-all duration-200 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center space-x-3">
                          <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <span>{term.term}</span>
                        </h3>
                        <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-full text-sm font-medium shadow-md">
                          {term.category}
                        </span>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg p-4 mb-4 border-l-4 border-blue-500">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {term.description}
                        </p>
                      </div>
                      {((term as TermItem).layers || (term as TermItem).types || (term as TermItem).forms) && (
                        <div className="space-y-2">
                          <div className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">🔍 詳細情報</div>
                          <div className="grid gap-2">
                            {((term as TermItem).layers || (term as TermItem).types || (term as TermItem).forms)?.map((item: string, i: number) => (
                              <div key={i} className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg p-3 border-l-2 border-gray-300 dark:border-gray-500">
                                <div className="text-sm text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                                  <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                    {i + 1}
                                  </span>
                                  <span>{item}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'problems' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    🧮 計算問題道場
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    実際の試験レベルの計算問題で実力をつけましょう
                  </p>
                </div>
                <div className="grid gap-6">
                  {filteredProblems.map((problem, index) => (
                    <div key={problem.id} className="border border-gray-200 dark:border-gray-600 rounded-xl p-6 hover:shadow-xl transition-all duration-200 bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center space-x-3">
                          <span className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            Q{problem.id}
                          </span>
                          <span>計算問題 {problem.id}</span>
                        </h3>
                        <span className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full text-sm font-medium shadow-md">
                          {problem.category}
                        </span>
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg p-4 mb-4 border-l-4 border-blue-500">
                        <div className="text-sm font-bold text-blue-800 dark:text-blue-200 mb-2">📝 問題</div>
                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                          {problem.problem}
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-4 mb-4 border-l-4 border-purple-500">
                        <div className="text-sm font-bold text-purple-800 dark:text-purple-200 mb-2">🔧 解法</div>
                        <code className="text-purple-600 dark:text-purple-400 bg-white/80 dark:bg-gray-700/80 p-2 rounded block">
                          {problem.solution}
                        </code>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg p-4 border-l-4 border-green-500">
                          <div className="text-sm font-bold text-green-800 dark:text-green-200 mb-1">✅ 答え</div>
                          <div className="text-lg font-bold text-green-600 dark:text-green-400">
                            {problem.answer}
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 rounded-lg p-4 border-l-4 border-yellow-500">
                          <div className="text-sm font-bold text-yellow-800 dark:text-yellow-200 mb-1">💡 解説</div>
                          <div className="text-sm text-yellow-700 dark:text-yellow-300">
                            {problem.explanation}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tips' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    💡 合格への学習戦略
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    応用情報技術者試験に合格するための効果的な学習方法
                  </p>
                </div>
                <div className="grid gap-6">
                  {examTips.map((tipCategory, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-xl p-6 hover:shadow-xl transition-all duration-200 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-700">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-3">
                        <span className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <span>{tipCategory.category}</span>
                      </h3>
                      <div className="space-y-4">
                        {tipCategory.tips.map((tip, i) => (
                          <div key={i} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 shadow-md">
                              {i + 1}
                            </div>
                            <div className="flex-1 text-gray-700 dark:text-gray-300 leading-relaxed">
                              {tip}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* 追加の学習アドバイス */}
                <div className="mt-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                    <span>🎯</span>
                    <span>応用情報試験の攻略ポイント</span>
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <h4 className="font-bold mb-2">午前問題対策</h4>
                      <ul className="text-sm space-y-1 opacity-90">
                        <li>• 過去問を最低5年分解く</li>
                        <li>• 計算問題は公式を暗記</li>
                        <li>• 60点以上を安定して取る</li>
                      </ul>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <h4 className="font-bold mb-2">午後問題対策</h4>
                      <ul className="text-sm space-y-1 opacity-90">
                        <li>• 得意分野を2-3個作る</li>
                        <li>• 記述式の練習を重ねる</li>
                        <li>• 時間配分を意識する</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 学習進捗セクション */}
          <div className="mt-8 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center space-x-2">
              <span>📈</span>
              <span>学習進捗ダッシュボード</span>
            </h3>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center border border-white/30">
                <div className="text-3xl font-bold mb-1">60%</div>
                <div className="text-sm opacity-90">午前問題対策</div>
                <div className="w-full bg-white/30 rounded-full h-2 mt-2">
                  <div className="bg-white rounded-full h-2" style={{width: '60%'}}></div>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center border border-white/30">
                <div className="text-3xl font-bold mb-1">45%</div>
                <div className="text-sm opacity-90">午後問題対策</div>
                <div className="w-full bg-white/30 rounded-full h-2 mt-2">
                  <div className="bg-white rounded-full h-2" style={{width: '45%'}}></div>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center border border-white/30">
                <div className="text-3xl font-bold mb-1">180</div>
                <div className="text-sm opacity-90">学習時間 (時間)</div>
                <div className="text-xs opacity-80 mt-1">目標: 300時間</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center border border-white/30">
                <div className="text-3xl font-bold mb-1">75%</div>
                <div className="text-sm opacity-90">過去問正答率</div>
                <div className="text-xs opacity-80 mt-1">目標: 80%</div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg opacity-90 mb-4">
                🎯 試験まであと <span className="font-bold text-yellow-300">45日</span>
              </p>
              <div className="flex justify-center space-x-4">
                <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-2 rounded-lg transition-all duration-200 border border-white/30">
                  📊 詳細分析
                </button>
                <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-2 rounded-lg transition-all duration-200 border border-white/30">
                  📝 学習計画
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
