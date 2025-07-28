import type { Category } from '@/types';

/**
 * 難易度を星で表示するユーティリティ関数
 */
export function getDifficultyStars(difficulty: 'basic' | 'intermediate' | 'advanced'): string {
  const starCount = difficulty === 'basic' ? 2 : difficulty === 'intermediate' ? 3 : 4;
  return '⭐'.repeat(starCount);
}

/**
 * カテゴリIDから対応するカテゴリオブジェクトを取得
 */
export function getCategoryById(categories: Category[], id: string): Category | undefined {
  return categories.find(category => category.id === id);
}

/**
 * 検索クエリをハイライトするためのユーティリティ
 */
export function highlightSearchQuery(text: string, query: string): string {
  if (!query) return text;
  
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

/**
 * 時間文字列をパースしてソート用の数値に変換
 */
export function parseTimeToMinutes(timeString: string): number {
  const match = timeString.match(/(\d+)分/);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * キーワード配列を文字列に変換（検索用）
 */
export function keywordsToString(keywords: string[]): string {
  return keywords.join(' ').toLowerCase();
}

/**
 * デバウンス関数
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * ローカルストレージから値を安全に取得
 */
export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * ローカルストレージに値を安全に保存
 */
export function setToLocalStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
}
