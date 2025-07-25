'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SQLQuery {
  id: number;
  name: string;
  description: string;
  query: string;
  result: string[];
}

const sampleQueries: SQLQuery[] = [
  {
    id: 1,
    name: 'SELECT文（基本）',
    description: '全ての顧客データを取得',
    query: 'SELECT * FROM customers;',
    result: ['顧客ID: 1, 名前: 田中太郎, 年齢: 30', '顧客ID: 2, 名前: 佐藤花子, 年齢: 25']
  },
  {
    id: 2,
    name: 'SELECT文（列指定）',
    description: '特定の列のみを取得',
    query: 'SELECT name, age FROM customers;',
    result: ['田中太郎, 30', '佐藤花子, 25', '鈴木一郎, 35']
  },
  {
    id: 3,
    name: 'WHERE句（条件指定）',
    description: '年齢が30歳以上の顧客を取得',
    query: 'SELECT * FROM customers WHERE age >= 30;',
    result: ['顧客ID: 1, 名前: 田中太郎, 年齢: 30', '顧客ID: 3, 名前: 鈴木一郎, 年齢: 35']
  },
  {
    id: 4,
    name: 'ORDER BY句（並び替え）',
    description: '年齢順でソート',
    query: 'SELECT * FROM customers ORDER BY age DESC;',
    result: ['鈴木一郎, 35', '田中太郎, 30', '佐藤花子, 25']
  },
  {
    id: 5,
    name: 'INSERT文（データ挿入）',
    description: '新しい顧客データを挿入',
    query: 'INSERT INTO customers (name, age) VALUES ("山田次郎", 28);',
    result: ['1行が挿入されました']
  },
  {
    id: 6,
    name: 'UPDATE文（データ更新）',
    description: '顧客の年齢を更新',
    query: 'UPDATE customers SET age = 31 WHERE name = "田中太郎";',
    result: ['1行が更新されました']
  },
  {
    id: 7,
    name: 'DELETE文（データ削除）',
    description: '条件に合致するデータを削除',
    query: 'DELETE FROM customers WHERE age < 25;',
    result: ['該当する行が削除されました']
  },
  {
    id: 8,
    name: 'JOIN（内部結合）',
    description: '2つのテーブルを結合',
    query: 'SELECT c.name, o.product FROM customers c INNER JOIN orders o ON c.id = o.customer_id;',
    result: ['田中太郎, ノートPC', '佐藤花子, スマートフォン']
  },
  {
    id: 9,
    name: 'GROUP BY（グループ化）',
    description: '年代別に集計',
    query: 'SELECT FLOOR(age/10)*10 as 年代, COUNT(*) as 人数 FROM customers GROUP BY FLOOR(age/10)*10;',
    result: ['20代: 2人', '30代: 1人']
  },
  {
    id: 10,
    name: 'HAVING句（集計条件）',
    description: 'グループ化後の条件指定',
    query: 'SELECT age, COUNT(*) FROM customers GROUP BY age HAVING COUNT(*) > 1;',
    result: ['30歳: 2人']
  }
];

interface NormalizationStep {
  id: number;
  name: string;
  description: string;
  before: string[];
  after: string[];
}

const normalizationSteps: NormalizationStep[] = [
  {
    id: 1,
    name: '第1正規形（1NF）',
    description: '繰り返し項目を排除し、原子的な値のみにする',
    before: ['顧客ID | 名前 | 商品1,商品2,商品3'],
    after: ['顧客ID | 名前', '顧客ID | 商品']
  },
  {
    id: 2,
    name: '第2正規形（2NF）',
    description: '主キーではない項目に従属している項目を排除',
    before: ['注文ID,商品ID | 商品名 | 単価 | 数量'],
    after: ['注文ID,商品ID | 数量', '商品ID | 商品名 | 単価']
  },
  {
    id: 3,
    name: '第3正規形（3NF）',
    description: '推移関数従属を排除',
    before: ['社員ID | 部署ID | 部署名'],
    after: ['社員ID | 部署ID', '部署ID | 部署名']
  }
];

export default function DatabasePage() {
  const [selectedQuery, setSelectedQuery] = useState<SQLQuery | null>(null);
  const [selectedNormalization, setSelectedNormalization] = useState<NormalizationStep | null>(null);
  const [activeTab, setActiveTab] = useState<'sql' | 'normalization' | 'er' | 'concepts'>('concepts');
  const [selectedConcept, setSelectedConcept] = useState<string>('acid');

  // データベース概念図解データ
  const conceptDiagrams = {
    acid: {
      title: "ACID特性",
      description: "トランザクションの信頼性を保証する4つの性質",
      components: [
        { id: 'A', label: 'Atomicity\n(原子性)', color: 'bg-red-100', description: 'トランザクションは全実行か全未実行' },
        { id: 'C', label: 'Consistency\n(一貫性)', color: 'bg-blue-100', description: 'データの整合性を保つ' },
        { id: 'I', label: 'Isolation\n(独立性)', color: 'bg-green-100', description: '複数のトランザクションが干渉しない' },
        { id: 'D', label: 'Durability\n(永続性)', color: 'bg-yellow-100', description: '確定した変更は永続化される' }
      ]
    },
    cap: {
      title: "CAP定理",
      description: "分散システムで同時に満たせるのは最大2つまで",
      components: [
        { id: 'C', label: 'Consistency\n(一貫性)', color: 'bg-purple-100', description: '全ノードで同じデータを保持' },
        { id: 'A', label: 'Availability\n(可用性)', color: 'bg-orange-100', description: 'システムが常に応答可能' },
        { id: 'P', label: 'Partition tolerance\n(分断耐性)', color: 'bg-teal-100', description: 'ネットワーク障害に耐える' }
      ]
    },
    normalization: {
      title: "正規化の過程",
      description: "データの冗長性を排除し、整合性を保つプロセス",
      steps: [
        { step: '第1正規形', description: '繰り返し項目を排除', color: 'bg-red-50', detail: '原子値のみ格納' },
        { step: '第2正規形', description: '主キーへの完全関数従属', color: 'bg-orange-50', detail: '部分関数従属を排除' },
        { step: '第3正規形', description: '推移関数従属を排除', color: 'bg-yellow-50', detail: '非主属性間の従属関係を排除' },
        { step: 'BCNF', description: '全ての決定子が候補キー', color: 'bg-green-50', detail: '最も厳密な正規形' }
      ]
    },
    transaction: {
      title: "トランザクション処理",
      description: "データベース操作の一貫性を保つ仕組み",
      flow: [
        { step: 'BEGIN', description: 'トランザクション開始', color: 'bg-blue-100', detail: '作業領域確保' },
        { step: 'DML操作', description: 'INSERT/UPDATE/DELETE', color: 'bg-yellow-100', detail: 'データ操作実行' },
        { step: '検証', description: '制約チェック', color: 'bg-orange-100', detail: 'ACID特性の確認' },
        { step: 'COMMIT/ROLLBACK', description: '確定または取消', color: 'bg-green-100', detail: '最終的な処理決定' }
      ]
    },
    er: {
      title: "ER図の構成要素",
      description: "エンティティとリレーションシップを視覚化",
      elements: [
        { type: 'entity', label: 'エンティティ', shape: '長方形', color: 'bg-blue-100', description: '実体（テーブル）を表現' },
        { type: 'attribute', label: '属性', shape: '楕円', color: 'bg-green-100', description: 'エンティティの特性' },
        { type: 'relationship', label: 'リレーションシップ', shape: 'ひし形', color: 'bg-yellow-100', description: 'エンティティ間の関係' },
        { type: 'key', label: '主キー', shape: '下線', color: 'bg-red-100', description: '一意識別子' }
      ]
    },
    lock: {
      title: "ロック機構",
      description: "同時実行制御によるデータ整合性の保持",
      types: [
        { type: '共有ロック', description: '読み取り専用', color: 'bg-blue-100', detail: '複数同時取得可能' },
        { type: '排他ロック', description: '読み書き専用', color: 'bg-red-100', detail: '1つのみ取得可能' },
        { type: '意図ロック', description: '階層ロック制御', color: 'bg-yellow-100', detail: 'デッドロック防止' },
        { type: 'デッドロック', description: '相互待機状態', color: 'bg-gray-100', detail: '自動検出・解除' }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* ホームボタン */}
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            ホームに戻る
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-8">データベース設計・操作</h1>
        
        {/* タブナビゲーション */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('concepts')}
              className={`pb-2 px-4 font-medium ${
                activeTab === 'concepts'
                  ? 'border-b-2 border-purple-500 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              概念図解
            </button>
            <button
              onClick={() => setActiveTab('sql')}
              className={`pb-2 px-4 font-medium ${
                activeTab === 'sql'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              SQL実習
            </button>
            <button
              onClick={() => setActiveTab('normalization')}
              className={`pb-2 px-4 font-medium ${
                activeTab === 'normalization'
                  ? 'border-b-2 border-green-500 text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              正規化
            </button>
            <button
              onClick={() => setActiveTab('er')}
              className={`pb-2 px-4 font-medium ${
                activeTab === 'er'
                  ? 'border-b-2 border-orange-500 text-orange-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ERモデル
            </button>
          </nav>
        </div>

        {/* 概念図解タブ */}
        {activeTab === 'concepts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">データベース概念の視覚的理解</h2>
              <p className="text-gray-600 mb-6">
                複雑なデータベースの概念を図解で分かりやすく学習しましょう
              </p>
              
              {/* 概念選択 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.keys(conceptDiagrams).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedConcept(key)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      selectedConcept === key
                        ? 'bg-purple-100 text-purple-800 border-2 border-purple-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {conceptDiagrams[key as keyof typeof conceptDiagrams].title}
                  </button>
                ))}
              </div>

              {/* 選択された概念の図解 */}
              {selectedConcept && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {conceptDiagrams[selectedConcept as keyof typeof conceptDiagrams].title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {conceptDiagrams[selectedConcept as keyof typeof conceptDiagrams].description}
                  </p>

                  {/* ACID特性の図解 */}
                  {selectedConcept === 'acid' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {conceptDiagrams.acid.components.map((component) => (
                        <div key={component.id} className={`${component.color} rounded-lg p-4 border-2 border-gray-300`}>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-800 mb-2">{component.id}</div>
                            <div className="text-sm font-medium text-gray-700 whitespace-pre-line mb-2">
                              {component.label}
                            </div>
                            <div className="text-xs text-gray-600">{component.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CAP定理の図解 */}
                  {selectedConcept === 'cap' && (
                    <div className="relative">
                      <div className="flex justify-center items-center h-64">
                        <div className="relative w-64 h-64">
                          {/* 三角形の各頂点 */}
                          {conceptDiagrams.cap.components.map((component, index) => {
                            const positions = [
                              { top: '0', left: '50%', transform: 'translateX(-50%)' },
                              { bottom: '0', left: '0' },
                              { bottom: '0', right: '0' }
                            ];
                            return (
                              <div
                                key={component.id}
                                className={`absolute ${component.color} rounded-lg p-3 border-2 border-gray-300`}
                                style={positions[index]}
                              >
                                <div className="text-center">
                                  <div className="text-lg font-bold text-gray-800">{component.id}</div>
                                  <div className="text-sm font-medium text-gray-700 whitespace-pre-line">
                                    {component.label}
                                  </div>
                                  <div className="text-xs text-gray-600 mt-1">{component.description}</div>
                                </div>
                              </div>
                            );
                          })}
                          {/* 中央のメッセージ */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-3 border-2 border-red-300 text-center">
                            <div className="text-sm font-bold text-red-600">最大2つまで</div>
                            <div className="text-xs text-red-500">同時選択可能</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 正規化の図解 */}
                  {selectedConcept === 'normalization' && (
                    <div className="space-y-4">
                      {conceptDiagrams.normalization.steps.map((step, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className={`${step.color} rounded-lg p-3 min-w-[120px] text-center border-2 border-gray-300`}>
                            <div className="font-bold text-gray-800">{step.step}</div>
                            <div className="text-xs text-gray-600 mt-1">{step.detail}</div>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-800">{step.description}</div>
                          </div>
                          {index < conceptDiagrams.normalization.steps.length - 1 && (
                            <div className="text-2xl text-gray-400">→</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* トランザクション処理の図解 */}
                  {selectedConcept === 'transaction' && (
                    <div className="space-y-4">
                      {conceptDiagrams.transaction.flow.map((step, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className={`${step.color} rounded-lg p-3 min-w-[120px] text-center border-2 border-gray-300`}>
                            <div className="font-bold text-gray-800">{step.step}</div>
                            <div className="text-xs text-gray-600 mt-1">{step.detail}</div>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-800">{step.description}</div>
                          </div>
                          {index < conceptDiagrams.transaction.flow.length - 1 && (
                            <div className="text-2xl text-gray-400">↓</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ER図要素の図解 */}
                  {selectedConcept === 'er' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {conceptDiagrams.er.elements.map((element) => (
                        <div key={element.type} className={`${element.color} rounded-lg p-4 border-2 border-gray-300`}>
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-800 mb-1">{element.label}</div>
                            <div className="text-sm text-gray-600 mb-2">形状: {element.shape}</div>
                            <div className="text-xs text-gray-600">{element.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ロック機構の図解 */}
                  {selectedConcept === 'lock' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {conceptDiagrams.lock.types.map((lockType) => (
                        <div key={lockType.type} className={`${lockType.color} rounded-lg p-4 border-2 border-gray-300`}>
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-800 mb-1">{lockType.type}</div>
                            <div className="text-sm text-gray-700 mb-2">{lockType.description}</div>
                            <div className="text-xs text-gray-600">{lockType.detail}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* SQL実習タブ */}
        {activeTab === 'sql' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SQLクエリ一覧 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">SQL文サンプル</h2>
              <div className="space-y-2">
                {sampleQueries.map((query) => (
                  <button
                    key={query.id}
                    onClick={() => setSelectedQuery(query)}
                    className={`w-full text-left p-3 rounded-lg border ${
                      selectedQuery?.id === query.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-800">{query.name}</div>
                    <div className="text-sm text-gray-600">{query.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 選択されたクエリの詳細 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">クエリ詳細</h2>
              {selectedQuery ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">{selectedQuery.name}</h3>
                    <p className="text-gray-600 mb-4">{selectedQuery.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">SQL文</h4>
                    <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
                      {selectedQuery.query}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">実行結果</h4>
                    <div className="bg-green-50 p-3 rounded-lg">
                      {selectedQuery.result.map((row, index) => (
                        <div key={index} className="text-sm text-green-800">
                          {row}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">左側のSQL文を選択してください</p>
              )}
            </div>
          </div>
        )}

        {/* 正規化タブ */}
        {activeTab === 'normalization' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 正規化ステップ一覧 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">正規化の段階</h2>
              <div className="space-y-2">
                {normalizationSteps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setSelectedNormalization(step)}
                    className={`w-full text-left p-3 rounded-lg border ${
                      selectedNormalization?.id === step.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-800">{step.name}</div>
                    <div className="text-sm text-gray-600">{step.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 選択された正規化の詳細 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">正規化詳細</h2>
              {selectedNormalization ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">{selectedNormalization.name}</h3>
                    <p className="text-gray-600 mb-4">{selectedNormalization.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">正規化前</h4>
                    <div className="bg-red-50 p-3 rounded-lg">
                      {selectedNormalization.before.map((table, index) => (
                        <div key={index} className="text-sm text-red-800 font-mono">
                          {table}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center text-2xl text-gray-400">↓</div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">正規化後</h4>
                    <div className="bg-green-50 p-3 rounded-lg">
                      {selectedNormalization.after.map((table, index) => (
                        <div key={index} className="text-sm text-green-800 font-mono">
                          {table}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">左側の正規化段階を選択してください</p>
              )}
            </div>
          </div>
        )}

        {/* ERモデルタブ */}
        {activeTab === 'er' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">ER図（Entity-Relationship図）</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-100 rounded-lg p-4 border-2 border-blue-300">
                  <div className="text-center">
                    <div className="w-20 h-12 bg-blue-200 border-2 border-blue-400 mx-auto mb-2 flex items-center justify-center">
                      <span className="text-xs font-bold">エンティティ</span>
                    </div>
                    <div className="text-sm text-blue-800">実体（テーブル）</div>
                  </div>
                </div>
                
                <div className="bg-green-100 rounded-lg p-4 border-2 border-green-300">
                  <div className="text-center">
                    <div className="w-20 h-12 bg-green-200 border-2 border-green-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-xs font-bold">属性</span>
                    </div>
                    <div className="text-sm text-green-800">エンティティの特性</div>
                  </div>
                </div>
                
                <div className="bg-yellow-100 rounded-lg p-4 border-2 border-yellow-300">
                  <div className="text-center">
                    <div className="w-20 h-12 bg-yellow-200 border-2 border-yellow-400 mx-auto mb-2 flex items-center justify-center transform rotate-45">
                      <span className="text-xs font-bold transform -rotate-45">関係</span>
                    </div>
                    <div className="text-sm text-yellow-800">リレーションシップ</div>
                  </div>
                </div>
                
                <div className="bg-red-100 rounded-lg p-4 border-2 border-red-300">
                  <div className="text-center">
                    <div className="w-20 h-12 bg-red-200 border-2 border-red-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-xs font-bold underline">主キー</span>
                    </div>
                    <div className="text-sm text-red-800">一意識別子</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-4">簡単なER図の例：顧客と注文</h3>
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-center">
                    <div className="bg-blue-200 border-2 border-blue-400 p-4 rounded">
                      <div className="font-bold underline">顧客ID</div>
                      <div>顧客名</div>
                      <div>電話番号</div>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">顧客エンティティ</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-yellow-200 border-2 border-yellow-400 p-3 transform rotate-45">
                      <span className="transform -rotate-45 text-sm font-bold">注文する</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">リレーションシップ</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-blue-200 border-2 border-blue-400 p-4 rounded">
                      <div className="font-bold underline">注文ID</div>
                      <div>注文日</div>
                      <div>金額</div>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">注文エンティティ</div>
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