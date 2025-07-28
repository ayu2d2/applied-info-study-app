'use client';

import React from 'react';
import { PageTemplate } from '@/components/templates/PageTemplate';
import type { LearningConcept } from '@/types';

// ネットワーク学習コンテンツのデータ
const networkData: LearningConcept[] = [
  {
    id: 'osi-reference-model',
    title: 'OSI参照モデル',
    description: '7層アーキテクチャとプロトコルマッピングの完全理解',
    keywords: ['OSI', '7層', 'TCP/IP', 'プロトコル', 'アーキテクチャ'],
    difficulty: 'basic',
    views: 1850,
  },
  {
    id: 'tcp-ip-fundamentals',
    title: 'TCP/IP基礎',
    description: 'インターネットプロトコルスイートの核となる技術',
    keywords: ['TCP', 'IP', 'プロトコル', 'パケット', 'ルーティング'],
    difficulty: 'intermediate',
    views: 1650,
  },
  {
    id: 'network-protocols',
    title: 'ネットワークプロトコル詳解',
    description: 'HTTP、HTTPS、FTP、DNSなど主要プロトコルの動作原理',
    keywords: ['HTTP', 'HTTPS', 'FTP', 'DNS', 'SMTP'],
    difficulty: 'intermediate',
    views: 1420,
  },
  {
    id: 'ip-addressing-subnetting',
    title: 'IPアドレッシングとサブネット',
    description: 'IPv4/IPv6アドレス体系とサブネット分割の実践',
    keywords: ['IPv4', 'IPv6', 'サブネット', 'CIDR', 'アドレス'],
    difficulty: 'intermediate',
    views: 1320,
  },
  {
    id: 'routing-switching',
    title: 'ルーティングとスイッチング',
    description: 'データパケットの転送と経路選択の仕組み',
    keywords: ['ルーティング', 'スイッチング', 'ルーター', 'スイッチ'],
    difficulty: 'advanced',
    views: 980,
  },
  {
    id: 'network-security',
    title: 'ネットワークセキュリティ',
    description: 'ファイアウォール、VPN、暗号化による通信保護',
    keywords: ['セキュリティ', 'ファイアウォール', 'VPN', '暗号化'],
    difficulty: 'advanced',
    views: 1150,
  },
  {
    id: 'network-troubleshooting',
    title: 'ネットワークトラブルシューティング',
    description: '障害の診断と解決手法、監視ツールの活用',
    keywords: ['トラブルシューティング', '障害', '診断', '監視'],
    difficulty: 'advanced',
    views: 720,
  },
  {
    id: 'wireless-networking',
    title: '無線ネットワーク',
    description: 'Wi-Fi、Bluetooth、セルラー通信の技術と設定',
    keywords: ['無線', 'Wi-Fi', 'Bluetooth', 'セルラー'],
    difficulty: 'intermediate',
    views: 890,
  },
];

export default function NetworkPage() {
  const handleConceptClick = (concept: LearningConcept) => {
    // ネットワーク概念の詳細表示ロジック
    console.log('Network concept clicked:', concept);
    // TODO: 詳細モーダルや詳細ページへの遷移
  };

  return (
    <PageTemplate
      title="ネットワーク技術"
      subtitle="TCP/IPからセキュリティまで、現代のネットワークインフラを支える技術を体系的に学習し、実践的なスキルを身につけましょう。"
      icon="🌐"
      data={networkData}
      gradientColors="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800"
      onConceptClick={handleConceptClick}
      emptyMessage="該当するネットワーク学習コンテンツが見つかりませんでした。"
    />
  );
}
