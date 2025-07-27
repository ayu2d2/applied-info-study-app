'use client';

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';

interface TermItem {
  layers?: string[];
  types?: string[];
  forms?: string[];
}

export default function StudyMaterialsPage() {
  const [activeTab, setActiveTab] = useState('diagrams');
  const [selectedCategory, setSelectedCategory] = useState('全て');
  const [selectedDiagram, setSelectedDiagram] = useState('email-protocols');

  const categories = ['全て', 'ネットワーク', 'メール', 'CPU', 'メモリ', 'ディスク', 'セキュリティ', 'データベース', 'システム開発', 'プロジェクト管理'];

  // 応用情報で重要な概念図解データ（メールプロトコル重点）
  const conceptDiagrams = {
    'email-protocols': {
      title: 'メールプロトコルの仕組み',
      category: 'メール',
      description: 'SMTP、POP3、IMAP - メール送受信の基本プロトコル',
      protocols: [
        {
          name: 'SMTP (Simple Mail Transfer Protocol)',
          port: '25/587/465',
          purpose: 'メール送信',
          color: 'bg-red-100',
          description: 'メールサーバー間・クライアントからサーバーへのメール送信',
          details: [
            'ポート25: 従来の標準ポート',
            'ポート587: 認証付き送信(Submission)',
            'ポート465: SSL/TLS暗号化送信',
            'プッシュ型通信（送信者主導）'
          ],
          flow: [
            { step: 1, action: 'HELO/EHLO', description: 'サーバーへの挨拶' },
            { step: 2, action: 'MAIL FROM', description: '送信者アドレス指定' },
            { step: 3, action: 'RCPT TO', description: '受信者アドレス指定' },
            { step: 4, action: 'DATA', description: 'メール本文送信' },
            { step: 5, action: 'QUIT', description: '接続終了' }
          ]
        },
        {
          name: 'POP3 (Post Office Protocol v3)',
          port: '110/995',
          purpose: 'メール受信（ダウンロード型）',
          color: 'bg-blue-100',
          description: 'メールをクライアントにダウンロードして、サーバーから削除',
          details: [
            'ポート110: 平文通信',
            'ポート995: SSL/TLS暗号化',
            'オフライン読み取り',
            '単一デバイス向け'
          ],
          flow: [
            { step: 1, action: 'USER', description: 'ユーザー名送信' },
            { step: 2, action: 'PASS', description: 'パスワード送信' },
            { step: 3, action: 'LIST', description: 'メール一覧取得' },
            { step: 4, action: 'RETR', description: 'メール取得' },
            { step: 5, action: 'DELE', description: 'メール削除' },
            { step: 6, action: 'QUIT', description: '接続終了' }
          ]
        },
        {
          name: 'IMAP (Internet Message Access Protocol)',
          port: '143/993',
          purpose: 'メール受信（サーバー保存型）',
          color: 'bg-green-100',
          description: 'メールをサーバーに保存したまま、複数デバイスで同期',
          details: [
            'ポート143: 平文通信',
            'ポート993: SSL/TLS暗号化',
            'オンライン読み取り',
            'マルチデバイス対応'
          ],
          flow: [
            { step: 1, action: 'LOGIN', description: 'ログイン認証' },
            { step: 2, action: 'SELECT', description: 'フォルダ選択' },
            { step: 3, action: 'SEARCH', description: 'メール検索' },
            { step: 4, action: 'FETCH', description: 'メール内容取得' },
            { step: 5, action: 'STORE', description: 'フラグ更新' },
            { step: 6, action: 'LOGOUT', description: 'ログアウト' }
          ]
        }
      ]
    },
    'email-architecture': {
      title: 'メールシステム全体構成',
      category: 'メール',
      description: 'MUA、MTA、MDA - メールシステムの構成要素',
      components: [
        {
          name: 'MUA (Mail User Agent)',
          role: 'メールクライアント',
          color: 'bg-purple-100',
          description: 'ユーザーが直接操作するメールソフト',
          examples: ['Outlook', 'Thunderbird', 'Gmail(Web)', 'Apple Mail'],
          functions: ['メール作成・送信', 'メール受信・表示', 'アドレス帳管理', '添付ファイル処理']
        },
        {
          name: 'MTA (Mail Transfer Agent)',
          role: 'メール転送エージェント',
          color: 'bg-orange-100',
          description: 'メールサーバー間でメールを転送',
          examples: ['Sendmail', 'Postfix', 'Exchange Server', 'qmail'],
          functions: ['SMTP通信', 'ルーティング', 'キューイング', '配送制御']
        },
        {
          name: 'MDA (Mail Delivery Agent)',
          role: 'メール配送エージェント',
          color: 'bg-teal-100',
          description: '最終的にメールボックスに配送',
          examples: ['procmail', 'maildrop', 'Dovecot LDA'],
          functions: ['メールボックス配送', 'フィルタリング', '容量制御', 'フォーマット変換']
        }
      ]
    },
    'osi-model': {
      title: 'OSI参照モデル',
      category: 'ネットワーク',
      description: 'ネットワーク通信の7階層モデル - 試験頻出の基本概念',
      layers: [
        { level: 7, name: 'アプリケーション層', color: 'bg-red-100', description: 'HTTP、SMTP、FTP', protocols: ['HTTP', 'HTTPS', 'SMTP', 'POP3', 'IMAP', 'FTP'] },
        { level: 6, name: 'プレゼンテーション層', color: 'bg-orange-100', description: '暗号化、圧縮', protocols: ['SSL/TLS', 'JPEG', 'MPEG', 'ASCII'] },
        { level: 5, name: 'セッション層', color: 'bg-yellow-100', description: 'セッション管理', protocols: ['NetBIOS', 'RPC', 'SQL'] },
        { level: 4, name: 'トランスポート層', color: 'bg-green-100', description: 'TCP、UDP', protocols: ['TCP', 'UDP', 'SPX'] },
        { level: 3, name: 'ネットワーク層', color: 'bg-blue-100', description: 'IP、ルーティング', protocols: ['IP', 'ICMP', 'ARP', 'OSPF'] },
        { level: 2, name: 'データリンク層', color: 'bg-indigo-100', description: 'Ethernet、スイッチ', protocols: ['Ethernet', 'PPP', 'フレームリレー'] },
        { level: 1, name: '物理層', color: 'bg-purple-100', description: '電気信号、ケーブル', protocols: ['光ファイバ', 'UTP', '無線LAN'] }
      ]
    },
    'security-triad': {
      title: '情報セキュリティの3要素（CIA）',
      category: 'セキュリティ',
      description: 'Confidentiality、Integrity、Availability - 情報セキュリティの基本',
      elements: [
        {
          name: '機密性 (Confidentiality)',
          color: 'bg-red-100',
          icon: '🔒',
          description: '認可されていない個人、エンティティ、プロセスに対して情報を利用させない特性',
          threats: ['盗聴', '情報漏洩', '不正アクセス'],
          countermeasures: ['暗号化', 'アクセス制御', '認証', 'データマスキング'],
          examples: ['パスワード保護', 'ファイル暗号化', 'VPN通信']
        },
        {
          name: '完全性 (Integrity)',
          color: 'bg-green-100',
          icon: '✅',
          description: '情報及び処理方法が正確であること及び完全であることを保護する特性',
          threats: ['データ改ざん', 'ウイルス感染', '不正な変更'],
          countermeasures: ['ハッシュ値', 'デジタル署名', 'バックアップ', 'チェックサム'],
          examples: ['ファイルのハッシュ値確認', '電子署名', 'バージョン管理']
        },
        {
          name: '可用性 (Availability)',
          color: 'bg-blue-100',
          icon: '🔄',
          description: '認可されたエンティティが要求したときに、アクセス及び利用が可能である特性',
          threats: ['DoS攻撃', 'システム障害', 'ネットワーク断'],
          countermeasures: ['冗長化', 'ロードバランシング', 'バックアップ', 'BCP'],
          examples: ['サーバークラスタ', 'データセンター分散', '自動復旧システム']
        }
      ]
    },
    'ip-addressing': {
      title: 'IPアドレスとアドレスクラス',
      category: 'ネットワーク',
      description: 'IPv4アドレス体系とクラス分類の基本概念',
      classes: [
        {
          name: 'クラスA',
          range: '1.0.0.0 - 126.255.255.255',
          mask: '255.0.0.0 (/8)',
          color: 'bg-red-100',
          format: 'N.H.H.H',
          networkBits: 8,
          hostBits: 24,
          networks: '126個',
          hostsPerNetwork: '16,777,214個',
          usage: '大規模ネットワーク（ISP、大企業）',
          examples: ['10.0.0.0/8 (プライベート)', '8.8.8.8 (Google DNS)'],
          binaryExample: {
            ip: '10.1.2.3',
            binary: '00001010.00000001.00000010.00000011',
            network: '00001010',
            host: '00000001.00000010.00000011'
          }
        },
        {
          name: 'クラスB',
          range: '128.0.0.0 - 191.255.255.255',
          mask: '255.255.0.0 (/16)',
          color: 'bg-blue-100',
          format: 'N.N.H.H',
          networkBits: 16,
          hostBits: 16,
          networks: '16,384個',
          hostsPerNetwork: '65,534個',
          usage: '中規模ネットワーク（大学、中企業）',
          examples: ['172.16.0.0/12 (プライベート)', '169.254.0.0/16 (APIPA)'],
          binaryExample: {
            ip: '172.16.1.100',
            binary: '10101100.00010000.00000001.01100100',
            network: '10101100.00010000',
            host: '00000001.01100100'
          }
        },
        {
          name: 'クラスC',
          range: '192.0.0.0 - 223.255.255.255',
          mask: '255.255.255.0 (/24)',
          color: 'bg-green-100',
          format: 'N.N.N.H',
          networkBits: 24,
          hostBits: 8,
          networks: '2,097,152個',
          hostsPerNetwork: '254個',
          usage: '小規模ネットワーク（家庭、小企業）',
          examples: ['192.168.0.0/16 (プライベート)', '203.0.113.0/24 (テスト用)'],
          binaryExample: {
            ip: '192.168.1.10',
            binary: '11000000.10101000.00000001.00001010',
            network: '11000000.10101000.00000001',
            host: '00001010'
          }
        },
        {
          name: 'クラスD',
          range: '224.0.0.0 - 239.255.255.255',
          mask: '- (マルチキャスト)',
          color: 'bg-yellow-100',
          format: 'マルチキャスト',
          networkBits: '-',
          hostBits: '-',
          networks: '-',
          hostsPerNetwork: '-',
          usage: 'マルチキャスト通信',
          examples: ['224.0.0.1 (All Hosts)', '239.255.255.250 (UPnP)'],
          binaryExample: {
            ip: '224.0.0.1',
            binary: '11100000.00000000.00000000.00000001',
            network: 'マルチキャスト識別',
            host: 'グループアドレス'
          }
        },
        {
          name: 'クラスE',
          range: '240.0.0.0 - 255.255.255.255',
          mask: '- (実験用)',
          color: 'bg-purple-100',
          format: '実験・研究用',
          networkBits: '-',
          hostBits: '-',
          networks: '-',
          hostsPerNetwork: '-',
          usage: '将来の利用・実験用に予約',
          examples: ['255.255.255.255 (ブロードキャスト)'],
          binaryExample: {
            ip: '240.0.0.1',
            binary: '11110000.00000000.00000000.00000001',
            network: '実験用識別',
            host: '将来の拡張用'
          }
        }
      ]
    },
    'subnet-masking': {
      title: 'サブネットマスクとCIDR記法',
      category: 'ネットワーク',
      description: 'ネットワーク分割とアドレス計算の基本',
      concepts: [
        {
          name: 'サブネットマスクの基本',
          color: 'bg-blue-100',
          icon: '🎯',
          description: 'IPアドレスのネットワーク部とホスト部を区別するためのマスク',
          details: [
            'ネットワーク部: 1が連続',
            'ホスト部: 0が連続',
            'AND演算でネットワークアドレス算出',
            'CIDR記法: /ビット数で表現'
          ],
          examples: [
            { mask: '255.255.255.0', cidr: '/24', binary: '11111111.11111111.11111111.00000000' },
            { mask: '255.255.252.0', cidr: '/22', binary: '11111111.11111111.11111100.00000000' },
            { mask: '255.255.255.240', cidr: '/28', binary: '11111111.11111111.11111111.11110000' }
          ]
        },
        {
          name: 'サブネット分割計算',
          color: 'bg-green-100',
          icon: '🔢',
          description: 'ネットワークを小さなサブネットに分割する計算方法',
          calculation: {
            example: '192.168.1.0/24 を 4つのサブネットに分割',
            steps: [
              { step: 1, action: '必要なサブネット数を確認', result: '4個 → 2²=4 → 2ビット必要' },
              { step: 2, action: '新しいサブネットマスク', result: '/24 + 2 = /26 (255.255.255.192)' },
              { step: 3, action: 'サブネットサイズ計算', result: '2^(32-26) = 64アドレス' },
              { step: 4, action: 'サブネット一覧', result: '192.168.1.0/26, 192.168.1.64/26, 192.168.1.128/26, 192.168.1.192/26' }
            ]
          },
          subnets: [
            { network: '192.168.1.0/26', range: '192.168.1.1-62', broadcast: '192.168.1.63', hosts: 62 },
            { network: '192.168.1.64/26', range: '192.168.1.65-126', broadcast: '192.168.1.127', hosts: 62 },
            { network: '192.168.1.128/26', range: '192.168.1.129-190', broadcast: '192.168.1.191', hosts: 62 },
            { network: '192.168.1.192/26', range: '192.168.1.193-254', broadcast: '192.168.1.255', hosts: 62 }
          ]
        }
      ]
    },
    'broadcast-multicast': {
      title: 'ブロードキャスト・マルチキャスト通信',
      category: 'ネットワーク',
      description: '1対多通信の種類と仕組み',
      types: [
        {
          name: 'ユニキャスト (Unicast)',
          color: 'bg-blue-100',
          icon: '📱',
          description: '1対1の通信方式。最も一般的な通信形態',
          characteristics: [
            '送信者1台 → 受信者1台',
            'IPアドレスで宛先を特定',
            '効率的な帯域利用',
            'セキュリティが高い'
          ],
          diagram: {
            sender: '送信者',
            receivers: ['受信者A'],
            arrows: ['→'],
            traffic: '個別配送'
          },
          examples: ['Webブラウジング', 'メール送信', 'FTPファイル転送', 'SSH接続'],
          addresses: ['任意のホストIPアドレス']
        },
        {
          name: 'ブロードキャスト (Broadcast)',
          color: 'bg-red-100',
          icon: '📢',
          description: '同一ネットワーク内の全ての機器に一斉送信',
          characteristics: [
            '送信者1台 → 全受信者',
            'ネットワーク内全体に配信',
            '帯域を大量消費',
            'ルーターで境界制限'
          ],
          diagram: {
            sender: '送信者',
            receivers: ['PC-A', 'PC-B', 'PC-C', 'プリンタ'],
            arrows: ['⇈', '⇈', '⇈', '⇈'],
            traffic: '全体配送'
          },
          examples: ['ARP要求', 'DHCP検索', 'NetBIOS名前解決', 'Wake-on-LAN'],
          addresses: ['255.255.255.255 (制限付きブロードキャスト)', 'ネットワークアドレス最後 (例:192.168.1.255)']
        },
        {
          name: 'マルチキャスト (Multicast)',
          color: 'bg-green-100',
          icon: '📻',
          description: '特定のグループに属する複数の機器に効率的に配信',
          characteristics: [
            '送信者1台 → グループ受信者',
            'グループ参加が必要',
            '効率的な帯域利用',
            'ルーターが対応必要'
          ],
          diagram: {
            sender: '送信者',
            receivers: ['グループA', 'グループA', '(参加していない)', 'グループA'],
            arrows: ['⇊', '⇊', '×', '⇊'],
            traffic: 'グループ配送'
          },
          examples: ['IPTVストリーミング', 'オンライン会議', 'ソフトウェア配信', 'ルーティングプロトコル'],
          addresses: ['224.0.0.0-239.255.255.255 (クラスD)', '例: 224.0.0.1 (All Hosts)', '例: 224.0.0.2 (All Routers)']
        },
        {
          name: 'エニーキャスト (Anycast)',
          color: 'bg-purple-100',
          icon: '🎯',
          description: '同じアドレスを持つ複数のサーバーのうち、最も近いものに配信',
          characteristics: [
            '送信者1台 → 最寄り受信者',
            '同一IPを複数で共有',
            '負荷分散と冗長性',
            'BGPルーティング利用'
          ],
          diagram: {
            sender: '送信者',
            receivers: ['サーバー1(近)', 'サーバー2(遠)', 'サーバー3(最遠)'],
            arrows: ['⚡', '(経路なし)', '(経路なし)'],
            traffic: '最寄り配送'
          },
          examples: ['DNS Root Servers', 'CDN配信', 'Google Public DNS', 'Cloudflare'],
          addresses: ['通常のユニキャストアドレス', '複数箇所で同一IPを告知']
        }
      ]
    }
  };
  return (
    <AppLayout 
      title="📚 重要知識まとめ"
      description="応用情報技術者試験によく出る重要な知識と計算問題をまとめました"
    >
      <div className="space-y-8">
        {/* タブナビゲーション */}
        <div className="flex flex-wrap justify-center mb-8 space-x-2">
          {[
            { id: 'diagrams', label: '🎨 概念図解', icon: '🎨' },
            { id: 'protocols', label: '📧 プロトコル解説', icon: '📧' },
            { id: 'terms', label: '📖 重要用語', icon: '📖' },
            { id: 'security', label: '🔒 セキュリティ', icon: '🔒' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 shadow-md'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* カテゴリフィルター */}
        {activeTab === 'diagrams' && (
          <div className="mb-6">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* コンテンツエリア */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {activeTab === 'diagrams' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                  🎨 概念図解で理解を深めよう
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  応用情報技術者試験で重要な概念を視覚的に学習できます
                </p>
              </div>

              {/* 図解選択 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {Object.entries(conceptDiagrams)
                  .filter(([_, diagram]) => selectedCategory === '全て' || diagram.category === selectedCategory)
                  .map(([key, diagram]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedDiagram(key)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedDiagram === key
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-lg transform scale-105'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md'
                    }`}
                  >
                    <h3 className="font-bold text-gray-800 dark:text-white mb-2">{diagram.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{diagram.description}</p>
                    <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full text-gray-600 dark:text-gray-300">
                      {diagram.category}
                    </span>
                  </button>
                ))}
              </div>

              {/* 選択された図解の表示 */}
              {selectedDiagram && conceptDiagrams[selectedDiagram as keyof typeof conceptDiagrams] && (
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                    {conceptDiagrams[selectedDiagram as keyof typeof conceptDiagrams].title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                    {conceptDiagrams[selectedDiagram as keyof typeof conceptDiagrams].description}
                  </p>

                  {/* メールプロトコル詳細表示 */}
                  {selectedDiagram === 'email-protocols' && (
                    <div className="space-y-8">
                      {conceptDiagrams['email-protocols'].protocols.map((protocol, index) => (
                        <div key={protocol.name} className={`${protocol.color} rounded-lg p-6 border-2 border-gray-300 shadow-md`}>
                          <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-xl font-bold text-gray-800">{protocol.name}</h4>
                              <span className="px-3 py-1 bg-white/80 rounded-full text-sm font-medium text-gray-700">
                                ポート: {protocol.port}
                              </span>
                            </div>
                            <p className="text-gray-700 mb-4">{protocol.description}</p>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h5 className="text-md font-semibold text-gray-800 mb-3">📋 特徴</h5>
                                <ul className="space-y-2">
                                  {protocol.details.map((detail, i) => (
                                    <li key={i} className="text-sm text-gray-700 bg-white/60 rounded p-2">
                                      • {detail}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h5 className="text-md font-semibold text-gray-800 mb-3">🔄 通信フロー</h5>
                                <div className="space-y-2">
                                  {protocol.flow.map((step, i) => (
                                    <div key={i} className="flex items-center space-x-3 bg-white/60 rounded p-2">
                                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                        {step.step}
                                      </div>
                                      <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-800">{step.action}</div>
                                        <div className="text-xs text-gray-600">{step.description}</div>
                                      </div>
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

                  {/* メールシステム構成表示 */}
                  {selectedDiagram === 'email-architecture' && (
                    <div className="space-y-6">
                      {conceptDiagrams['email-architecture'].components.map((component, index) => (
                        <div key={component.name} className={`${component.color} rounded-lg p-6 border-2 border-gray-300 shadow-md relative`}>
                          <h4 className="text-xl font-bold text-gray-800 mb-2">{component.name}</h4>
                          <p className="text-lg text-gray-600 mb-4">{component.role}</p>
                          <p className="text-gray-700 mb-4">{component.description}</p>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="text-md font-semibold text-gray-800 mb-2">📦 実装例</h5>
                              <div className="flex flex-wrap gap-2">
                                {component.examples.map((example) => (
                                  <span key={example} className="px-3 py-1 bg-white/80 rounded-full text-sm font-medium text-gray-700">
                                    {example}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-md font-semibold text-gray-800 mb-2">⚙️ 主要機能</h5>
                              <ul className="space-y-1">
                                {component.functions.map((func, i) => (
                                  <li key={i} className="text-sm text-gray-700">• {func}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          {index < conceptDiagrams['email-architecture'].components.length - 1 && (
                            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-2xl text-gray-400">
                              ↓
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* OSI参照モデル */}
                  {selectedDiagram === 'osi-model' && (
                    <div className="space-y-3">
                      {conceptDiagrams['osi-model'].layers.map((layer) => (
                        <div key={layer.level} className={`${layer.color} rounded-lg p-4 border-2 border-gray-300 shadow-md hover:shadow-lg transition-shadow`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl font-bold text-gray-800">
                                {layer.level}
                              </div>
                              <div>
                                <h4 className="text-lg font-bold text-gray-800">{layer.name}</h4>
                                <p className="text-sm text-gray-600">{layer.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-gray-500 mb-1">主要プロトコル</div>
                              <div className="flex flex-wrap gap-1">
                                {layer.protocols.map((protocol) => (
                                  <span key={protocol} className="px-2 py-1 bg-white/80 rounded text-xs font-medium text-gray-700">
                                    {protocol}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* セキュリティ3要素 */}
                  {selectedDiagram === 'security-triad' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {conceptDiagrams['security-triad'].elements.map((element) => (
                        <div key={element.name} className={`${element.color} rounded-lg p-6 border-2 border-gray-300 shadow-md hover:shadow-lg transition-shadow`}>
                          <div className="text-center mb-4">
                            <div className="text-4xl mb-2">{element.icon}</div>
                            <h4 className="text-lg font-bold text-gray-800">{element.name}</h4>
                          </div>
                          
                          <p className="text-sm text-gray-700 mb-4 leading-relaxed">{element.description}</p>
                          
                          <div className="space-y-3">
                            <div>
                              <h5 className="text-sm font-semibold text-gray-800 mb-2">🚨 脅威例</h5>
                              <div className="flex flex-wrap gap-1">
                                {element.threats.map((threat) => (
                                  <span key={threat} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                                    {threat}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-sm font-semibold text-gray-800 mb-2">🛡️ 対策</h5>
                              <div className="flex flex-wrap gap-1">
                                {element.countermeasures.map((measure) => (
                                  <span key={measure} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                    {measure}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-sm font-semibold text-gray-800 mb-2">💡 実装例</h5>
                              <ul className="space-y-1">
                                {element.examples.map((example, i) => (
                                  <li key={i} className="text-xs text-gray-600">• {example}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* IPアドレスとアドレスクラス */}
                  {selectedDiagram === 'ip-addressing' && (
                    <div className="space-y-6">
                      {conceptDiagrams['ip-addressing'].classes.map((addressClass) => (
                        <div key={addressClass.name} className={`${addressClass.color} rounded-lg p-6 border-2 border-gray-300 shadow-md`}>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                                {addressClass.name}
                                <span className="ml-3 px-3 py-1 bg-white/80 rounded-full text-sm font-medium">
                                  {addressClass.format}
                                </span>
                              </h4>
                              
                              <div className="space-y-3">
                                <div className="bg-white/60 rounded p-3">
                                  <div className="text-sm font-semibold text-gray-800 mb-2">📍 アドレス範囲</div>
                                  <div className="text-sm text-gray-700">{addressClass.range}</div>
                                </div>
                                
                                <div className="bg-white/60 rounded p-3">
                                  <div className="text-sm font-semibold text-gray-800 mb-2">🎭 サブネットマスク</div>
                                  <div className="text-sm text-gray-700">{addressClass.mask}</div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="bg-white/60 rounded p-3">
                                    <div className="text-xs font-semibold text-gray-800 mb-1">ネットワーク数</div>
                                    <div className="text-sm text-gray-700">{addressClass.networks}</div>
                                  </div>
                                  <div className="bg-white/60 rounded p-3">
                                    <div className="text-xs font-semibold text-gray-800 mb-1">ホスト数/NW</div>
                                    <div className="text-sm text-gray-700">{addressClass.hostsPerNetwork}</div>
                                  </div>
                                </div>
                                
                                <div className="bg-white/60 rounded p-3">
                                  <div className="text-sm font-semibold text-gray-800 mb-2">🎯 主な用途</div>
                                  <div className="text-sm text-gray-700">{addressClass.usage}</div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-md font-semibold text-gray-800 mb-3">🔢 バイナリ例</h5>
                              <div className="bg-white/60 rounded p-4 space-y-3">
                                <div>
                                  <div className="text-xs font-semibold text-gray-600">IPアドレス例</div>
                                  <div className="text-sm font-mono text-gray-800">{addressClass.binaryExample.ip}</div>
                                </div>
                                
                                <div>
                                  <div className="text-xs font-semibold text-gray-600">バイナリ表現</div>
                                  <div className="text-xs font-mono text-gray-800 break-all">{addressClass.binaryExample.binary}</div>
                                </div>
                                
                                <div className="grid grid-cols-1 gap-2">
                                  <div>
                                    <div className="text-xs font-semibold text-blue-600">ネットワーク部</div>
                                    <div className="text-xs font-mono text-blue-800">{addressClass.binaryExample.network}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs font-semibold text-green-600">ホスト部</div>
                                    <div className="text-xs font-mono text-green-800">{addressClass.binaryExample.host}</div>
                                  </div>
                                </div>
                              </div>
                              
                              <h5 className="text-md font-semibold text-gray-800 mb-2 mt-4">💡 実用例</h5>
                              <div className="space-y-1">
                                {addressClass.examples.map((example, i) => (
                                  <div key={i} className="text-xs text-gray-600 bg-white/60 rounded p-2">
                                    • {example}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* サブネットマスクとCIDR記法 */}
                  {selectedDiagram === 'subnet-masking' && (
                    <div className="space-y-8">
                      {conceptDiagrams['subnet-masking'].concepts.map((concept) => (
                        <div key={concept.name} className={`${concept.color} rounded-lg p-6 border-2 border-gray-300 shadow-md`}>
                          <div className="text-center mb-6">
                            <div className="text-4xl mb-3">{concept.icon}</div>
                            <h4 className="text-xl font-bold text-gray-800">{concept.name}</h4>
                            <p className="text-gray-700 mt-2">{concept.description}</p>
                          </div>
                          
                          {concept.name === 'サブネットマスクの基本' && (
                            <div className="space-y-6">
                              <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                  <h5 className="text-md font-semibold text-gray-800 mb-3">📋 基本概念</h5>
                                  <div className="space-y-2">
                                    {concept.details?.map((detail, i) => (
                                      <div key={i} className="text-sm text-gray-700 bg-white/60 rounded p-2">
                                        • {detail}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <h5 className="text-md font-semibold text-gray-800 mb-3">🔢 マスク例</h5>
                                  <div className="space-y-3">
                                    {concept.examples?.map((example, i) => (
                                      <div key={i} className="bg-white/60 rounded p-3">
                                        <div className="flex justify-between items-center mb-2">
                                          <span className="text-sm font-semibold text-gray-800">{example.mask}</span>
                                          <span className="px-2 py-1 bg-blue-500 text-white rounded text-xs">{example.cidr}</span>
                                        </div>
                                        <div className="text-xs font-mono text-gray-600 break-all">{example.binary}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {concept.name === 'サブネット分割計算' && concept.calculation && (
                            <div className="space-y-6">
                              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
                                <h5 className="text-lg font-bold text-gray-800 mb-4">📊 計算例: {concept.calculation.example}</h5>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div>
                                    <h6 className="text-md font-semibold text-gray-800 mb-3">🔄 計算手順</h6>
                                    <div className="space-y-3">
                                      {concept.calculation.steps?.map((step, i) => (
                                        <div key={i} className="flex items-start space-x-3 bg-white/80 rounded p-3">
                                          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                            {step.step}
                                          </div>
                                          <div className="flex-1">
                                            <div className="text-sm font-medium text-gray-800">{step.action}</div>
                                            <div className="text-xs text-gray-600 mt-1">{step.result}</div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h6 className="text-md font-semibold text-gray-800 mb-3">📋 結果一覧</h6>
                                    <div className="space-y-2">
                                      {concept.subnets?.map((subnet, i) => (
                                        <div key={i} className="bg-white/80 rounded p-3">
                                          <div className="text-sm font-semibold text-gray-800 mb-1">{subnet.network}</div>
                                          <div className="text-xs text-gray-600">範囲: {subnet.range}</div>
                                          <div className="text-xs text-gray-600">ブロードキャスト: {subnet.broadcast}</div>
                                          <div className="text-xs text-green-600">利用可能ホスト: {subnet.hosts}個</div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ブロードキャスト・マルチキャスト通信 */}
                  {selectedDiagram === 'broadcast-multicast' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {conceptDiagrams['broadcast-multicast'].types.map((type) => (
                        <div key={type.name} className={`${type.color} rounded-lg p-6 border-2 border-gray-300 shadow-md hover:shadow-lg transition-shadow`}>
                          <div className="text-center mb-4">
                            <div className="text-4xl mb-2">{type.icon}</div>
                            <h4 className="text-lg font-bold text-gray-800">{type.name}</h4>
                            <p className="text-sm text-gray-600 mt-2">{type.description}</p>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-sm font-semibold text-gray-800 mb-2">🔍 特徴</h5>
                              <div className="space-y-1">
                                {type.characteristics.map((char, i) => (
                                  <div key={i} className="text-xs text-gray-700 bg-white/60 rounded p-2">
                                    • {char}
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-sm font-semibold text-gray-800 mb-2">📊 通信図</h5>
                              <div className="bg-white/80 rounded p-3">
                                <div className="text-center mb-3">
                                  <div className="text-sm font-semibold text-blue-600">{type.diagram.sender}</div>
                                  <div className="text-2xl">📡</div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-center">
                                  {type.diagram.receivers.map((receiver, i) => (
                                    <div key={i} className="space-y-1">
                                      <div className="text-lg">{type.diagram.arrows[i]}</div>
                                      <div className="text-xs text-gray-600">{receiver}</div>
                                    </div>
                                  ))}
                                </div>
                                <div className="text-center mt-3">
                                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                                    {type.diagram.traffic}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-sm font-semibold text-gray-800 mb-2">💡 使用例</h5>
                              <div className="flex flex-wrap gap-1">
                                {type.examples.map((example, i) => (
                                  <span key={i} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                    {example}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-sm font-semibold text-gray-800 mb-2">📍 アドレス例</h5>
                              <div className="space-y-1">
                                {type.addresses.map((address, i) => (
                                  <div key={i} className="text-xs font-mono text-gray-600 bg-white/60 rounded p-2">
                                    {address}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'protocols' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                  📧 プロトコル完全ガイド
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  メールプロトコルの仕組みと動作を詳しく解説
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">📬 メール送受信の全体フロー</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-2">📱</div>
                    <p className="text-sm font-medium">送信者MUA</p>
                    <p className="text-xs text-gray-600">メール作成</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-gray-400">→</div>
                    <p className="text-xs text-gray-600 mt-1">SMTP</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-2">🖥️</div>
                    <p className="text-sm font-medium">送信側MTA</p>
                    <p className="text-xs text-gray-600">メール転送</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-gray-400">→</div>
                    <p className="text-xs text-gray-600 mt-1">SMTP</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-2">📮</div>
                    <p className="text-sm font-medium">受信側MTA</p>
                    <p className="text-xs text-gray-600">メール配送</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                📖 重要用語辞典
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                図解付きの用語解説を準備中...
              </p>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                🔒 セキュリティ特集
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                情報セキュリティの図解コンテンツを準備中...
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
