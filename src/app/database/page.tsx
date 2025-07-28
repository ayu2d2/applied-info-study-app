'use client';

import React from 'react';
import { PageTemplate } from '@/components/templates/PageTemplate';
import type { LearningConcept } from '@/types';

// データベース学習コンテンツのデータ
const databaseData: LearningConcept[] = [
  {
    id: 'sql-fundamentals',
    title: 'SQL基礎文法',
    description: 'SELECT文からJOINまで、SQLの基本構文を完全習得',
    keywords: ['SQL', 'SELECT', 'WHERE', 'JOIN', 'GROUP BY'],
    difficulty: 'basic',
    views: 2100,
  },
  {
    id: 'database-design',
    title: 'データベース設計',
    description: '正規化理論とER図を使った効率的なDB設計手法',
    keywords: ['設計', '正規化', 'ER図', 'テーブル設計'],
    difficulty: 'intermediate',
    views: 1650,
  },
  {
    id: 'advanced-queries',
    title: '高度なクエリ技法',
    description: 'サブクエリ、ウィンドウ関数、CTEを活用した複雑なデータ操作',
    keywords: ['サブクエリ', 'ウィンドウ関数', 'CTE', '高度なSQL'],
    difficulty: 'advanced',
    views: 1200,
  },
  {
    id: 'performance-tuning',
    title: 'パフォーマンスチューニング',
    description: 'インデックス設計とクエリ最適化による高速化技術',
    keywords: ['パフォーマンス', 'インデックス', '最適化', 'チューニング'],
    difficulty: 'advanced',
    views: 980,
  },
  {
    id: 'transactions-acid',
    title: 'トランザクションとACID特性',
    description: 'データの整合性を保つトランザクション制御の仕組み',
    keywords: ['トランザクション', 'ACID', '整合性', 'ロック'],
    difficulty: 'intermediate',
    views: 1320,
  },
  {
    id: 'nosql-databases',
    title: 'NoSQLデータベース',
    description: 'MongoDB、Redis、Cassandraなど非リレーショナルDB',
    keywords: ['NoSQL', 'MongoDB', 'Redis', 'Cassandra', 'ドキュメント'],
    difficulty: 'intermediate',
    views: 890,
  },
  {
    id: 'data-modeling',
    title: 'データモデリング',
    description: 'ビジネス要件からデータ構造を設計する手法',
    keywords: ['データモデリング', '概念設計', '論理設計', '物理設計'],
    difficulty: 'intermediate',
    views: 750,
  },
  {
    id: 'backup-recovery',
    title: 'バックアップとリカバリ',
    description: 'データ保護とシステム復旧のベストプラクティス',
    keywords: ['バックアップ', 'リカバリ', 'データ保護', '障害対策'],
    difficulty: 'advanced',
    views: 620,
  },
];

export default function DatabasePage() {
  const handleConceptClick = (concept: LearningConcept) => {
    // データベース概念の詳細表示ロジック
    console.log('Database concept clicked:', concept);
    // TODO: 詳細モーダルや詳細ページへの遷移
  };

  return (
    <PageTemplate
      title="データベース技術"
      subtitle="SQL基礎からNoSQL、パフォーマンスチューニングまで、現代のデータ管理に必要な技術を実践的に学習しましょう。"
      icon="🗃️"
      data={databaseData}
      gradientColors="bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-800"
      onConceptClick={handleConceptClick}
      emptyMessage="該当するデータベース学習コンテンツが見つかりませんでした。"
    />
  );
}
