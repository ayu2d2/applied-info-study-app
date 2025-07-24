'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface SortStep {
  array: number[];
  comparing: number[];
  sorted: number[];
}

const algorithms = [
  {
    id: 'bubble',
    name: 'バブルソート',
    description: '隣接する要素を比較して交換を繰り返すソート',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'selection',
    name: '選択ソート',
    description: '最小値を見つけて先頭に移動するソート',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'insertion',
    name: '挿入ソート',
    description: '適切な位置に要素を挿入するソート',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)'
  }
];

const dataStructures = [
  {
    id: 'stack',
    name: 'スタック（Stack）',
    description: 'LIFO（Last In, First Out）の原則で動作するデータ構造',
    operations: ['push', 'pop', 'peek', 'isEmpty']
  },
  {
    id: 'queue',
    name: 'キュー（Queue）',
    description: 'FIFO（First In, First Out）の原則で動作するデータ構造',
    operations: ['enqueue', 'dequeue', 'front', 'isEmpty']
  },
  {
    id: 'binary-tree',
    name: '二分木（Binary Tree）',
    description: '各ノードが最大2つの子ノードを持つ木構造',
    operations: ['insert', 'search', 'delete', 'traverse']
  }
];

export default function AlgorithmPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
  const [sortingArray, setSortingArray] = useState([64, 34, 25, 12, 22, 11, 90]);
  const [sortSteps, setSortSteps] = useState<SortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [stack, setStack] = useState<number[]>([]);
  const [queue, setQueue] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState('');

  // バブルソートの実装とステップ生成
  const generateBubbleSortSteps = (arr: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const array = [...arr];
    const n = array.length;
    
    steps.push({ array: [...array], comparing: [], sorted: [] });
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({ 
          array: [...array], 
          comparing: [j, j + 1], 
          sorted: Array.from({length: i}, (_, k) => n - 1 - k) 
        });
        
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          steps.push({ 
            array: [...array], 
            comparing: [j, j + 1], 
            sorted: Array.from({length: i}, (_, k) => n - 1 - k) 
          });
        }
      }
    }
    
    steps.push({ 
      array: [...array], 
      comparing: [], 
      sorted: Array.from({length: n}, (_, k) => k) 
    });
    
    return steps;
  };

  const startSorting = () => {
    const steps = generateBubbleSortSteps(sortingArray);
    setSortSteps(steps);
    setCurrentStep(0);
    setIsAnimating(true);
  };

  const resetArray = () => {
    setSortingArray([64, 34, 25, 12, 22, 11, 90]);
    setSortSteps([]);
    setCurrentStep(0);
    setIsAnimating(false);
  };

  useEffect(() => {
    if (isAnimating && currentStep < sortSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (currentStep >= sortSteps.length - 1) {
      setIsAnimating(false);
    }
  }, [currentStep, sortSteps.length, isAnimating]);

  const pushToStack = () => {
    if (inputValue) {
      setStack(prev => [...prev, parseInt(inputValue)]);
      setInputValue('');
    }
  };

  const popFromStack = () => {
    setStack(prev => prev.slice(0, -1));
  };

  const enqueue = () => {
    if (inputValue) {
      setQueue(prev => [...prev, parseInt(inputValue)]);
      setInputValue('');
    }
  };

  const dequeue = () => {
    setQueue(prev => prev.slice(1));
  };

  const currentSortStep = sortSteps[currentStep] || { array: sortingArray, comparing: [], sorted: [] };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-purple-600 hover:text-purple-800 flex items-center mb-4">
            ← ホームに戻る
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            アルゴリズム学習
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            ソートアルゴリズムとデータ構造を視覚化して学習しましょう
          </p>
        </div>

        {/* ソートアルゴリズム */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            ソートアルゴリズム視覚化
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {algorithms.map((algo) => (
              <div
                key={algo.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedAlgorithm === algo.id
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                }`}
                onClick={() => setSelectedAlgorithm(algo.id)}
              >
                <h3 className="font-semibold text-gray-800 dark:text-white">{algo.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{algo.description}</p>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <div>時間計算量: {algo.timeComplexity}</div>
                  <div>空間計算量: {algo.spaceComplexity}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                配列の可視化
              </h3>
              <div className="space-x-2">
                <button
                  onClick={startSorting}
                  disabled={isAnimating}
                  className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  ソート開始
                </button>
                <button
                  onClick={resetArray}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  リセット
                </button>
              </div>
            </div>
            
            <div className="flex items-end space-x-2 h-40 mb-4">
              {currentSortStep.array.map((value, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center transition-all duration-500 ${
                    currentSortStep.comparing.includes(index)
                      ? 'bg-red-400'
                      : currentSortStep.sorted.includes(index)
                      ? 'bg-green-400'
                      : 'bg-blue-400'
                  }`}
                  style={{ height: `${value * 2}px`, width: '40px' }}
                >
                  <span className="text-white text-sm font-semibold mt-1">{value}</span>
                </div>
              ))}
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-300">
              ステップ: {currentStep} / {sortSteps.length > 0 ? sortSteps.length - 1 : 0}
              {isAnimating && <span className="ml-2 text-purple-600">実行中...</span>}
            </div>
          </div>
        </div>

        {/* データ構造 */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* スタック */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              スタック (LIFO)
            </h3>
            <div className="mb-4">
              <div className="flex space-x-2 mb-2">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="数値を入力"
                  className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={pushToStack}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  Push
                </button>
                <button
                  onClick={popFromStack}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Pop
                </button>
              </div>
            </div>
            <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg h-40 p-2 overflow-y-auto">
              <div className="flex flex-col-reverse space-y-reverse space-y-1">
                {stack.map((item, index) => (
                  <div
                    key={index}
                    className="bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 rounded px-3 py-1 text-center"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* キュー */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              キュー (FIFO)
            </h3>
            <div className="mb-4">
              <div className="flex space-x-2 mb-2">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="数値を入力"
                  className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={enqueue}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                  Enqueue
                </button>
                <button
                  onClick={dequeue}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Dequeue
                </button>
              </div>
            </div>
            <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg h-40 p-2 overflow-y-auto">
              <div className="flex flex-col space-y-1">
                {queue.map((item, index) => (
                  <div
                    key={index}
                    className="bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded px-3 py-1 text-center"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* データ構造説明 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              データ構造の特徴
            </h3>
            <div className="space-y-4">
              {dataStructures.map((ds) => (
                <div key={ds.id} className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white">{ds.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{ds.description}</p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    操作: {ds.operations.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
