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
    id: 19,
    name: 'DISTINCT（重複排除）',
    description: '射影で列を取得する際の重複排除',
    query: 'SELECT DISTINCT department FROM employees;',
    result: ['営業部', '開発部', '総務部']
  },
  {
    id: 20,
    name: 'UNION（和集合）',
    description: '2つのテーブルの結果を結合',
    query: 'SELECT name FROM customers UNION SELECT name FROM suppliers;',
    result: ['田中太郎', '佐藤花子', '鈴木一郎', '株式会社ABC', '株式会社XYZ']
  },
  {
    id: 21,
    name: 'UNION ALL（重複含む結合）',
    description: 'UNION ALLは重複行も含めて結合',
    query: 'SELECT name FROM customers UNION ALL SELECT name FROM suppliers;',
    result: ['田中太郎', '佐藤花子', '鈴木一郎', '田中太郎', '株式会社ABC', '株式会社XYZ']
  },
  {
    id: 22,
    name: 'BETWEEN（範囲指定）',
    description: '値の範囲を指定してデータを取得',
    query: 'SELECT * FROM employees WHERE age BETWEEN 25 AND 35;',
    result: ['社員ID: 1, 名前: 田中太郎, 年齢: 30', '社員ID: 2, 名前: 佐藤花子, 年齢: 25']
  },
  {
    id: 23,
    name: 'IN演算子',
    description: '指定した値の集合に含まれるデータを取得',
    query: 'SELECT * FROM employees WHERE department IN (\'営業部\', \'開発部\');',
    result: ['営業部の社員データ', '開発部の社員データ']
  },
  {
    id: 24,
    name: 'LIKE（あいまい検索）',
    description: 'パターンマッチングでデータを検索',
    query: 'SELECT * FROM customers WHERE name LIKE \'田中%\';',
    result: ['顧客ID: 1, 名前: 田中太郎, 年齢: 30']
  },
  {
    id: 25,
    name: 'IS NULL',
    description: 'NULL値の判定',
    query: 'SELECT * FROM employees WHERE phone IS NULL;',
    result: ['電話番号が未登録の社員データ']
  },
  {
    id: 26,
    name: 'CHECK制約',
    description: '列の値に制約を設定',
    query: 'CREATE TABLE products (id INT, price INT CHECK (price > 0));',
    result: ['テーブル作成成功（価格は正の値のみ）']
  },
  {
    id: 27,
    name: 'UNIQUE制約',
    description: '列の値の重複を認めない制約',
    query: 'CREATE TABLE users (id INT PRIMARY KEY, email VARCHAR(100) UNIQUE);',
    result: ['テーブル作成成功（メールアドレスは一意）']
  },
  {
    id: 28,
    name: 'FOREIGN KEY（CASCADE）',
    description: '参照整合性制約（連鎖削除）',
    query: 'ALTER TABLE orders ADD FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE;',
    result: ['外部キー制約追加（顧客削除時に関連注文も削除）']
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
  const [activeTab, setActiveTab] = useState<'sql' | 'normalization' | 'er' | 'quiz'>('sql');
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // データベース実践問題
  const databaseQuiz = [
    {
      id: 1,
      question: "射影の操作で重複を排除するSQL文はどれですか？",
      options: [
        "SELECT * FROM table",
        "SELECT DISTINCT column FROM table", 
        "SELECT UNIQUE column FROM table",
        "SELECT column FROM table GROUP BY column"
      ],
      correct: 1,
      explanation: "射影で重複を排除するにはSELECT DISTINCTを使用します。"
    },
    {
      id: 2,
      question: "ACID特性の「A」が表すものは？",
      options: [
        "Availability（可用性）",
        "Atomicity（原子性）",
        "Accuracy（正確性）", 
        "Authentication（認証）"
      ],
      correct: 1,
      explanation: "ACID特性のAはAtomicity（原子性）で、トランザクションが全て実行されるか全て未実行かのどちらかになることを表します。"
    },
    {
      id: 3,
      question: "第2正規形について正しい説明はどれですか？",
      options: [
        "繰り返し項目を排除する",
        "主キー以外の項目に従属しないようにする",
        "推移関数従属を排除する",
        "原子的な値のみにする"
      ],
      correct: 1,
      explanation: "第2正規形は主キーではない項目に従属している項目を排除します。"
    },
    {
      id: 4,
      question: "CAP定理で同時に満たせるのは最大いくつですか？",
      options: ["1つ", "2つ", "3つ", "制限なし"],
      correct: 1,
      explanation: "CAP定理では、Consistency（一貫性）、Availability（可用性）、Partition tolerance（分断耐性）のうち、分散システムでは最大2つまでしか同時に満たせません。"
    },
    {
      id: 5,
      question: "CASCADE制約の効果として正しいものは？",
      options: [
        "重複データを防ぐ",
        "NULL値を防ぐ",
        "参照先が削除されたら参照元も削除される",
        "データ型を制限する"
      ],
      correct: 2,
      explanation: "CASCADE制約は参照される側（親）のデータが削除されたときに、それを参照している子データも連鎖的に削除される制約です。"
    }
  ];

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === databaseQuiz[currentQuiz].correct) {
      setQuizScore(quizScore + 1);
    }
    setShowQuizResult(true);
  };

  const nextQuiz = () => {
    if (currentQuiz < databaseQuiz.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
      setSelectedAnswer(null);
      setShowQuizResult(false);
    }
  };

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
            <button
              onClick={() => setActiveTab('quiz')}
              className={`pb-2 px-4 font-medium ${
                activeTab === 'quiz'
                  ? 'border-b-2 border-green-500 text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              実践問題
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
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

                {/* 射影と選択 */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
                    射影と選択
                  </h3>
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <div>
                      <strong>射影（Projection）:</strong> 列だけを取得
                    </div>
                    <div>
                      <strong>SELECT DISTINCT:</strong> 重複を排除して取得
                    </div>
                    <div>
                      <strong>選択（Selection）:</strong> 行の条件で絞り込み
                    </div>
                    <div className="mt-3 bg-white dark:bg-gray-700 p-2 rounded text-xs">
                      <code>
                        -- 射影（列選択）<br/>
                        SELECT DISTINCT department<br/>
                        FROM employees;<br/><br/>
                        -- 選択（行選択）<br/>
                        WHERE age &gt; 30;
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
              </div>

              {/* データベース理論解説 */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* ACID特性 */}
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">
                    ACID特性
                  </h3>
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <div><strong>Atomicity（原子性）:</strong> 全て実行か全て未実行</div>
                    <div><strong>Consistency（一貫性）:</strong> 整合性の維持</div>
                    <div><strong>Isolation（独立性）:</strong> 他の処理に影響されない</div>
                    <div><strong>Durability（永続性）:</strong> 確定した変更は永続化</div>
                    <div className="mt-3 bg-white dark:bg-gray-700 p-2 rounded text-xs">
                      <code>
                        BEGIN;<br/>
                        UPDATE account SET balance = balance - 100 WHERE id = 1;<br/>
                        UPDATE account SET balance = balance + 100 WHERE id = 2;<br/>
                        COMMIT; -- または ROLLBACK;
                      </code>
                    </div>
                  </div>
                </div>

                {/* 正規化 */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                    正規化の重要ポイント
                  </h3>
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <div><strong>第1正規形:</strong> 原子的な値のみ</div>
                    <div><strong>第2正規形:</strong> 主キー以外に従属しない</div>
                    <div><strong>第3正規形:</strong> 推移関数従属を排除</div>
                    <div><strong>ボイス・コッド正規形:</strong> より厳密な正規化</div>
                    <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
                      💡 主キーの見つけ方：一意に決まるかどうかを調べる
                    </div>
                  </div>
                </div>

                {/* CAP定理 */}
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-200 mb-3">
                    CAP定理（分散DB）
                  </h3>
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <div><strong>Consistency:</strong> データの一貫性</div>
                    <div><strong>Availability:</strong> 可用性</div>
                    <div><strong>Partition tolerance:</strong> 分断耐性</div>
                    <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                      分散システムでは3つのうち2つしか同時に満たせない
                    </div>
                    <div className="mt-3 bg-white dark:bg-gray-700 p-2 rounded text-xs">
                      <code>
                        二相コミットプロトコル：<br/>
                        全ノードがコミット可能な時のみ実行
                      </code>
                    </div>
                  </div>
                </div>

                {/* データベース種類 */}
                <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-teal-800 dark:text-teal-200 mb-3">
                    データベースの種類
                  </h3>
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <div><strong>関係データベース:</strong> テーブル形式</div>
                    <div><strong>オブジェクト指向DB:</strong> 複雑な処理を表現</div>
                    <div><strong>ドキュメントDB:</strong> JSON/XML形式</div>
                    <div><strong>データレイク:</strong> そのままの形で保存</div>
                    <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
                      💡 複雑でバラバラな時はドキュメント型を使用
                    </div>
                  </div>
                </div>

                {/* ER図・スキーマ */}
                <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-pink-800 dark:text-pink-200 mb-3">
                    ER図・3層スキーマ
                  </h3>
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <div><strong>概念スキーマ:</strong> ER図で表現</div>
                    <div><strong>外部スキーマ:</strong> ユーザー視点</div>
                    <div><strong>内部スキーマ:</strong> インデックス等</div>
                    <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                      多対多関係は連関エンティティで1対多に分解
                    </div>
                    <div className="mt-3 bg-white dark:bg-gray-700 p-2 rounded text-xs">
                      <code>
                        クラス多重度：<br/>
                        1..* （1以上）<br/>
                        0..1 （0または1）
                      </code>
                    </div>
                  </div>
                </div>

                {/* トランザクション・障害回復 */}
                <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    トランザクション・障害回復
                  </h3>
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <div><strong>チェックポイント:</strong> 2次記憶に保存</div>
                    <div><strong>ロールフォワード:</strong> チェックポイント後の完了分</div>
                    <div><strong>ロールバック:</strong> 未完了のトランザクション</div>
                    <div><strong>デッドロック:</strong> 相互待ち状態</div>
                    <div className="mt-3 bg-white dark:bg-gray-700 p-2 rounded text-xs">
                      <code>
                        データベース再編成：<br/>
                        データを再配置して最適化
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

        {/* 実践問題タブ */}
        {activeTab === 'quiz' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              🎯 データベース実践問題
            </h2>
            
            {currentQuiz < databaseQuiz.length ? (
              <div>
                <div className="mb-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    問題 {currentQuiz + 1} / {databaseQuiz.length}
                  </span>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    {databaseQuiz[currentQuiz].question}
                  </h3>
                  
                  <div className="space-y-3">
                    {databaseQuiz[currentQuiz].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(index)}
                        disabled={showQuizResult}
                        className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                          showQuizResult
                            ? index === databaseQuiz[currentQuiz].correct
                              ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:border-green-600 dark:text-green-200'
                              : index === selectedAnswer && index !== databaseQuiz[currentQuiz].correct
                              ? 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:border-red-600 dark:text-red-200'
                              : 'bg-gray-100 border-gray-300 text-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
                            : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {showQuizResult && (
                  <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">解説</h4>
                    <p className="text-blue-700 dark:text-blue-300">
                      {databaseQuiz[currentQuiz].explanation}
                    </p>
                  </div>
                )}

                {showQuizResult && (
                  <button
                    onClick={nextQuiz}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    {currentQuiz < databaseQuiz.length - 1 ? '次の問題' : '結果を見る'}
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  お疲れさまでした！
                </h3>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
                  {quizScore} / {databaseQuiz.length} 正解
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  正解率: {((quizScore / databaseQuiz.length) * 100).toFixed(1)}%
                </p>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6 mb-6">
                  <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
                    📚 復習ポイント
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700 dark:text-blue-300">
                    <div>
                      <strong>• 射影と選択:</strong> SELECT DISTINCT で重複排除
                    </div>
                    <div>
                      <strong>• ACID特性:</strong> Atomicity, Consistency, Isolation, Durability
                    </div>
                    <div>
                      <strong>• 正規化:</strong> 1NF→2NF→3NF→BCNF の順で実施
                    </div>
                    <div>
                      <strong>• CAP定理:</strong> 分散システムでは最大2つまで
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCurrentQuiz(0);
                    setSelectedAnswer(null);
                    setShowQuizResult(false);
                    setQuizScore(0);
                  }}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  もう一度挑戦
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
