// 応用情報技術者試験でよく出る重要な知識をまとめたデータ

export const importantFormulas = [
  {
    category: 'ネットワーク',
    name: 'スループット計算',
    formula: 'スループット = データサイズ ÷ 転送時間',
    example: '1000MB ÷ 10秒 = 100MB/秒',
    note: 'ネットワークの実効転送速度を表す'
  },
  {
    category: 'ネットワーク',
    name: '伝送効率',
    formula: '伝送効率 = データ部 ÷ (データ部 + ヘッダ部)',
    example: '1000 ÷ (1000 + 20) = 98.0%',
    note: 'プロトコルのオーバーヘッドを考慮した効率'
  },
  {
    category: 'CPU',
    name: 'CPU使用率',
    formula: 'CPU使用率 = (実行時間 ÷ 総時間) × 100',
    example: '(80ms ÷ 100ms) × 100 = 80%',
    note: 'CPUがビジー状態の割合'
  },
  {
    category: 'メモリ',
    name: 'ページフォルト率',
    formula: 'ページフォルト率 = ページフォルト回数 ÷ メモリアクセス回数',
    example: '10 ÷ 1000 = 1%',
    note: '仮想メモリシステムの性能指標'
  },
  {
    category: 'ディスク',
    name: '平均アクセス時間',
    formula: '平均アクセス時間 = シーク時間 + 回転待ち時間 + データ転送時間',
    example: '5ms + 4.17ms + 1ms = 10.17ms',
    note: 'ハードディスクの性能指標'
  },
  {
    category: 'プロジェクト管理',
    name: 'CPI (コストパフォーマンス指標)',
    formula: 'CPI = EV (出来高) ÷ AC (実コスト)',
    example: '100万円 ÷ 120万円 = 0.83',
    note: '1.0以上で予算内、1.0未満で予算超過'
  },
  {
    category: 'プロジェクト管理',
    name: 'SPI (スケジュールパフォーマンス指標)',
    formula: 'SPI = EV (出来高) ÷ PV (計画価値)',
    example: '100万円 ÷ 110万円 = 0.91',
    note: '1.0以上で予定より早い、1.0未満で遅れ'
  },
  {
    category: 'データベース',
    name: 'レスポンス時間',
    formula: 'レスポンス時間 = キューイング時間 + サービス時間',
    example: '2秒 + 1秒 = 3秒',
    note: 'ユーザーが感じる応答時間'
  }
];

export const frequentTerms = [
  {
    category: 'ネットワーク',
    term: 'OSI参照モデル',
    description: 'ネットワーク通信を7層に分けたモデル',
    layers: [
      '7層: アプリケーション層 (HTTP, SMTP)',
      '6層: プレゼンテーション層 (SSL/TLS)',
      '5層: セッション層 (NetBIOS)',
      '4層: トランスポート層 (TCP, UDP)',
      '3層: ネットワーク層 (IP, ICMP)',
      '2層: データリンク層 (Ethernet)',
      '1層: 物理層 (電気信号)'
    ]
  },
  {
    category: 'セキュリティ',
    term: '暗号化の種類',
    description: 'データを保護するための暗号化技術',
    types: [
      '共通鍵暗号: 暗号化・復号化に同じ鍵 (AES, DES)',
      '公開鍵暗号: 暗号化・復号化に異なる鍵 (RSA)',
      'ハッシュ関数: 一方向の変換 (SHA-256, MD5)',
      'デジタル署名: 改ざん検出と認証 (RSA署名)'
    ]
  },
  {
    category: 'データベース',
    term: '正規化',
    description: 'データの冗長性を排除してデータベースを設計する手法',
    forms: [
      '第1正規形: 繰り返し項目を排除',
      '第2正規形: 部分関数従属を排除',
      '第3正規形: 推移関数従属を排除',
      'BCNF: より厳密な正規化'
    ]
  },
  {
    category: 'システム開発',
    term: 'テストの種類',
    description: 'ソフトウェアの品質を確保するためのテスト手法',
    types: [
      '単体テスト: 個別のモジュールをテスト',
      '結合テスト: モジュール間のインターフェースをテスト',
      'システムテスト: システム全体をテスト',
      '受入テスト: ユーザー要件を満たすかテスト'
    ]
  }
];

export const calculationProblems = [
  {
    id: 1,
    category: 'ネットワーク',
    problem: '100Mbpsの回線で1GBのファイルを転送する場合の理論的な転送時間は？',
    solution: '1GB = 8000Mbit, 転送時間 = 8000Mbit ÷ 100Mbps = 80秒',
    answer: '80秒',
    explanation: 'データサイズをビット単位に変換してから計算する'
  },
  {
    id: 2,
    category: 'CPU',
    problem: 'CPU時間が80ms、I/O待ち時間が20msの場合、CPU使用率は？',
    solution: 'CPU使用率 = 80ms ÷ (80ms + 20ms) × 100 = 80%',
    answer: '80%',
    explanation: '総時間に対するCPU実行時間の割合'
  },
  {
    id: 3,
    category: 'プロジェクト管理',
    problem: '出来高100万円、実コスト120万円の場合のCPIは？',
    solution: 'CPI = 100万円 ÷ 120万円 = 0.83',
    answer: '0.83',
    explanation: '1.0未満なので予算超過状態'
  }
];

export const examTips = [
  {
    category: '午前問題対策',
    tips: [
      '過去問を最低3年分は解く',
      '計算問題は公式を暗記する',
      'ITパスポートの知識も復習',
      '最新技術動向をチェック',
      '模擬試験で時間配分を練習'
    ]
  },
  {
    category: '午後問題対策',
    tips: [
      '設問を先に読んで出題意図を把握',
      'アルゴリズムのトレースを練習',
      'データベース設計の手順を覚える',
      'ネットワーク構成図の読み方を習得',
      'プログラム言語を1つは選択'
    ]
  },
  {
    category: '時間管理',
    tips: [
      '午前: 1問あたり1.5分以内',
      '午後: 大問1つあたり25分以内',
      '見直し時間を10分確保',
      '分からない問題は後回し',
      '部分点を狙える問題を優先'
    ]
  }
];

const examDataModule = {
  importantFormulas,
  frequentTerms,
  calculationProblems,
  examTips
};

export default examDataModule;
