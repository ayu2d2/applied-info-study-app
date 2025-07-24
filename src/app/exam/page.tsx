'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    category: 'ネットワーク',
    question: 'OSI参照モデルにおいて、IPアドレスによるルーティングを行う層はどれか。',
    options: [
      'データリンク層',
      'ネットワーク層',
      'トランスポート層',
      'セッション層'
    ],
    correctAnswer: 1,
    explanation: 'ネットワーク層（第3層）では、IPアドレスを使用してパケットのルーティングを行います。'
  },
  {
    id: 2,
    category: 'データベース',
    question: 'データベースの正規化において、第1正規形の条件として正しいものはどれか。',
    options: [
      '推移関数従属を排除する',
      '部分関数従属を排除する',
      '繰り返し項目を排除し、原子的な値のみにする',
      '多値従属を排除する'
    ],
    correctAnswer: 2,
    explanation: '第1正規形（1NF）では、繰り返し項目を排除し、各フィールドが原子的な値のみを持つようにします。'
  },
  {
    id: 3,
    category: 'アルゴリズム',
    question: 'バブルソートの時間計算量として正しいものはどれか。',
    options: [
      'O(n)',
      'O(n log n)',
      'O(n²)',
      'O(2^n)'
    ],
    correctAnswer: 2,
    explanation: 'バブルソートは二重ループで実装されるため、時間計算量はO(n²)になります。'
  },
  {
    id: 4,
    category: 'セキュリティ',
    question: '公開鍵暗号方式の特徴として正しいものはどれか。',
    options: [
      '暗号化と復号化に同じ鍵を使用する',
      '鍵の配布が容易である',
      '共通鍵暗号方式より高速である',
      '鍵長が短くても十分に安全である'
    ],
    correctAnswer: 1,
    explanation: '公開鍵暗号方式では、公開鍵を公開できるため、鍵の配布問題を解決できます。'
  },
  {
    id: 5,
    category: 'システム開発',
    question: 'ウォーターフォールモデルの特徴として正しいものはどれか。',
    options: [
      '短い期間で機能を追加していく',
      '要件の変更に柔軟に対応できる',
      '各工程を順次実行し、前の工程に戻らない',
      'ユーザーとの対話を重視する'
    ],
    correctAnswer: 2,
    explanation: 'ウォーターフォールモデルでは、要件定義→設計→実装→テストの順に進み、基本的に前の工程に戻りません。'
  },
  {
    id: 6,
    category: 'ネットワーク',
    question: 'IPv4アドレスのクラスAの特徴として正しいものはどれか。',
    options: [
      'ネットワーク部8ビット、ホスト部24ビット',
      'ネットワーク部16ビット、ホスト部16ビット',
      'ネットワーク部24ビット、ホスト部8ビット',
      'サブネットマスクは255.0.0.0固定'
    ],
    correctAnswer: 0,
    explanation: 'クラスAは第1オクテットが1-126で、ネットワーク部8ビット、ホスト部24ビットです。'
  },
  {
    id: 7,
    category: 'データベース',
    question: 'SQL文「SELECT * FROM 商品 WHERE 価格 > 1000 AND カテゴリ = \'電子機器\'」の実行結果として正しいものはどれか。',
    options: [
      '価格が1000円の電子機器を抽出',
      '価格が1000円より高い電子機器を抽出',
      '価格が1000円以上の全商品を抽出',
      '電子機器カテゴリの全商品を抽出'
    ],
    correctAnswer: 1,
    explanation: 'WHERE句の条件により、価格が1000円より高く（>）、かつカテゴリが電子機器の商品が抽出されます。'
  },
  {
    id: 8,
    category: 'セキュリティ',
    question: 'SQLインジェクション攻撃の対策として最も効果的なものはどれか。',
    options: [
      'アクセスログの監視',
      'プリペアードステートメントの使用',
      'ファイアウォールの設定',
      'パスワードの複雑化'
    ],
    correctAnswer: 1,
    explanation: 'プリペアードステートメントを使用することで、SQL文の構造を固定化し、インジェクション攻撃を防げます。'
  },
  {
    id: 9,
    category: 'アルゴリズム',
    question: 'スタック（LIFO）に要素A、B、Cの順に格納し、すべて取り出した場合の順序はどれか。',
    options: [
      'A、B、C',
      'C、B、A',
      'A、C、B',
      'B、A、C'
    ],
    correctAnswer: 1,
    explanation: 'スタックはLIFO（Last In, First Out）なので、最後に入れたCから順に取り出されます。'
  },
  {
    id: 10,
    category: 'システム開発',
    question: 'アジャイル開発の原則として正しいものはどれか。',
    options: [
      '詳細な文書よりも動作するソフトウェアを重視',
      '計画に従うことよりも変化への対応を重視',
      '個人と対話よりもプロセスとツールを重視',
      '契約交渉よりも顧客との協働を重視'
    ],
    correctAnswer: 1,
    explanation: 'アジャイル宣言では「計画に従うことよりも変化への対応を」が明記されています。'
  },
  {
    id: 11,
    category: 'ネットワーク',
    question: 'TCP/IPにおけるARP（Address Resolution Protocol）の機能はどれか。',
    options: [
      'IPアドレスをMACアドレスに変換',
      'MACアドレスをIPアドレスに変換',
      'ドメイン名をIPアドレスに変換',
      'IPアドレスをドメイン名に変換'
    ],
    correctAnswer: 0,
    explanation: 'ARPは、ネットワーク層のIPアドレスをデータリンク層のMACアドレスに変換するプロトコルです。'
  },
  {
    id: 12,
    category: 'データベース',
    question: 'データベースのトランザクションのACID特性において、「A」が表す特性はどれか。',
    options: [
      'Atomicity（原子性）',
      'Availability（可用性）',
      'Accuracy（正確性）',
      'Authentication（認証性）'
    ],
    correctAnswer: 0,
    explanation: 'ACIDのAはAtomicity（原子性）で、トランザクションが全て実行されるか全く実行されないかを保証します。'
  },
  {
    id: 13,
    category: 'セキュリティ',
    question: 'ディジタル署名の目的として正しいものはどれか。',
    options: [
      'データの機密性を保護',
      'データの完全性と認証を保証',
      'データの圧縮効率を向上',
      'データの転送速度を向上'
    ],
    correctAnswer: 1,
    explanation: 'ディジタル署名は、データの改ざん検出（完全性）と送信者の確認（認証）を目的とします。'
  },
  {
    id: 14,
    category: 'アルゴリズム',
    question: '二分探索の前提条件として正しいものはどれか。',
    options: [
      'データがランダムに配置されている',
      'データが昇順または降順にソートされている',
      'データの数が2の累乗である',
      'データがリンクリスト構造である'
    ],
    correctAnswer: 1,
    explanation: '二分探索は、データがソートされていることが前提条件です。ソートされていないデータでは使用できません。'
  },
  {
    id: 15,
    category: 'システム開発',
    question: 'ソフトウェアのテスト工程において、「ブラックボックステスト」の特徴はどれか。',
    options: [
      'プログラムの内部構造を考慮してテストする',
      'プログラムの実行パスを網羅してテストする',
      '入力と期待される出力の関係に着目してテストする',
      'プログラムのコードカバレッジを重視してテストする'
    ],
    correctAnswer: 2,
    explanation: 'ブラックボックステストは、プログラムの内部を考慮せず、入力に対する出力の正しさを検証するテスト手法です。'
  }
];

export default function ExamPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15分
  const [examStarted, setExamStarted] = useState(false);

  useEffect(() => {
    if (examStarted && timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setShowResults(true);
    }
  }, [timeLeft, examStarted, showResults]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResults) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitExam = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const startExam = () => {
    setExamStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(questions.length).fill(-1));
    setShowResults(false);
    setTimeLeft(900);
  };

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link href="/" className="text-indigo-600 hover:text-indigo-800 flex items-center mb-4">
              ← ホームに戻る
            </Link>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              模擬試験
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              応用情報技術者試験の模擬試験に挑戦しましょう
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
              試験開始前の確認
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="font-medium text-gray-700 dark:text-gray-300">問題数</span>
                <span className="text-gray-900 dark:text-white">{questions.length}問</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="font-medium text-gray-700 dark:text-gray-300">制限時間</span>
                <span className="text-gray-900 dark:text-white">15分</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="font-medium text-gray-700 dark:text-gray-300">出題範囲</span>
                <span className="text-gray-900 dark:text-white">ネットワーク、データベース、アルゴリズム等</span>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={startExam}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
              >
                試験を開始する
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link href="/" className="text-indigo-600 hover:text-indigo-800 flex items-center mb-4">
              ← ホームに戻る
            </Link>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              試験結果
            </h1>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                  あなたの得点
                </h2>
                <div className={`text-6xl font-bold mb-2 ${
                  percentage >= 80 ? 'text-green-500' : 
                  percentage >= 60 ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {score}/{questions.length}
                </div>
                <div className={`text-2xl font-semibold ${
                  percentage >= 80 ? 'text-green-500' : 
                  percentage >= 60 ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {percentage}%
                </div>
                <div className="mt-4 text-gray-600 dark:text-gray-300">
                  {percentage >= 80 ? '優秀です！' : 
                   percentage >= 60 ? '合格ライン！' : 'もう少し頑張りましょう'}
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setExamStarted(false)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg mr-4"
                >
                  もう一度挑戦
                </button>
                <Link href="/" className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg">
                  ホームに戻る
                </Link>
              </div>
            </div>

            {/* 詳細な結果 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                問題別結果
              </h3>
              <div className="space-y-4">
                {questions.map((question, index) => {
                  const isCorrect = selectedAnswers[index] === question.correctAnswer;
                  return (
                    <div key={question.id} className="border-l-4 border-gray-200 dark:border-gray-700 pl-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            問題{index + 1} ({question.category})
                          </span>
                          <p className="text-gray-800 dark:text-white mb-2">
                            {question.question}
                          </p>
                          <div className="text-sm">
                            <span className="text-gray-600 dark:text-gray-400">あなたの回答: </span>
                            <span className={selectedAnswers[index] === -1 ? 'text-gray-400' : isCorrect ? 'text-green-600' : 'text-red-600'}>
                              {selectedAnswers[index] === -1 ? '未回答' : question.options[selectedAnswers[index]]}
                            </span>
                          </div>
                          {!isCorrect && (
                            <div className="text-sm mt-1">
                              <span className="text-gray-600 dark:text-gray-400">正解: </span>
                              <span className="text-green-600">{question.options[question.correctAnswer]}</span>
                            </div>
                          )}
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            {question.explanation}
                          </p>
                        </div>
                        <div className={`ml-4 w-6 h-6 rounded-full flex items-center justify-center ${
                          isCorrect ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {isCorrect ? '○' : '×'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              問題 {currentQuestion + 1} / {questions.length}
            </h1>
            <span className="text-gray-600 dark:text-gray-300">
              {questions[currentQuestion].category}
            </span>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${timeLeft < 300 ? 'text-red-500' : 'text-gray-800 dark:text-white'}`}>
              残り時間: {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* 問題 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              {questions[currentQuestion].question}
            </h2>
            
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={index}
                    checked={selectedAnswers[currentQuestion] === index}
                    onChange={() => handleAnswerSelect(index)}
                    className="mr-3"
                  />
                  <span className="text-gray-800 dark:text-white">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* ナビゲーション */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg transition-colors"
            >
              前の問題
            </button>

            <div className="flex space-x-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-8 h-8 rounded ${
                    index === currentQuestion
                      ? 'bg-indigo-500 text-white'
                      : selectedAnswers[index] !== -1
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={submitExam}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                試験終了
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                次の問題
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
