'use client';

import React from 'react';
import AppLayout from '@/components/AppLayout';
import { useSearchAndFilter } from '@/hooks/useSearchAndFilter-simple';
import { PageHeader, FiltersContainer, StatsDisplay } from '@/components/layout/PageLayout';
import { ConceptGrid } from '@/components/concept/ConceptCard';
import { CATEGORIES, LEARNING_LEVELS } from '@/constants';
import type { LearningConcept } from '@/types';

// 学習コンテンツのデータ
const materialsData: LearningConcept[] = [
  {
    id: 'web-technologies',
    title: 'Web技術の基礎',
    description: 'WebとHTTPの仕組みを完全理解',
    keywords: ['HTTP', 'URL', 'Web', 'ブラウザ'],
    difficulty: 'basic',
    views: 1250,
  },
  {
    id: 'network-protocols',
    title: 'ネットワークプロトコル',
    description: 'TCP/IP、UDP、HTTP、HTTPSなどの通信プロトコルを学習',
    keywords: ['TCP', 'UDP', 'HTTP', 'HTTPS', 'プロトコル'],
    difficulty: 'intermediate',
    views: 980,
  },
  {
    id: 'ip-addressing',
    title: 'IPアドレスとサブネット',
    description: 'IPアドレスの仕組みとサブネット分割の実践',
    keywords: ['IP', 'サブネット', 'CIDR', 'ネットワーク'],
    difficulty: 'intermediate',
    views: 870,
  },
  {
    id: 'security-fundamentals',
    title: 'セキュリティ基礎',
    description: '情報セキュリティの基本概念と脅威対策',
    keywords: ['セキュリティ', '暗号化', '認証', '脆弱性'],
    difficulty: 'basic',
    views: 1100,
  },
  {
    id: 'database-design',
    title: 'データベース設計',
    description: 'リレーショナルデータベースの設計と正規化',
    keywords: ['データベース', 'SQL', '正規化', 'ER図'],
    difficulty: 'intermediate',
    views: 750,
  },
  {
    id: 'algorithms-datastructures',
    title: 'アルゴリズムとデータ構造',
    description: '基本的なアルゴリズムとデータ構造の理解',
    keywords: ['アルゴリズム', 'データ構造', '計算量', 'ソート'],
    difficulty: 'advanced',
    views: 650,
  },
  {
    id: 'uml-diagrams',
    title: 'UML図の種類と使い分け',
    description: 'システム設計で使用するUML図の理解と実践',
    keywords: ['UML', 'クラス図', 'シーケンス図', '設計'],
    difficulty: 'intermediate',
    views: 420,
  },
];

export default function MaterialsPage() {
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
  const filteredMaterials = React.useMemo(() => {
    return materialsData.filter((material) => {
      // カテゴリフィルタ
      const categoryMatch = selectedCategory === 'all' || 
        (material.keywords || []).some(keyword => 
          keyword.toLowerCase().includes(selectedCategory.toLowerCase())
        );

      // レベルフィルタ  
      const levelMatch = selectedLevel === 'all' || 
        (selectedLevel === 'beginner' && material.difficulty === 'basic') ||
        (selectedLevel === 'intermediate' && material.difficulty === 'intermediate') ||
        (selectedLevel === 'advanced' && material.difficulty === 'advanced');

      // 検索クエリフィルタ
      const searchMatch = !searchQuery || 
        material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (material.keywords || []).some(keyword => 
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return categoryMatch && levelMatch && searchMatch;
    });
  }, [selectedCategory, selectedLevel, searchQuery]);

  const handleConceptClick = (concept: LearningConcept) => {
    // 詳細ページへの遷移やモーダル表示のロジック
    console.log('Concept clicked:', concept);
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <PageHeader
            title="学習教材"
            subtitle="応用情報技術者試験に向けた体系的な学習コンテンツで、実務で役立つ知識を身につけましょう。"
            icon="📚"
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
            totalItems={materialsData.length}
            filteredItems={filteredMaterials.length}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            selectedLevel={selectedLevel}
          />

          <ConceptGrid
            concepts={filteredMaterials}
            searchQuery={searchQuery}
            onConceptClick={handleConceptClick}
            emptyMessage="該当する学習教材が見つかりませんでした。"
          />
        </div>
      </div>
    </AppLayout>
  );
}
