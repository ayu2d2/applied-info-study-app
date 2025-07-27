'use client';

import { useState, useMemo } from 'react';
import AppLayout from '@/components/AppLayout';

export default function MaterialsPage() {
  // プロ級の状態管理
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  // プロ級のカテゴリシステム
  const categories = [
    { id: 'all', name: '全て', icon: '🎯', color: 'from-gray-400 to-gray-600' },
    { id: 'web-fundamentals', name: 'Web基礎', icon: '🌐', color: 'from-blue-400 to-blue-600' },
    { id: 'communication', name: '通信技術', icon: '📡', color: 'from-green-400 to-green-600' },
    { id: 'infrastructure', name: 'インフラ', icon: '🏗️', color: 'from-purple-400 to-purple-600' },
    { id: 'security', name: 'セキュリティ', icon: '🔒', color: 'from-red-400 to-red-600' },
    { id: 'protocols', name: 'プロトコル', icon: '⚡', color: 'from-yellow-400 to-yellow-600' }
  ];

  const learningLevels = [
    { id: 'all', name: '全レベル', color: 'bg-gray-100' },
    { id: 'beginner', name: '初級', color: 'bg-green-100' },
    { id: 'intermediate', name: '中級', color: 'bg-yellow-100' },
    { id: 'advanced', name: '上級', color: 'bg-red-100' }
  ];

  // プロ級の学習コンテンツライブラリ
  const conceptLibrary = {
    'web-technologies': {
      title: 'Web技術の基礎',
      category: 'web-fundamentals',
      level: 'beginner',
      description: 'WebとHTTPの仕組みを完全理解',
      keywords: ['HTTP', 'URL', 'Web', 'ブラウザ'],
      estimatedTime: '15分',
      difficulty: 2,
      concepts: [
        {
          name: 'URL構造解析',
          icon: '🌐',
          color: 'bg-blue-100',
          description: 'URLの各部位を詳細に分解',
          interactive: true,
          urlExample: 'https://www.example.com:8080/path/resource?param=value#section',
          components: [
            { part: 'スキーム', value: 'https', description: 'プロトコル指定', examples: ['http: 暗号化なし', 'https: SSL/TLS暗号化'] },
            { part: 'ホスト名', value: 'www.example.com', description: 'サーバーのドメイン名', examples: ['ドメイン名: www.google.com', 'IPアドレス: 192.168.1.1'] },
            { part: 'ポート', value: '8080', description: 'サービス識別番号', examples: ['HTTP: 80', 'HTTPS: 443'] },
            { part: 'パス', value: '/path/resource', description: 'リソースの場所', examples: ['/index.html', '/api/users'] },
            { part: 'クエリ', value: '?param=value', description: 'パラメータ', examples: ['?q=検索', '?page=2'] },
            { part: 'フラグメント', value: '#section', description: 'ページ内位置', examples: ['#top', '#chapter1'] }
          ]
        },
        {
          name: 'HTTPメソッド',
          icon: '⚡',
          color: 'bg-green-100',
          description: 'RESTful APIの基本操作',
          interactive: true,
          methods: [
            { name: 'GET', purpose: '取得', safe: true, idempotent: true, cacheable: true, description: 'リソース取得（読み取り専用）' },
            { name: 'POST', purpose: '作成', safe: false, idempotent: false, cacheable: false, description: 'データ送信（新規作成）' },
            { name: 'PUT', purpose: '更新', safe: false, idempotent: true, cacheable: false, description: 'リソース全体更新' },
            { name: 'DELETE', purpose: '削除', safe: false, idempotent: true, cacheable: false, description: 'リソース削除' }
          ]
        }
      ]
    },
    'network-protocols': {
      title: 'ネットワークプロトコル図鑑',
      category: 'communication',
      level: 'intermediate',
      description: '試験によく出る重要プロトコル完全攻略',
      keywords: ['TCP', 'UDP', 'SMTP', 'FTP', 'DNS'],
      estimatedTime: '25分',
      difficulty: 3,
      protocolCategories: [
        {
          name: 'Web通信',
          icon: '🌐',
          color: 'bg-blue-100',
          protocols: [
            { name: 'HTTP', port: '80', security: 'なし', usage: 'Webページ閲覧', reliability: 'TCP' },
            { name: 'HTTPS', port: '443', security: 'SSL/TLS', usage: 'セキュアWeb通信', reliability: 'TCP' },
            { name: 'WebSocket', port: '80/443', security: '対応', usage: 'リアルタイム通信', reliability: 'TCP' }
          ]
        },
        {
          name: 'メール通信',
          icon: '📧',
          color: 'bg-green-100',
          protocols: [
            { name: 'SMTP', port: '25/587/465', security: 'STARTTLS/SSL', usage: 'メール送信', reliability: 'TCP' },
            { name: 'POP3', port: '110/995', security: 'SSL対応', usage: 'メール受信（DL型）', reliability: 'TCP' },
            { name: 'IMAP', port: '143/993', security: 'SSL対応', usage: 'メール受信（同期型）', reliability: 'TCP' }
          ]
        },
        {
          name: 'ファイル転送',
          icon: '📁',
          color: 'bg-yellow-100',
          protocols: [
            { name: 'FTP', port: '21', security: '平文', usage: 'ファイル転送', reliability: 'TCP' },
            { name: 'FTPS', port: '990', security: 'SSL/TLS', usage: 'セキュアファイル転送', reliability: 'TCP' },
            { name: 'SFTP', port: '22', security: 'SSH', usage: 'SSH経由ファイル転送', reliability: 'TCP' }
          ]
        }
      ]
    },
    'ip-addressing': {
      title: 'IPアドレス設計マスター',
      category: 'infrastructure',
      level: 'intermediate',
      description: 'サブネット計算から実践設計まで',
      keywords: ['IP', 'サブネット', 'CIDR', 'VLSM'],
      estimatedTime: '30分',
      difficulty: 4,
      addressingConcepts: [
        {
          name: 'クラスフル設計',
          icon: '🏷️',
          color: 'bg-purple-100',
          classes: [
            { class: 'A', range: '1.0.0.0-126.255.255.255', mask: '/8', networks: '126', hosts: '16,777,214', usage: '大規模ISP' },
            { class: 'B', range: '128.0.0.0-191.255.255.255', mask: '/16', networks: '16,384', hosts: '65,534', usage: '中規模企業' },
            { class: 'C', range: '192.0.0.0-223.255.255.255', mask: '/24', networks: '2,097,152', hosts: '254', usage: '小規模組織' }
          ]
        },
        {
          name: 'サブネット計算実践',
          icon: '🧮',
          color: 'bg-orange-100',
          calculator: true,
          examples: [
            { network: '192.168.1.0/24', subnets: 4, newMask: '/26', size: 64, usable: 62 },
            { network: '10.0.0.0/8', subnets: 256, newMask: '/16', size: 65536, usable: 65534 }
          ]
        }
      ]
    },
    'security-fundamentals': {
      title: 'セキュリティ3要素とリスク管理',
      category: 'security',
      level: 'beginner',
      description: '情報セキュリティの基本原則を体系的に学習',
      keywords: ['CIA', '暗号化', '認証', 'リスク'],
      estimatedTime: '20分',
      difficulty: 2,
      securityTriad: [
        {
          name: '機密性 (Confidentiality)',
          icon: '🔒',
          color: 'bg-red-100',
          definition: '許可されていない個人・エンティティに情報を開示しない',
          threats: ['盗聴', '情報漏洩', '不正アクセス', 'ソーシャルエンジニアリング'],
          controls: ['暗号化', 'アクセス制御', '認証', 'データマスキング'],
          measures: ['AES暗号化', '多要素認証', 'VPN接続', '権限管理']
        },
        {
          name: '完全性 (Integrity)',
          icon: '✅',
          color: 'bg-green-100',
          definition: '情報および処理方法が正確で完全であることを保護',
          threats: ['データ改ざん', 'マルウェア感染', '不正な変更', '転送エラー'],
          controls: ['ハッシュ値', 'デジタル署名', 'バックアップ', 'チェックサム'],
          measures: ['SHA-256ハッシュ', 'PKI証明書', '差分バックアップ', 'CRC検証']
        },
        {
          name: '可用性 (Availability)',
          icon: '🔄',
          color: 'bg-blue-100',
          definition: '認可されたエンティティが必要時にアクセス・利用可能',
          threats: ['DoS攻撃', 'システム障害', 'ネットワーク断', '自然災害'],
          controls: ['冗長化', 'ロードバランシング', 'BCP', 'モニタリング'],
          measures: ['クラスタ構成', 'CDN活用', 'DR サイト', '24時間監視']
        }
      ]
    },
    'database-design': {
      title: 'データベース設計の基礎',
      category: 'infrastructure',
      level: 'intermediate',
      description: 'ER図からSQL設計まで体系的にマスター',
      keywords: ['ER図', 'SQL', '正規化', 'インデックス'],
      estimatedTime: '35分',
      difficulty: 3,
      designConcepts: [
        {
          name: 'ER図とリレーション',
          icon: '🗃️',
          color: 'bg-indigo-100',
          entities: [
            { name: 'エンティティ', symbol: '□', description: 'データの対象となる概念', examples: ['顧客', '商品', '注文'] },
            { name: 'アトリビュート', symbol: '○', description: 'エンティティの属性', examples: ['顧客ID', '氏名', '住所'] },
            { name: 'リレーション', symbol: '◇', description: 'エンティティ間の関係', examples: ['一対一', '一対多', '多対多'] }
          ]
        },
        {
          name: '正規化プロセス',
          icon: '🔧',
          color: 'bg-cyan-100',
          normalForms: [
            { level: '第1正規形', rule: '繰り返し項目の排除', example: '複数の電話番号を別テーブルに分離' },
            { level: '第2正規形', rule: '部分関数従属の排除', example: '主キーの一部に依存する項目を分離' },
            { level: '第3正規形', rule: '推移関数従属の排除', example: '主キー以外に依存する項目を分離' }
          ]
        }
      ]
    },
    'algorithm-analysis': {
      title: 'アルゴリズム計算量解析',
      category: 'protocols',
      level: 'advanced',
      description: '時間計算量とソートアルゴリズムの実践的理解',
      keywords: ['Big-O', 'ソート', '探索', '計算量'],
      estimatedTime: '40分',
      difficulty: 5,
      complexityAnalysis: [
        {
          name: 'ソートアルゴリズム比較',
          icon: '📊',
          color: 'bg-emerald-100',
          algorithms: [
            { name: 'バブルソート', timeComplexity: 'O(n²)', spaceComplexity: 'O(1)', stable: true, inplace: true },
            { name: 'クイックソート', timeComplexity: 'O(n log n)', spaceComplexity: 'O(log n)', stable: false, inplace: true },
            { name: 'マージソート', timeComplexity: 'O(n log n)', spaceComplexity: 'O(n)', stable: true, inplace: false },
            { name: 'ヒープソート', timeComplexity: 'O(n log n)', spaceComplexity: 'O(1)', stable: false, inplace: true }
          ]
        },
        {
          name: 'Big-O記法実践',
          icon: '📈',
          color: 'bg-pink-100',
          complexities: [
            { notation: 'O(1)', name: '定数時間', example: '配列の要素アクセス', performance: '最高' },
            { notation: 'O(log n)', name: '対数時間', example: '二分探索', performance: '良好' },
            { notation: 'O(n)', name: '線形時間', example: '線形探索', performance: '普通' },
            { notation: 'O(n²)', name: '二次時間', example: 'バブルソート', performance: '低い' }
          ]
        }
      ]
    },
    'network-troubleshooting': {
      title: 'ネットワーク障害解析',
      category: 'communication',
      level: 'advanced',
      description: 'ping、traceroute、Wiresharkを使った実践的トラブルシューティング',
      keywords: ['ping', 'traceroute', 'Wireshark', 'パケット解析'],
      estimatedTime: '45分',
      difficulty: 4,
      troubleshootingTools: [
        {
          name: 'ping診断',
          icon: '🏓',
          color: 'bg-lime-100',
          commands: [
            { command: 'ping google.com', purpose: 'インターネット接続確認', output: 'RTT時間とパケット損失率' },
            { command: 'ping -c 4 192.168.1.1', purpose: 'ゲートウェイ疎通確認', output: '4回のpingテスト結果' },
            { command: 'ping -f target', purpose: 'フラッド ping（負荷テスト）', output: '高頻度での応答測定' }
          ]
        },
        {
          name: 'traceroute経路追跡',
          icon: '🛤️',
          color: 'bg-amber-100',
          analysis: [
            { hop: 1, ip: '192.168.1.1', rtt: '1.2ms', description: 'ローカルルーター' },
            { hop: 2, ip: '10.0.0.1', rtt: '15.8ms', description: 'ISPゲートウェイ' },
            { hop: 3, ip: '203.141.128.1', rtt: '28.4ms', description: 'ISP基幹ネットワーク' },
            { hop: 4, ip: '8.8.8.8', rtt: '45.2ms', description: '目的地サーバー' }
          ]
        }
      ]
    },
    'cybersecurity-threats': {
      title: 'サイバーセキュリティ脅威分析',
      category: 'security',
      level: 'advanced',
      description: '最新のサイバー攻撃手法と対策技術',
      keywords: ['マルウェア', 'フィッシング', 'DDoS', 'ゼロデイ'],
      estimatedTime: '50分',
      difficulty: 5,
      threatCategories: [
        {
          name: 'マルウェア分類',
          icon: '🦠',
          color: 'bg-red-100',
          types: [
            { name: 'ウイルス', behavior: '他のファイルに感染', spread: 'ファイル経由', damage: 'データ破壊' },
            { name: 'ワーム', behavior: '自己複製して拡散', spread: 'ネットワーク経由', damage: 'システム負荷' },
            { name: 'トロイの木馬', behavior: '正常なソフトに偽装', spread: 'ダウンロード経由', damage: '情報窃取' },
            { name: 'ランサムウェア', behavior: 'データを暗号化', spread: 'メール・Web', damage: '身代金要求' }
          ]
        },
        {
          name: '攻撃手法と対策',
          icon: '🛡️',
          color: 'bg-orange-100',
          attacks: [
            { attack: 'SQLインジェクション', method: '不正SQL文の挿入', countermeasure: 'パラメータ化クエリ' },
            { attack: 'XSS攻撃', method: 'スクリプト埋め込み', countermeasure: '入力値サニタイズ' },
            { attack: 'CSRF攻撃', method: '偽造リクエスト送信', countermeasure: 'CSRFトークン' },
            { attack: 'DDoS攻撃', method: '大量リクエスト送信', countermeasure: 'CDN・レート制限' }
          ]
        }
      ]
    },
    'cloud-infrastructure': {
      title: 'クラウドインフラ基盤',
      category: 'infrastructure',
      level: 'intermediate',
      description: 'AWS、Azure、GCPのサービス比較と設計パターン',
      keywords: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes'],
      estimatedTime: '30分',
      difficulty: 3,
      cloudServices: [
        {
          name: 'コンピューティングサービス',
          icon: '💻',
          color: 'bg-sky-100',
          providers: [
            { provider: 'AWS', service: 'EC2', description: '仮想サーバーインスタンス', pricing: '時間課金' },
            { provider: 'Azure', service: 'Virtual Machines', description: 'スケーラブルVM', pricing: '使用量課金' },
            { provider: 'GCP', service: 'Compute Engine', description: '高性能VM', pricing: '秒単位課金' }
          ]
        },
        {
          name: 'ストレージサービス',
          icon: '💾',
          color: 'bg-violet-100',
          providers: [
            { provider: 'AWS', service: 'S3', description: 'オブジェクトストレージ', durability: '99.999999999%' },
            { provider: 'Azure', service: 'Blob Storage', description: 'スケーラブルストレージ', durability: '99.999999999%' },
            { provider: 'GCP', service: 'Cloud Storage', description: '統合オブジェクトストレージ', durability: '99.999999999%' }
          ]
        }
      ]
    },
    'uml-diagrams': {
      title: 'UML図設計マスター',
      category: 'protocols',
      level: 'intermediate',
      description: 'システム設計に必須のUML図を体系的に理解',
      keywords: ['UML', 'クラス図', 'アクティビティ図', '状態遷移図', 'ユースケース図'],
      estimatedTime: '45分',
      difficulty: 4,
      diagramCategories: [
        {
          name: '構造図 (Structure Diagrams)',
          icon: '🏗️',
          color: 'bg-blue-100',
          description: 'システムの静的構造を表現',
          diagrams: [
            {
              name: 'クラス図',
              symbol: '📋',
              purpose: 'クラス間の関係と構造を表現',
              elements: ['クラス', '属性', 'メソッド', '関連', '継承', '実装'],
              useCase: 'オブジェクト指向設計の基本設計',
              example: '顧客クラス ← 注文クラス → 商品クラス',
              notation: {
                class: '矩形（クラス名、属性、メソッド）',
                association: '実線（関連）',
                inheritance: '三角矢印（継承）',
                composition: '黒菱形（コンポジション）',
                aggregation: '白菱形（集約）'
              }
            },
            {
              name: 'オブジェクト図',
              symbol: '🎯',
              purpose: '特定時点でのオブジェクトの状態を表現',
              elements: ['オブジェクト', 'インスタンス', '属性値', 'リンク'],
              useCase: 'クラス図の具体例やテストケース設計',
              example: '田中太郎:顧客 → 注文001:注文',
              notation: {
                object: '矩形（オブジェクト名:クラス名）',
                link: '実線（リンク）',
                value: '属性名 = 値'
              }
            }
          ]
        },
        {
          name: '振る舞い図 (Behavior Diagrams)',
          icon: '⚡',
          color: 'bg-green-100',
          description: 'システムの動的振る舞いを表現',
          diagrams: [
            {
              name: 'ユースケース図',
              symbol: '👤',
              purpose: 'システムの機能とアクターの関係を表現',
              elements: ['アクター', 'ユースケース', 'システム境界', '関連'],
              useCase: '要件定義とシステム機能の整理',
              example: '顧客 → 商品注文、管理者 → 在庫管理',
              notation: {
                actor: '棒人間（アクター）',
                usecase: '楕円（ユースケース）',
                system: '矩形（システム境界）',
                association: '実線（関連）'
              }
            },
            {
              name: 'アクティビティ図',
              symbol: '🔄',
              purpose: '処理の流れとアクティビティを表現',
              elements: ['アクティビティ', '判定', '開始/終了', '分岐/合流', 'スイムレーン'],
              useCase: 'ビジネスプロセスやアルゴリズムの設計',
              example: '注文受付 → 在庫確認 → 発送処理',
              notation: {
                activity: '角丸矩形（アクティビティ）',
                decision: '菱形（判定）',
                start: '黒丸（開始）',
                end: '二重丸（終了）',
                fork: '太線（分岐/合流）'
              }
            },
            {
              name: '状態遷移図',
              symbol: '🔀',
              purpose: 'オブジェクトの状態変化を表現',
              elements: ['状態', '遷移', 'イベント', 'ガード条件', 'アクション'],
              useCase: 'システムの状態管理と制御設計',
              example: '待機 → 処理中 → 完了 → 待機',
              notation: {
                state: '角丸矩形（状態）',
                transition: '矢印（遷移）',
                event: 'イベント名/アクション',
                guard: '[条件]',
                initial: '黒丸（初期状態）'
              }
            }
          ]
        },
        {
          name: '相互作用図 (Interaction Diagrams)',
          icon: '🤝',
          color: 'bg-purple-100',
          description: 'オブジェクト間の相互作用を表現',
          diagrams: [
            {
              name: 'シーケンス図',
              symbol: '📊',
              purpose: '時系列でのオブジェクト間メッセージ交換を表現',
              elements: ['ライフライン', 'メッセージ', 'アクティベーション', '複合フラグメント'],
              useCase: 'システム間連携や処理シーケンスの設計',
              example: '顧客 → システム → データベース',
              notation: {
                lifeline: '縦線（ライフライン）',
                message: '矢印（メッセージ）',
                activation: '矩形（アクティベーション）',
                return: '点線矢印（戻り値）'
              }
            },
            {
              name: 'コミュニケーション図',
              symbol: '💬',
              purpose: 'オブジェクト間の構造的関係とメッセージを表現',
              elements: ['オブジェクト', 'リンク', 'メッセージ', 'シーケンス番号'],
              useCase: 'オブジェクト間の協調関係の設計',
              example: '1: 注文() → 2: 在庫確認() → 3: 発送()',
              notation: {
                object: '矩形（オブジェクト）',
                link: '実線（リンク）',
                message: 'シーケンス番号: メッセージ名',
                sequence: '番号付きメッセージ'
              }
            }
          ]
        }
      ],
      diagramComparison: [
        {
          aspect: '主な用途',
          class: 'システムの静的構造設計',
          usecase: 'システム機能の要件整理',
          activity: 'プロセスフローの設計',
          state: 'オブジェクトの状態管理'
        },
        {
          aspect: '設計段階',
          class: '詳細設計',
          usecase: '要件定義',
          activity: '基本設計・詳細設計',
          state: '詳細設計'
        },
        {
          aspect: '表現対象',
          class: 'クラス間の関係',
          usecase: 'システムと利用者の関係',
          activity: '処理の流れ',
          state: '状態の変化'
        },
        {
          aspect: '時間軸',
          class: '静的（時間に依存しない）',
          usecase: '静的（機能の整理）',
          activity: '動的（処理の順序）',
          state: '動的（状態の変化）'
        }
      ]
    }
  };

  // 検索とフィルタリング機能
  const filteredConcepts = useMemo(() => {
    return Object.entries(conceptLibrary).filter(([key, concept]) => {
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
      <div className="max-w-6xl mx-auto space-y-8">
        {/* プロ級のヘッダーセクション */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 rounded-2xl text-white p-8 shadow-2xl">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              🎓 プロフェッショナル学習プラットフォーム
            </h1>
            <p className="text-xl opacity-90 mb-6">
              応用情報技術者試験の重要概念を視覚的・体系的に習得
            </p>
            <div className="flex justify-center items-center space-x-6 text-sm opacity-80">
              <div className="flex items-center space-x-2">
                <span>📖</span>
                <span>{Object.keys(conceptLibrary).length}の学習コンセプト</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>⚡</span>
                <span>インタラクティブ学習</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🎯</span>
                <span>試験対策特化</span>
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
                placeholder="キーワードで検索（例：HTTP、セキュリティ、IP）"
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                  {/* Web技術の詳細表示 */}
                  {key === 'web-technologies' && 'concepts' in concept && (
                    <div className="space-y-6">
                      {concept.concepts.map((webConcept: any, index: number) => (
                        <div key={index} className={`${webConcept.color} rounded-lg p-4`}>
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">{webConcept.icon}</span>
                            <h4 className="text-lg font-bold text-gray-800">{webConcept.name}</h4>
                          </div>
                          <p className="text-gray-700 mb-4">{webConcept.description}</p>
                          
                          {webConcept.name === 'URL構造解析' && webConcept.urlExample && (
                            <div className="space-y-3">
                              <div className="bg-white rounded p-3">
                                <div className="text-sm font-mono break-all text-gray-800 mb-2">
                                  {webConcept.urlExample}
                                </div>
                              </div>
                              <div className="grid gap-2">
                                {webConcept.components?.map((component: any, i: number) => (
                                  <div key={i} className="bg-white/70 rounded p-3">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="font-semibold text-gray-800">{component.part}</span>
                                      <span className="font-mono text-blue-600 text-sm">{component.value}</span>
                                    </div>
                                    <div className="text-sm text-gray-600 mb-2">{component.description}</div>
                                    <div className="space-y-1">
                                      {component.examples.map((example: any, j: number) => (
                                        <div key={j} className="text-xs text-gray-600">• {example}</div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {webConcept.name === 'HTTPメソッド' && webConcept.methods && (
                            <div className="grid md:grid-cols-2 gap-3">
                              {webConcept.methods.map((method: any, i: number) => (
                                <div key={i} className="bg-white/70 rounded p-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-gray-800">{method.name}</span>
                                    <span className="text-sm text-gray-600">{method.purpose}</span>
                                  </div>
                                  <div className="text-sm text-gray-700 mb-2">{method.description}</div>
                                  <div className="flex flex-wrap gap-1">
                                    {method.safe && <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Safe</span>}
                                    {method.idempotent && <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">冪等</span>}
                                    {method.cacheable && <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">キャッシュ可</span>}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ネットワークプロトコル詳細表示 */}
                  {key === 'network-protocols' && 'protocolCategories' in concept && (
                    <div className="space-y-4">
                      {concept.protocolCategories.map((category: any, index: number) => (
                        <div key={index} className={`${category.color} rounded-lg p-4`}>
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">{category.icon}</span>
                            <h4 className="text-lg font-bold text-gray-800">{category.name}</h4>
                          </div>
                          <div className="space-y-2">
                            {category.protocols.map((protocol: any, i: number) => (
                              <div key={i} className="bg-white/70 rounded p-3 grid grid-cols-5 gap-2 items-center">
                                <div className="font-semibold text-gray-800">{protocol.name}</div>
                                <div className="text-sm text-blue-600">{protocol.port}</div>
                                <div className="text-sm text-gray-600">{protocol.security}</div>
                                <div className="text-sm text-gray-600">{protocol.usage}</div>
                                <div className="text-sm text-green-600">{protocol.reliability}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* IPアドレッシング詳細表示 */}
                  {key === 'ip-addressing' && 'addressingConcepts' in concept && (
                    <div className="space-y-4">
                      {concept.addressingConcepts.map((addressConcept: any, index: number) => (
                        <div key={index} className={`${addressConcept.color} rounded-lg p-4`}>
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">{addressConcept.icon}</span>
                            <h4 className="text-lg font-bold text-gray-800">{addressConcept.name}</h4>
                          </div>
                          
                          {addressConcept.classes && (
                            <div className="space-y-2">
                              {addressConcept.classes.map((ipClass: any, i: number) => (
                                <div key={i} className="bg-white/70 rounded p-3">
                                  <div className="grid grid-cols-6 gap-2 items-center text-sm">
                                    <div className="font-semibold">クラス{ipClass.class}</div>
                                    <div className="text-xs">{ipClass.range}</div>
                                    <div className="text-center">{ipClass.mask}</div>
                                    <div className="text-center">{ipClass.networks}</div>
                                    <div className="text-center">{ipClass.hosts}</div>
                                    <div className="text-xs">{ipClass.usage}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {addressConcept.calculator && addressConcept.examples && (
                            <div className="space-y-2">
                              <h5 className="font-semibold text-gray-800">計算例</h5>
                              {addressConcept.examples.map((example: any, i: number) => (
                                <div key={i} className="bg-white/70 rounded p-3">
                                  <div className="grid grid-cols-5 gap-2 items-center text-sm">
                                    <div className="font-mono">{example.network}</div>
                                    <div>{example.subnets}分割</div>
                                    <div>{example.newMask}</div>
                                    <div>{example.size}アドレス</div>
                                    <div className="text-green-600">{example.usable}利用可</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* セキュリティ詳細表示 */}
                  {key === 'security-fundamentals' && 'securityTriad' in concept && (
                    <div className="grid gap-4">
                      {concept.securityTriad.map((element: any, index: number) => (
                        <div key={index} className={`${element.color} rounded-lg p-4`}>
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">{element.icon}</span>
                            <h4 className="text-lg font-bold text-gray-800">{element.name}</h4>
                          </div>
                          <p className="text-sm text-gray-700 mb-3">{element.definition}</p>
                          
                          <div className="grid md:grid-cols-2 gap-3">
                            <div>
                              <h5 className="text-sm font-semibold text-gray-800 mb-2">🚨 脅威</h5>
                              <div className="flex flex-wrap gap-1">
                                {element.threats.map((threat: any, i: number) => (
                                  <span key={i} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                                    {threat}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h5 className="text-sm font-semibold text-gray-800 mb-2">🛡️ 対策</h5>
                              <div className="flex flex-wrap gap-1">
                                {element.controls.map((control: any, i: number) => (
                                  <span key={i} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                    {control}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <h5 className="text-sm font-semibold text-gray-800 mb-2">💡 実装例</h5>
                            <div className="flex flex-wrap gap-1">
                              {element.measures.map((measure: any, i: number) => (
                                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                  {measure}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* データベース設計詳細表示 */}
                  {key === 'database-design' && 'designConcepts' in concept && (
                    <div className="space-y-6">
                      {concept.designConcepts.map((designConcept: any, index: number) => (
                        <div key={index} className={`${designConcept.color} rounded-lg p-4`}>
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">{designConcept.icon}</span>
                            <h4 className="text-lg font-bold text-gray-800">{designConcept.name}</h4>
                          </div>
                          
                          {designConcept.entities && (
                            <div className="grid md:grid-cols-3 gap-4">
                              {designConcept.entities.map((entity: any, i: number) => (
                                <div key={i} className="bg-white/70 rounded p-3 text-center">
                                  <div className="text-3xl mb-2">{entity.symbol}</div>
                                  <div className="font-semibold text-gray-800 mb-2">{entity.name}</div>
                                  <div className="text-sm text-gray-600 mb-2">{entity.description}</div>
                                  <div className="space-y-1">
                                    {entity.examples.map((example: string, j: number) => (
                                      <div key={j} className="text-xs bg-blue-100 text-blue-800 rounded px-2 py-1">
                                        {example}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {designConcept.normalForms && (
                            <div className="space-y-3">
                              {designConcept.normalForms.map((form: any, i: number) => (
                                <div key={i} className="bg-white/70 rounded p-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-gray-800">{form.level}</span>
                                    <span className="text-sm text-green-600">正規化ルール</span>
                                  </div>
                                  <div className="text-sm text-gray-700 mb-2">{form.rule}</div>
                                  <div className="text-xs text-gray-600 italic">例: {form.example}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* アルゴリズム解析詳細表示 */}
                  {key === 'algorithm-analysis' && 'complexityAnalysis' in concept && (
                    <div className="space-y-6">
                      {concept.complexityAnalysis.map((analysis: any, index: number) => (
                        <div key={index} className={`${analysis.color} rounded-lg p-4`}>
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">{analysis.icon}</span>
                            <h4 className="text-lg font-bold text-gray-800">{analysis.name}</h4>
                          </div>
                          
                          {analysis.algorithms && (
                            <div className="overflow-x-auto">
                              <table className="w-full bg-white/70 rounded">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left p-2">アルゴリズム</th>
                                    <th className="text-left p-2">時間計算量</th>
                                    <th className="text-left p-2">空間計算量</th>
                                    <th className="text-center p-2">安定</th>
                                    <th className="text-center p-2">インプレース</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {analysis.algorithms.map((algo: any, i: number) => (
                                    <tr key={i} className="border-b">
                                      <td className="p-2 font-semibold">{algo.name}</td>
                                      <td className="p-2 font-mono text-blue-600">{algo.timeComplexity}</td>
                                      <td className="p-2 font-mono text-green-600">{algo.spaceComplexity}</td>
                                      <td className="p-2 text-center">
                                        {algo.stable ? '✅' : '❌'}
                                      </td>
                                      <td className="p-2 text-center">
                                        {algo.inplace ? '✅' : '❌'}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {analysis.complexities && (
                            <div className="grid md:grid-cols-2 gap-3">
                              {analysis.complexities.map((complexity: any, i: number) => (
                                <div key={i} className="bg-white/70 rounded p-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-mono font-bold text-purple-600">{complexity.notation}</span>
                                    <span className={`text-xs px-2 py-1 rounded ${
                                      complexity.performance === '最高' ? 'bg-green-100 text-green-800' :
                                      complexity.performance === '良好' ? 'bg-blue-100 text-blue-800' :
                                      complexity.performance === '普通' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-red-100 text-red-800'
                                    }`}>
                                      {complexity.performance}
                                    </span>
                                  </div>
                                  <div className="text-sm font-semibold text-gray-800 mb-1">{complexity.name}</div>
                                  <div className="text-xs text-gray-600">{complexity.example}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ネットワーク障害解析詳細表示 */}
                  {key === 'network-troubleshooting' && 'troubleshootingTools' in concept && (
                    <div className="space-y-6">
                      {concept.troubleshootingTools.map((tool: any, index: number) => (
                        <div key={index} className={`${tool.color} rounded-lg p-4`}>
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">{tool.icon}</span>
                            <h4 className="text-lg font-bold text-gray-800">{tool.name}</h4>
                          </div>
                          
                          {tool.commands && (
                            <div className="space-y-3">
                              {tool.commands.map((cmd: any, i: number) => (
                                <div key={i} className="bg-white/70 rounded p-3">
                                  <div className="font-mono text-sm bg-gray-800 text-green-400 p-2 rounded mb-2">
                                    $ {cmd.command}
                                  </div>
                                  <div className="text-sm text-gray-700 mb-1">
                                    <strong>目的:</strong> {cmd.purpose}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    <strong>結果:</strong> {cmd.output}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {tool.analysis && (
                            <div className="space-y-2">
                              <h5 className="font-semibold text-gray-800 mb-2">経路解析結果</h5>
                              {tool.analysis.map((hop: any, i: number) => (
                                <div key={i} className="bg-white/70 rounded p-3 flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                      {hop.hop}
                                    </div>
                                    <div>
                                      <div className="font-mono text-sm text-gray-800">{hop.ip}</div>
                                      <div className="text-xs text-gray-600">{hop.description}</div>
                                    </div>
                                  </div>
                                  <div className="text-sm font-semibold text-green-600">{hop.rtt}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* サイバーセキュリティ脅威分析詳細表示 */}
                  {key === 'cybersecurity-threats' && 'threatCategories' in concept && (
                    <div className="space-y-6">
                      {concept.threatCategories.map((category: any, index: number) => (
                        <div key={index} className={`${category.color} rounded-lg p-4`}>
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">{category.icon}</span>
                            <h4 className="text-lg font-bold text-gray-800">{category.name}</h4>
                          </div>
                          
                          {category.types && (
                            <div className="grid md:grid-cols-2 gap-3">
                              {category.types.map((type: any, i: number) => (
                                <div key={i} className="bg-white/70 rounded p-3">
                                  <div className="font-bold text-gray-800 mb-2">{type.name}</div>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="font-semibold text-red-600">動作:</span> {type.behavior}
                                    </div>
                                    <div>
                                      <span className="font-semibold text-orange-600">拡散:</span> {type.spread}
                                    </div>
                                    <div>
                                      <span className="font-semibold text-purple-600">被害:</span> {type.damage}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {category.attacks && (
                            <div className="space-y-3">
                              {category.attacks.map((attack: any, i: number) => (
                                <div key={i} className="bg-white/70 rounded p-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="font-bold text-gray-800">{attack.attack}</div>
                                    <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                      対策あり
                                    </div>
                                  </div>
                                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                                    <div>
                                      <span className="font-semibold text-red-600">手法:</span> {attack.method}
                                    </div>
                                    <div>
                                      <span className="font-semibold text-green-600">対策:</span> {attack.countermeasure}
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

                  {/* クラウドインフラ詳細表示 */}
                  {key === 'cloud-infrastructure' && 'cloudServices' in concept && (
                    <div className="space-y-6">
                      {concept.cloudServices.map((service: any, index: number) => (
                        <div key={index} className={`${service.color} rounded-lg p-4`}>
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">{service.icon}</span>
                            <h4 className="text-lg font-bold text-gray-800">{service.name}</h4>
                          </div>
                          
                          <div className="space-y-3">
                            {service.providers.map((provider: any, i: number) => (
                              <div key={i} className="bg-white/70 rounded p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-3">
                                    <div className={`px-3 py-1 rounded text-sm font-bold ${
                                      provider.provider === 'AWS' ? 'bg-orange-100 text-orange-800' :
                                      provider.provider === 'Azure' ? 'bg-blue-100 text-blue-800' :
                                      'bg-red-100 text-red-800'
                                    }`}>
                                      {provider.provider}
                                    </div>
                                    <div className="font-semibold text-gray-800">{provider.service}</div>
                                  </div>
                                  {provider.pricing && (
                                    <div className="text-xs text-gray-600">{provider.pricing}</div>
                                  )}
                                  {provider.durability && (
                                    <div className="text-xs text-green-600">{provider.durability}</div>
                                  )}
                                </div>
                                <div className="text-sm text-gray-700">{provider.description}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* UML図詳細表示 */}
                  {key === 'uml-diagrams' && 'diagramCategories' in concept && (
                    <div className="space-y-8">
                      {/* UML図カテゴリ別表示 */}
                      {concept.diagramCategories.map((category: any, index: number) => (
                        <div key={index} className={`${category.color} rounded-lg p-5`}>
                          <div className="flex items-center mb-4">
                            <span className="text-3xl mr-3">{category.icon}</span>
                            <div>
                              <h4 className="text-xl font-bold text-gray-800">{category.name}</h4>
                              <p className="text-sm text-gray-600">{category.description}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-6">
                            {category.diagrams.map((diagram: any, i: number) => (
                              <div key={i} className="bg-white/80 rounded-lg p-4">
                                <div className="flex items-center mb-3">
                                  <span className="text-2xl mr-3">{diagram.symbol}</span>
                                  <h5 className="text-lg font-bold text-gray-800">{diagram.name}</h5>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                  <div>
                                    <h6 className="font-semibold text-gray-800 mb-2">📝 目的</h6>
                                    <p className="text-sm text-gray-700">{diagram.purpose}</p>
                                  </div>
                                  <div>
                                    <h6 className="font-semibold text-gray-800 mb-2">🎯 活用場面</h6>
                                    <p className="text-sm text-gray-700">{diagram.useCase}</p>
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <h6 className="font-semibold text-gray-800 mb-2">🧩 構成要素</h6>
                                  <div className="flex flex-wrap gap-2">
                                    {diagram.elements.map((element: string, j: number) => (
                                      <span key={j} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                        {element}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <h6 className="font-semibold text-gray-800 mb-2">💡 例</h6>
                                  <div className="bg-gray-100 rounded p-3 font-mono text-sm text-gray-800">
                                    {diagram.example}
                                  </div>
                                </div>

                                <div>
                                  <h6 className="font-semibold text-gray-800 mb-2">🎨 記法</h6>
                                  <div className="grid gap-2">
                                    {Object.entries(diagram.notation).map(([key, value]: [string, any], j: number) => (
                                      <div key={j} className="flex items-center justify-between bg-gray-50 rounded p-2">
                                        <span className="text-sm font-medium text-gray-700 capitalize">{key}</span>
                                        <span className="text-xs text-gray-600">{value}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                      {/* UML図比較表 */}
                      {'diagramComparison' in concept && (
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-5">
                          <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            <span className="mr-3">📊</span>
                            主要UML図の比較表
                          </h4>
                          
                          <div className="overflow-x-auto">
                            <table className="w-full bg-white rounded-lg shadow">
                              <thead>
                                <tr className="bg-gray-50">
                                  <th className="text-left p-3 font-semibold text-gray-800">比較項目</th>
                                  <th className="text-center p-3 font-semibold text-blue-800">クラス図</th>
                                  <th className="text-center p-3 font-semibold text-green-800">ユースケース図</th>
                                  <th className="text-center p-3 font-semibold text-purple-800">アクティビティ図</th>
                                  <th className="text-center p-3 font-semibold text-red-800">状態遷移図</th>
                                </tr>
                              </thead>
                              <tbody>
                                {concept.diagramComparison.map((comparison: any, i: number) => (
                                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="p-3 font-medium text-gray-800">{comparison.aspect}</td>
                                    <td className="p-3 text-sm text-center text-blue-700">{comparison.class}</td>
                                    <td className="p-3 text-sm text-center text-green-700">{comparison.usecase}</td>
                                    <td className="p-3 text-sm text-center text-purple-700">{comparison.activity}</td>
                                    <td className="p-3 text-sm text-center text-red-700">{comparison.state}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          {/* 設計プロセスでの使い分け */}
                          <div className="mt-6 grid md:grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg p-4">
                              <h5 className="font-bold text-gray-800 mb-3 flex items-center">
                                <span className="mr-2">🔄</span>
                                設計プロセスでの順序
                              </h5>
                              <ol className="space-y-2 text-sm">
                                <li className="flex items-center">
                                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs mr-3">1</span>
                                  <span>ユースケース図（要件整理）</span>
                                </li>
                                <li className="flex items-center">
                                  <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs mr-3">2</span>
                                  <span>アクティビティ図（業務フロー）</span>
                                </li>
                                <li className="flex items-center">
                                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3">3</span>
                                  <span>クラス図（システム構造）</span>
                                </li>
                                <li className="flex items-center">
                                  <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs mr-3">4</span>
                                  <span>状態遷移図（オブジェクト制御）</span>
                                </li>
                              </ol>
                            </div>
                            
                            <div className="bg-white rounded-lg p-4">
                              <h5 className="font-bold text-gray-800 mb-3 flex items-center">
                                <span className="mr-2">🎯</span>
                                選択の指針
                              </h5>
                              <div className="space-y-3 text-sm">
                                <div className="p-2 bg-green-50 rounded">
                                  <strong className="text-green-800">機能を整理したい</strong>
                                  <br />→ ユースケース図
                                </div>
                                <div className="p-2 bg-purple-50 rounded">
                                  <strong className="text-purple-800">処理の流れを表現</strong>
                                  <br />→ アクティビティ図
                                </div>
                                <div className="p-2 bg-blue-50 rounded">
                                  <strong className="text-blue-800">システム構造を設計</strong>
                                  <br />→ クラス図
                                </div>
                                <div className="p-2 bg-red-50 rounded">
                                  <strong className="text-red-800">状態管理が重要</strong>
                                  <br />→ 状態遷移図
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
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