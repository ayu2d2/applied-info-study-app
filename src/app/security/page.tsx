'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const securityConcepts = [
  {
    id: 'encryption',
    name: '暗号化技術',
    description: '共通鍵暗号と公開鍵暗号の仕組みと使い分け',
    category: 'fundamental',
    concepts: [
      {
        type: '共通鍵暗号（対称暗号）',
        description: '送信者と受信者が同じ鍵を使用する暗号方式',
        algorithms: [
          { name: 'AES', keyLength: '128/192/256bit', features: '高速・安全', usage: 'ファイル暗号化・通信暗号化' },
          { name: 'DES', keyLength: '56bit', features: '古い・脆弱', usage: '現在は非推奨' },
          { name: '3DES', keyLength: '168bit', features: 'DESの改良版', usage: '移行期の代替' }
        ],
        advantages: ['高速な暗号化・復号化', 'データ量が大きくても効率的'],
        disadvantages: ['鍵の配送問題', '鍵管理の複雑さ']
      },
      {
        type: '公開鍵暗号（非対称暗号）',
        description: '公開鍵と秘密鍵のペアを使用する暗号方式',
        algorithms: [
          { name: 'RSA', keyLength: '1024/2048/4096bit', features: '汎用性が高い', usage: 'デジタル署名・鍵交換' },
          { name: 'ECC', keyLength: '256bit', features: '短い鍵長で高セキュリティ', usage: 'モバイル・IoT機器' },
          { name: 'DSA', keyLength: '1024/2048bit', features: 'デジタル署名専用', usage: 'デジタル署名' }
        ],
        advantages: ['鍵配送問題の解決', 'デジタル署名が可能'],
        disadvantages: ['処理速度が遅い', '大きなデータには不向き']
      }
    ]
  },
  {
    id: 'authentication',
    name: '認証技術',
    description: 'ユーザー認証とアクセス制御の仕組み',
    category: 'access-control',
    authMethods: [
      {
        name: 'パスワード認証',
        type: '知識認証（Something you know）',
        security: '低',
        advantages: ['実装が簡単', 'コストが安い'],
        vulnerabilities: ['辞書攻撃', 'ブルートフォース攻撃', 'パスワードリスト攻撃'],
        countermeasures: ['複雑なパスワード要求', 'アカウントロック', 'パスワード定期変更']
      },
      {
        name: '生体認証',
        type: '生体認証（Something you are）',
        security: '高',
        types: ['指紋認証', '顔認証', '虹彩認証', '静脈認証'],
        advantages: ['偽造困難', 'パスワード不要'],
        disadvantages: ['コストが高い', '精度の問題', 'プライバシー懸念']
      },
      {
        name: 'トークン認証',
        type: '所持認証（Something you have）',
        security: '中',
        types: ['ICカード', 'USBトークン', 'ワンタイムパスワード'],
        advantages: ['物理的セキュリティ', '複製困難'],
        disadvantages: ['紛失リスク', 'コスト', '管理の複雑さ']
      },
      {
        name: '多要素認証（MFA）',
        type: '複数要素の組み合わせ',
        security: '最高',
        combinations: ['パスワード + SMS', 'ICカード + PIN', '生体認証 + トークン'],
        advantages: ['高いセキュリティレベル', '単一障害点の排除'],
        disadvantages: ['ユーザビリティの低下', '実装コストの増加']
      }
    ]
  },
  {
    id: 'network-security',
    name: 'ネットワークセキュリティ',
    description: 'ファイアウォールやVPN等のネットワーク防御技術',
    category: 'network',
    technologies: [
      {
        name: 'ファイアウォール',
        type: 'パケットフィルタリング',
        description: 'ネットワークトラフィックを監視・制御',
        types: [
          { name: 'パケットフィルタ型', level: 'レイヤー3-4', features: 'IP・ポート番号でフィルタ' },
          { name: 'アプリケーションゲートウェイ型', level: 'レイヤー7', features: 'アプリケーション内容を検査' },
          { name: 'ステートフル型', level: 'レイヤー3-4', features: 'コネクション状態を管理' }
        ],
        rules: ['送信元IP制限', 'ポート番号制限', 'プロトコル制限', '時間制限']
      },
      {
        name: 'VPN（Virtual Private Network）',
        type: '仮想プライベートネットワーク',
        description: 'インターネット上に仮想的な専用線を構築',
        types: [
          { name: 'サイト間VPN', usage: '拠点間接続', protocol: 'IPsec' },
          { name: 'リモートアクセスVPN', usage: '在宅勤務', protocol: 'SSL/TLS' },
          { name: 'SSL-VPN', usage: 'Webアプリケーション', protocol: 'HTTPS' }
        ],
        benefits: ['通信の暗号化', 'プライベートアドレス利用', 'コスト削減']
      },
      {
        name: 'IDS/IPS',
        type: '侵入検知・防御システム',
        description: '不正アクセスやマルウェアを検知・防御',
        differences: [
          { system: 'IDS', function: '検知・ログ記録', action: '管理者に通知', position: 'パッシブ監視' },
          { system: 'IPS', function: '検知・自動防御', action: '通信遮断・隔離', position: 'インライン配置' }
        ],
        detection: ['シグネチャベース検知', '異常検知', 'ヒューリスティック検知']
      }
    ]
  },
  {
    id: 'threats',
    name: '脅威と対策',
    description: 'サイバー攻撃の種類と対策方法',
    category: 'threats',
    attacks: [
      {
        name: 'マルウェア',
        types: ['ウイルス', 'ワーム', 'トロイの木馬', 'ランサムウェア', 'スパイウェア'],
        description: '悪意のあるソフトウェアの総称',
        impacts: ['データ破壊', '情報漏洩', 'システム乗っ取り', '金銭要求'],
        countermeasures: ['アンチウイルスソフト', '定期的なアップデート', 'システム監視', 'バックアップ']
      },
      {
        name: 'フィッシング攻撃',
        types: ['メールフィッシング', 'SMSフィッシング', 'ボイスフィッシング'],
        description: '偽のWebサイトで個人情報を騙し取る攻撃',
        targets: ['ログイン情報', 'クレジットカード情報', '個人情報'],
        countermeasures: ['URL確認', 'SSL証明書確認', 'ユーザー教育', '多要素認証']
      },
      {
        name: 'DoS/DDoS攻撃',
        types: ['帯域幅攻撃', 'リソース枯渇攻撃', 'アプリケーション攻撃'],
        description: 'サービスを利用不能にする攻撃',
        methods: ['大量パケット送信', 'コネクション枯渇', 'CPU/メモリ消費'],
        countermeasures: ['レート制限', 'DDoS対策サービス', 'CDN利用', 'ロードバランサー']
      },
      {
        name: 'Webアプリケーション攻撃',
        types: ['SQLインジェクション', 'XSS', 'CSRF', 'ディレクトリトラバーサル'],
        description: 'Webアプリケーションの脆弱性を悪用',
        impacts: ['データベース改ざん', 'セッション乗っ取り', '個人情報漏洩'],
        countermeasures: ['入力値検証', 'パラメータ化クエリ', 'WAF導入', 'セキュアコーディング']
      }
    ]
  }
];

export default function SecurityPage() {
  const [selectedConcept, setSelectedConcept] = useState('encryption');
  const [selectedAuth, setSelectedAuth] = useState<string | null>(null);
  const [selectedThreat, setSelectedThreat] = useState<string | null>(null);

  const currentConcept = securityConcepts.find(c => c.id === selectedConcept);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-red-600 hover:text-red-800 flex items-center mb-4">
            ← ホームに戻る
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            🔒 セキュリティ技術
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            情報セキュリティの基本概念から実践的な対策まで学習しましょう
          </p>
        </div>

        {/* コンセプト選択タブ */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 mb-6">
            {securityConcepts.map((concept) => (
              <button
                key={concept.id}
                onClick={() => setSelectedConcept(concept.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedConcept === concept.id
                    ? 'bg-red-500 text-white shadow-lg'
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

              {/* 暗号化技術の表示 */}
              {selectedConcept === 'encryption' && currentConcept.concepts && (
                <div className="space-y-8">
                  {currentConcept.concepts.map((concept, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
                        {concept.type}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {concept.description}
                      </p>

                      {/* アルゴリズム表 */}
                      <div className="overflow-x-auto mb-4">
                        <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow">
                          <thead className="bg-red-500 text-white">
                            <tr>
                              <th className="px-4 py-3 text-left">アルゴリズム</th>
                              <th className="px-4 py-3 text-left">鍵長</th>
                              <th className="px-4 py-3 text-left">特徴</th>
                              <th className="px-4 py-3 text-left">用途</th>
                            </tr>
                          </thead>
                          <tbody>
                            {concept.algorithms.map((algo, algoIndex) => (
                              <tr key={algoIndex} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-4 py-3 font-semibold text-gray-800 dark:text-white">{algo.name}</td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{algo.keyLength}</td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{algo.features}</td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{algo.usage}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* メリット・デメリット */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">メリット</h4>
                          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                            {concept.advantages.map((advantage, advIndex) => (
                              <li key={advIndex}>• {advantage}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                          <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">デメリット</h4>
                          <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                            {concept.disadvantages.map((disadvantage, disIndex) => (
                              <li key={disIndex}>• {disadvantage}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 認証技術の表示 */}
              {selectedConcept === 'authentication' && currentConcept.authMethods && (
                <div className="space-y-6">
                  {currentConcept.authMethods.map((method, index) => (
                    <div 
                      key={index}
                      className={`border rounded-lg p-6 cursor-pointer transition-all ${
                        selectedAuth === method.name 
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20 shadow-lg'
                          : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setSelectedAuth(selectedAuth === method.name ? null : method.name)}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                            {method.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {method.type}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          method.security === '最高' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200' :
                          method.security === '高' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200' :
                          method.security === '中' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
                        }`}>
                          セキュリティ: {method.security}
                        </span>
                      </div>

                      {selectedAuth === method.name && (
                        <div className="space-y-4">
                          {method.types && (
                            <div>
                              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">種類</h4>
                              <div className="flex flex-wrap gap-2">
                                {method.types.map((type, typeIndex) => (
                                  <span key={typeIndex} className="px-3 py-1 bg-gray-100 dark:bg-gray-600 rounded-full text-sm">
                                    {type}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {method.combinations && (
                            <div>
                              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">組み合わせ例</h4>
                              <div className="flex flex-wrap gap-2">
                                {method.combinations.map((combo, comboIndex) => (
                                  <span key={comboIndex} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                                    {combo}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">メリット</h4>
                              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                {method.advantages.map((advantage, advIndex) => (
                                  <li key={advIndex}>• {advantage}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                                {method.disadvantages ? 'デメリット' : '脆弱性'}
                              </h4>
                              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                {(method.disadvantages || method.vulnerabilities || []).map((item, itemIndex) => (
                                  <li key={itemIndex}>• {item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {method.countermeasures && (
                            <div>
                              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">対策</h4>
                              <div className="flex flex-wrap gap-2">
                                {method.countermeasures.map((measure, measureIndex) => (
                                  <span key={measureIndex} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                                    {measure}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* ネットワークセキュリティの表示 */}
              {selectedConcept === 'network-security' && currentConcept.technologies && (
                <div className="space-y-8">
                  {currentConcept.technologies.map((tech, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">
                          {tech.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {tech.type}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          {tech.description}
                        </p>
                      </div>

                      {tech.types && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">種類</h4>
                          <div className="space-y-3">
                            {tech.types.map((type: any, typeIndex: number) => (
                              <div key={typeIndex} className="bg-white dark:bg-gray-800 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-gray-800 dark:text-white">{type.name}</span>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">{type.level || type.usage || type.protocol}</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{type.features}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {tech.rules && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">設定ルール例</h4>
                          <div className="flex flex-wrap gap-2">
                            {tech.rules.map((rule, ruleIndex) => (
                              <span key={ruleIndex} className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-full text-sm">
                                {rule}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {tech.benefits && (
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">効果</h4>
                          <div className="flex flex-wrap gap-2">
                            {tech.benefits.map((benefit, benefitIndex) => (
                              <span key={benefitIndex} className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-full text-sm">
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {tech.differences && (
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">比較</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow">
                              <thead className="bg-red-500 text-white">
                                <tr>
                                  <th className="px-4 py-3 text-left">システム</th>
                                  <th className="px-4 py-3 text-left">機能</th>
                                  <th className="px-4 py-3 text-left">対応</th>
                                  <th className="px-4 py-3 text-left">配置</th>
                                </tr>
                              </thead>
                              <tbody>
                                {tech.differences.map((diff, diffIndex) => (
                                  <tr key={diffIndex} className="border-b dark:border-gray-600">
                                    <td className="px-4 py-3 font-semibold text-gray-800 dark:text-white">{diff.system}</td>
                                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{diff.function}</td>
                                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{diff.action}</td>
                                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{diff.position}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {tech.detection && (
                        <div className="mt-4">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">検知方式</h4>
                          <div className="flex flex-wrap gap-2">
                            {tech.detection.map((method, methodIndex) => (
                              <span key={methodIndex} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                                {method}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* 脅威と対策の表示 */}
              {selectedConcept === 'threats' && currentConcept.attacks && (
                <div className="space-y-6">
                  {currentConcept.attacks.map((attack, index) => (
                    <div 
                      key={index}
                      className={`border rounded-lg p-6 cursor-pointer transition-all ${
                        selectedThreat === attack.name 
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20 shadow-lg'
                          : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setSelectedThreat(selectedThreat === attack.name ? null : attack.name)}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                          {attack.name}
                        </h3>
                        <span className="text-red-600 dark:text-red-400">
                          🚨 脅威レベル: 高
                        </span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {attack.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {attack.types.map((type, typeIndex) => (
                          <span key={typeIndex} className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-full text-sm">
                            {type}
                          </span>
                        ))}
                      </div>

                      {selectedThreat === attack.name && (
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                                {attack.impacts ? '影響' : attack.targets ? '標的' : attack.methods ? '手法' : '詳細'}
                              </h4>
                              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                {(attack.impacts || attack.targets || attack.methods || []).map((item, itemIndex) => (
                                  <li key={itemIndex}>• {item}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">対策</h4>
                              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                {attack.countermeasures.map((measure, measureIndex) => (
                                  <li key={measureIndex}>• {measure}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
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
