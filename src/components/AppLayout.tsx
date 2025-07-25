'use client';

import { ReactNode } from 'react';
import Navigation from './Navigation';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function AppLayout({ children, title, description }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {title && (
          <div className="max-w-6xl mx-auto mb-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                {title}
              </h1>
              {description && (
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  {description}
                </p>
              )}
            </div>
          </div>
        )}
        
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
      
      {/* フッター */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                  応用情報学習アプリ
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  応用情報技術者試験の合格を目指す方のための
                  体験型学習プラットフォームです。
                </p>
              </div>
              
              <div>
                <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-3">
                  学習コンテンツ
                </h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• ネットワーク技術</li>
                  <li>• データベース設計</li>
                  <li>• アルゴリズムとデータ構造</li>
                  <li>• 情報セキュリティ</li>
                  <li>• システム開発</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-3">
                  試験対策
                </h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• 重要公式まとめ</li>
                  <li>• 頻出用語解説</li>
                  <li>• 計算問題演習</li>
                  <li>• 学習のコツ</li>
                  <li>• 概念図解</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2024 応用情報学習アプリ. 応用情報技術者試験の学習支援を目的としています.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
