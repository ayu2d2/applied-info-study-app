'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const developmentConcepts = [
  {
    id: 'software-lifecycle',
    name: 'ソフトウェア開発ライフサイクル',
    description: '要件定義から運用保守まで、システム開発の全体的な流れ',
    category: 'process',
    phases: [
      {
        name: '要件定義',
        description: 'システムに必要な機能や制約を明確化',
        activities: ['業務分析', '機能要件定義', '非機能要件定義', 'ユーザーインタビュー'],
        deliverables: ['要件定義書', 'ユーザーストーリー', '受入基準'],
        duration: '全体の20-30%'
      },
      {
        name: '基本設計（外部設計）',
        description: 'ユーザーから見たシステムの仕様を設計',
        activities: ['画面設計', '帳票設計', '外部インターフェース設計', 'データ設計'],
        deliverables: ['基本設計書', '画面遷移図', 'ER図'],
        duration: '全体の15-20%'
      },
      {
        name: '詳細設計（内部設計）',
        description: 'プログラムの内部構造を詳細に設計',
        activities: ['モジュール設計', 'クラス設計', 'アルゴリズム設計', 'テーブル設計'],
        deliverables: ['詳細設計書', 'クラス図', 'シーケンス図'],
        duration: '全体の15-20%'
      },
      {
        name: 'プログラミング',
        description: '設計に基づいてコードを実装',
        activities: ['コーディング', '単体テスト', 'コードレビュー', 'リファクタリング'],
        deliverables: ['ソースコード', '単体テスト結果', 'プログラム仕様書'],
        duration: '全体の20-30%'
      },
      {
        name: 'テスト',
        description: 'システムの品質を確保するための検証',
        activities: ['結合テスト', 'システムテスト', '受入テスト', '性能テスト'],
        deliverables: ['テスト計画書', 'テスト仕様書', 'テスト結果報告書'],
        duration: '全体の15-25%'
      },
      {
        name: '運用・保守',
        description: 'システムの継続的な運用と改善',
        activities: ['システム監視', '障害対応', '機能改善', 'データバックアップ'],
        deliverables: ['運用手順書', '障害報告書', '改善提案書'],
        duration: '継続的'
      }
    ]
  },
  {
    id: 'development-methodologies',
    name: '開発手法',
    description: 'ウォーターフォール、アジャイル等の開発アプローチ',
    category: 'methodology',
    methodologies: [
      {
        name: 'ウォーターフォール開発',
        description: '各工程を順次進行する従来型の開発手法',
        characteristics: [
          '工程が明確に分離されている',
          '前工程の完了後に次工程に進む',
          '計画重視・文書重視',
          '変更に対する柔軟性が低い'
        ],
        advantages: ['計画性が高い', '品質管理しやすい', '大規模開発に適している'],
        disadvantages: ['変更対応が困難', '後戻りコストが高い', '早期の価値提供が困難'],
        suitable: '要件が安定している大規模システム'
      },
      {
        name: 'アジャイル開発',
        description: '短期間のイテレーションを繰り返す柔軟な開発手法',
        characteristics: [
          '短期間（1-4週間）のスプリント',
          '動作するソフトウェアを重視',
          '顧客との継続的なコラボレーション',
          '変化への対応を重視'
        ],
        advantages: ['変更に柔軟', '早期の価値提供', '品質向上', 'チーム連携強化'],
        disadvantages: ['計画性に課題', 'スキル要求が高い', '大規模開発では管理困難'],
        suitable: '要件変更が頻繁な中小規模システム'
      },
      {
        name: 'DevOps',
        description: '開発と運用の連携を強化する文化・プラクティス',
        characteristics: [
          '開発と運用の壁をなくす',
          'CI/CDパイプラインの自動化',
          '継続的なモニタリング',
          'Infrastructure as Code'
        ],
        advantages: ['デプロイ頻度向上', '障害回復時間短縮', '品質向上', 'チーム協力促進'],
        disadvantages: ['文化変革が困難', 'ツール習得コスト', 'セキュリティ課題'],
        suitable: 'クラウドネイティブアプリケーション'
      }
    ]
  },
  {
    id: 'programming-paradigms',
    name: 'プログラミングパラダイム',
    description: 'オブジェクト指向、関数型など、プログラミングの考え方',
    category: 'paradigm',
    paradigms: [
      {
        name: 'オブジェクト指向プログラミング',
        description: 'データと処理をオブジェクトとして統合する考え方',
        principles: [
          {
            name: 'カプセル化',
            description: 'データと処理を一つのまとまりとして隠蔽',
            benefit: 'データの整合性保証、再利用性向上'
          },
          {
            name: '継承',
            description: '既存クラスの機能を引き継いで新しいクラスを作成',
            benefit: 'コードの再利用、階層的な設計'
          },
          {
            name: 'ポリモーフィズム',
            description: '同じインターフェースで異なる実装を呼び出し',
            benefit: '柔軟性向上、拡張性向上'
          }
        ],
        languages: ['Java', 'C#', 'Python', 'C++'],
        useCases: ['大規模システム', 'GUI アプリケーション', 'エンタープライズシステム']
      },
      {
        name: '関数型プログラミング',
        description: '関数を第一級オブジェクトとして扱うプログラミング',
        principles: [
          {
            name: '不変性',
            description: 'データを変更せず、新しいデータを生成',
            benefit: '副作用の排除、並行処理の安全性'
          },
          {
            name: '純粋関数',
            description: '同じ入力に対して常に同じ出力を返す関数',
            benefit: 'テストしやすさ、予測可能性'
          },
          {
            name: '高階関数',
            description: '関数を引数や戻り値として扱う',
            benefit: 'コードの抽象化、再利用性'
          }
        ],
        languages: ['Haskell', 'Lisp', 'Scala', 'JavaScript（一部）'],
        useCases: ['データ処理', '並行処理', '数学的計算']
      },
      {
        name: '手続き型プログラミング',
        description: '処理を手順として順次実行するプログラミング',
        principles: [
          {
            name: '構造化プログラミング',
            description: '順次・分岐・反復の3つの制御構造',
            benefit: '理解しやすさ、デバッグのしやすさ'
          },
          {
            name: 'モジュール化',
            description: '機能を独立したモジュールに分割',
            benefit: '保守性向上、再利用性'
          },
          {
            name: 'トップダウン設計',
            description: '大きな問題を小さな問題に分解',
            benefit: '設計の明確性、実装の段階的進行'
          }
        ],
        languages: ['C', 'Pascal', 'COBOL', 'FORTRAN'],
        useCases: ['システムプログラミング', '組み込みシステム', 'バッチ処理']
      }
    ]
  }
];

export default function DevelopmentPage() {
  const [selectedConcept, setSelectedConcept] = useState('software-lifecycle');
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [selectedMethodology, setSelectedMethodology] = useState<string | null>(null);

  const currentConcept = developmentConcepts.find(c => c.id === selectedConcept);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-purple-600 hover:text-purple-800 flex items-center mb-4">
            ← ホームに戻る
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            💻 システム開発
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            ソフトウェア開発ライフサイクルから最新の開発手法まで、システム開発の基礎を体系的に学習しましょう
          </p>
        </div>

        {/* コンセプト選択タブ */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 mb-6">
            {developmentConcepts.map((concept) => (
              <button
                key={concept.id}
                onClick={() => setSelectedConcept(concept.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedConcept === concept.id
                    ? 'bg-purple-500 text-white shadow-lg'
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

              {/* ソフトウェア開発ライフサイクルの表示 */}
              {selectedConcept === 'software-lifecycle' && currentConcept.phases && (
                <div className="space-y-4">
                  {currentConcept.phases.map((phase, index) => (
                    <div
                      key={index}
                      className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                        selectedPhase === phase.name
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                      }`}
                      onClick={() => setSelectedPhase(selectedPhase === phase.name ? null : phase.name)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                          {index + 1}. {phase.name}
                        </h3>
                        <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-sm">
                          {phase.duration}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {phase.description}
                      </p>

                      {selectedPhase === phase.name && (
                        <div className="mt-6 space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">主な活動:</h4>
                            <div className="grid md:grid-cols-2 gap-2">
                              {phase.activities.map((activity, activityIndex) => (
                                <div key={activityIndex} className="bg-white dark:bg-gray-700 px-3 py-2 rounded-lg text-sm">
                                  {activity}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">成果物:</h4>
                            <div className="flex flex-wrap gap-2">
                              {phase.deliverables.map((deliverable, deliverableIndex) => (
                                <span key={deliverableIndex} className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded text-sm">
                                  {deliverable}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* 開発手法の表示 */}
              {selectedConcept === 'development-methodologies' && currentConcept.methodologies && (
                <div className="space-y-6">
                  {currentConcept.methodologies.map((methodology, index) => (
                    <div
                      key={index}
                      className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                        selectedMethodology === methodology.name
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                      }`}
                      onClick={() => setSelectedMethodology(selectedMethodology === methodology.name ? null : methodology.name)}
                    >
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                        {methodology.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {methodology.description}
                      </p>

                      <div className="mb-4">
                        <h4 className="font-medium text-gray-800 dark:text-white mb-2">特徴:</h4>
                        <ul className="space-y-1">
                          {methodology.characteristics.map((char, charIndex) => (
                            <li key={charIndex} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                              <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {char}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {selectedMethodology === methodology.name && (
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                              <h5 className="font-semibold text-green-800 dark:text-green-300 mb-2">利点:</h5>
                              <ul className="space-y-1">
                                {methodology.advantages.map((adv, advIndex) => (
                                  <li key={advIndex} className="text-sm text-gray-700 dark:text-gray-300">
                                    • {adv}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                              <h5 className="font-semibold text-red-800 dark:text-red-300 mb-2">欠点:</h5>
                              <ul className="space-y-1">
                                {methodology.disadvantages.map((dis, disIndex) => (
                                  <li key={disIndex} className="text-sm text-gray-700 dark:text-gray-300">
                                    • {dis}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                            <h5 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">適用場面:</h5>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{methodology.suitable}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* プログラミングパラダイムの表示 */}
              {selectedConcept === 'programming-paradigms' && currentConcept.paradigms && (
                <div className="space-y-8">
                  {currentConcept.paradigms.map((paradigm, index) => (
                    <div key={index} className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                        {paradigm.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {paradigm.description}
                      </p>

                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-800 dark:text-white mb-3">基本原則:</h4>
                          <div className="space-y-3">
                            {paradigm.principles.map((principle, principleIndex) => (
                              <div key={principleIndex} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                                <h5 className="font-semibold text-gray-800 dark:text-white mb-2">
                                  {principle.name}
                                </h5>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                  {principle.description}
                                </p>
                                <div className="text-xs text-blue-600 dark:text-blue-400">
                                  効果: {principle.benefit}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-800 dark:text-white mb-2">代表的な言語:</h4>
                            <div className="flex flex-wrap gap-2">
                              {paradigm.languages.map((language, languageIndex) => (
                                <span key={languageIndex} className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded text-sm">
                                  {language}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 dark:text-white mb-2">適用領域:</h4>
                            <ul className="space-y-1">
                              {paradigm.useCases.map((useCase, useCaseIndex) => (
                                <li key={useCaseIndex} className="text-sm text-gray-600 dark:text-gray-300">
                                  • {useCase}
                                </li>
                              ))}
                            </ul>
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
      </div>
    </div>
  );
}
