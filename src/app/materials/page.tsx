'use client';

import AppLayout from '@/components/AppLayout';

export default function StudyMaterialsPage() {
  return (
    <AppLayout 
      title="📚 重要知識まとめ"
      description="応用情報技術者試験によく出る重要な知識と計算問題をまとめました"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            学習コンテンツを準備中...
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            新しいUI/UXでより良い学習体験を提供するため、コンテンツを改善中です。
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
