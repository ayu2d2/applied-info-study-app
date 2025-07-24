'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface EncryptionStep {
  step: number;
  description: string;
  input: string;
  output: string;
  explanation: string;
}

interface ThreatExample {
  id: number;
  name: string;
  description: string;
  example: string;
  countermeasures: string[];
  severity: 'low' | 'medium' | 'high';
}

const threats: ThreatExample[] = [
  {
    id: 1,
    name: 'SQLインジェクション',
    description: 'データベースへの不正なSQL文の挿入',
    example: "'; DROP TABLE users; --",
    countermeasures: ['プリペアドステートメント', '入力値検証', 'エスケープ処理'],
    severity: 'high'
  },
  {
    id: 2,
    name: 'クロスサイトスクリプティング（XSS）',
    description: 'Webページに悪意のあるスクリプトを埋め込む',
    example: '<script>alert("XSS")</script>',
    countermeasures: ['HTMLエスケープ', 'Content Security Policy', '入力値検証'],
    severity: 'high'
  },
  {
    id: 3,
    name: 'DoS攻撃',
    description: 'サービスを利用不可にする攻撃',
    example: '大量のリクエスト送信、リソース枯渇',
    countermeasures: ['レート制限', 'ロードバランサー', 'CDN活用'],
    severity: 'medium'
  },
  {
    id: 4,
    name: 'フィッシング',
    description: '偽サイトで個人情報を詐取',
    example: '銀行を装ったメール・偽サイト',
    countermeasures: ['SSL証明書確認', 'ユーザー教育', '多要素認証'],
    severity: 'high'
  }
];

const encryptionMethods = [
  {
    id: 'caesar',
    name: 'シーザー暗号',
    description: 'アルファベットを一定数ずらす古典暗号',
    type: '共通鍵'
  },
  {
    id: 'rsa',
    name: 'RSA暗号',
    description: '大きな数の素因数分解の困難性を利用',
    type: '公開鍵'
  },
  {
    id: 'aes',
    name: 'AES暗号',
    description: '現在標準的に使われているブロック暗号',
    type: '共通鍵'
  }
];

console.log('Encryption methods available:', encryptionMethods.length);

export default function SecurityPage() {
  const [selectedThreat, setSelectedThreat] = useState<ThreatExample | null>(null);
  const [caesarText, setCaesarText] = useState('HELLO');
  const [caesarShift, setCaesarShift] = useState(3);
  const [activeTab, setActiveTab] = useState<'threats' | 'encryption' | 'auth'>('threats');

  const encryptCaesar = (text: string, shift: number): string => {
    return text.split('').map(char => {
      if (char.match(/[A-Z]/)) {
        return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
      }
      return char;
    }).join('');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-red-600 hover:text-red-800 flex items-center mb-4">
            ← ホームに戻る
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            セキュリティ学習
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            情報セキュリティの脅威と対策について実践的に学習しましょう
          </p>
        </div>

        {/* タブナビゲーション */}
        <div className="mb-8">
          <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('threats')}
              className={`pb-2 px-4 font-medium ${
                activeTab === 'threats'
                  ? 'border-b-2 border-red-500 text-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              脅威と対策
            </button>
            <button
              onClick={() => setActiveTab('encryption')}
              className={`pb-2 px-4 font-medium ${
                activeTab === 'encryption'
                  ? 'border-b-2 border-red-500 text-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              暗号化
            </button>
            <button
              onClick={() => setActiveTab('auth')}
              className={`pb-2 px-4 font-medium ${
                activeTab === 'auth'
                  ? 'border-b-2 border-red-500 text-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              認証
            </button>
          </div>
        </div>

        {/* 脅威と対策タブ */}
        {activeTab === 'threats' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                セキュリティ脅威一覧
              </h2>
              <div className="space-y-3">
                {threats.map((threat) => (
                  <div
                    key={threat.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setSelectedThreat(threat)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {threat.name}
                      </h3>
                      <span className={`px-2 py-1 rounded text-white text-xs ${getSeverityColor(threat.severity)}`}>
                        {threat.severity === 'high' ? '高' : threat.severity === 'medium' ? '中' : '低'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {threat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                脅威の詳細
              </h2>
              {selectedThreat ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {selectedThreat.name}
                    </h3>
                    <span className={`px-3 py-1 rounded text-white ${getSeverityColor(selectedThreat.severity)}`}>
                      危険度: {selectedThreat.severity === 'high' ? '高' : selectedThreat.severity === 'medium' ? '中' : '低'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {selectedThreat.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">攻撃例:</h4>
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                      <code className="text-sm text-red-800 dark:text-red-300 font-mono">
                        {selectedThreat.example}
                      </code>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">対策:</h4>
                    <div className="space-y-2">
                      {selectedThreat.countermeasures.map((measure, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          <span className="text-gray-700 dark:text-gray-300">{measure}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  左の脅威をクリックして詳細を確認してください
                </p>
              )}
            </div>
          </div>
        )}

        {/* 暗号化タブ */}
        {activeTab === 'encryption' && (
          <div className="space-y-8">
            {/* シーザー暗号実演 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                シーザー暗号シミュレーター
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        平文 (大文字英字のみ)
                      </label>
                      <input
                        type="text"
                        value={caesarText}
                        onChange={(e) => setCaesarText(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                        placeholder="HELLO"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        シフト数: {caesarShift}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="25"
                        value={caesarShift}
                        onChange={(e) => setCaesarShift(parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-4">暗号化結果</h4>
                    <div className="text-center">
                      <div className="text-lg font-mono text-blue-600 dark:text-blue-400 mb-2">
                        {caesarText} → {encryptCaesar(caesarText, caesarShift)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        各文字を{caesarShift}文字分シフト
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 暗号方式比較 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                暗号方式の比較
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    共通鍵暗号（対称暗号）
                  </h3>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-semibold">
                        送信者
                      </span>
                      <div className="flex-1 mx-4 text-center">
                        <div className="text-sm text-gray-600 dark:text-gray-400">同じ鍵で暗号化・復号化</div>
                        <div className="w-full h-1 bg-blue-300 rounded my-2"></div>
                        <div className="text-xs text-blue-600 dark:text-blue-400">共通鍵</div>
                      </div>
                      <span className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-semibold">
                        受信者
                      </span>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• 高速な処理</li>
                    <li>• 鍵の配布が困難</li>
                    <li>• AES, DESなど</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    公開鍵暗号（非対称暗号）
                  </h3>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white font-semibold">
                        送信者
                      </span>
                      <div className="flex-1 mx-4 text-center">
                        <div className="text-sm text-gray-600 dark:text-gray-400">公開鍵で暗号化</div>
                        <div className="w-full h-1 bg-green-300 rounded my-1"></div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">秘密鍵で復号化</div>
                        <div className="w-full h-1 bg-red-300 rounded my-1"></div>
                      </div>
                      <span className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white font-semibold">
                        受信者
                      </span>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• 鍵配布が容易</li>
                    <li>• 処理が重い</li>
                    <li>• RSA, ECCなど</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 認証タブ */}
        {activeTab === 'auth' && (
          <div className="space-y-8">
            {/* 認証の3要素 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                認証の3要素
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    知識要素 (Something you know)
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    本人だけが知っている情報
                  </p>
                  <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    <li>• パスワード</li>
                    <li>• PIN番号</li>
                    <li>• 秘密の質問</li>
                  </ul>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    所有要素 (Something you have)
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    本人だけが持っている物
                  </p>
                  <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    <li>• ICカード</li>
                    <li>• スマートフォン</li>
                    <li>• ハードウェアトークン</li>
                  </ul>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    生体要素 (Something you are)
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    本人の身体的特徴
                  </p>
                  <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    <li>• 指紋</li>
                    <li>• 虹彩</li>
                    <li>• 顔認証</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 多要素認証の流れ */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                多要素認証（MFA）の流れ
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-semibold text-gray-800 dark:text-white">第1要素：ID・パスワード入力</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">知識要素による初回認証</p>
                  </div>
                </div>
                
                <div className="ml-4 border-l-2 border-gray-200 dark:border-gray-600 h-8"></div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-semibold text-gray-800 dark:text-white">第2要素：SMS・アプリ認証</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">所有要素による追加認証</p>
                  </div>
                </div>
                
                <div className="ml-4 border-l-2 border-gray-200 dark:border-gray-600 h-8"></div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-semibold text-gray-800 dark:text-white">アクセス許可</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">すべての認証が成功した場合のみアクセス可能</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
