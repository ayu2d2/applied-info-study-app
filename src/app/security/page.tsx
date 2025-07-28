'use client';

import React from 'react';
import { PageTemplate } from '@/components/templates/PageTemplate';
import type { LearningConcept } from '@/types';

// セキュリティ学習コンテンツのデータ
const securityData: LearningConcept[] = [
  {
    id: 'information-security-basics',
    title: '情報セキュリティ基礎',
    description: 'CIA三要素（機密性、完全性、可用性）とセキュリティの基本概念',
    keywords: ['CIA', '機密性', '完全性', '可用性', 'セキュリティ'],
    difficulty: 'basic',
    views: 1950,
  },
  {
    id: 'cryptography',
    title: '暗号技術',
    description: '共通鍵暗号、公開鍵暗号、ハッシュ関数の仕組みと応用',
    keywords: ['暗号', '共通鍵', '公開鍵', 'ハッシュ', 'SSL/TLS'],
    difficulty: 'intermediate',
    views: 1680,
  },
  {
    id: 'authentication-authorization',
    title: '認証と認可',
    description: 'パスワード、多要素認証、アクセス制御の技術と運用',
    keywords: ['認証', '認可', 'MFA', 'アクセス制御', 'ID管理'],
    difficulty: 'intermediate',
    views: 1420,
  },
  {
    id: 'network-security',
    title: 'ネットワークセキュリティ',
    description: 'ファイアウォール、IDS/IPS、VPNによる通信保護',
    keywords: ['ファイアウォール', 'IDS', 'IPS', 'VPN', 'DMZ'],
    difficulty: 'advanced',
    views: 1250,
  },
  {
    id: 'web-application-security',
    title: 'Webアプリケーションセキュリティ',
    description: 'OWASP Top 10、XSS、SQLインジェクション対策',
    keywords: ['OWASP', 'XSS', 'SQLインジェクション', 'CSRF', 'Webセキュリティ'],
    difficulty: 'advanced',
    views: 1150,
  },
  {
    id: 'malware-threats',
    title: 'マルウェアと脅威分析',
    description: 'ウイルス、ランサムウェア、APT攻撃の理解と対策',
    keywords: ['マルウェア', 'ランサムウェア', 'APT', '脅威分析'],
    difficulty: 'intermediate',
    views: 980,
  },
  {
    id: 'incident-response',
    title: 'インシデント対応',
    description: 'セキュリティ事故の検知、分析、対応、復旧プロセス',
    keywords: ['インシデント', '事故対応', 'フォレンジック', '復旧'],
    difficulty: 'advanced',
    views: 750,
  },
  {
    id: 'risk-management',
    title: 'リスク管理',
    description: 'セキュリティリスクの評価と管理手法',
    keywords: ['リスク管理', 'リスク評価', 'BCP', 'セキュリティポリシー'],
    difficulty: 'intermediate',
    views: 890,
  },
];

export default function SecurityPage() {
  const handleConceptClick = (concept: LearningConcept) => {
    // セキュリティ概念の詳細表示ロジック
    console.log('Security concept clicked:', concept);
    // TODO: 詳細モーダルや詳細ページへの遷移
  };

  return (
    <PageTemplate
      title="セキュリティ技術"
      subtitle="暗号技術から脅威対策まで、現代の情報セキュリティに必要な知識と技術を体系的に学習しましょう。"
      icon="🔒"
      data={securityData}
      gradientColors="bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800"
      onConceptClick={handleConceptClick}
      emptyMessage="該当するセキュリティ学習コンテンツが見つかりませんでした。"
    />
  );
}
