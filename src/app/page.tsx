import Link from "next/link";
import CalculationTools from "@/components/CalculationTools";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
            応用情報学習アプリ
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            ネットワークやデータベースの問題を実際に体験しながら学習できる
            応用情報技術者試験対策アプリです
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {/* ネットワーク学習 */}
          <Link href="/network" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 group-hover:scale-105 transform transition-transform">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                ネットワーク
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                OSI参照モデル、TCP/IP、ルーティング、スイッチングなどの
                ネットワーク技術を視覚的に学習できます。
              </p>
            </div>
          </Link>

          {/* データベース学習 */}
          <Link href="/database" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 group-hover:scale-105 transform transition-transform">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                データベース
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                SQL、正規化、ERモデルなどのデータベース設計と
                操作について実践的に学習できます。
              </p>
            </div>
          </Link>

          {/* アルゴリズム学習 */}
          <Link href="/algorithm" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 group-hover:scale-105 transform transition-transform">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                アルゴリズム
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                ソートアルゴリズム、探索アルゴリズム、
                データ構造を視覚化して理解を深められます。
              </p>
            </div>
          </Link>

          {/* セキュリティ学習 */}
          <Link href="/security" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 group-hover:scale-105 transform transition-transform">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                セキュリティ
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                暗号化、認証、アクセス制御などの
                情報セキュリティ技術について学習できます。
              </p>
            </div>
          </Link>

          {/* システム開発 */}
          <Link href="/development" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 group-hover:scale-105 transform transition-transform">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                システム開発
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                ソフトウェアライフサイクル、プロジェクト管理、
                設計技法について実例とともに学習できます。
              </p>
            </div>
          </Link>

          {/* 模擬試験 */}
          <Link href="/exam" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 group-hover:scale-105 transform transition-transform">
              <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                模擬試験
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                本番に近い形式で過去問題や予想問題に
                挑戦して実力を確認できます。
              </p>
            </div>
          </Link>

          {/* 重要知識まとめ */}
          <Link href="/materials" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 group-hover:scale-105 transform transition-transform">
              <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                重要知識まとめ
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                応用情報技術者試験によく出る重要公式や
                頻出用語を整理して確認できます。
              </p>
            </div>
          </Link>

          {/* システム性能分析 */}
          <Link href="/performance" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 group-hover:scale-105 transform transition-transform">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                システム性能分析
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                CPU、メモリ、ディスク、ネットワークの
                性能監視と分析手法を学習できます。
              </p>
            </div>
          </Link>
        </div>

        {/* 計算ツールセクション */}
        <div className="max-w-6xl mx-auto">
          <CalculationTools />
        </div>

        {/* 学習のポイント */}
        <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">応用情報技術者試験 攻略のポイント</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-2">1</span>
                計算問題の攻略
              </h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• スループット・CPU使用率の計算</li>
                <li>• ネットワーク遅延・帯域幅の計算</li>
                <li>• プロジェクト管理指標（CPI、SPI）</li>
                <li>• データベースのコスト計算</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="bg-white text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-2">2</span>
                頻出キーワード
              </h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• OSI参照モデル・TCP/IP</li>
                <li>• SQL・データベース正規化</li>
                <li>• 暗号化・ディジタル署名</li>
                <li>• ソフトウェア工学・品質特性</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm opacity-90">
              🎯 このアプリで実際に手を動かして学習することで、理解度が大幅にアップします！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
