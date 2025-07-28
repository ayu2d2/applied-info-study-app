'use client';

import React from 'react';
import { PageTemplate } from '@/components/templates/PageTemplate';
import type { LearningConcept } from '@/types';

// 開発技術学習コンテンツのデータ
const developmentData: LearningConcept[] = [
  {
    id: 'software-engineering',
    title: 'ソフトウェア工学',
    description: 'システム開発ライフサイクルと開発手法の基本原則',
    keywords: ['SDLC', 'ウォーターフォール', 'アジャイル', '開発手法'],
    difficulty: 'basic',
    views: 1850,
  },
  {
    id: 'programming-fundamentals',
    title: 'プログラミング基礎',
    description: '変数、制御構造、関数、オブジェクト指向の基本概念',
    keywords: ['プログラミング', '変数', '関数', 'オブジェクト指向'],
    difficulty: 'basic',
    views: 2200,
  },
  {
    id: 'version-control',
    title: 'バージョン管理',
    description: 'Git/GitHubを使った効果的なコード管理とチーム開発',
    keywords: ['Git', 'GitHub', 'バージョン管理', 'ブランチ'],
    difficulty: 'intermediate',
    views: 1650,
  },
  {
    id: 'testing-strategies',
    title: 'テスト戦略',
    description: '単体テスト、結合テスト、システムテストの手法と自動化',
    keywords: ['テスト', '単体テスト', '結合テスト', 'TDD'],
    difficulty: 'intermediate',
    views: 1320,
  },
  {
    id: 'design-patterns',
    title: 'デザインパターン',
    description: '再利用可能な設計パターンとアーキテクチャ原則',
    keywords: ['デザインパターン', 'MVC', 'SOLID', 'アーキテクチャ'],
    difficulty: 'advanced',
    views: 1120,
  },
  {
    id: 'api-development',
    title: 'API設計と開発',
    description: 'RESTful API、GraphQL、マイクロサービスアーキテクチャ',
    keywords: ['API', 'REST', 'GraphQL', 'マイクロサービス'],
    difficulty: 'advanced',
    views: 980,
  },
  {
    id: 'devops-practices',
    title: 'DevOps実践',
    description: 'CI/CD、コンテナ技術、インフラ自動化の実装',
    keywords: ['DevOps', 'CI/CD', 'Docker', 'Kubernetes'],
    difficulty: 'advanced',
    views: 850,
  },
  {
    id: 'code-quality',
    title: 'コード品質管理',
    description: 'リファクタリング、コードレビュー、静的解析ツール',
    keywords: ['コード品質', 'リファクタリング', 'レビュー', '静的解析'],
    difficulty: 'intermediate',
    views: 1050,
  },
];

export default function DevelopmentPage() {
  const handleConceptClick = (concept: LearningConcept) => {
    // 開発技術概念の詳細表示ロジック
    console.log('Development concept clicked:', concept);
    // TODO: 詳細モーダルや詳細ページへの遷移
  };

  return (
    <PageTemplate
      title="開発技術"
      subtitle="ソフトウェア工学からDevOpsまで、現代のシステム開発に必要な技術と手法を実践的に学習しましょう。"
      icon="💻"
      data={developmentData}
      gradientColors="bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
      onConceptClick={handleConceptClick}
      emptyMessage="該当する開発技術学習コンテンツが見つかりませんでした。"
    />
  );
}
