'use client';

import { useState, useMemo } from 'react';
import AppLayout from '@/components/AppLayout';

export default function DatabasePage() {
  // プロ級の状態管理
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [activeQuery, setActiveQuery] = useState<string>('');

  // プロ級のカテゴリシステム
  const categories = [
    { id: 'all', name: '全て', icon: '🎯', color: 'from-gray-400 to-gray-600' },
    { id: 'basics', name: 'SQL基礎', icon: '📋', color: 'from-blue-400 to-blue-600' },
    { id: 'queries', name: 'クエリ実践', icon: '🔍', color: 'from-green-400 to-green-600' },
    { id: 'design', name: 'DB設計', icon: '🏗️', color: 'from-purple-400 to-purple-600' },
    { id: 'optimization', name: 'パフォーマンス', icon: '⚡', color: 'from-orange-400 to-orange-600' },
    { id: 'transactions', name: 'トランザクション', icon: '🔄', color: 'from-red-400 to-red-600' }
  ];

  const learningLevels = [
    { id: 'all', name: '全レベル', color: 'bg-gray-100' },
    { id: 'beginner', name: '初級', color: 'bg-green-100' },
    { id: 'intermediate', name: '中級', color: 'bg-yellow-100' },
    { id: 'advanced', name: '上級', color: 'bg-red-100' }
  ];

  // プロ級のデータベース学習コンテンツライブラリ
  const databaseLibrary = {
    'sql-fundamentals': {
      title: 'SQL基礎文法マスター',
      category: 'basics',
      level: 'beginner',
      description: 'SELECT文からJOINまで完全攻略',
      keywords: ['SELECT', 'WHERE', 'JOIN', 'GROUP BY'],
      estimatedTime: '25分',
      difficulty: 2,
      concepts: [
        {
          name: 'SELECT文の基本構文',
          icon: '📝',
          color: 'bg-blue-100',
          description: 'データ取得の基本クエリ',
          interactive: true,
          examples: [
            {
              query: 'SELECT * FROM customers;',
              description: '全顧客データを取得',
              result: ['顧客ID: 1, 名前: 田中太郎, 年齢: 30', '顧客ID: 2, 名前: 佐藤花子, 年齢: 25'],
              explanation: '「*」は全ての列を意味する'
            },
            {
              query: 'SELECT name, age FROM customers;',
              description: '特定の列のみを取得',
              result: ['田中太郎, 30', '佐藤花子, 25', '鈴木一郎, 35'],
              explanation: '必要な列だけを指定することで効率的'
            }
          ]
        },
        {
          name: 'WHERE句とフィルタリング',
          icon: '🔍',
          color: 'bg-green-100',
          description: '条件指定によるデータ絞り込み',
          interactive: true,
          operators: [
            { symbol: '=', name: '等号', example: 'age = 30', description: '完全一致' },
            { symbol: '!=', name: '不等号', example: 'age != 30', description: '値が異なる' },
            { symbol: '>', name: '大なり', example: 'age > 30', description: '指定値より大きい' },
            { symbol: 'LIKE', name: '部分一致', example: "name LIKE '田%'", description: 'パターンマッチング' },
            { symbol: 'IN', name: '複数値', example: 'age IN (25, 30)', description: 'リスト内の値' },
            { symbol: 'BETWEEN', name: '範囲指定', example: 'age BETWEEN 20 AND 40', description: '範囲内の値' }
          ]
        }
      ]
    },
    'advanced-queries': {
      title: '高度なクエリテクニック',
      category: 'queries',
      level: 'intermediate',
      description: 'JOIN、サブクエリ、ウィンドウ関数まで',
      keywords: ['JOIN', 'サブクエリ', 'GROUP BY', 'HAVING'],
      estimatedTime: '35分',
      difficulty: 4,
      joinTypes: [
        {
          name: 'INNER JOIN',
          icon: '🔗',
          color: 'bg-blue-100',
          description: '両テーブルに存在するデータのみ',
          syntax: 'SELECT * FROM A INNER JOIN B ON A.id = B.id',
          usecase: '確実に関連するデータが存在する場合',
          diagram: '⚪ ⚪ (共通部分のみ)'
        },
        {
          name: 'LEFT JOIN',
          icon: '🔗',
          color: 'bg-green-100',
          description: '左テーブルの全データ + 右テーブルのマッチするデータ',
          syntax: 'SELECT * FROM A LEFT JOIN B ON A.id = B.id',
          usecase: 'メインデータを全て取得しつつ関連データも欲しい',
          diagram: '⚪ ⚫ (左テーブル優先)'
        },
        {
          name: 'RIGHT JOIN',
          icon: '🔗',
          color: 'bg-yellow-100',
          description: '右テーブルの全データ + 左テーブルのマッチするデータ',
          syntax: 'SELECT * FROM A RIGHT JOIN B ON A.id = B.id',
          usecase: 'RIGHT側のテーブルを基準にしたい場合',
          diagram: '⚫ ⚪ (右テーブル優先)'
        },
        {
          name: 'FULL OUTER JOIN',
          icon: '🔗',
          color: 'bg-purple-100',
          description: '両テーブルの全データ',
          syntax: 'SELECT * FROM A FULL OUTER JOIN B ON A.id = B.id',
          usecase: '全てのデータを取得したい場合',
          diagram: '⚪ ⚪ (全てのデータ)'
        }
      ]
    },
    'database-design': {
      title: 'データベース設計の原則',
      category: 'design',
      level: 'intermediate',
      description: 'ER図、正規化、インデックス設計',
      keywords: ['ER図', '正規化', 'インデックス', 'リレーション'],
      estimatedTime: '40分',
      difficulty: 3,
      designPrinciples: [
        {
          name: '第1正規形（1NF）',
          icon: '1️⃣',
          color: 'bg-indigo-100',
          rule: '繰り返し項目の排除',
          before: '顧客テーブル：[ID, 名前, 電話番号1, 電話番号2, 電話番号3]',
          after: '顧客テーブル：[ID, 名前] + 電話番号テーブル：[顧客ID, 電話番号]',
          benefit: 'データの重複を防ぎ、追加・削除が容易になる'
        },
        {
          name: '第2正規形（2NF）',
          icon: '2️⃣',
          color: 'bg-cyan-100',
          rule: '部分関数従属の排除',
          before: '注文明細：[注文ID, 商品ID, 商品名, 価格, 数量]',
          after: '注文明細：[注文ID, 商品ID, 数量] + 商品：[商品ID, 商品名, 価格]',
          benefit: '商品情報の重複を防ぎ、整合性を保つ'
        },
        {
          name: '第3正規形（3NF）',
          icon: '3️⃣',
          color: 'bg-pink-100',
          rule: '推移関数従属の排除',
          before: '顧客：[ID, 名前, 郵便番号, 都道府県, 市区町村]',
          after: '顧客：[ID, 名前, 郵便番号] + 住所：[郵便番号, 都道府県, 市区町村]',
          benefit: '間接的な依存関係を解消し、データ整合性を向上'
        }
      ]
    },
    'performance-tuning': {
      title: 'パフォーマンスチューニング',
      category: 'optimization',
      level: 'advanced',
      description: 'インデックス戦略と実行計画の最適化',
      keywords: ['インデックス', '実行計画', 'パーティション', 'キャッシュ'],
      estimatedTime: '30分',
      difficulty: 5,
      optimizationTechniques: [
        {
          name: 'インデックス設計',
          icon: '📊',
          color: 'bg-emerald-100',
          types: [
            { type: 'PRIMARY KEY', usage: 'テーブルの主キー', performance: '最高', note: '自動的にクラスタインデックス' },
            { type: 'UNIQUE INDEX', usage: '一意制約付き高速検索', performance: '高', note: '重複値を許さない' },
            { type: 'COMPOSITE INDEX', usage: '複数列での検索', performance: '高', note: '列の順序が重要' },
            { type: 'PARTIAL INDEX', usage: '条件付きインデックス', performance: '中', note: 'ストレージ効率が良い' }
          ]
        },
        {
          name: 'クエリ最適化',
          icon: '⚡',
          color: 'bg-amber-100',
          strategies: [
            { strategy: 'SELECT文の最適化', method: '必要な列のみ指定', impact: 'I/O削減', example: 'SELECT name, age (× SELECT *)' },
            { strategy: 'WHERE句の最適化', method: 'インデックス列を先頭に', impact: 'スキャン削減', example: 'WHERE indexed_col = ? AND other_col = ?' },
            { strategy: 'JOINの最適化', method: '適切な結合順序', impact: '中間結果削減', example: '小さなテーブルから結合' },
            { strategy: 'サブクエリ回避', method: 'JOINへの書き換え', impact: '実行効率向上', example: 'EXISTS → INNER JOIN' }
          ]
        }
      ]
    },
    'transaction-management': {
      title: 'トランザクション管理',
      category: 'transactions',
      level: 'advanced',
      description: 'ACID特性と分離レベルの実践的理解',
      keywords: ['ACID', '分離レベル', 'ロック', 'デッドロック'],
      estimatedTime: '35分',
      difficulty: 4,
      acidProperties: [
        {
          property: 'Atomicity（原子性）',
          icon: '⚛️',
          color: 'bg-red-100',
          definition: 'トランザクションは全て実行されるか、全て実行されないか',
          example: '銀行振込：引き出しと入金は両方成功するか、両方失敗する',
          implementation: 'BEGIN、COMMIT、ROLLBACK文で制御',
          failure: 'エラー発生時は自動的にROLLBACK'
        },
        {
          property: 'Consistency（一貫性）',
          icon: '⚖️',
          color: 'bg-blue-100',
          definition: 'トランザクション前後でデータの整合性が保たれる',
          example: '在庫管理：商品販売時は在庫数と売上が正しく更新される',
          implementation: '制約条件（CHECK、FOREIGN KEY）で保証',
          failure: '制約違反時はトランザクション失敗'
        },
        {
          property: 'Isolation（分離性）',
          icon: '🔒',
          color: 'bg-green-100',
          definition: '同時実行されるトランザクションが互いに影響しない',
          example: '複数ユーザーが同時にデータ更新しても干渉しない',
          implementation: 'ロック機構と分離レベル設定',
          failure: 'ダーティリードや幻読みの発生'
        },
        {
          property: 'Durability（永続性）',
          icon: '💾',
          color: 'bg-purple-100',
          definition: 'コミット後のデータは永続的に保存される',
          example: 'システム障害後もコミット済みデータは残る',
          implementation: 'ログファイルとチェックポイント',
          failure: 'ディスク障害時のデータ消失'
        }
      ]
    },
    'nosql-concepts': {
      title: 'NoSQLデータベース入門',
      category: 'design',
      level: 'intermediate',
      description: 'MongoDB、Redis、Cassandraの特徴と使い分け',
      keywords: ['MongoDB', 'Redis', 'Cassandra', 'ドキュメント'],
      estimatedTime: '30分',
      difficulty: 3,
      nosqlTypes: [
        {
          type: 'ドキュメント指向',
          icon: '📄',
          color: 'bg-orange-100',
          database: 'MongoDB',
          structure: 'JSON形式のドキュメント',
          usecase: 'Webアプリケーション、CMS、カタログ',
          pros: ['柔軟なスキーマ', '直感的なデータ構造', '水平スケーリング'],
          cons: ['結合が複雑', 'ACID制約が弱い', 'ディスク使用量大']
        },
        {
          type: 'キー・バリュー',
          icon: '🔑',
          color: 'bg-teal-100',
          database: 'Redis',
          structure: 'キーと値のペア',
          usecase: 'キャッシュ、セッション管理、リアルタイム分析',
          pros: ['高速アクセス', 'シンプル構造', 'メモリベース'],
          cons: ['複雑なクエリ不可', 'メモリ制約', '結合処理なし']
        },
        {
          type: '列指向',
          icon: '📊',
          color: 'bg-violet-100',
          database: 'Cassandra',
          structure: '列ファミリー',
          usecase: 'ビッグデータ、IoT、時系列データ',
          pros: ['高い可用性', '線形スケーリング', '書き込み最適化'],
          cons: ['結合不可', '複雑な設定', '学習コスト高']
        }
      ]
    }
  };

  // 検索とフィルタリング機能
  const filteredConcepts = useMemo(() => {
    return Object.entries(databaseLibrary).filter(([key, concept]) => {
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
        <div className="bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-700 rounded-2xl text-white p-8 shadow-2xl mb-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              🗃️ データベースマスタープログラム
            </h1>
            <p className="text-xl opacity-90 mb-6">
              SQL基礎からNoSQL、パフォーマンスチューニングまで完全攻略
            </p>
            <div className="flex justify-center items-center space-x-6 text-sm opacity-80">
              <div className="flex items-center space-x-2">
                <span>📊</span>
                <span>{Object.keys(databaseLibrary).length}の学習モジュール</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>💻</span>
                <span>実践的SQLクエリ</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🎯</span>
                <span>試験対策完全対応</span>
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
                placeholder="キーワードで検索（例：SELECT、JOIN、正規化）"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-4 py-3 text-lg rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
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
                    <span key={keyword} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
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
                  {/* SQL基礎詳細表示 */}
                  {key === 'sql-fundamentals' && 'concepts' in concept && (
                    <div className="space-y-6">
                      {concept.concepts.map((sqlConcept: any, index: number) => (
                        <div key={index} className={`${sqlConcept.color} rounded-lg p-4`}>
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">{sqlConcept.icon}</span>
                            <h4 className="text-lg font-bold text-gray-800">{sqlConcept.name}</h4>
                          </div>
                          <p className="text-gray-700 mb-4">{sqlConcept.description}</p>
                          
                          {sqlConcept.examples && (
                            <div className="space-y-3">
                              {sqlConcept.examples.map((example: any, i: number) => (
                                <div key={i} className="bg-white/70 rounded p-3">
                                  <div className="font-mono text-sm bg-gray-800 text-green-400 p-2 rounded mb-2">
                                    {example.query}
                                  </div>
                                  <div className="text-sm text-gray-700 mb-2">{example.description}</div>
                                  <div className="text-xs text-blue-600 mb-2">{example.explanation}</div>
                                  <div className="space-y-1">
                                    {example.result.map((result: string, j: number) => (
                                      <div key={j} className="text-xs text-gray-600 bg-gray-100 p-1 rounded">
                                        {result}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {sqlConcept.operators && (
                            <div className="grid md:grid-cols-2 gap-3">
                              {sqlConcept.operators.map((op: any, i: number) => (
                                <div key={i} className="bg-white/70 rounded p-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-gray-800">{op.symbol}</span>
                                    <span className="text-sm text-gray-600">{op.name}</span>
                                  </div>
                                  <div className="font-mono text-xs bg-gray-100 p-1 rounded mb-1">
                                    {op.example}
                                  </div>
                                  <div className="text-xs text-gray-600">{op.description}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 高度なクエリ詳細表示 */}
                  {key === 'advanced-queries' && 'joinTypes' in concept && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">JOIN の種類と使い分け</h4>
                      {concept.joinTypes.map((join: any, index: number) => (
                        <div key={index} className={`${join.color} rounded-lg p-4`}>
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">{join.icon}</span>
                            <h5 className="text-lg font-bold text-gray-800">{join.name}</h5>
                          </div>
                          <div className="space-y-3">
                            <div className="text-sm text-gray-700">{join.description}</div>
                            <div className="font-mono text-xs bg-gray-800 text-green-400 p-2 rounded">
                              {join.syntax}
                            </div>
                            <div className="text-sm">
                              <span className="font-semibold text-gray-800">使用場面：</span>
                              <span className="text-gray-700">{join.usecase}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="text-sm font-semibold text-gray-800">図解：</span>
                              <span className="text-lg">{join.diagram}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* データベース設計詳細表示 */}
                  {key === 'database-design' && 'designPrinciples' in concept && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">正規化プロセス</h4>
                      {concept.designPrinciples.map((principle: any, index: number) => (
                        <div key={index} className={`${principle.color} rounded-lg p-4`}>
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">{principle.icon}</span>
                            <h5 className="text-lg font-bold text-gray-800">{principle.name}</h5>
                          </div>
                          <div className="space-y-3">
                            <div className="text-sm font-semibold text-gray-800">{principle.rule}</div>
                            <div className="space-y-2">
                              <div>
                                <span className="text-xs font-semibold text-red-600">正規化前：</span>
                                <div className="text-xs text-gray-700 bg-red-50 p-2 rounded">
                                  {principle.before}
                                </div>
                              </div>
                              <div>
                                <span className="text-xs font-semibold text-green-600">正規化後：</span>
                                <div className="text-xs text-gray-700 bg-green-50 p-2 rounded">
                                  {principle.after}
                                </div>
                              </div>
                            </div>
                            <div className="text-xs text-blue-600 italic">
                              <span className="font-semibold">効果：</span> {principle.benefit}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* パフォーマンスチューニング詳細表示 */}
                  {key === 'performance-tuning' && 'optimizationTechniques' in concept && (
                    <div className="space-y-6">
                      {concept.optimizationTechniques.map((technique: any, index: number) => (
                        <div key={index} className={`${technique.color} rounded-lg p-4`}>
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">{technique.icon}</span>
                            <h5 className="text-lg font-bold text-gray-800">{technique.name}</h5>
                          </div>
                          
                          {technique.types && (
                            <div className="overflow-x-auto">
                              <table className="w-full bg-white/70 rounded">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left p-2">種類</th>
                                    <th className="text-left p-2">用途</th>
                                    <th className="text-left p-2">性能</th>
                                    <th className="text-left p-2">備考</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {technique.types.map((type: any, i: number) => (
                                    <tr key={i} className="border-b">
                                      <td className="p-2 font-semibold">{type.type}</td>
                                      <td className="p-2 text-sm">{type.usage}</td>
                                      <td className="p-2">
                                        <span className={`px-2 py-1 rounded text-xs ${
                                          type.performance === '最高' ? 'bg-green-100 text-green-800' :
                                          type.performance === '高' ? 'bg-blue-100 text-blue-800' :
                                          'bg-yellow-100 text-yellow-800'
                                        }`}>
                                          {type.performance}
                                        </span>
                                      </td>
                                      <td className="p-2 text-xs text-gray-600">{type.note}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {technique.strategies && (
                            <div className="grid md:grid-cols-2 gap-3">
                              {technique.strategies.map((strategy: any, i: number) => (
                                <div key={i} className="bg-white/70 rounded p-3">
                                  <div className="font-semibold text-gray-800 mb-2">{strategy.strategy}</div>
                                  <div className="text-sm text-gray-700 mb-1">
                                    <span className="font-semibold">手法:</span> {strategy.method}
                                  </div>
                                  <div className="text-sm text-green-600 mb-1">
                                    <span className="font-semibold">効果:</span> {strategy.impact}
                                  </div>
                                  <div className="font-mono text-xs bg-gray-100 p-1 rounded">
                                    {strategy.example}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* トランザクション管理詳細表示 */}
                  {key === 'transaction-management' && 'acidProperties' in concept && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">ACID特性の詳細解説</h4>
                      {concept.acidProperties.map((property: any, index: number) => (
                        <div key={index} className={`${property.color} rounded-lg p-4`}>
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">{property.icon}</span>
                            <h5 className="text-lg font-bold text-gray-800">{property.property}</h5>
                          </div>
                          <div className="space-y-3">
                            <div className="text-sm text-gray-700">{property.definition}</div>
                            <div className="bg-white/70 rounded p-3">
                              <div className="text-sm font-semibold text-gray-800 mb-1">実例</div>
                              <div className="text-sm text-gray-700">{property.example}</div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-3">
                              <div className="bg-white/70 rounded p-3">
                                <div className="text-sm font-semibold text-green-600 mb-1">実装方法</div>
                                <div className="text-xs text-gray-700">{property.implementation}</div>
                              </div>
                              <div className="bg-white/70 rounded p-3">
                                <div className="text-sm font-semibold text-red-600 mb-1">失敗例</div>
                                <div className="text-xs text-gray-700">{property.failure}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* NoSQL概念詳細表示 */}
                  {key === 'nosql-concepts' && 'nosqlTypes' in concept && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">NoSQLデータベースの種類</h4>
                      {concept.nosqlTypes.map((nosql: any, index: number) => (
                        <div key={index} className={`${nosql.color} rounded-lg p-4`}>
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">{nosql.icon}</span>
                            <div>
                              <h5 className="text-lg font-bold text-gray-800">{nosql.type}</h5>
                              <div className="text-sm text-gray-600">代表例: {nosql.database}</div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <span className="text-sm font-semibold text-gray-800">データ構造:</span>
                              <span className="text-sm text-gray-700 ml-2">{nosql.structure}</span>
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-gray-800">主な用途:</span>
                              <span className="text-sm text-gray-700 ml-2">{nosql.usecase}</span>
                            </div>
                            <div className="grid md:grid-cols-2 gap-3">
                              <div>
                                <div className="text-sm font-semibold text-green-600 mb-2">メリット</div>
                                <div className="space-y-1">
                                  {nosql.pros.map((pro: string, i: number) => (
                                    <div key={i} className="text-xs bg-green-50 text-green-800 px-2 py-1 rounded">
                                      ✅ {pro}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-red-600 mb-2">デメリット</div>
                                <div className="space-y-1">
                                  {nosql.cons.map((con: string, i: number) => (
                                    <div key={i} className="text-xs bg-red-50 text-red-800 px-2 py-1 rounded">
                                      ❌ {con}
                                    </div>
                                  ))}
                                </div>
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
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              フィルターをリセット
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}