'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// 正規化アニメーションコンポーネント
const NormalizationAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const normalizationSteps = [
    {
      title: '非正規化テーブル',
      description: '重複データと複数値属性を含む状態',
      data: [
        { id: 1, name: '田中太郎', address: '東京都渋谷区1-1-1, 2F', phone: '03-1111-1111,090-1111-1111', department: '営業部', deptManager: '山田部長' },
        { id: 2, name: '佐藤花子', address: '大阪府大阪市2-2-2, 3F', phone: '06-2222-2222', department: '技術部', deptManager: '鈴木部長' },
        { id: 3, name: '鈴木一郎', address: '愛知県名古屋市3-3-3', phone: '052-3333-3333,090-3333-3333', department: '営業部', deptManager: '山田部長' }
      ],
      issues: ['住所に建物情報が混在', '電話番号が複数値', '部署情報の重複']
    },
    {
      title: '第1正規形（1NF）',
      description: '原子値に分解し、複数値属性を除去',
      data: [
        { id: 1, name: '田中太郎', prefecture: '東京都', city: '渋谷区', street: '1-1-1', building: '2F', phone: '03-1111-1111', department: '営業部', deptManager: '山田部長' },
        { id: 1, name: '田中太郎', prefecture: '東京都', city: '渋谷区', street: '1-1-1', building: '2F', phone: '090-1111-1111', department: '営業部', deptManager: '山田部長' },
        { id: 2, name: '佐藤花子', prefecture: '大阪府', city: '大阪市', street: '2-2-2', building: '3F', phone: '06-2222-2222', department: '技術部', deptManager: '鈴木部長' },
        { id: 3, name: '鈴木一郎', prefecture: '愛知県', city: '名古屋市', street: '3-3-3', building: '', phone: '052-3333-3333', department: '営業部', deptManager: '山田部長' },
        { id: 3, name: '鈴木一郎', prefecture: '愛知県', city: '名古屋市', street: '3-3-3', building: '', phone: '090-3333-3333', department: '営業部', deptManager: '山田部長' }
      ],
      improvements: ['住所を都道府県、市区町村、番地、建物に分割', '電話番号を1行1件に分割']
    },
    {
      title: '第2正規形（2NF）',
      description: '部分関数従属を除去し、テーブルを分割',
      tables: {
        employees: [
          { emp_id: 1, name: '田中太郎', dept_id: 1 },
          { emp_id: 2, name: '佐藤花子', dept_id: 2 },
          { emp_id: 3, name: '鈴木一郎', dept_id: 1 }
        ],
        addresses: [
          { emp_id: 1, prefecture: '東京都', city: '渋谷区', street: '1-1-1', building: '2F' },
          { emp_id: 2, prefecture: '大阪府', city: '大阪市', street: '2-2-2', building: '3F' },
          { emp_id: 3, prefecture: '愛知県', city: '名古屋市', street: '3-3-3', building: '' }
        ],
        phones: [
          { emp_id: 1, phone: '03-1111-1111' },
          { emp_id: 1, phone: '090-1111-1111' },
          { emp_id: 2, phone: '06-2222-2222' },
          { emp_id: 3, phone: '052-3333-3333' },
          { emp_id: 3, phone: '090-3333-3333' }
        ],
        departments: [
          { dept_id: 1, department: '営業部', manager: '山田部長' },
          { dept_id: 2, department: '技術部', manager: '鈴木部長' }
        ]
      },
      improvements: ['重複する部署情報を別テーブルに分離', '住所と電話番号も分離']
    },
    {
      title: '第3正規形（3NF）',
      description: '推移関数従属を除去し、データを完全に正規化',
      tables: {
        employees: [
          { emp_id: 1, name: '田中太郎', dept_id: 1 },
          { emp_id: 2, name: '佐藤花子', dept_id: 2 },
          { emp_id: 3, name: '鈴木一郎', dept_id: 1 }
        ],
        departments: [
          { dept_id: 1, dept_name: '営業部', manager_id: 101 },
          { dept_id: 2, dept_name: '技術部', manager_id: 102 }
        ],
        managers: [
          { manager_id: 101, manager_name: '山田部長' },
          { manager_id: 102, manager_name: '鈴木部長' }
        ],
        addresses: [
          { emp_id: 1, prefecture: '東京都', city: '渋谷区', street: '1-1-1', building: '2F' },
          { emp_id: 2, prefecture: '大阪府', city: '大阪市', street: '2-2-2', building: '3F' },
          { emp_id: 3, prefecture: '愛知県', city: '名古屋市', street: '3-3-3', building: '' }
        ],
        phones: [
          { emp_id: 1, phone: '03-1111-1111' },
          { emp_id: 1, phone: '090-1111-1111' },
          { emp_id: 2, phone: '06-2222-2222' },
          { emp_id: 3, phone: '052-3333-3333' },
          { emp_id: 3, phone: '090-3333-3333' }
        ]
      },
      improvements: ['部署の管理者情報を別テーブルに分離', '全ての推移関数従属を除去']
    }
  ];

  const nextStep = () => {
    if (currentStep < normalizationSteps.length - 1) {
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
    setIsAnimating(false);
  };

  const step = normalizationSteps[currentStep];

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-2xl font-semibold text-cyan-600 dark:text-cyan-400">
          {step.title}
        </h4>
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
            disabled={currentStep === normalizationSteps.length - 1}
            className="px-4 py-2 bg-cyan-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-600"
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

      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {step.description}
      </p>

      {/* ステップインジケーター */}
      <div className="flex mb-6">
        {normalizationSteps.map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-2 mx-1 rounded ${
              index <= currentStep ? 'bg-cyan-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* データ表示 */}
      <div className="space-y-4">
        {currentStep <= 1 && step.data && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-300 dark:border-gray-600">
              <thead className="bg-gray-100 dark:bg-gray-600">
                <tr>
                  {Object.keys(step.data[0] || {}).map((header) => (
                    <th key={header} className="border px-2 py-1 text-left">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {step.data.map((row: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                    {Object.values(row).map((cell: any, cellIndex: number) => (
                      <td key={cellIndex} className="border px-2 py-1">
                        {String(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {currentStep >= 2 && step.tables && (
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(step.tables).map(([tableName, tableData]: [string, any[]]) => (
              <div key={tableName} className="border rounded">
                <h5 className="bg-cyan-100 dark:bg-cyan-900 px-3 py-2 font-semibold capitalize">
                  {tableName}テーブル
                </h5>
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-600">
                    <tr>
                      {Object.keys(tableData[0] || {}).map((header) => (
                        <th key={header} className="border px-2 py-1 text-left text-xs">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                        {Object.values(row).map((cell: any, cellIndex: number) => (
                          <td key={cellIndex} className="border px-2 py-1 text-xs">
                            {String(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}

        {/* 改善点の表示 */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <h5 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            {currentStep === 0 ? '問題点:' : '改善点:'}
          </h5>
          <ul className="list-disc list-inside text-sm text-green-700 dark:text-green-300">
            {(step.issues || step.improvements || []).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const databaseConcepts = [
  {
    id: 'sql-basics',
    name: 'SQL基礎',
    description: 'データベースクエリの基本文法と実践',
    category: 'basics',
    concepts: [
      {
        name: 'SELECT文の基本構文',
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
  {
    id: 'database-design',
    name: 'データベース設計',
    description: '正規化とER図による効率的なDB設計',
    category: 'design',
    designPrinciples: [
      {
        name: '第1正規形（1NF）',
        rule: '各属性は原子値（分割不可能な値）である',
        example: '住所を「都道府県」「市区町村」「番地」に分割',
        benefits: ['データの一意性確保', '検索効率向上']
      },
      {
        name: '第2正規形（2NF）',
        rule: '1NFを満たし、部分関数従属を排除',
        example: '商品テーブルから価格情報を分離',
        benefits: ['データ重複の削除', '更新異常の防止']
      },
      {
        name: '第3正規形（3NF）',
        rule: '2NFを満たし、推移関数従属を排除',
        example: '顧客テーブルから部署情報を分離',
        benefits: ['データ整合性の向上', '保守性の改善']
      }
    ],
    entities: [
      {
        name: '顧客エンティティ',
        attributes: ['顧客ID', '氏名', 'メールアドレス', '電話番号'],
        relationships: ['注文エンティティと1:多の関係']
      },
      {
        name: '商品エンティティ',
        attributes: ['商品ID', '商品名', '価格', '在庫数'],
        relationships: ['注文明細エンティティと1:多の関係']
      },
      {
        name: '注文エンティティ',
        attributes: ['注文ID', '顧客ID', '注文日', '合計金額'],
        relationships: ['顧客エンティティと多:1の関係', '注文明細エンティティと1:多の関係']
      }
    ]
  },
  {
    id: 'advanced-sql',
    name: '高度なSQL',
    description: 'JOINやサブクエリを使った複雑なデータ操作',
    category: 'advanced',
    joinTypes: [
      {
        type: 'INNER JOIN',
        description: '両方のテーブルに一致するレコードのみ取得',
        diagram: '重なる部分のみ',
        example: 'SELECT c.name, o.total FROM customers c INNER JOIN orders o ON c.id = o.customer_id'
      },
      {
        type: 'LEFT JOIN',
        description: '左テーブルの全レコードと右テーブルの一致するレコード',
        diagram: '左側全体＋重なる部分',
        example: 'SELECT c.name, o.total FROM customers c LEFT JOIN orders o ON c.id = o.customer_id'
      },
      {
        type: 'RIGHT JOIN',
        description: '右テーブルの全レコードと左テーブルの一致するレコード',
        diagram: '右側全体＋重なる部分',
        example: 'SELECT c.name, o.total FROM customers c RIGHT JOIN orders o ON c.id = o.customer_id'
      },
      {
        type: 'FULL OUTER JOIN',
        description: '両方のテーブルの全レコード',
        diagram: '両側全体',
        example: 'SELECT c.name, o.total FROM customers c FULL OUTER JOIN orders o ON c.id = o.customer_id'
      }
    ]
  }
];

export default function DatabasePage() {
  const [selectedConcept, setSelectedConcept] = useState('sql-basics');
  const [selectedExample, setSelectedExample] = useState<number | null>(null);
  const [selectedJoin, setSelectedJoin] = useState<string | null>(null);

  const currentConcept = databaseConcepts.find(c => c.id === selectedConcept);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-cyan-600 hover:text-cyan-800 flex items-center mb-4">
            ← ホームに戻る
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            🗃️ データベース技術
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            SQL基礎からデータベース設計まで、実践的なDB技術を図解で学習しましょう
          </p>
        </div>

        {/* コンセプト選択タブ */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 mb-6">
            {databaseConcepts.map((concept) => (
              <button
                key={concept.id}
                onClick={() => setSelectedConcept(concept.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedConcept === concept.id
                    ? 'bg-cyan-500 text-white shadow-lg'
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

              {/* SQL基礎の表示 */}
              {selectedConcept === 'sql-basics' && currentConcept.concepts && (
                <div className="space-y-8">
                  {currentConcept.concepts.map((concept, index) => (
                    <div key={index} className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                        {concept.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {concept.description}
                      </p>
                      
                      {concept.examples && (
                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-800 dark:text-white">実行例:</h4>
                          {concept.examples.map((example, exampleIndex) => (
                            <div key={exampleIndex} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                              <div className="font-mono text-sm bg-gray-800 text-green-400 p-3 rounded mb-3">
                                {example.query}
                              </div>
                              <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                {example.description}
                              </div>
                              <div className="text-xs text-blue-600 dark:text-blue-400 mb-3">
                                {example.explanation}
                              </div>
                              <div className="space-y-1">
                                <div className="text-sm font-medium text-gray-800 dark:text-white">結果:</div>
                                {example.result.map((result, resultIndex) => (
                                  <div key={resultIndex} className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 p-2 rounded">
                                    {result}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {concept.operators && (
                        <div className="mt-6">
                          <h4 className="font-medium text-gray-800 dark:text-white mb-3">比較演算子:</h4>
                          <div className="grid md:grid-cols-2 gap-3">
                            {concept.operators.map((op, opIndex) => (
                              <div key={opIndex} className="bg-white dark:bg-gray-700 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-mono text-lg font-bold text-cyan-600 dark:text-cyan-400">
                                    {op.symbol}
                                  </span>
                                  <span className="text-sm text-gray-600 dark:text-gray-300">
                                    {op.name}
                                  </span>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                  例: {op.example}
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-300">
                                  {op.description}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* データベース設計の表示 */}
              {selectedConcept === 'database-design' && currentConcept.designPrinciples && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">正規化アニメーション</h3>
                    <NormalizationAnimation />
                  </div>

                  {currentConcept.entities && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">ER図の基本要素</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {currentConcept.entities.map((entity, index) => (
                          <div key={index} className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                              {entity.name}
                            </h4>
                            <div className="mb-3">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">属性:</span>
                              <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                                {entity.attributes.map((attr, attrIndex) => (
                                  <li key={attrIndex} className="bg-white dark:bg-gray-700 px-2 py-1 rounded">
                                    {attr}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">関係:</span>
                              <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                                {entity.relationships.map((rel, relIndex) => (
                                  <li key={relIndex}>{rel}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 高度なSQLの表示 */}
              {selectedConcept === 'advanced-sql' && currentConcept.joinTypes && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">JOINの種類</h3>
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {currentConcept.joinTypes.map((join, index) => (
                        <div
                          key={index}
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            selectedJoin === join.type
                              ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-cyan-300'
                          }`}
                          onClick={() => setSelectedJoin(selectedJoin === join.type ? null : join.type)}
                        >
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                            {join.type}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            {join.description}
                          </p>
                          <div className="text-xs text-cyan-600 dark:text-cyan-400">
                            図解: {join.diagram}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      {selectedJoin && (
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                          {(() => {
                            const join = currentConcept.joinTypes?.find(j => j.type === selectedJoin);
                            return join ? (
                              <>
                                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                                  {join.type}の実行例
                                </h4>
                                <div className="font-mono text-sm bg-gray-800 text-green-400 p-3 rounded mb-3 overflow-x-auto">
                                  {join.example}
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">
                                  {join.description}
                                </p>
                              </>
                            ) : null;
                          })()}
                        </div>
                      )}
                      {!selectedJoin && (
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
                          <p className="text-gray-500 dark:text-gray-400">
                            JOINタイプをクリックして例を表示
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
