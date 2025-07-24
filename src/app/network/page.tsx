'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface NetworkLayer {
  id: number;
  name: string;
  description: string;
  protocols: string[];
  color: string;
}

const osiLayers: NetworkLayer[] = [
  {
    id: 7,
    name: 'アプリケーション層',
    description: 'ユーザーアプリケーションとネットワークサービスのインターフェース',
    protocols: ['HTTP', 'HTTPS', 'FTP', 'SMTP', 'DNS'],
    color: 'bg-red-500'
  },
  {
    id: 6,
    name: 'プレゼンテーション層',
    description: 'データの暗号化、圧縮、フォーマット変換',
    protocols: ['SSL/TLS', 'JPEG', 'GIF', 'MPEG'],
    color: 'bg-orange-500'
  },
  {
    id: 5,
    name: 'セッション層',
    description: 'アプリケーション間のセッション管理',
    protocols: ['NetBIOS', 'RPC', 'SQL'],
    color: 'bg-yellow-500'
  },
  {
    id: 4,
    name: 'トランスポート層',
    description: 'エンドツーエンドの信頼性のあるデータ転送',
    protocols: ['TCP', 'UDP'],
    color: 'bg-green-500'
  },
  {
    id: 3,
    name: 'ネットワーク層',
    description: 'パケットルーティングとアドレッシング',
    protocols: ['IP', 'ICMP', 'ARP', 'RARP'],
    color: 'bg-blue-500'
  },
  {
    id: 2,
    name: 'データリンク層',
    description: 'フレーム化とエラー検出・訂正',
    protocols: ['Ethernet', 'PPP', 'Frame Relay'],
    color: 'bg-indigo-500'
  },
  {
    id: 1,
    name: 'フィジカル層',
    description: '物理的な信号伝送',
    protocols: ['電気信号', '光信号', '無線信号'],
    color: 'bg-purple-500'
  }
];

export default function NetworkPage() {
  const [selectedLayer, setSelectedLayer] = useState<NetworkLayer | null>(null);
  const [showSimulation, setShowSimulation] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center mb-4">
            ← ホームに戻る
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            ネットワーク学習
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            OSI参照モデルとネットワークプロトコルについて学習しましょう
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* OSI参照モデル */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              OSI参照モデル
            </h2>
            <div className="space-y-2">
              {osiLayers.map((layer) => (
                <div
                  key={layer.id}
                  className={`${layer.color} text-white p-4 rounded-lg cursor-pointer hover:opacity-80 transition-opacity`}
                  onClick={() => setSelectedLayer(layer)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">第{layer.id}層: {layer.name}</span>
                    <span className="text-sm opacity-75">クリックで詳細</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 詳細情報 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              レイヤー詳細
            </h2>
            {selectedLayer ? (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  第{selectedLayer.id}層: {selectedLayer.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {selectedLayer.description}
                </p>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                  主要プロトコル:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedLayer.protocols.map((protocol, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                    >
                      {protocol}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                左のOSI参照モデルの層をクリックして詳細を表示してください
              </p>
            )}
          </div>
        </div>

        {/* ネットワークシミュレーション */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              パケット伝送シミュレーション
            </h2>
            <button
              onClick={() => setShowSimulation(!showSimulation)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {showSimulation ? 'シミュレーション停止' : 'シミュレーション開始'}
            </button>
          </div>

          {showSimulation && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-semibold">
                    PC A
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    送信者
                  </div>
                </div>
                
                <div className="flex-1 mx-8 relative">
                  <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                    <div className="h-full bg-green-500 rounded-full animate-pulse" style={{width: '60%'}}></div>
                  </div>
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 text-sm text-gray-600 dark:text-gray-300">
                    パケット伝送中...
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-gray-600 dark:text-gray-300">
                    受信者
                  </div>
                  <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white font-semibold">
                    PC B
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">送信処理</h4>
                  <ol className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>1. データの分割</li>
                    <li>2. ヘッダー付加</li>
                    <li>3. ルーティング</li>
                    <li>4. 物理送信</li>
                  </ol>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">ネットワーク</h4>
                  <ol className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>1. ルーター通過</li>
                    <li>2. スイッチ通過</li>
                    <li>3. フレーム転送</li>
                    <li>4. 経路選択</li>
                  </ol>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">受信処理</h4>
                  <ol className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>1. 物理受信</li>
                    <li>2. ヘッダー除去</li>
                    <li>3. データ結合</li>
                    <li>4. アプリ配信</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 学習問題 */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            練習問題
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-800 dark:text-white">問題1</h3>
              <p className="text-gray-600 dark:text-gray-300">
                OSI参照モデルにおいて、IPアドレスによるルーティングを行う層はどれですか？
              </p>
              <div className="mt-2 space-y-1">
                <label className="flex items-center">
                  <input type="radio" name="q1" className="mr-2" />
                  <span>トランスポート層</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="q1" className="mr-2" />
                  <span>ネットワーク層</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="q1" className="mr-2" />
                  <span>データリンク層</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
