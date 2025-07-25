'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
  icon: string;
  description: string;
}

const navItems: NavItem[] = [
  {
    href: '/',
    label: 'ホーム',
    icon: '🏠',
    description: 'トップページ'
  },
  {
    href: '/materials',
    label: '重要知識',
    icon: '📚',
    description: '公式・用語・概念図解'
  },
  {
    href: '/network',
    label: 'ネットワーク',
    icon: '🌐',
    description: 'OSI・TCP/IP'
  },
  {
    href: '/database',
    label: 'データベース',
    icon: '🗄️',
    description: 'SQL・正規化・ER図'
  },
  {
    href: '/algorithm',
    label: 'アルゴリズム',
    icon: '⚡',
    description: 'ソート・探索'
  },
  {
    href: '/security',
    label: 'セキュリティ',
    icon: '🔒',
    description: '暗号化・脅威対策'
  },
  {
    href: '/development',
    label: 'システム開発',
    icon: '💻',
    description: '開発手法・PM'
  },
  {
    href: '/exam',
    label: '試験対策',
    icon: '📝',
    description: '過去問・模試'
  }
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ・タイトル */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg">応</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                応用情報学習アプリ
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Applied Information Technology</p>
            </div>
          </Link>

          {/* デスクトップナビゲーション */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative px-3 py-2 rounded-lg transition-all duration-200 ${
                  pathname === item.href
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                
                {/* ツールチップ */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {item.description}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800 dark:border-b-gray-200"></div>
                </div>
              </Link>
            ))}
          </div>

          {/* モバイルハンバーガーメニューボタン */}
          <div className="lg:hidden">
            <button className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* モバイルナビゲーション（展開可能） */}
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 py-2">
          <div className="grid grid-cols-2 gap-2 px-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  pathname === item.href
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
