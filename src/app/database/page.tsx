'use client';

import React, { useState } from 'react';
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
    description: '全ての顧客情報を取得',
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
    name: 'WHERE句（複数条件）',
    description: '年齢が25歳以上30歳以下の顧客を取得',
    query: 'SELECT * FROM customers WHERE age >= 25 AND age <= 30;',
    result: ['顧客ID: 1, 名前: 田中太郎, 年齢: 30', '顧客ID: 2, 名前: 佐藤花子, 年齢: 25']
  },
  {
    id: 5,
    name: 'ORDER BY句',
    description: '年齢順に並べ替えて取得',
    query: 'SELECT * FROM customers ORDER BY age DESC;',
    result: ['顧客ID: 3, 名前: 鈴木一郎, 年齢: 35', '顧客ID: 1, 名前: 田中太郎, 年齢: 30', '顧客ID: 2, 名前: 佐藤花子, 年齢: 25']
  },
  {
    id: 6,
    name: 'GROUP BY句',
    description: '年代別の顧客数を取得',
    query: 'SELECT FLOOR(age/10)*10 as age_group, COUNT(*) FROM customers GROUP BY FLOOR(age/10)*10;',
    result: ['20代: 1人', '30代: 2人']
  },
  {
    id: 7,
    name: 'HAVING句',
    description: 'グループ化後の条件指定',
    query: 'SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) >= 3;',
    result: ['営業部: 5人', '開発部: 8人']
  },
  {
    id: 8,
    name: 'INNER JOIN',
    description: '顧客と注文の関連データを取得',
    query: 'SELECT c.name, o.product FROM customers c INNER JOIN orders o ON c.id = o.customer_id;',
    result: ['田中太郎: ノートPC', '佐藤花子: マウス', '鈴木一郎: キーボード']
  },
  {
    id: 9,
    name: 'LEFT JOIN',
    description: '注文していない顧客も含めて取得',
    query: 'SELECT c.name, o.product FROM customers c LEFT JOIN orders o ON c.id = o.customer_id;',
    result: ['田中太郎: ノートPC', '佐藤花子: マウス', '鈴木一郎: キーボード', '山田二郎: NULL']
  },
  {
    id: 10,
    name: 'サブクエリ',
    description: '平均年齢より高い顧客を取得',
    query: 'SELECT * FROM customers WHERE age > (SELECT AVG(age) FROM customers);',
    result: ['顧客ID: 3, 名前: 鈴木一郎, 年齢: 35']
  },
  {
    id: 11,
    name: 'INSERT文',
    description: '新しい顧客データを挿入',
    query: 'INSERT INTO customers (name, age, email) VALUES (\'山田花子\', 28, \'yamada@example.com\');',
    result: ['1 row inserted successfully']
  },
  {
    id: 12,
    name: 'UPDATE文',
    description: '顧客の年齢を更新',
    query: 'UPDATE customers SET age = 31 WHERE name = \'田中太郎\';',
    result: ['1 row updated successfully']
  },
  {
    id: 13,
    name: 'DELETE文',
    description: '特定の顧客データを削除',
    query: 'DELETE FROM customers WHERE age < 25;',
    result: ['1 row deleted successfully']
  },
  {
    id: 14,
    name: 'UNION',
    description: '複数テーブルの結果を結合',
    query: 'SELECT name FROM customers UNION SELECT name FROM suppliers;',
    result: ['田中太郎', '佐藤花子', '鈴木一郎', '株式会社ABC', '株式会社XYZ']
  },
  {
    id: 15,
    name: 'COUNT関数',
    description: 'レコード数を取得',
    query: 'SELECT COUNT(*) as total_customers FROM customers;',
    result: ['total_customers: 3']
  },
  {
    id: 16,
    name: 'SUM関数',
    description: '売上合計を取得',
    query: 'SELECT SUM(amount) as total_sales FROM orders;',
    result: ['total_sales: 150000']
  },
  {
    id: 17,
    name: 'AVG関数',
    description: '平均年齢を取得',
    query: 'SELECT AVG(age) as average_age FROM customers;',
    result: ['average_age: 30.0']
  },
  {
    id: 18,
    name: 'MAX/MIN関数',
    description: '最高・最低年齢を取得',
    query: 'SELECT MAX(age) as max_age, MIN(age) as min_age FROM customers;',
    result: ['max_age: 35, min_age: 25']
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
    description: '部分関数従属を排除する',
    before: ['注文ID,商品ID | 商品名 | 価格 | 数量'],
    after: ['注文ID,商品ID | 数量', '商品ID | 商品名 | 価格']
  },
  {
    id: 3,
    name: '第3正規形（3NF）',
    description: '推移関数従属を排除する',
    before: ['顧客ID | 名前 | 部署ID | 部署名'],
    after: ['顧客ID | 名前 | 部署ID', '部署ID | 部署名']
  }
];

export default function DatabasePage() {
  const [selectedQuery, setSelectedQuery] = useState<SQLQuery | null>(null);
  const [selectedNormalization, setSelectedNormalization] = useState<NormalizationStep | null>(null);
  const [activeTab, setActiveTab] = useState<'sql' | 'normalization' | 'er'>('sql');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-green-600 hover:text-green-800 flex items-center mb-4">
            ← ホームに戻る
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            データベース学習
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            SQL、正規化、ERモデルについて実践的に学習しましょう
          </p>
        </div>

        {/* タブナビゲーション */}
        <div className="mb-8">
          <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('sql')}
              className={`pb-2 px-4 font-medium ${
                activeTab === 'sql'
                  ? 'border-b-2 border-green-500 text-green-600'
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
                  ? 'border-b-2 border-green-500 text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ERモデル
            </button>
          </div>
        </div>

        {/* SQL実習タブ */}
        {activeTab === 'sql' && (
          <div>
            {/* SQL基礎解説セクション */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                📖 SQL基礎解説
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* SELECT文の基本 */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
                    SELECT文の基本構文
                  </h3>
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <code className="block bg-white dark:bg-gray-700 p-2 rounded text-xs">
                      SELECT 列名<br/>
                      FROM テーブル名<br/>
                      WHERE 条件<br/>
                      GROUP BY 列名<br/>
                      HAVING 条件<br/>
                      ORDER BY 列名;
                    </code>
                    <p>• SELECT: 取得する列を指定</p>
                    <p>• FROM: 対象テーブルを指定</p>
                    <p>• WHERE: 行の条件を指定</p>
                    <p>• GROUP BY: グループ化</p>
                    <p>• HAVING: グループの条件</p>
                    <p>• ORDER BY: 並び替え</p>
                  </div>
                </div>

                {/* JOINの種類 */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
                    JOINの種類
                  </h3>
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <div>
                      <strong>INNER JOIN:</strong> 両テーブルにある データのみ
                    </div>
                    <div>
                      <strong>LEFT JOIN:</strong> 左テーブルの全データ + 右テーブルの一致データ
                    </div>
                    <div>
                      <strong>RIGHT JOIN:</strong> 右テーブルの全データ + 左テーブルの一致データ
                    </div>
                    <div>
                      <strong>FULL OUTER JOIN:</strong> 両テーブルの全データ
                    </div>
                    <div className="mt-3 bg-white dark:bg-gray-700 p-2 rounded text-xs">
                      <code>
                        SELECT a.列名, b.列名<br/>
                        FROM テーブルA a<br/>
                        LEFT JOIN テーブルB b<br/>
                        ON a.id = b.id;
                      </code>
                    </div>
                  </div>
                </div>

                {/* 集約関数 */}
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3">
                    集約関数
                  </h3>
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <div><strong>COUNT():</strong> 行数をカウント</div>
                    <div><strong>SUM():</strong> 合計値を計算</div>
                    <div><strong>AVG():</strong> 平均値を計算</div>
                    <div><strong>MAX():</strong> 最大値を取得</div>
                    <div><strong>MIN():</strong> 最小値を取得</div>
                    <div className="mt-3 bg-white dark:bg-gray-700 p-2 rounded text-xs">
                      <code>
                        SELECT COUNT(*), AVG(age)<br/>
                        FROM customers<br/>
                        GROUP BY department;
                      </code>
                    </div>
                  </div>
                </div>

                {/* サブクエリ */}
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-3">
                    サブクエリの種類
                  </h3>
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <div><strong>スカラサブクエリ:</strong> 1つの値を返す</div>
                    <div><strong>相関サブクエリ:</strong> 外部クエリを参照</div>
                    <div><strong>EXISTS:</strong> 存在チェック</div>
                    <div><strong>IN:</strong> 値リストとの照合</div>
                    <div className="mt-3 bg-white dark:bg-gray-700 p-2 rounded text-xs">
                      <code>
                        SELECT * FROM customers<br/>
                        WHERE age &gt; (<br/>
                        &nbsp;&nbsp;SELECT AVG(age)<br/>
                        &nbsp;&nbsp;FROM customers<br/>
                        );
                      </code>
                    </div>
                  </div>
                </div>

                {/* インデックス */}
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">
                    インデックス
                  </h3>
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <div><strong>作成:</strong> CREATE INDEX</div>
                    <div><strong>効果:</strong> 検索速度向上</div>
                    <div><strong>デメリット:</strong> 更新コスト増</div>
                    <div><strong>種類:</strong> B-tree, Hash, Bitmap</div>
                    <div className="mt-3 bg-white dark:bg-gray-700 p-2 rounded text-xs">
                      <code>
                        CREATE INDEX idx_name<br/>
                        ON customers (name);<br/><br/>
                        DROP INDEX idx_name;
                      </code>
                    </div>
                  </div>
                </div>

                {/* トランザクション */}
                <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-teal-800 dark:text-teal-200 mb-3">
                    トランザクション
                  </h3>
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <div><strong>BEGIN:</strong> トランザクション開始</div>
                    <div><strong>COMMIT:</strong> 変更を確定</div>
                    <div><strong>ROLLBACK:</strong> 変更を取り消し</div>
                    <div><strong>ACID特性:</strong> 原子性、一貫性、独立性、永続性</div>
                    <div className="mt-3 bg-white dark:bg-gray-700 p-2 rounded text-xs">
                      <code>
                        BEGIN;<br/>
                        UPDATE accounts SET balance = balance - 100 WHERE id = 1;<br/>
                        UPDATE accounts SET balance = balance + 100 WHERE id = 2;<br/>
                        COMMIT;
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                  SQL文サンプル
                </h2>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {sampleQueries.map((query) => (
                    <div
                      key={query.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setSelectedQuery(query)}
                    >
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {query.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {query.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                  SQL実行結果・解説
                </h2>
                {selectedQuery ? (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                      {selectedQuery.name}
                    </h3>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
                      <pre className="text-sm text-gray-800 dark:text-gray-200 font-mono whitespace-pre-wrap">
                        {selectedQuery.query}
                      </pre>
                    </div>
                    
                    {/* 詳細解説 */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                        💡 解説
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {selectedQuery.description}
                      </p>
                      {selectedQuery.id === 8 && (
                        <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                          INNER JOINは両テーブルに共通するデータのみを取得します。ONで結合条件を指定し、エイリアス（c, o）で表記を簡略化しています。
                        </div>
                      )}
                      {selectedQuery.id === 9 && (
                        <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                          LEFT JOINは左テーブル（customers）の全レコードを取得し、右テーブル（orders）に対応するデータがない場合はNULLを表示します。
                        </div>
                      )}
                      {selectedQuery.id === 10 && (
                        <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                          サブクエリ（SELECT AVG(age) FROM customers）で平均年齢を計算し、それより高い年齢の顧客を外部クエリで抽出しています。
                        </div>
                      )}
                    </div>

                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                      実行結果:
                    </h4>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                      {selectedQuery.result.map((row, index) => (
                        <div key={index} className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                          {row}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    左のSQL文をクリックして実行結果を確認してください
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 正規化タブ */}
        {activeTab === 'normalization' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                正規化の段階
              </h2>
              <div className="space-y-3">
                {normalizationSteps.map((step) => (
                  <div
                    key={step.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setSelectedNormalization(step)}
                  >
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {step.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                正規化の例
              </h2>
              {selectedNormalization ? (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    {selectedNormalization.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {selectedNormalization.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">
                      正規化前:
                    </h4>
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                      {selectedNormalization.before.map((table, index) => (
                        <div key={index} className="text-sm font-mono text-gray-700 dark:text-gray-300">
                          {table}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">
                      正規化後:
                    </h4>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      {selectedNormalization.after.map((table, index) => (
                        <div key={index} className="text-sm font-mono text-gray-700 dark:text-gray-300 mb-1">
                          {table}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  左の正規化段階をクリックして例を確認してください
                </p>
              )}
            </div>
          </div>
        )}

        {/* ERモデルタブ */}
        {activeTab === 'er' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              ERモデル図
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  エンティティとリレーション
                </h3>
                <div className="space-y-4">
                  <div className="border border-blue-300 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
                    <div className="font-semibold text-blue-800 dark:text-blue-300">顧客</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Customer</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-block bg-yellow-200 dark:bg-yellow-700 px-4 py-2 rounded-full">
                      注文する (1:N)
                    </div>
                  </div>
                  
                  <div className="border border-green-300 bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
                    <div className="font-semibold text-green-800 dark:text-green-300">注文</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Order</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  属性例
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">顧客エンティティ</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>• 顧客ID（主キー）</li>
                      <li>• 顧客名</li>
                      <li>• メールアドレス</li>
                      <li>• 住所</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">注文エンティティ</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>• 注文ID（主キー）</li>
                      <li>• 顧客ID（外部キー）</li>
                      <li>• 注文日</li>
                      <li>• 金額</li>
                    </ul>
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
