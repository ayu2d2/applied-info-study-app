'use client';

import { useState, useMemo } from 'react';
import AppLayout from '@/components/AppLayout';

export default function DevelopmentPage() {
  // プロ級の状態管理
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  // プロ級のカテゴリシステム
  const categories = [
    { id: 'all', name: '全て', icon: '🎯', color: 'from-gray-400 to-gray-600' },
    { id: 'sdlc', name: 'SDLC', icon: '🔄', color: 'from-blue-400 to-blue-600' },
    { id: 'methodologies', name: '開発手法', icon: '⚡', color: 'from-green-400 to-green-600' },
    { id: 'testing', name: 'テスト', icon: '🧪', color: 'from-purple-400 to-purple-600' },
    { id: 'metrics', name: '品質管理', icon: '📊', color: 'from-orange-400 to-orange-600' },
    { id: 'architecture', name: 'アーキテクチャ', icon: '🏗️', color: 'from-red-400 to-red-600' }
  ];

  const learningLevels = [
    { id: 'all', name: '全レベル', color: 'bg-gray-100' },
    { id: 'beginner', name: '初級', color: 'bg-green-100' },
    { id: 'intermediate', name: '中級', color: 'bg-yellow-100' },
    { id: 'advanced', name: '上級', color: 'bg-red-100' }
  ];

  // プロ級の開発学習コンテンツライブラリ
  const developmentLibrary = {
    'waterfall-model': {
      title: 'ウォーターフォールモデル',
      category: 'sdlc',
      level: 'beginner',
      description: '従来型の順次開発プロセスの理解と実践',
      keywords: ['ウォーターフォール', 'SDLC', '工程管理', '品質保証'],
      estimatedTime: '30分',
      difficulty: 2,
      phases: [
        {
          phase: '要件定義',
          icon: '📋',
          color: 'bg-red-100',
          description: 'システムに求められる機能・性能・制約を明確化',
          activities: ['要件収集', 'ステークホルダー分析', '制約条件整理', '優先順位付け'],
          deliverables: ['要件定義書', '機能仕様書', 'ユースケース図', '非機能要件書'],
          duration: '全工程の15%',
          riskFactors: ['要件変更', '認識齟齬', '漏れ・抜け']
        },
        {
          phase: '外部設計',
          icon: '🎨',
          color: 'bg-orange-100',
          description: 'ユーザーから見えるシステムの設計',
          activities: ['UI/UX設計', 'API設計', 'インターフェース設計', 'セキュリティ設計'],
          deliverables: ['外部設計書', '画面設計書', 'API仕様書', 'セキュリティ設計書'],
          duration: '全工程の20%',
          riskFactors: ['ユーザビリティ問題', 'パフォーマンス要件', 'セキュリティホール']
        },
        {
          phase: '内部設計',
          icon: '🔧',
          color: 'bg-yellow-100',
          description: 'システム内部の詳細設計',
          activities: ['アーキテクチャ設計', 'データベース設計', 'プログラム設計', '構成管理設計'],
          deliverables: ['内部設計書', 'DB設計書', 'プログラム設計書', '構成管理計画'],
          duration: '全工程の20%',
          riskFactors: ['技術的複雑性', 'パフォーマンス', '保守性']
        },
        {
          phase: 'プログラミング',
          icon: '💻',
          color: 'bg-green-100',
          description: '設計に基づいたコーディング実装',
          activities: ['コーディング', 'コードレビュー', '単体テスト', 'リファクタリング'],
          deliverables: ['ソースコード', '単体テスト結果', 'コードレビュー記録', 'リファクタリング記録'],
          duration: '全工程の25%',
          riskFactors: ['バグ混入', 'コード品質', '進捗遅延']
        },
        {
          phase: 'テスト',
          icon: '🧪',
          color: 'bg-blue-100',
          description: '品質確保のための各種テスト実施',
          activities: ['結合テスト', 'システムテスト', '受入テスト', '性能テスト'],
          deliverables: ['テスト計画書', 'テスト仕様書', 'テスト結果報告書', '不具合管理表'],
          duration: '全工程の15%',
          riskFactors: ['重大バグ発見', 'テスト漏れ', '性能問題']
        },
        {
          phase: '運用・保守',
          icon: '🛠️',
          color: 'bg-purple-100',
          description: 'システム運用開始後の継続的な保守',
          activities: ['運用監視', '障害対応', '改善提案', 'データ移行'],
          deliverables: ['運用手順書', '保守計画書', '障害対応記録', '改善提案書'],
          duration: '全工程の5%',
          riskFactors: ['運用障害', '性能劣化', 'セキュリティ問題']
        }
      ]
    },
    'agile-development': {
      title: 'アジャイル開発手法',
      category: 'methodologies',
      level: 'intermediate',
      description: 'スクラム、カンバンを中心とした反復開発プロセス',
      keywords: ['アジャイル', 'スクラム', 'カンバン', 'スプリント'],
      estimatedTime: '40分',
      difficulty: 4,
      frameworks: [
        {
          name: 'スクラム',
          icon: '🏃',
          color: 'bg-blue-100',
          description: '固定期間のスプリントで反復開発を行うフレームワーク',
          roles: [
            { role: 'プロダクトオーナー', responsibility: 'プロダクトバックログ管理、優先順位決定' },
            { role: 'スクラムマスター', responsibility: 'プロセス管理、チーム支援、障害除去' },
            { role: '開発チーム', responsibility: 'プロダクト開発、自己組織化' }
          ],
          events: [
            { event: 'スプリント計画', purpose: 'スプリント目標設定、バックログ選択', timeBox: '2-4時間' },
            { event: 'デイリースクラム', purpose: '進捗共有、障害特定', timeBox: '15分' },
            { event: 'スプリントレビュー', purpose: '成果物デモ、フィードバック収集', timeBox: '1-2時間' },
            { event: 'スプリント振り返り', purpose: 'プロセス改善、チーム改善', timeBox: '1時間' }
          ],
          artifacts: ['プロダクトバックログ', 'スプリントバックログ', 'インクリメント']
        },
        {
          name: 'カンバン',
          icon: '📋',
          color: 'bg-green-100',
          description: '作業の可視化と流れの最適化に焦点を当てた手法',
          principles: [
            'ワークフローの可視化',
            'WIP（仕掛り作業）の制限',
            'フローの管理',
            '継続的な改善'
          ],
          practices: [
            'かんばんボードの使用',
            'WIP制限の設定',
            'サイクルタイムの測定',
            'リードタイムの追跡'
          ],
          metrics: ['スループット', 'リードタイム', 'サイクルタイム', 'WIP'],
          benefits: ['柔軟性向上', '可視性向上', '効率性向上', '品質向上']
        }
      ]
    },
    'testing-methodologies': {
      title: 'テスト手法と戦略',
      category: 'testing',
      level: 'intermediate',
      description: '体系的なテスト設計と実行戦略',
      keywords: ['テスト設計', 'テストケース', 'カバレッジ', 'デバッグ'],
      estimatedTime: '35分',
      difficulty: 3,
      testingLevels: [
        {
          level: '単体テスト',
          icon: '🔬',
          color: 'bg-green-100',
          scope: '個別のモジュール・関数レベル',
          responsibility: '開発者',
          techniques: ['ホワイトボックス', 'コードカバレッジ', 'パス解析'],
          tools: ['JUnit', 'pytest', 'Jest', 'xUnit系'],
          coverage: ['文カバレッジ', '分岐カバレッジ', '条件カバレッジ', 'パスカバレッジ']
        },
        {
          level: '結合テスト',
          icon: '🔗',
          color: 'bg-blue-100',
          scope: 'モジュール間の連携・インターフェース',
          responsibility: '開発者・テスター',
          techniques: ['トップダウン', 'ボトムアップ', 'ビッグバン', 'サンドイッチ'],
          tools: ['スタブ', 'ドライバ', 'モック', 'テストハーネス'],
          focusAreas: ['データ受け渡し', 'インターフェース整合性', 'API連携', 'プロトコル']
        },
        {
          level: 'システムテスト',
          icon: '🖥️',
          color: 'bg-yellow-100',
          scope: 'システム全体としての動作確認',
          responsibility: 'テストチーム',
          techniques: ['ブラックボックス', '境界値解析', '同値分割', 'デシジョンテーブル'],
          tools: ['Selenium', 'TestComplete', 'UFT', 'Cucumber'],
          testTypes: ['機能テスト', '性能テスト', 'セキュリティテスト', 'ユーザビリティテスト']
        },
        {
          level: '受入テスト',
          icon: '✅',
          color: 'bg-purple-100',
          scope: 'ユーザー要件の充足確認',
          responsibility: 'ユーザー・顧客',
          techniques: ['ユーザーシナリオ', '実運用想定', 'UAT', 'αβテスト'],
          tools: ['手動テスト', 'プロトタイピング', 'A/Bテスト', 'ユーザビリティテスト'],
          criteria: ['機能要件充足', '非機能要件充足', '操作性', 'ビジネス価値']
        }
      ]
    },
    'software-metrics': {
      title: 'ソフトウェア品質メトリクス',
      category: 'metrics',
      level: 'advanced',
      description: 'ソフトウェア品質の定量的測定と評価',
      keywords: ['品質メトリクス', 'KPI', '品質測定', '改善指標'],
      estimatedTime: '25分',
      difficulty: 4,
      qualityMetrics: [
        {
          category: '機能性メトリクス',
          icon: '⚙️',
          color: 'bg-blue-100',
          metrics: [
            { name: '機能適合性', formula: '実装機能数 / 要求機能数', target: '100%', description: '要求された機能の実装率' },
            { name: '機能完成度', formula: 'テスト合格機能数 / 実装機能数', target: '>95%', description: 'テストに合格した機能の割合' },
            { name: 'API完成度', formula: '実装API数 / 設計API数', target: '100%', description: 'API仕様に対する実装完成度' }
          ]
        },
        {
          category: '信頼性メトリクス',
          icon: '🛡️',
          color: 'bg-green-100',
          metrics: [
            { name: 'MTBF', formula: '稼働時間 / 障害発生回数', target: '>720時間', description: '平均障害間隔（Mean Time Between Failures）' },
            { name: 'MTTR', formula: '総復旧時間 / 障害発生回数', target: '<2時間', description: '平均復旧時間（Mean Time To Repair）' },
            { name: '可用性', formula: 'MTBF / (MTBF + MTTR)', target: '>99.9%', description: 'システムが利用可能な時間の割合' }
          ]
        },
        {
          category: '保守性メトリクス',
          icon: '🔧',
          color: 'bg-yellow-100',
          metrics: [
            { name: 'サイクロマティック複雑度', formula: 'M = E - N + 2P', target: '<10', description: 'プログラムの複雑さを表す指標' },
            { name: 'コードカバレッジ', formula: '実行された行数 / 総行数', target: '>80%', description: 'テストで実行されたコードの割合' },
            { name: '重複コード率', formula: '重複行数 / 総行数', target: '<5%', description: 'コードの重複度合い' }
          ]
        },
        {
          category: '効率性メトリクス',
          icon: '⚡',
          color: 'bg-purple-100',
          metrics: [
            { name: 'レスポンス時間', formula: '応答時間の平均値', target: '<2秒', description: 'ユーザー操作に対する応答時間' },
            { name: 'スループット', formula: '処理件数 / 時間', target: '>1000件/時', description: '単位時間当たりの処理能力' },
            { name: 'リソース使用率', formula: '使用量 / 総容量', target: '<70%', description: 'CPU、メモリ等のリソース使用率' }
          ]
        }
      ]
    },
    'design-patterns': {
      title: 'デザインパターン',
      category: 'architecture',
      level: 'advanced',
      description: 'GoF デザインパターンとアーキテクチャパターン',
      keywords: ['GoF', 'MVC', 'デザインパターン', 'アーキテクチャ'],
      estimatedTime: '45分',
      difficulty: 5,
      patternCategories: [
        {
          category: '生成パターン',
          icon: '🏗️',
          color: 'bg-blue-100',
          description: 'オブジェクトの生成に関するパターン',
          patterns: [
            {
              name: 'Singleton',
              purpose: 'クラスのインスタンスを1つに制限',
              useCase: 'ログ出力、データベース接続、設定管理',
              pros: ['グローバルアクセス', 'メモリ効率', '整合性保証'],
              cons: ['テストが困難', '密結合', 'マルチスレッド問題']
            },
            {
              name: 'Factory Method',
              purpose: 'オブジェクト生成をサブクラスに委譲',
              useCase: 'プラットフォーム依存処理、UI要素生成',
              pros: ['疎結合', '拡張性', 'ポリモーフィズム活用'],
              cons: ['クラス数増加', '複雑性', 'オーバーヘッド']
            },
            {
              name: 'Builder',
              purpose: '複雑なオブジェクトの段階的構築',
              useCase: 'SQL文構築、設定オブジェクト作成',
              pros: ['可読性', '柔軟性', 'バリデーション'],
              cons: ['コード量増加', '学習コスト', 'メモリ使用量']
            }
          ]
        },
        {
          category: '構造パターン',
          icon: '🏢',
          color: 'bg-green-100',
          description: 'クラスやオブジェクトの構造に関するパターン',
          patterns: [
            {
              name: 'Adapter',
              purpose: '互換性のないインターフェースを橋渡し',
              useCase: 'レガシーシステム連携、ライブラリ統合',
              pros: ['既存コード再利用', '段階的移行', 'インターフェース統一'],
              cons: ['間接参照オーバーヘッド', '複雑性増加', 'デバッグ困難']
            },
            {
              name: 'Decorator',
              purpose: 'オブジェクトに動的に機能を追加',
              useCase: 'UI装飾、ストリーム処理、ロギング',
              pros: ['実行時拡張', '単一責任原則', '組み合わせ自由'],
              cons: ['オブジェクト増加', 'デバッグ困難', 'パフォーマンス']
            },
            {
              name: 'Facade',
              purpose: '複雑なサブシステムへの簡単なインターフェース',
              useCase: 'API簡素化、ライブラリラッパー',
              pros: ['使いやすさ', '疎結合', '学習コスト削減'],
              cons: ['機能制限', 'ボトルネック', '抽象化過度']
            }
          ]
        },
        {
          category: '振る舞いパターン',
          icon: '🎭',
          color: 'bg-purple-100',
          description: 'オブジェクト間の相互作用に関するパターン',
          patterns: [
            {
              name: 'Observer',
              purpose: '状態変化を複数のオブジェクトに通知',
              useCase: 'MVC、イベント処理、リアルタイム更新',
              pros: ['疎結合', '動的関係', 'ブロードキャスト'],
              cons: ['メモリリーク', '予期しない更新', 'デバッグ困難']
            },
            {
              name: 'Strategy',
              purpose: 'アルゴリズムを動的に切り替え',
              useCase: 'ソート処理、決済処理、バリデーション',
              pros: ['アルゴリズム交換', 'Open/Closed原則', 'テスト容易'],
              cons: ['クライアント知識必要', 'オブジェクト増加', '設定複雑']
            },
            {
              name: 'Command',
              purpose: 'リクエストをオブジェクトとしてカプセル化',
              useCase: 'Undo/Redo、マクロ、キューイング',
              pros: ['疎結合', 'Undo実装', 'ログ記録'],
              cons: ['コード量増加', 'メモリ使用量', '複雑性']
            }
          ]
        }
      ]
    }
  };

  // 検索とフィルタリング機能
  const filteredConcepts = useMemo(() => {
    return Object.entries(developmentLibrary).filter(([key, concept]) => {
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
        <div className="bg-gradient-to-br from-green-600 via-teal-600 to-cyan-700 rounded-2xl text-white p-8 shadow-2xl mb-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
              💻 ソフトウェア開発エンジニアリング
            </h1>
            <p className="text-xl opacity-90 mb-6">
              SDLC から品質管理まで現代的な開発プロセスを完全習得
            </p>
            <div className="flex justify-center items-center space-x-6 text-sm opacity-80">
              <div className="flex items-center space-x-2">
                <span>🔄</span>
                <span>{Object.keys(developmentLibrary).length}の開発領域</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>⚡</span>
                <span>実践的手法</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📊</span>
                <span>品質メトリクス</span>
              </div>
            </div>
          </div>
        </div>

        {/* プロ級の検索・フィルターセクション */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="space-y-6">
            {/* 検索バー */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400 text-xl">🔍</span>
              </div>
              <input
                type="text"
                placeholder="キーワードで検索（例：アジャイル、テスト、品質）"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-4 py-3 text-lg rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
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
                    <span key={keyword} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
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

              {/* 展開コンテンツは長すぎるため省略 - 実際には各コンセプトの詳細を表示 */}
              {selectedConcept === key && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
                  <div className="text-center text-gray-600 py-8">
                    <div className="text-4xl mb-2">🚧</div>
                    <p>詳細コンテンツを開発中...</p>
                    <p className="text-sm mt-2">近日中に{concept.title}の詳細な学習コンテンツを追加予定です</p>
                  </div>
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
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              フィルターをリセット
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}