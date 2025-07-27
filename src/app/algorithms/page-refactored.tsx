'use client';

import React from 'react';
import AppLayout from '@/components/AppLayout';
import { useSearchAndFilter } from '@/hooks/useSearchAndFilter-simple';
import { PageHeader, FiltersContainer, StatsDisplay } from '@/components/layout/PageLayout';
import { ConceptGrid } from '@/components/concept/ConceptCard';
import { CATEGORIES, LEARNING_LEVELS } from '@/constants';
import type { LearningConcept } from '@/types';

// アルゴリズム学習コンテンツのデータ
const algorithmsData: LearningConcept[] = [
  {
    id: 'complexity-analysis',
    title: '計算量解析',
    description: 'アルゴリズムの時間計算量と空間計算量を理解する',
    keywords: ['計算量', 'ビッグO記法', '時間計算量', '空間計算量'],
    difficulty: 'intermediate',
    views: 980,
  },
  {
    id: 'sorting-algorithms',
    title: 'ソートアルゴリズム',
    description: '基本的なソートアルゴリズムとその特性',
    keywords: ['ソート', 'バブルソート', 'クイックソート', 'マージソート'],
    difficulty: 'basic',
    views: 1200,
  },
  {
    id: 'search-algorithms',
    title: '探索アルゴリズム',
    description: '線形探索、二分探索、ハッシュ探索の理解',
    keywords: ['探索', '線形探索', '二分探索', 'ハッシュ'],
    difficulty: 'basic',
    views: 850,
  },
  {
    id: 'data-structures',
    title: 'データ構造',
    description: '配列、連結リスト、スタック、キューの基礎',
    keywords: ['データ構造', '配列', 'リスト', 'スタック', 'キュー'],
    difficulty: 'basic',
    views: 1100,
  },
  {
    id: 'graph-algorithms',
    title: 'グラフアルゴリズム',
    description: 'グラフの表現と基本的なアルゴリズム',
    keywords: ['グラフ', 'DFS', 'BFS', '最短経路'],
    difficulty: 'advanced',
    views: 650,
  },
  {
    id: 'dynamic-programming',
    title: '動的プログラミング',
    description: '動的プログラミングの基本概念と実装',
    keywords: ['動的プログラミング', 'DP', 'メモ化', '最適化'],
    difficulty: 'advanced',
    views: 420,
  },
];

export default function AlgorithmsPage() {
  const {
    searchQuery,
    selectedCategory,
    selectedLevel,
    setSearchQuery,
    setSelectedCategory,
    setSelectedLevel,
    resetFilters,
  } = useSearchAndFilter();

  // フィルタリングロジック
  const filteredAlgorithms = React.useMemo(() => {
    return algorithmsData.filter((algorithm) => {
      // カテゴリフィルタ
      const categoryMatch = selectedCategory === 'all' || 
        (algorithm.keywords || []).some(keyword => 
          keyword.toLowerCase().includes(selectedCategory.toLowerCase())
        );

      // レベルフィルタ  
      const levelMatch = selectedLevel === 'all' || 
        (selectedLevel === 'beginner' && algorithm.difficulty === 'basic') ||
        (selectedLevel === 'intermediate' && algorithm.difficulty === 'intermediate') ||
        (selectedLevel === 'advanced' && algorithm.difficulty === 'advanced');

      // 検索クエリフィルタ
      const searchMatch = !searchQuery || 
        algorithm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        algorithm.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (algorithm.keywords || []).some(keyword => 
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return categoryMatch && levelMatch && searchMatch;
    });
  }, [selectedCategory, selectedLevel, searchQuery]);

  const handleConceptClick = (concept: LearningConcept) => {
    console.log('Algorithm concept clicked:', concept);
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <PageHeader
            title="アルゴリズムとデータ構造"
            subtitle="プログラミングの基礎となるアルゴリズムとデータ構造を体系的に学習し、効率的なコード設計の技術を身につけましょう。"
            icon="🧮"
          />

          <FiltersContainer
            categories={CATEGORIES}
            levels={LEARNING_LEVELS}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            selectedLevel={selectedLevel}
            onSearchChange={setSearchQuery}
            onCategoryChange={setSelectedCategory}
            onLevelChange={setSelectedLevel}
            onReset={resetFilters}
          />

          <StatsDisplay
            totalItems={algorithmsData.length}
            filteredItems={filteredAlgorithms.length}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            selectedLevel={selectedLevel}
          />

          <ConceptGrid
            concepts={filteredAlgorithms}
            searchQuery={searchQuery}
            onConceptClick={handleConceptClick}
            emptyMessage="該当するアルゴリズム学習コンテンツが見つかりませんでした。"
          />
        </div>
      </div>
    </AppLayout>
  );
}
