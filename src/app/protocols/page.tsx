'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const protocols = [
  {
    id: 'tcp-handshake',
    name: 'TCPハンドシェイク',
    description: 'TCPコネクション確立の3ウェイハンドシェイク',
    category: 'transport',
    steps: [
      { id: 1, client: 'SYN送信', server: 'SYN受信', description: 'クライアントが接続要求を送信' },
      { id: 2, client: 'SYN+ACK受信', server: 'SYN+ACK送信', description: 'サーバーが応答と接続許可を送信' },
      { id: 3, client: 'ACK送信', server: 'ACK受信', description: 'クライアントが確認応答を送信し接続確立' }
    ]
  },
  {
    id: 'http-request',
    name: 'HTTP通信',
    description: 'WebブラウザとWebサーバー間のHTTP通信フロー',
    category: 'application',
    steps: [
      { id: 1, client: 'DNS問い合わせ', server: 'DNSサーバー', description: 'ドメイン名をIPアドレスに変換' },
      { id: 2, client: 'TCP接続確立', server: 'Webサーバー', description: 'TCPコネクションを確立' },
      { id: 3, client: 'HTTP GET送信', server: 'HTTP GET受信', description: 'Webページの取得要求' },
      { id: 4, client: 'HTTP レスポンス受信', server: 'HTTP レスポンス送信', description: 'HTMLデータを送信' },
      { id: 5, client: 'TCP接続終了', server: 'TCP接続終了', description: 'コネクションを終了' }
    ]
  },
  {
    id: 'dhcp-process',
    name: 'DHCP取得',
    description: 'デバイスが自動的にIPアドレスを取得するプロセス',
    category: 'network',
    steps: [
      { id: 1, client: 'DHCP Discover', server: 'ブロードキャスト受信', description: 'DHCPサーバーを探索' },
      { id: 2, client: 'DHCP Offer受信', server: 'DHCP Offer送信', description: 'IPアドレスを提案' },
      { id: 3, client: 'DHCP Request送信', server: 'DHCP Request受信', description: '提案されたIPアドレスを要求' },
      { id: 4, client: 'DHCP ACK受信', server: 'DHCP ACK送信', description: 'IPアドレス割り当て完了' }
    ]
  },
  {
    id: 'dns-resolution',
    name: 'DNS名前解決',
    description: 'ドメイン名からIPアドレスを取得する階層的な名前解決',
    category: 'application',
    steps: [
      { id: 1, client: 'DNS問い合わせ', server: 'ローカルDNS', description: 'ローカルDNSサーバーに問い合わせ' },
      { id: 2, client: '待機', server: 'ルートDNS問い合わせ', description: 'ルートDNSサーバーに問い合わせ' },
      { id: 3, client: '待機', server: 'TLD DNS問い合わせ', description: 'トップレベルドメインDNSに問い合わせ' },
      { id: 4, client: '待機', server: '権威DNS問い合わせ', description: '権威DNSサーバーに問い合わせ' },
      { id: 5, client: 'IPアドレス受信', server: 'IPアドレス送信', description: '最終的なIPアドレスを回答' }
    ]
  },
  {
    id: 'ssl-handshake',
    name: 'SSL/TLSハンドシェイク',
    description: 'セキュアな通信を確立するためのSSL/TLS暗号化プロセス',
    category: 'security',
    steps: [
      { id: 1, client: 'Client Hello', server: 'Client Hello受信', description: '暗号化方式を提案' },
      { id: 2, client: 'Server Hello受信', server: 'Server Hello送信', description: '暗号化方式を選択' },
      { id: 3, client: '証明書検証', server: '証明書送信', description: 'サーバー証明書を送信' },
      { id: 4, client: '共通鍵生成', server: '共通鍵交換', description: '共通鍵を安全に交換' },
      { id: 5, client: '暗号化開始', server: '暗号化開始', description: '暗号化通信を開始' }
    ]
  }
];

export default function ProtocolsPage() {
  const [selectedProtocol, setSelectedProtocol] = useState('tcp-handshake');
  const [currentStep, setCurrentStep] = useState(0);

  const currentProtocol = protocols.find(p => p.id === selectedProtocol);

  useEffect(() => {
    setCurrentStep(0);
  }, [selectedProtocol]);

  const nextStep = () => {
    if (currentProtocol && currentStep < currentProtocol.steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetAnimation = () => {
    setCurrentStep(0);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'transport': return 'bg-blue-500';
      case 'application': return 'bg-green-500';
      case 'network': return 'bg-yellow-500';
      case 'security': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-yellow-600 hover:text-yellow-800 flex items-center mb-4">
            ← ホームに戻る
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            📡 プロトコル図解
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            通信プロトコルの動作を手動で進めながら視覚的に理解しましょう
          </p>
        </div>

        {/* プロトコル選択 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 mb-6">
            {protocols.map((protocol) => (
              <button
                key={protocol.id}
                onClick={() => setSelectedProtocol(protocol.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedProtocol === protocol.id
                    ? 'bg-yellow-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${getCategoryColor(protocol.category)}`}></span>
                {protocol.name}
              </button>
            ))}
          </div>

          {currentProtocol && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                    {currentProtocol.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {currentProtocol.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
                  >
                    ← 前へ
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={currentStep >= (currentProtocol?.steps.length || 0)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-600"
                  >
                    次へ →
                  </button>
                  <button
                    onClick={resetAnimation}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    リセット
                  </button>
                </div>
              </div>

              {/* ステップインジケーター */}
              <div className="flex mb-6">
                {currentProtocol.steps.map((_, index) => (
                  <div
                    key={index}
                    className={`flex-1 h-3 mx-1 rounded ${
                      index < currentStep ? 'bg-yellow-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* アニメーション表示エリア */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 mb-6">
                <div className="flex items-center justify-between max-w-4xl mx-auto">
                  {/* クライアント */}
                  <div className="text-center">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl mb-4 transition-all duration-500 ${
                      currentStep > 0 ? 'bg-blue-500 scale-110' : 'bg-blue-400'
                    }`}>
                      💻
                    </div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">クライアント</h3>
                  </div>

                  {/* 通信の矢印とメッセージ */}
                  <div className="flex-1 mx-8">
                    <div className="relative">
                      {/* データ送信のアニメーション */}
                      {currentStep > 0 && (
                        <div className="absolute top-1/2 transform -translate-y-1/2 w-full">
                          <div className={`bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm ${
                            currentStep % 2 === 1 ? 'text-left' : 'text-right'
                          }`}>
                            {currentProtocol.steps[currentStep - 1]?.description}
                          </div>
                          <div className={`w-0 h-0 border-t-4 border-b-4 border-transparent mt-2 ${
                            currentStep % 2 === 1 
                              ? 'border-l-4 border-l-yellow-500 ml-auto'
                              : 'border-r-4 border-r-yellow-500'
                          }`}></div>
                        </div>
                      )}
                      
                      {/* 基本の矢印 */}
                      <div className="flex items-center justify-center">
                        <div className="w-full h-1 bg-gray-300 dark:bg-gray-600"></div>
                        <svg className="w-6 h-6 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <div className="w-full h-1 bg-gray-300 dark:bg-gray-600"></div>
                      </div>
                    </div>
                  </div>

                  {/* サーバー */}
                  <div className="text-center">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl mb-4 transition-all duration-500 ${
                      currentStep > 0 ? 'bg-green-500 scale-110' : 'bg-green-400'
                    }`}>
                      🖥️
                    </div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">サーバー</h3>
                  </div>
                </div>

                {/* 現在のステップ情報 */}
                {currentStep > 0 && currentProtocol.steps[currentStep - 1] && (
                  <div className="text-center mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                      ステップ {currentStep}: {currentProtocol.steps[currentStep - 1].description}
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
                      <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded">
                        <span className="font-medium">クライアント: </span>
                        {currentProtocol.steps[currentStep - 1].client}
                      </div>
                      <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded">
                        <span className="font-medium">サーバー: </span>
                        {currentProtocol.steps[currentStep - 1].server}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ステップ一覧 */}
              <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">プロトコルステップ</h3>
                <div className="space-y-4">
                  {currentProtocol.steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`border rounded-lg p-4 transition-all ${
                        currentStep === step.id
                          ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 shadow-lg'
                          : currentStep > step.id
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 ${
                          currentStep >= step.id ? 'bg-green-500' : 'bg-gray-400'
                        }`}>
                          {step.id}
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">
                          {step.description}
                        </h4>
                      </div>
                      
                      {currentStep === step.id && (
                        <div className="grid md:grid-cols-2 gap-4 text-sm mt-3">
                          <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded">
                            <span className="font-medium">クライアント: </span>
                            {step.client}
                          </div>
                          <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded">
                            <span className="font-medium">サーバー: </span>
                            {step.server}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
