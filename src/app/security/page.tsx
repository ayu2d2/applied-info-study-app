'use client';

import { useState, useMemo } from 'react';
import AppLayout from '@/components/AppLayout';

export default function SecurityPage() {
  // プロ級の状態管理
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  // プロ級のカテゴリシステム
  const categories = [
    { id: 'all', name: '全て', icon: '🎯', color: 'from-gray-400 to-gray-600' },
    { id: 'fundamentals', name: 'セキュリティ基礎', icon: '🔒', color: 'from-red-400 to-red-600' },
    { id: 'threats', name: '脅威と攻撃', icon: '⚠️', color: 'from-orange-400 to-orange-600' },
    { id: 'cryptography', name: '暗号技術', icon: '🔐', color: 'from-purple-400 to-purple-600' },
    { id: 'network-security', name: 'ネットワークセキュリティ', icon: '🛡️', color: 'from-blue-400 to-blue-600' },
    { id: 'incident-response', name: 'インシデント対応', icon: '🚨', color: 'from-green-400 to-green-600' }
  ];

  const learningLevels = [
    { id: 'all', name: '全レベル', color: 'bg-gray-100' },
    { id: 'beginner', name: '初級', color: 'bg-green-100' },
    { id: 'intermediate', name: '中級', color: 'bg-yellow-100' },
    { id: 'advanced', name: '上級', color: 'bg-red-100' }
  ];

  // プロ級のセキュリティ学習コンテンツライブラリ
  const securityLibrary = {
    'security-fundamentals': {
      title: 'セキュリティ基礎（CIA+α）',
      category: 'fundamentals',
      level: 'beginner',
      description: '情報セキュリティの基本3要素から最新概念まで',
      keywords: ['CIA', '機密性', '完全性', '可用性', '認証'],
      estimatedTime: '25分',
      difficulty: 2,
      fundamentalConcepts: [
        {
          name: '機密性（Confidentiality）',
          icon: '🔒',
          color: 'bg-red-100',
          definition: '認可された利用者のみが情報にアクセスできることを保証',
          threats: ['盗聴', '情報漏洩', '不正アクセス', 'ソーシャルエンジニアリング'],
          controls: ['暗号化', 'アクセス制御', '認証', 'データマスキング'],
          examples: ['パスワード保護', 'ファイル暗号化', 'VPN接続', '物理的アクセス制限']
        },
        {
          name: '完全性（Integrity）',
          icon: '✅',
          color: 'bg-green-100',
          definition: '情報が正確で完全であり、不正に改変されていないことを保証',
          threats: ['データ改ざん', 'マルウェア感染', '意図しない変更', '転送エラー'],
          controls: ['ハッシュ値', 'デジタル署名', 'チェックサム', 'バージョン管理'],
          examples: ['SHA-256ハッシュ', 'PKI証明書', 'CRC検証', 'ブロックチェーン']
        },
        {
          name: '可用性（Availability）',
          icon: '🔄',
          color: 'bg-blue-100',
          definition: '認可された利用者が必要なときに情報やシステムにアクセスできることを保証',
          threats: ['DoS攻撃', 'システム障害', 'ネットワーク断', '自然災害'],
          controls: ['冗長化', 'ロードバランシング', 'BCP/DR', 'モニタリング'],
          examples: ['クラスタ構成', 'CDN', 'バックアップ', '24時間監視']
        }
      ]
    },
    'cyber-threats': {
      title: 'サイバー脅威図鑑',
      category: 'threats',
      level: 'intermediate',
      description: '最新のサイバー攻撃手法と対策技術',
      keywords: ['マルウェア', 'フィッシング', 'DDoS', 'APT'],
      estimatedTime: '40分',
      difficulty: 4,
      malwareTypes: [
        {
          name: 'ウイルス',
          icon: '🦠',
          color: 'bg-red-100',
          behavior: '他のファイルに感染して自己複製',
          spreadMethod: 'ファイル実行時に感染拡大',
          damage: 'ファイル破壊、システム不安定化',
          examples: ['CIH（チェルノブイリ）', 'ILOVEYOU', 'Code Red'],
          countermeasures: ['ウイルス対策ソフト', 'ファイルスキャン', '定義ファイル更新']
        },
        {
          name: 'ワーム',
          icon: '🐛',
          color: 'bg-orange-100',
          behavior: 'ネットワーク経由で自動拡散',
          spreadMethod: 'セキュリティホールを悪用',
          damage: 'ネットワーク負荷、システムリソース消費',
          examples: ['Morris Worm', 'Blaster', 'Conficker'],
          countermeasures: ['セキュリティパッチ適用', 'ファイアウォール', 'IPS']
        },
        {
          name: 'トロイの木馬',
          icon: '🐴',
          color: 'bg-yellow-100',
          behavior: '正常なソフトウェアに偽装',
          spreadMethod: 'ユーザーが自発的にダウンロード',
          damage: '情報窃取、バックドア設置',
          examples: ['Zeus', 'Emotet', 'RAT系ツール'],
          countermeasures: ['デジタル署名確認', 'サンドボックス', '行動分析']
        },
        {
          name: 'ランサムウェア',
          icon: '💰',
          color: 'bg-purple-100',
          behavior: 'ファイルを暗号化して身代金要求',
          spreadMethod: 'メール添付、RDP攻撃、脆弱性悪用',
          damage: 'データ暗号化、業務停止',
          examples: ['WannaCry', 'Ryuk', 'LockBit'],
          countermeasures: ['バックアップ', 'パッチ管理', 'ネットワーク分離']
        }
      ]
    },
    'cryptography-basics': {
      title: '暗号技術の基礎',
      category: 'cryptography',
      level: 'intermediate',
      description: '共通鍵・公開鍵暗号からハッシュ関数まで',
      keywords: ['AES', 'RSA', 'SHA', 'PKI'],
      estimatedTime: '35分',
      difficulty: 3,
      cryptographyTypes: [
        {
          name: '共通鍵暗号（対称暗号）',
          icon: '🔑',
          color: 'bg-green-100',
          concept: '暗号化と復号に同じ鍵を使用',
          algorithms: ['AES（Advanced Encryption Standard）', 'DES（Data Encryption Standard）', '3DES（Triple DES）'],
          pros: ['高速処理', '計算負荷が軽い', '大容量データに適している'],
          cons: ['鍵配送問題', '鍵管理の複雑さ', 'スケーラビリティの課題'],
          usecases: ['ファイル暗号化', 'ディスク暗号化', 'VPN通信']
        },
        {
          name: '公開鍵暗号（非対称暗号）',
          icon: '🔐',
          color: 'bg-blue-100',
          concept: '暗号化と復号に異なる鍵を使用（公開鍵・秘密鍵）',
          algorithms: ['RSA', '楕円曲線暗号（ECC）', 'ElGamal'],
          pros: ['鍵配送問題解決', 'デジタル署名可能', '認証機能'],
          cons: ['処理速度が遅い', '計算負荷が重い', '鍵長が長い'],
          usecases: ['SSL/TLS', 'デジタル証明書', 'メール暗号化']
        },
        {
          name: 'ハッシュ関数',
          icon: '#️⃣',
          color: 'bg-purple-100',
          concept: '任意長のデータを固定長の値に変換（一方向関数）',
          algorithms: ['SHA-256', 'SHA-3', 'MD5（非推奨）'],
          pros: ['高速処理', '固定長出力', '改ざん検知'],
          cons: ['暗号化ではない', '元データ復元不可', '衝突の可能性'],
          usecases: ['パスワード保存', 'ファイル整合性確認', 'ブロックチェーン']
        }
      ]
    },
    'network-security': {
      title: 'ネットワークセキュリティ対策',
      category: 'network-security',
      level: 'advanced',
      description: 'ファイアウォール、IDS/IPS、VPNの実装と運用',
      keywords: ['ファイアウォール', 'IDS', 'IPS', 'VPN'],
      estimatedTime: '30分',
      difficulty: 4,
      securityDevices: [
        {
          name: 'ファイアウォール',
          icon: '🔥',
          color: 'bg-red-100',
          purpose: 'ネットワークトラフィックの制御・遮断',
          types: ['パケットフィルタ型', 'ステートフルインスペクション型', 'アプリケーションゲートウェイ型'],
          rules: ['送信元IP制御', '宛先ポート制御', 'プロトコル制御', 'アプリケーション制御'],
          deployment: ['ネットワーク境界', 'DMZ設置', 'セグメント間', 'ホストベース']
        },
        {
          name: 'IDS（侵入検知システム）',
          icon: '👁️',
          color: 'bg-yellow-100',
          purpose: '不正侵入やアクセスの検知・監視',
          detection: ['シグネチャベース', 'アノマリベース', 'ハイブリッド'],
          deployment: ['ネットワーク型（NIDS）', 'ホスト型（HIDS）', 'ハイブリッド型'],
          alerts: ['ログ出力', 'メール通知', 'SIEM連携', 'SNMPトラップ']
        },
        {
          name: 'IPS（侵入防止システム）',
          icon: '🛡️',
          color: 'bg-green-100',
          purpose: '不正侵入の検知と自動ブロック',
          actions: ['パケット遮断', 'セッション切断', 'IPブラック登録', 'QoS制御'],
          features: ['リアルタイム防御', 'インライン配置', '自動対処', 'ログ機能'],
          considerations: ['誤検知リスク', '性能影響', '迂回攻撃', '設定複雑性']
        }
      ]
    },
    'web-security': {
      title: 'Webアプリケーションセキュリティ',
      category: 'threats',
      level: 'advanced',
      description: 'OWASP Top 10とセキュアコーディング',
      keywords: ['OWASP', 'SQLインジェクション', 'XSS', 'CSRF'],
      estimatedTime: '45分',
      difficulty: 5,
      owaspTop10: [
        {
          rank: 1,
          name: 'Broken Access Control',
          icon: '🚪',
          color: 'bg-red-100',
          description: 'アクセス制御の不備',
          examples: ['権限昇格', '直接オブジェクト参照', 'パストラバーサル'],
          countermeasures: ['最小権限の原則', 'アクセス制御リスト', 'セッション管理'],
          code_example: '// 悪い例\nif (user.id == resource.owner_id) {\n  // アクセス許可\n}\n\n// 良い例\nif (hasPermission(user, "read", resource)) {\n  // アクセス許可\n}'
        },
        {
          rank: 2,
          name: 'Cryptographic Failures',
          icon: '🔐',
          color: 'bg-orange-100',
          description: '暗号化の失敗',
          examples: ['平文データ保存', '弱い暗号化', '不適切な鍵管理'],
          countermeasures: ['強力な暗号化', '適切な鍵管理', 'HTTPS強制'],
          code_example: '// 悪い例\npassword = user.password\n\n// 良い例\npassword = bcrypt.hash(user.password, 12)'
        },
        {
          rank: 3,
          name: 'Injection',
          icon: '💉',
          color: 'bg-yellow-100',
          description: 'インジェクション攻撃',
          examples: ['SQLインジェクション', 'コマンドインジェクション', 'LDAPインジェクション'],
          countermeasures: ['パラメータ化クエリ', '入力値検証', 'エスケープ処理'],
          code_example: '// 悪い例\nquery = "SELECT * FROM users WHERE id = " + userId\n\n// 良い例\nquery = "SELECT * FROM users WHERE id = ?"\nstatement.setInt(1, userId)'
        }
      ]
    },
    'incident-response': {
      title: 'インシデント対応プロセス',
      category: 'incident-response',
      level: 'advanced',
      description: 'CSIRT活動とフォレンジック調査',
      keywords: ['CSIRT', 'フォレンジック', 'インシデント', 'BCP'],
      estimatedTime: '25分',
      difficulty: 4,
      responsePhases: [
        {
          phase: '準備（Preparation）',
          icon: '📋',
          color: 'bg-blue-100',
          activities: ['インシデント対応計画策定', 'CSIRT体制構築', 'ツール・手順準備', '教育・訓練実施'],
          deliverables: ['対応手順書', '連絡体制図', 'ツールリスト', '訓練記録'],
          duration: '平常時',
          importance: 'インシデント発生前の事前準備が成功の鍵'
        },
        {
          phase: '検知と分析（Detection & Analysis）',
          icon: '🔍',
          color: 'bg-yellow-100',
          activities: ['インシデント検知', '初期調査', '影響範囲特定', 'エスカレーション判断'],
          deliverables: ['検知ログ', '初期調査報告', '影響評価', 'エスカレーション記録'],
          duration: '数分〜数時間',
          importance: '迅速な検知と正確な初期分析が拡大防止のポイント'
        },
        {
          phase: '封じ込め、根絶、復旧（Containment, Eradication & Recovery）',
          icon: '🛠️',
          color: 'bg-green-100',
          activities: ['被害拡大防止', '原因除去', 'システム復旧', '再発防止策実装'],
          deliverables: ['封じ込め記録', '根絶作業記録', '復旧手順書', '検証結果'],
          duration: '数時間〜数日',
          importance: '適切な順序での作業実施とエビデンス保全'
        },
        {
          phase: '事後活動（Post-Incident Activity）',
          icon: '📊',
          color: 'bg-purple-100',
          activities: ['教訓抽出', '手順見直し', '報告書作成', '改善策検討'],
          deliverables: ['最終報告書', '改善提案', '手順書更新', '教育資料'],
          duration: '数日〜数週間',
          importance: '次回インシデントに向けた組織的学習の機会'
        }
      ]
    }
  };

  // 検索とフィルタリング機能
  const filteredConcepts = useMemo(() => {
    return Object.entries(securityLibrary).filter(([key, concept]) => {
      const categoryMatch = selectedCategory === 'all' || concept.category === selectedCategory;
      const levelMatch = selectedLevel === 'all' || concept.level === selectedLevel;
      const searchMatch = searchQuery === '' || 
        concept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        concept.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        concept.keywords?.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
      return categoryMatch && levelMatch && searchMatch;
    });
  }, [selectedCategory, selectedLevel, searchQuery]);

  // 難易度表示
  const DifficultyStars = ({ difficulty }: { difficulty: number }) => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={`text-sm ${star <= difficulty ? 'text-yellow-400' : 'text-gray-300'}`}>
          ⭐
        </span>
      ))}
    </div>
  );

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        {/* プロ級のヘッダーセクション */}
        <div className="bg-gradient-to-br from-red-600 via-pink-600 to-purple-700 rounded-2xl text-white p-8 shadow-2xl mb-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
              🔒 サイバーセキュリティアカデミー
            </h1>
            <p className="text-xl opacity-90 mb-6">
              情報セキュリティの基礎からサイバー攻撃対策まで実践的に学習
            </p>
            <div className="flex justify-center items-center space-x-6 text-sm opacity-80">
              <div className="flex items-center space-x-2">
                <span>🛡️</span>
                <span>{Object.keys(securityLibrary).length}の専門モジュール</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🔍</span>
                <span>最新脅威対応</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📋</span>
                <span>実務スキル習得</span>
              </div>
            </div>
          </div>
        </div>

        {/* プロ級の検索・フィルターセクション */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="space-y-6">
            {/* 検索バー */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400 text-xl">🔍</span>
              </div>
              <input
                type="text"
                placeholder="キーワードで検索（例：CIA、暗号化、インシデント）"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-4 py-3 text-lg rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
              />
            </div>

            {/* カテゴリフィルター */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">📂 カテゴリ</h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                      selectedCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 学習レベルフィルター */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">📊 学習レベル</h3>
              <div className="flex flex-wrap gap-3">
                {learningLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevel(level.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedLevel === level.id
                        ? `${level.color} border-2 border-current shadow-md`
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {level.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* プロ級のコンセプトカードグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {filteredConcepts.map(([key, concept]) => (
            <div
              key={key}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
              onClick={() => setSelectedConcept(selectedConcept === key ? null : key)}
            >
              {/* カードヘッダー */}
              <div className={`bg-gradient-to-r ${categories.find(c => c.id === concept.category)?.color || 'from-gray-400 to-gray-600'} p-4 text-white`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{concept.title}</h3>
                    <p className="text-sm opacity-90">{concept.description}</p>
                  </div>
                  <span className="text-3xl ml-3">
                    {categories.find(c => c.id === concept.category)?.icon}
                  </span>
                </div>
              </div>

              {/* カードボディ */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      concept.level === 'beginner' ? 'bg-green-100 text-green-800' :
                      concept.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {concept.level === 'beginner' ? '初級' : 
                       concept.level === 'intermediate' ? '中級' : '上級'}
                    </span>
                    <span className="text-xs text-gray-500">⏱️ {concept.estimatedTime}</span>
                  </div>
                  <DifficultyStars difficulty={concept.difficulty} />
                </div>

                {/* キーワードタグ */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {concept.keywords.slice(0, 4).map((keyword) => (
                    <span key={keyword} className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                      {keyword}
                    </span>
                  ))}
                  {concept.keywords.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      +{concept.keywords.length - 4}
                    </span>
                  )}
                </div>

                {/* 展開アイコン */}
                <div className="flex justify-center">
                  <span className={`text-2xl transition-transform duration-200 ${
                    selectedConcept === key ? 'rotate-180' : ''
                  }`}>
                    ⌄
                  </span>
                </div>
              </div>

              {/* 展開コンテンツ */}
              {selectedConcept === key && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
                  {/* セキュリティ基礎詳細表示 */}
                  {key === 'security-fundamentals' && 'fundamentalConcepts' in concept && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">情報セキュリティの3要素（CIA）</h4>
                      {concept.fundamentalConcepts.map((fundamental: any, index: number) => (
                        <div key={index} className={`${fundamental.color} rounded-lg p-4`}>
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">{fundamental.icon}</span>
                            <h5 className="text-lg font-bold text-gray-800">{fundamental.name}</h5>
                          </div>
                          <div className="space-y-3">
                            <div className="text-sm text-gray-700">{fundamental.definition}</div>
                            <div className="grid md:grid-cols-2 gap-3">
                              <div>
                                <div className="text-sm font-semibold text-red-600 mb-2">🚨 主な脅威</div>
                                <div className="space-y-1">
                                  {fundamental.threats.map((threat: string, i: number) => (
                                    <div key={i} className="text-xs bg-red-50 text-red-800 px-2 py-1 rounded">
                                      • {threat}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-green-600 mb-2">🛡️ 対策技術</div>
                                <div className="space-y-1">
                                  {fundamental.controls.map((control: string, i: number) => (
                                    <div key={i} className="text-xs bg-green-50 text-green-800 px-2 py-1 rounded">
                                      • {control}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-blue-600 mb-2">💡 実装例</div>
                              <div className="flex flex-wrap gap-1">
                                {fundamental.examples.map((example: string, i: number) => (
                                  <span key={i} className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded">
                                    {example}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* サイバー脅威詳細表示 */}
                  {key === 'cyber-threats' && 'malwareTypes' in concept && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">マルウェアの種類と特徴</h4>
                      {concept.malwareTypes.map((malware: any, index: number) => (
                        <div key={index} className={`${malware.color} rounded-lg p-4`}>
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">{malware.icon}</span>
                            <h5 className="text-lg font-bold text-gray-800">{malware.name}</h5>
                          </div>
                          <div className="space-y-3">
                            <div className="grid md:grid-cols-3 gap-3 text-sm">
                              <div>
                                <span className="font-semibold text-purple-600">動作:</span>
                                <div className="text-gray-700">{malware.behavior}</div>
                              </div>
                              <div>
                                <span className="font-semibold text-orange-600">拡散:</span>
                                <div className="text-gray-700">{malware.spreadMethod}</div>
                              </div>
                              <div>
                                <span className="font-semibold text-red-600">被害:</span>
                                <div className="text-gray-700">{malware.damage}</div>
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-800 mb-2">著名な事例</div>
                              <div className="flex flex-wrap gap-1">
                                {malware.examples.map((example: string, i: number) => (
                                  <span key={i} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                                    {example}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-green-600 mb-2">対策手法</div>
                              <div className="space-y-1">
                                {malware.countermeasures.map((countermeasure: string, i: number) => (
                                  <div key={i} className="text-xs bg-green-50 text-green-800 px-2 py-1 rounded">
                                    ✅ {countermeasure}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 暗号技術詳細表示 */}
                  {key === 'cryptography-basics' && 'cryptographyTypes' in concept && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">暗号化技術の分類</h4>
                      {concept.cryptographyTypes.map((crypto: any, index: number) => (
                        <div key={index} className={`${crypto.color} rounded-lg p-4`}>
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">{crypto.icon}</span>
                            <h5 className="text-lg font-bold text-gray-800">{crypto.name}</h5>
                          </div>
                          <div className="space-y-3">
                            <div className="text-sm text-gray-700">{crypto.concept}</div>
                            <div>
                              <div className="text-sm font-semibold text-gray-800 mb-2">主要アルゴリズム</div>
                              <div className="flex flex-wrap gap-1">
                                {crypto.algorithms.map((algorithm: string, i: number) => (
                                  <span key={i} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                    {algorithm}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-3">
                              <div>
                                <div className="text-sm font-semibold text-green-600 mb-2">メリット</div>
                                <div className="space-y-1">
                                  {crypto.pros.map((pro: string, i: number) => (
                                    <div key={i} className="text-xs bg-green-50 text-green-800 px-2 py-1 rounded">
                                      ✅ {pro}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-red-600 mb-2">デメリット</div>
                                <div className="space-y-1">
                                  {crypto.cons.map((con: string, i: number) => (
                                    <div key={i} className="text-xs bg-red-50 text-red-800 px-2 py-1 rounded">
                                      ❌ {con}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-purple-600 mb-2">主な用途</div>
                              <div className="flex flex-wrap gap-1">
                                {crypto.usecases.map((usecase: string, i: number) => (
                                  <span key={i} className="text-xs bg-purple-50 text-purple-800 px-2 py-1 rounded">
                                    {usecase}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ネットワークセキュリティ詳細表示 */}
                  {key === 'network-security' && 'securityDevices' in concept && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">セキュリティ機器の特徴</h4>
                      {concept.securityDevices.map((device: any, index: number) => (
                        <div key={index} className={`${device.color} rounded-lg p-4`}>
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">{device.icon}</span>
                            <h5 className="text-lg font-bold text-gray-800">{device.name}</h5>
                          </div>
                          <div className="space-y-3">
                            <div className="text-sm text-gray-700">{device.purpose}</div>
                            {device.types && (
                              <div>
                                <div className="text-sm font-semibold text-gray-800 mb-2">種類</div>
                                <div className="flex flex-wrap gap-1">
                                  {device.types.map((type: string, i: number) => (
                                    <span key={i} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                      {type}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {device.rules && (
                              <div>
                                <div className="text-sm font-semibold text-gray-800 mb-2">制御ルール</div>
                                <div className="grid md:grid-cols-2 gap-1">
                                  {device.rules.map((rule: string, i: number) => (
                                    <div key={i} className="text-xs bg-yellow-50 text-yellow-800 px-2 py-1 rounded">
                                      {rule}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {device.deployment && (
                              <div>
                                <div className="text-sm font-semibold text-gray-800 mb-2">配置場所</div>
                                <div className="grid md:grid-cols-2 gap-1">
                                  {device.deployment.map((deploy: string, i: number) => (
                                    <div key={i} className="text-xs bg-green-50 text-green-800 px-2 py-1 rounded">
                                      {deploy}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Webセキュリティ詳細表示 */}
                  {key === 'web-security' && 'owaspTop10' in concept && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">OWASP Top 10（上位3位）</h4>
                      {concept.owaspTop10.map((vulnerability: any, index: number) => (
                        <div key={index} className={`${vulnerability.color} rounded-lg p-4`}>
                          <div className="flex items-center mb-3">
                            <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                              {vulnerability.rank}
                            </div>
                            <span className="text-2xl mr-3">{vulnerability.icon}</span>
                            <h5 className="text-lg font-bold text-gray-800">{vulnerability.name}</h5>
                          </div>
                          <div className="space-y-3">
                            <div className="text-sm text-gray-700">{vulnerability.description}</div>
                            <div>
                              <div className="text-sm font-semibold text-red-600 mb-2">攻撃例</div>
                              <div className="flex flex-wrap gap-1">
                                {vulnerability.examples.map((example: string, i: number) => (
                                  <span key={i} className="text-xs bg-red-50 text-red-800 px-2 py-1 rounded">
                                    {example}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-green-600 mb-2">対策手法</div>
                              <div className="flex flex-wrap gap-1">
                                {vulnerability.countermeasures.map((countermeasure: string, i: number) => (
                                  <span key={i} className="text-xs bg-green-50 text-green-800 px-2 py-1 rounded">
                                    {countermeasure}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-blue-600 mb-2">コード例</div>
                              <pre className="text-xs bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
                                {vulnerability.code_example}
                              </pre>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* インシデント対応詳細表示 */}
                  {key === 'incident-response' && 'responsePhases' in concept && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">インシデント対応の4フェーズ</h4>
                      {concept.responsePhases.map((phase: any, index: number) => (
                        <div key={index} className={`${phase.color} rounded-lg p-4`}>
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">{phase.icon}</span>
                            <h5 className="text-lg font-bold text-gray-800">{phase.phase}</h5>
                            <span className="ml-auto text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                              {phase.duration}
                            </span>
                          </div>
                          <div className="space-y-3">
                            <div className="text-sm italic text-blue-600">{phase.importance}</div>
                            <div>
                              <div className="text-sm font-semibold text-gray-800 mb-2">主要活動</div>
                              <div className="grid md:grid-cols-2 gap-1">
                                {phase.activities.map((activity: string, i: number) => (
                                  <div key={i} className="text-xs bg-white/70 px-2 py-1 rounded">
                                    • {activity}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-800 mb-2">成果物</div>
                              <div className="flex flex-wrap gap-1">
                                {phase.deliverables.map((deliverable: string, i: number) => (
                                  <span key={i} className="text-xs bg-green-50 text-green-800 px-2 py-1 rounded">
                                    {deliverable}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 結果が見つからない場合 */}
        {filteredConcepts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              検索結果が見つかりませんでした
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              検索条件を変更してお試しください
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedLevel('all');
              }}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              フィルターをリセット
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}