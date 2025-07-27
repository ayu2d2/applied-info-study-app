import type { Category, LearningLevel } from '@/types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: '全て', icon: '🎯', color: 'from-gray-400 to-gray-600' },
  { id: 'web-fundamentals', name: 'Web基礎', icon: '🌐', color: 'from-blue-400 to-blue-600' },
  { id: 'communication', name: '通信技術', icon: '📡', color: 'from-green-400 to-green-600' },
  { id: 'infrastructure', name: 'インフラ', icon: '🏗️', color: 'from-purple-400 to-purple-600' },
  { id: 'security', name: 'セキュリティ', icon: '🔒', color: 'from-red-400 to-red-600' },
  { id: 'protocols', name: 'プロトコル', icon: '⚡', color: 'from-yellow-400 to-yellow-600' }
];

export const LEARNING_LEVELS: LearningLevel[] = [
  { id: 'all', name: '全レベル', color: 'bg-gray-100' },
  { id: 'beginner', name: '初級', color: 'bg-green-100' },
  { id: 'intermediate', name: '中級', color: 'bg-yellow-100' },
  { id: 'advanced', name: '上級', color: 'bg-red-100' }
];

// 難易度レベルの日本語マップ
export const DIFFICULTY_LABELS = {
  beginner: '初級',
  intermediate: '中級',
  advanced: '上級'
} as const;

// 難易度レベルのスタイルマップ
export const DIFFICULTY_STYLES = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800'
} as const;
