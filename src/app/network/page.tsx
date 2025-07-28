'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const networkConcepts = [
  {
    id: 'osi-model',
    name: 'OSI参照モデル',
    description: '7層に分かれたネットワーク通信モデル',
    category: 'fundamental',
    layers: [
      { level: 7, name: 'アプリケーション層', protocols: ['HTTP', 'HTTPS', 'FTP', 'SMTP'], color: 'bg-red-400', description: 'ユーザーアプリケーションとの直接的なインターフェース' },
      { level: 6, name: 'プレゼンテーション層', protocols: ['SSL/TLS', 'JPEG', 'GIF'], color: 'bg-orange-400', description: 'データの表現形式、暗号化、圧縮' },
      { level: 5, name: 'セッション層', protocols: ['NetBIOS', 'RPC'], color: 'bg-yellow-400', description: 'セッションの確立、管理、終了' },
      { level: 4, name: 'トランスポート層', protocols: ['TCP', 'UDP'], color: 'bg-green-400', description: 'エンドツーエンドの信頼性のあるデータ転送' },
      { level: 3, name: 'ネットワーク層', protocols: ['IP', 'ICMP', 'ARP'], color: 'bg-blue-400', description: 'ルーティングとパケット転送' },
      { level: 2, name: 'データリンク層', protocols: ['Ethernet', 'Wi-Fi'], color: 'bg-indigo-400', description: 'フレーム転送とエラー検出' },
      { level: 1, name: '物理層', protocols: ['ケーブル', '電気信号'], color: 'bg-purple-400', description: 'ビットレベルでの物理的な伝送' }
    ]
  },
  {
    id: 'ip-addressing',
    name: 'IPアドレッシング',
    description: 'IPv4とIPv6のアドレス体系とサブネット',
    category: 'addressing',
    concepts: [
      {
        type: 'IPv4クラス',
        classes: [
          { class: 'A', range: '1.0.0.0 - 126.255.255.255', mask: '/8', networks: '128', hosts: '16,777,214', usage: '大規模ネットワーク' },
          { class: 'B', range: '128.0.0.0 - 191.255.255.255', mask: '/16', networks: '16,384', hosts: '65,534', usage: '中規模ネットワーク' },
          { class: 'C', range: '192.0.0.0 - 223.255.255.255', mask: '/24', networks: '2,097,152', hosts: '254', usage: '小規模ネットワーク' }
        ]
      },
      {
        type: 'プライベートアドレス',
        ranges: [
          { class: 'A', range: '10.0.0.0/8', description: '大企業・ISP' },
          { class: 'B', range: '172.16.0.0/12', description: '中規模組織' },
          { class: 'C', range: '192.168.0.0/16', description: '家庭・小規模オフィス' }
        ]
      }
    ]
  },
  {
    id: 'protocols',
    name: 'ネットワークプロトコル',
    description: '主要な通信プロトコルの特徴と用途',
    category: 'protocols',
    protocolCategories: [
      {
        name: 'アプリケーション層プロトコル',
        protocols: [
          { name: 'HTTP', port: '80', security: '暗号化なし', usage: 'Webページの表示', reliability: '信頼性あり(TCP)' },
          { name: 'HTTPS', port: '443', security: 'SSL/TLS暗号化', usage: 'セキュアなWeb通信', reliability: '信頼性あり(TCP)' },
          { name: 'FTP', port: '20/21', security: '平文', usage: 'ファイル転送', reliability: '信頼性あり(TCP)' },
          { name: 'SMTP', port: '25', security: '平文/暗号化', usage: 'メール送信', reliability: '信頼性あり(TCP)' },
          { name: 'DNS', port: '53', security: '平文', usage: 'ドメイン名解決', reliability: '高速(UDP)' }
        ]
      },
      {
        name: 'トランスポート層プロトコル',
        protocols: [
          { name: 'TCP', port: '-', security: '信頼性重視', usage: 'データの確実な転送', reliability: 'コネクション型' },
          { name: 'UDP', port: '-', security: '速度重視', usage: 'リアルタイム通信', reliability: 'コネクションレス型' }
        ]
      }
    ]
  }
];

export default function NetworkPage() {
  const [selectedConcept, setSelectedConcept] = useState('osi-model');
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const currentConcept = networkConcepts.find(c => c.id === selectedConcept);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-green-600 hover:text-green-800 flex items-center mb-4">
            ← ホームに戻る
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            🌐 ネットワーク技術
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            ネットワークの基礎概念から実践的な技術まで、図解で理解しましょう
          </p>
        </div>

        {/* コンセプト選択タブ */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 mb-6">
            {networkConcepts.map((concept) => (
              <button
                key={concept.id}
                onClick={() => setSelectedConcept(concept.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedConcept === concept.id
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {concept.name}
              </button>
            ))}
          </div>

          {currentConcept && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                {currentConcept.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {currentConcept.description}
              </p>

              {/* OSI参照モデルの表示 */}
              {selectedConcept === 'osi-model' && currentConcept.layers && (
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">OSI 7層モデル</h3>
                    <div className="space-y-2">
                      {currentConcept.layers.map((layer) => (
                        <div
                          key={layer.level}
                          className={`${layer.color} rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                            selectedLayer === layer.level ? 'ring-4 ring-green-500' : ''
                          }`}
                          onClick={() => setSelectedLayer(layer.level === selectedLayer ? null : layer.level)}
                        >
                          <div className="flex justify-between items-center text-white">
                            <div>
                              <span className="font-bold">第{layer.level}層</span>
                              <span className="ml-2">{layer.name}</span>
                            </div>
                            <span className="text-sm">
                              {layer.protocols.slice(0, 2).join(', ')}
                              {layer.protocols.length > 2 && '...'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    {selectedLayer && (
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                        {(() => {
                          const layer = currentConcept.layers?.find(l => l.level === selectedLayer);
                          return layer ? (
                            <>
                              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                                第{layer.level}層: {layer.name}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-300 mb-4">
                                {layer.description}
                              </p>
                              <div>
                                <h5 className="font-medium text-gray-800 dark:text-white mb-2">主要プロトコル:</h5>
                                <div className="flex flex-wrap gap-2">
                                  {layer.protocols.map((protocol, index) => (
                                    <span
                                      key={index}
                                      className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm"
                                    >
                                      {protocol}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </>
                          ) : null;
                        })()}
                      </div>
                    )}
                    {!selectedLayer && (
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
                        <p className="text-gray-500 dark:text-gray-400">
                          層をクリックして詳細を表示
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* IPアドレッシングの表示 */}
              {selectedConcept === 'ip-addressing' && currentConcept.concepts && (
                <div className="space-y-8">
                  {currentConcept.concepts.map((concept, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                        {concept.type}
                      </h3>
                      
                      {concept.classes && (
                        <div className="overflow-x-auto">
                          <table className="w-full bg-white dark:bg-gray-700 rounded-lg shadow">
                            <thead className="bg-green-500 text-white">
                              <tr>
                                <th className="px-4 py-3 text-left">クラス</th>
                                <th className="px-4 py-3 text-left">IPアドレス範囲</th>
                                <th className="px-4 py-3 text-left">サブネットマスク</th>
                                <th className="px-4 py-3 text-left">ネットワーク数</th>
                                <th className="px-4 py-3 text-left">ホスト数</th>
                                <th className="px-4 py-3 text-left">用途</th>
                              </tr>
                            </thead>
                            <tbody>
                              {concept.classes.map((cls, clsIndex) => (
                                <tr 
                                  key={clsIndex}
                                  className={`border-b dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 ${
                                    selectedClass === cls.class ? 'bg-green-50 dark:bg-green-900/20' : ''
                                  }`}
                                  onClick={() => setSelectedClass(selectedClass === cls.class ? null : cls.class)}
                                >
                                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-white">クラス{cls.class}</td>
                                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{cls.range}</td>
                                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{cls.mask}</td>
                                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{cls.networks}</td>
                                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{cls.hosts}</td>
                                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{cls.usage}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {concept.ranges && (
                        <div className="grid md:grid-cols-3 gap-4">
                          {concept.ranges.map((range, rangeIndex) => (
                            <div key={rangeIndex} className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow">
                              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                                クラス{range.class}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                {range.range}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {range.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* プロトコルの表示 */}
              {selectedConcept === 'protocols' && currentConcept.protocolCategories && (
                <div className="space-y-8">
                  {currentConcept.protocolCategories.map((category, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                        {category.name}
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full bg-white dark:bg-gray-700 rounded-lg shadow">
                          <thead className="bg-green-500 text-white">
                            <tr>
                              <th className="px-4 py-3 text-left">プロトコル</th>
                              <th className="px-4 py-3 text-left">ポート番号</th>
                              <th className="px-4 py-3 text-left">セキュリティ</th>
                              <th className="px-4 py-3 text-left">用途</th>
                              <th className="px-4 py-3 text-left">信頼性</th>
                            </tr>
                          </thead>
                          <tbody>
                            {category.protocols.map((protocol, protocolIndex) => (
                              <tr key={protocolIndex} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-4 py-3 font-semibold text-gray-800 dark:text-white">{protocol.name}</td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{protocol.port}</td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{protocol.security}</td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{protocol.usage}</td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{protocol.reliability}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
