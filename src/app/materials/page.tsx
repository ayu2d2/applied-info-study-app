'use client';

import { useState } from 'react';
import { importantFormulas, frequentTerms, calculationProblems, examTips } from '@/data/examData';

interface TermItem {
  layers?: string[];
  types?: string[];
  forms?: string[];
}

export default function StudyMaterialsPage() {
  const [activeTab, setActiveTab] = useState('formulas');
  const [selectedCategory, setSelectedCategory] = useState('全て');

  const categories = ['全て', 'ネットワーク', 'CPU', 'メモリ', 'ディスク', 'セキュリティ', 'データベース', 'システム開発', 'プロジェクト管理'];

  const filteredFormulas = selectedCategory === '全て' 
    ? importantFormulas 
    : importantFormulas.filter(formula => formula.category === selectedCategory);

  const filteredTerms = selectedCategory === '全て'
    ? frequentTerms
    : frequentTerms.filter(term => term.category === selectedCategory);

  const filteredProblems = selectedCategory === '全て'
    ? calculationProblems
    : calculationProblems.filter(problem => problem.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            📚 重要知識まとめ
          </h1>
          
          <p className="text-lg text-center mb-8 text-gray-600 dark:text-gray-300">
            応用情報技術者試験によく出る重要な知識と計算問題をまとめました
          </p>

          {/* タブナビゲーション */}
          <div className="flex flex-wrap justify-center mb-8 space-x-2">
            {[
              { id: 'formulas', label: '📐 重要公式', icon: '📐' },
              { id: 'terms', label: '📖 重要用語', icon: '📖' },
              { id: 'problems', label: '🧮 計算問題', icon: '🧮' },
              { id: 'tips', label: '💡 学習のコツ', icon: '💡' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* カテゴリフィルター */}
          {(activeTab === 'formulas' || activeTab === 'terms' || activeTab === 'problems') && (
            <div className="mb-6">
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-purple-500 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* コンテンツエリア */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            {activeTab === 'formulas' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  📐 重要公式一覧
                </h2>
                <div className="grid gap-6">
                  {filteredFormulas.map((formula, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {formula.name}
                        </h3>
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                          {formula.category}
                        </span>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-3">
                        <code className="text-lg font-mono text-purple-600 dark:text-purple-400">
                          {formula.formula}
                        </code>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        <strong>例:</strong> {formula.example}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        💡 {formula.note}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  📖 重要用語解説
                </h2>
                <div className="grid gap-6">
                  {filteredTerms.map((term, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {term.term}
                        </h3>
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                          {term.category}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {term.description}
                      </p>
                      <div className="space-y-2">
                        {((term as TermItem).layers || (term as TermItem).types || (term as TermItem).forms)?.map((item: string, i: number) => (
                          <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                              {item}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'problems' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  🧮 計算問題例
                </h2>
                <div className="grid gap-6">
                  {filteredProblems.map((problem) => (
                    <div key={problem.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                          問題 {problem.id}
                        </h3>
                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm">
                          {problem.category}
                        </span>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-4">
                        <p className="text-gray-800 dark:text-gray-200">
                          {problem.problem}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-3">
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">解法:</h4>
                        <code className="text-purple-600 dark:text-purple-400">
                          {problem.solution}
                        </code>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                          答: {problem.answer}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          💡 {problem.explanation}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tips' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  💡 学習のコツ
                </h2>
                <div className="grid gap-6">
                  {examTips.map((tipCategory, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                        {tipCategory.category}
                      </h3>
                      <div className="space-y-3">
                        {tipCategory.tips.map((tip, i) => (
                          <div key={i} className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                              {i + 1}
                            </div>
                            <div className="text-gray-700 dark:text-gray-300">
                              {tip}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 学習進捗セクション */}
          <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-4">📈 学習進捗を管理しよう</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">60%</div>
                <div className="text-sm opacity-90">午前問題対策</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">45%</div>
                <div className="text-sm opacity-90">午後問題対策</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">180</div>
                <div className="text-sm opacity-90">学習時間 (時間)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
