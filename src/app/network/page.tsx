'use client';

import { useState, useMemo } from 'react';
import AppLayout from '@/components/AppLayout';

export default function NetworkPage() {
  // プロ級の状態管理
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  // プロ級のカテゴリシステム
  const categories = [
    { id: 'all', name: '全て', icon: '🎯', color: 'from-gray-400 to-gray-600' },
    { id: 'osi-model', name: 'OSI参照モデル', icon: '📋', color: 'from-blue-400 to-blue-600' },
    { id: 'protocols', name: 'プロトコル', icon: '⚡', color: 'from-green-400 to-green-600' },
    { id: 'addressing', name: 'アドレッシング', icon: '🌐', color: 'from-purple-400 to-purple-600' },
    { id: 'routing', name: 'ルーティング', icon: '🛤️', color: 'from-orange-400 to-orange-600' },
    { id: 'troubleshooting', name: 'トラブルシューティング', icon: '🔧', color: 'from-red-400 to-red-600' }
  ];

  const learningLevels = [
    { id: 'all', name: '全レベル', color: 'bg-gray-100' },
    { id: 'beginner', name: '初級', color: 'bg-green-100' },
    { id: 'intermediate', name: '中級', color: 'bg-yellow-100' },
    { id: 'advanced', name: '上級', color: 'bg-red-100' }
  ];

  // プロ級のネットワーク学習コンテンツライブラリ
  const networkLibrary = {
    'osi-reference-model': {
      title: 'OSI参照モデル完全解説',
      category: 'osi-model',
      level: 'beginner',
      description: '7層アーキテクチャとプロトコルマッピング',
      keywords: ['OSI', '7層', 'TCP/IP', 'プロトコル'],
      estimatedTime: '30分',
      difficulty: 3,
      layers: [
        {
          layer: 7,
          name: 'アプリケーション層',
          icon: '💻',
          color: 'bg-red-100',
          description: 'ユーザーアプリケーションとネットワークサービスの直接的なインターフェース',
          protocols: ['HTTP/HTTPS', 'FTP', 'SMTP', 'DNS', 'DHCP', 'SNMP'],
          functions: ['ユーザーインターフェース', 'アプリケーション制御', 'データ形式変換'],
          examples: ['Webブラウザ', 'メールクライアント', 'ファイル転送ソフト'],
          dataUnit: 'データ'
        },
        {
          layer: 6,
          name: 'プレゼンテーション層',
          icon: '🎨',
          color: 'bg-orange-100',
          description: 'データの表現形式、暗号化、圧縮を担当',
          protocols: ['SSL/TLS', 'JPEG', 'GIF', 'MPEG', 'ASCII'],
          functions: ['データ暗号化', 'データ圧縮', '文字コード変換'],
          examples: ['SSL暗号化', '画像圧縮', '文字エンコーディング'],
          dataUnit: 'データ'
        },
        {
          layer: 5,
          name: 'セッション層',
          icon: '🔗',
          color: 'bg-yellow-100',
          description: 'アプリケーション間のセッション確立・管理・終了',
          protocols: ['NetBIOS', 'RPC', 'SQL Session', 'ZIP'],
          functions: ['セッション確立', 'セッション管理', 'セッション終了'],
          examples: ['ログイン認証', 'データベース接続', 'ファイル共有'],
          dataUnit: 'データ'
        },
        {
          layer: 4,
          name: 'トランスポート層',
          icon: '🚚',
          color: 'bg-green-100',
          description: 'エンドツーエンドの信頼性のあるデータ転送',
          protocols: ['TCP', 'UDP', 'SCTP'],
          functions: ['エラー検出・訂正', 'フロー制御', 'ポート番号管理'],
          examples: ['Webサーバー接続', 'ファイル転送', 'ストリーミング'],
          dataUnit: 'セグメント'
        },
        {
          layer: 3,
          name: 'ネットワーク層',
          icon: '🗺️',
          color: 'bg-blue-100',
          description: 'パケットのルーティングとアドレッシング',
          protocols: ['IP', 'ICMP', 'ARP', 'OSPF', 'BGP'],
          functions: ['ルーティング', 'IPアドレス管理', 'パケット転送'],
          examples: ['インターネット経路制御', 'VPN接続', 'ping機能'],
          dataUnit: 'パケット'
        },
        {
          layer: 2,
          name: 'データリンク層',
          icon: '🔗',
          color: 'bg-indigo-100',
          description: '隣接ノード間の信頼性のあるデータ転送',
          protocols: ['Ethernet', 'Wi-Fi', 'PPP', 'Frame Relay'],
          functions: ['フレーミング', 'エラー検出', 'MACアドレス管理'],
          examples: ['LANスイッチング', '無線LAN', 'イーサネット'],
          dataUnit: 'フレーム'
        },
        {
          layer: 1,
          name: '物理層',
          icon: '⚡',
          color: 'bg-purple-100',
          description: '物理的な信号の送受信',
          protocols: ['電気信号', '光信号', '電波'],
          functions: ['信号変換', '物理接続', '伝送媒体制御'],
          examples: ['LANケーブル', '光ファイバー', '無線電波'],
          dataUnit: 'ビット'
        }
      ]
    },
    'tcp-ip-fundamentals': {
      title: 'TCP/IPプロトコルスイート',
      category: 'protocols',
      level: 'intermediate',
      description: 'インターネットの基盤技術を徹底理解',
      keywords: ['TCP', 'UDP', 'IP', 'ICMP'],
      estimatedTime: '40分',
      difficulty: 4,
      protocolStack: [
        {
          layer: 'アプリケーション層',
          icon: '🌐',
          color: 'bg-blue-100',
          protocols: [
            { name: 'HTTP', port: '80', description: 'Webページ転送', reliability: 'TCP', security: 'なし' },
            { name: 'HTTPS', port: '443', description: 'セキュアWeb通信', reliability: 'TCP', security: 'SSL/TLS' },
            { name: 'FTP', port: '21', description: 'ファイル転送', reliability: 'TCP', security: 'なし' },
            { name: 'SMTP', port: '25', description: 'メール送信', reliability: 'TCP', security: 'オプション' },
            { name: 'DNS', port: '53', description: '名前解決', reliability: 'UDP/TCP', security: 'DNSSEC' }
          ]
        },
        {
          layer: 'トランスポート層',
          icon: '🚚',
          color: 'bg-green-100',
          protocols: [
            { 
              name: 'TCP', 
              characteristics: '信頼性', 
              features: ['3ウェイハンドシェイク', 'エラー訂正', 'フロー制御', '順序保証'],
              usecases: ['Webブラウジング', 'メール', 'ファイル転送'],
              overhead: '高い'
            },
            { 
              name: 'UDP', 
              characteristics: '高速性', 
              features: ['コネクションレス', '低オーバーヘッド', 'ブロードキャスト対応'],
              usecases: ['ストリーミング', 'DNS', 'DHCP', 'ゲーム'],
              overhead: '低い'
            }
          ]
        },
        {
          layer: 'インターネット層',
          icon: '🗺️',
          color: 'bg-purple-100',
          protocols: [
            {
              name: 'IPv4',
              addressFormat: '32ビット（4オクテット）',
              example: '192.168.1.1',
              addressSpace: '約43億アドレス',
              features: ['クラスフルアドレッシング', 'NAT対応', '広く普及']
            },
            {
              name: 'IPv6',
              addressFormat: '128ビット（8グループ）',
              example: '2001:db8::1',
              addressSpace: '約340澗アドレス',
              features: ['階層的アドレッシング', 'IPsec組み込み', '自動設定']
            },
            {
              name: 'ICMP',
              purpose: 'エラー報告・制御メッセージ',
              messages: ['Echo Request/Reply（ping）', 'Destination Unreachable', 'Time Exceeded'],
              tools: ['ping', 'traceroute', 'pathping']
            }
          ]
        }
      ]
    },
    'ip-addressing-subnetting': {
      title: 'IPアドレッシング&サブネッティング',
      category: 'addressing',
      level: 'intermediate',
      description: 'CIDR、VLSM、サブネット設計の実践',
      keywords: ['CIDR', 'VLSM', 'サブネット', 'IPアドレス'],
      estimatedTime: '45分',
      difficulty: 4,
      addressingConcepts: [
        {
          name: 'IPv4アドレスクラス',
          icon: '🏷️',
          color: 'bg-blue-100',
          classes: [
            { 
              class: 'A', 
              range: '1.0.0.0 - 126.255.255.255', 
              mask: '/8', 
              networks: '126', 
              hostsPerNetwork: '16,777,214',
              privateRange: '10.0.0.0/8',
              usage: '大規模ISP・企業'
            },
            { 
              class: 'B', 
              range: '128.0.0.0 - 191.255.255.255', 
              mask: '/16', 
              networks: '16,384', 
              hostsPerNetwork: '65,534',
              privateRange: '172.16.0.0/12',
              usage: '中規模企業・大学'
            },
            { 
              class: 'C', 
              range: '192.0.0.0 - 223.255.255.255', 
              mask: '/24', 
              networks: '2,097,152', 
              hostsPerNetwork: '254',
              privateRange: '192.168.0.0/16',
              usage: '小規模組織・家庭'
            }
          ]
        },
        {
          name: 'サブネッティング実践',
          icon: '🧮',
          color: 'bg-green-100',
          examples: [
            {
              network: '192.168.1.0/24',
              requirement: '4つのサブネットに分割',
              calculation: '2^2 = 4サブネット → 2ビット借用',
              newMask: '/26',
              subnets: [
                { subnet: '192.168.1.0/26', range: '192.168.1.1-62', hosts: '62' },
                { subnet: '192.168.1.64/26', range: '192.168.1.65-126', hosts: '62' },
                { subnet: '192.168.1.128/26', range: '192.168.1.129-190', hosts: '62' },
                { subnet: '192.168.1.192/26', range: '192.168.1.193-254', hosts: '62' }
              ]
            },
            {
              network: '10.0.0.0/8',
              requirement: 'VLSM（可変長サブネット）',
              departments: [
                { name: '営業部', hosts: '500', subnet: '10.0.0.0/23', actualHosts: '510' },
                { name: '開発部', hosts: '200', subnet: '10.0.2.0/24', actualHosts: '254' },
                { name: '総務部', hosts: '50', subnet: '10.0.3.0/26', actualHosts: '62' },
                { name: 'サーバー', hosts: '10', subnet: '10.0.3.64/28', actualHosts: '14' }
              ]
            }
          ]
        }
      ]
    },
    'routing-protocols': {
      title: 'ルーティングプロトコル',
      category: 'routing',
      level: 'advanced',
      description: 'RIP、OSPF、BGPの動作原理と設定',
      keywords: ['RIP', 'OSPF', 'BGP', 'ルーティング'],
      estimatedTime: '35分',
      difficulty: 5,
      routingTypes: [
        {
          type: '距離ベクトル型',
          icon: '📏',
          color: 'bg-orange-100',
          protocol: 'RIP（Routing Information Protocol）',
          metric: 'ホップ数（最大15）',
          algorithm: 'ベルマン・フォード法',
          updateInterval: '30秒',
          features: ['シンプルな設定', '小規模ネットワーク向け', 'コンバージェンス遅い'],
          limitations: ['最大15ホップ', 'ループリスク', 'メトリック単純']
        },
        {
          type: 'リンクステート型',
          icon: '🗺️',
          color: 'bg-blue-100',
          protocol: 'OSPF（Open Shortest Path First）',
          metric: 'コスト（帯域幅ベース）',
          algorithm: 'ダイクストラ法',
          updateInterval: 'トポロジ変更時',
          features: ['高速コンバージェンス', 'エリア分割', 'VLSM対応'],
          advantages: ['ループフリー', 'スケーラブル', '帯域効率的']
        },
        {
          type: 'パスベクトル型',
          icon: '🌐',
          color: 'bg-green-100',
          protocol: 'BGP（Border Gateway Protocol）',
          metric: 'AS Path（AS番号の列）',
          algorithm: 'パスベクトル',
          updateInterval: 'ポリシー変更時',
          features: ['インターネット用', 'ポリシールーティング', '大規模対応'],
          usecases: ['ISP間接続', 'マルチホーミング', 'トラフィック制御']
        }
      ]
    },
    'network-troubleshooting': {
      title: 'ネットワーク診断ツール',
      category: 'troubleshooting',
      level: 'intermediate',
      description: 'ping、traceroute、netstat、Wiresharkの実践活用',
      keywords: ['ping', 'traceroute', 'netstat', 'Wireshark'],
      estimatedTime: '30分',
      difficulty: 3,
      diagnosticTools: [
        {
          tool: 'ping',
          icon: '🏓',
          color: 'bg-green-100',
          purpose: 'ホスト間の疎通確認',
          protocol: 'ICMP Echo Request/Reply',
          commonOptions: [
            { option: '-c count', description: '送信回数指定', example: 'ping -c 4 google.com' },
            { option: '-i interval', description: '送信間隔指定', example: 'ping -i 2 192.168.1.1' },
            { option: '-s size', description: 'パケットサイズ指定', example: 'ping -s 1000 target' },
            { option: '-t ttl', description: 'TTL値指定', example: 'ping -t 64 target' }
          ],
          interpretation: [
            { result: 'Reply from ...', meaning: '正常疎通', action: '問題なし' },
            { result: 'Request timeout', meaning: 'パケット損失', action: 'ネットワーク経路確認' },
            { result: 'Destination unreachable', meaning: '宛先到達不可', action: 'ルーティング確認' },
            { result: 'TTL exceeded', meaning: 'ルーティングループ', action: 'ルート設定確認' }
          ]
        },
        {
          tool: 'traceroute',
          icon: '🛤️',
          color: 'bg-blue-100',
          purpose: 'パケット経路の追跡',
          protocol: 'ICMP/UDP TTL制御',
          mechanism: 'TTLを1から順次増加させて経路上のルーターを特定',
          output: [
            { hop: 1, ip: '192.168.1.1', rtt: '1.2ms', device: 'ローカルルーター' },
            { hop: 2, ip: '10.0.0.1', rtt: '15.8ms', device: 'ISPゲートウェイ' },
            { hop: 3, ip: '203.141.128.1', rtt: '28.4ms', device: 'ISP基幹網' },
            { hop: 4, ip: '8.8.8.8', rtt: '45.2ms', device: '目的地サーバー' }
          ],
          troubleshooting: [
            { symptom: '特定ホップでタイムアウト', cause: 'ルーター障害', action: '迂回路確認' },
            { symptom: 'RTT急激増加', cause: '帯域不足・混雑', action: 'QoS設定確認' },
            { symptom: 'ループ検出', cause: 'ルーティング設定ミス', action: 'ルート再設定' }
          ]
        },
        {
          tool: 'netstat',
          icon: '📊',
          color: 'bg-purple-100',
          purpose: 'ネットワーク接続状況の確認',
          commonCommands: [
            { command: 'netstat -an', description: '全ての接続とリスニングポート表示' },
            { command: 'netstat -rn', description: 'ルーティングテーブル表示' },
            { command: 'netstat -i', description: 'ネットワークインターフェース統計' },
            { command: 'netstat -p tcp', description: 'TCP接続のみ表示' }
          ],
          states: [
            { state: 'LISTENING', meaning: 'ポートで接続待機中', example: 'Webサーバーのポート80' },
            { state: 'ESTABLISHED', meaning: '接続確立済み', example: '通信中のHTTP接続' },
            { state: 'TIME_WAIT', meaning: '接続終了処理中', example: '正常切断後の待機状態' },
            { state: 'CLOSE_WAIT', meaning: '相手からの切断待ち', example: 'アプリケーション側の処理待ち' }
          ]
        }
      ]
    },
    'wireless-networking': {
      title: '無線ネットワーク技術',
      category: 'protocols',
      level: 'intermediate',
      description: 'Wi-Fi、Bluetooth、5G技術の基礎',
      keywords: ['Wi-Fi', 'IEEE 802.11', 'Bluetooth', '5G'],
      estimatedTime: '25分',
      difficulty: 3,
      wirelessStandards: [
        {
          standard: 'IEEE 802.11ac',
          icon: '📶',
          color: 'bg-blue-100',
          frequency: '5GHz',
          maxSpeed: '1.3Gbps',
          range: '約70m（屋内）',
          features: ['MIMO対応', 'ビームフォーミング', '256-QAM変調'],
          advantages: ['高速通信', '電波干渉少ない', 'エンタープライズ向け']
        },
        {
          standard: 'IEEE 802.11ax (Wi-Fi 6)',
          icon: '🚀',
          color: 'bg-green-100',
          frequency: '2.4GHz/5GHz',
          maxSpeed: '9.6Gbps',
          range: '約100m（屋内）',
          features: ['OFDMA', 'MU-MIMO', '1024-QAM変調'],
          advantages: ['超高速', '多端末対応', '省電力化']
        },
        {
          standard: 'Bluetooth 5.0',
          icon: '🔗',
          color: 'bg-purple-100',
          frequency: '2.4GHz',
          maxSpeed: '2Mbps',
          range: '約240m',
          features: ['低消費電力', 'メッシュネットワーク', 'IoT対応'],
          advantages: ['簡単接続', 'バッテリー長持ち', 'ウェアラブル最適']
        }
      ]
    }
  };

  // 検索とフィルタリング機能
  const filteredConcepts = useMemo(() => {
    return Object.entries(networkLibrary).filter(([key, concept]) => {
      const categoryMatch = selectedCategory === 'all' || concept.category === selectedCategory;
      const levelMatch = selectedLevel === 'all' || concept.level === selectedLevel;
      const searchMatch = searchQuery === '' || 
        concept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        concept.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        concept.keywords?.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
      return categoryMatch && levelMatch && searchMatch;
    });
  }, [selectedCategory, selectedLevel, searchQuery]);

  // 難易度表示
  const DifficultyStars = ({ difficulty }: { difficulty: number }) => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={`text-sm ${star <= difficulty ? 'text-yellow-400' : 'text-gray-300'}`}>
          ⭐
        </span>
      ))}
    </div>
  );

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        {/* プロ級のヘッダーセクション */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl text-white p-8 shadow-2xl mb-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              🌐 ネットワークエンジニアリング
            </h1>
            <p className="text-xl opacity-90 mb-6">
              OSI参照モデルからトラブルシューティングまで実践的に習得
            </p>
            <div className="flex justify-center items-center space-x-6 text-sm opacity-80">
              <div className="flex items-center space-x-2">
                <span>📋</span>
                <span>{Object.keys(networkLibrary).length}の技術領域</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🛠️</span>
                <span>実践的ツール活用</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🎯</span>
                <span>資格試験対応</span>
              </div>
            </div>
          </div>
        </div>

        {/* プロ級の検索・フィルターセクション */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="space-y-6">
            {/* 検索バー */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400 text-xl">🔍</span>
              </div>
              <input
                type="text"
                placeholder="キーワードで検索（例：OSI、TCP、ルーティング）"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-4 py-3 text-lg rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>

            {/* カテゴリフィルター */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">📂 カテゴリ</h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                      selectedCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 学習レベルフィルター */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">📊 学習レベル</h3>
              <div className="flex flex-wrap gap-3">
                {learningLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevel(level.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedLevel === level.id
                        ? `${level.color} border-2 border-current shadow-md`
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {level.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* プロ級のコンセプトカードグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {filteredConcepts.map(([key, concept]) => (
            <div
              key={key}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
              onClick={() => setSelectedConcept(selectedConcept === key ? null : key)}
            >
              {/* カードヘッダー */}
              <div className={`bg-gradient-to-r ${categories.find(c => c.id === concept.category)?.color || 'from-gray-400 to-gray-600'} p-4 text-white`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{concept.title}</h3>
                    <p className="text-sm opacity-90">{concept.description}</p>
                  </div>
                  <span className="text-3xl ml-3">
                    {categories.find(c => c.id === concept.category)?.icon}
                  </span>
                </div>
              </div>

              {/* カードボディ */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      concept.level === 'beginner' ? 'bg-green-100 text-green-800' :
                      concept.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {concept.level === 'beginner' ? '初級' : 
                       concept.level === 'intermediate' ? '中級' : '上級'}
                    </span>
                    <span className="text-xs text-gray-500">⏱️ {concept.estimatedTime}</span>
                  </div>
                  <DifficultyStars difficulty={concept.difficulty} />
                </div>

                {/* キーワードタグ */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {concept.keywords.slice(0, 4).map((keyword) => (
                    <span key={keyword} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {keyword}
                    </span>
                  ))}
                  {concept.keywords.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      +{concept.keywords.length - 4}
                    </span>
                  )}
                </div>

                {/* 展開アイコン */}
                <div className="flex justify-center">
                  <span className={`text-2xl transition-transform duration-200 ${
                    selectedConcept === key ? 'rotate-180' : ''
                  }`}>
                    ⌄
                  </span>
                </div>
              </div>

              {/* 展開コンテンツ */}
              {selectedConcept === key && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
                  {/* OSI参照モデル詳細表示 */}
                  {key === 'osi-reference-model' && 'layers' in concept && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">OSI 7層モデル（上位層から）</h4>
                      {concept.layers.reverse().map((layer: any, index: number) => (
                        <div key={index} className={`${layer.color} rounded-lg p-4`}>
                          <div className="flex items-center mb-3">
                            <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                              {layer.layer}
                            </div>
                            <span className="text-2xl mr-3">{layer.icon}</span>
                            <h5 className="text-lg font-bold text-gray-800">{layer.name}</h5>
                            <span className="ml-auto text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                              {layer.dataUnit}
                            </span>
                          </div>
                          <div className="space-y-3">
                            <div className="text-sm text-gray-700">{layer.description}</div>
                            <div>
                              <div className="text-sm font-semibold text-blue-600 mb-2">主要プロトコル</div>
                              <div className="flex flex-wrap gap-1">
                                {layer.protocols.map((protocol: string, i: number) => (
                                  <span key={i} className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded">
                                    {protocol}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-3">
                              <div>
                                <div className="text-sm font-semibold text-green-600 mb-2">主要機能</div>
                                <div className="space-y-1">
                                  {layer.functions.map((func: string, i: number) => (
                                    <div key={i} className="text-xs bg-green-50 text-green-800 px-2 py-1 rounded">
                                      • {func}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-purple-600 mb-2">実装例</div>
                                <div className="space-y-1">
                                  {layer.examples.map((example: string, i: number) => (
                                    <div key={i} className="text-xs bg-purple-50 text-purple-800 px-2 py-1 rounded">
                                      • {example}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TCP/IP詳細表示 */}
                  {key === 'tcp-ip-fundamentals' && 'protocolStack' in concept && (
                    <div className="space-y-6">
                      {concept.protocolStack.map((stack: any, index: number) => (
                        <div key={index} className={`${stack.color} rounded-lg p-4`}>
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">{stack.icon}</span>
                            <h5 className="text-lg font-bold text-gray-800">{stack.layer}</h5>
                          </div>
                          
                          {stack.protocols && (
                            <div className="overflow-x-auto">
                              <table className="w-full bg-white/70 rounded">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left p-2">プロトコル</th>
                                    <th className="text-left p-2">ポート</th>
                                    <th className="text-left p-2">用途</th>
                                    <th className="text-left p-2">信頼性</th>
                                    <th className="text-left p-2">セキュリティ</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {stack.protocols.map((protocol: any, i: number) => (
                                    <tr key={i} className="border-b">
                                      <td className="p-2 font-semibold">{protocol.name}</td>
                                      <td className="p-2 text-sm">{protocol.port}</td>
                                      <td className="p-2 text-sm">{protocol.description}</td>
                                      <td className="p-2 text-sm">{protocol.reliability}</td>
                                      <td className="p-2 text-sm">{protocol.security}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {stack.layer === 'トランスポート層' && (
                            <div className="grid md:grid-cols-2 gap-4 mt-4">
                              {stack.protocols.map((protocol: any, i: number) => (
                                <div key={i} className="bg-white/70 rounded p-3">
                                  <div className="font-bold text-gray-800 mb-2">
                                    {protocol.name} - {protocol.characteristics}
                                  </div>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="text-sm font-semibold text-blue-600">特徴:</span>
                                      <div className="text-xs space-y-1">
                                        {protocol.features.map((feature: string, j: number) => (
                                          <div key={j}>• {feature}</div>
                                        ))}
                                      </div>
                                    </div>
                                    <div>
                                      <span className="text-sm font-semibold text-green-600">用途:</span>
                                      <div className="text-xs">{protocol.usecases.join(', ')}</div>
                                    </div>
                                    <div>
                                      <span className="text-sm font-semibold text-orange-600">オーバーヘッド:</span>
                                      <span className="text-xs ml-1">{protocol.overhead}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* その他のコンテンツも同様に実装... */}
                  {/* IPアドレッシング、ルーティング、トラブルシューティング、無線ネットワークの詳細表示 */}
                  
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 結果が見つからない場合 */}
        {filteredConcepts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              検索結果が見つかりませんでした
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              検索条件を変更してお試しください
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedLevel('all');
              }}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              フィルターをリセット
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}