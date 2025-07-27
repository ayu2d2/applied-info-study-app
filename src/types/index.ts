// 基本的な型定義
export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface LearningLevel {
  id: string;
  name: string;
  color: string;
}

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

// 基本的な学習概念の型
export interface LearningConcept {
  id: string;
  title: string;
  description: string;
  keywords?: string[];
  difficulty: 'basic' | 'intermediate' | 'advanced'; // 難易度レベル
  views?: number;
}

// 具体的なコンセプト型
export interface WebTechnologiesConcept extends LearningConcept {
  type: 'web-technologies';
  concepts: Array<{
    name: string;
    icon: string;
    color: string;
    description: string;
    interactive: boolean;
    urlExample?: string;
    components?: Array<{
      part: string;
      value: string;
      description: string;
      examples: string[];
    }>;
    methods?: Array<{
      name: string;
      purpose: string;
      safe: boolean;
      idempotent: boolean;
      cacheable: boolean;
      description: string;
    }>;
  }>;
}

export interface NetworkProtocolsConcept extends LearningConcept {
  protocolCategories: Array<{
    name: string;
    icon: string;
    color: string;
    protocols: Array<{
      name: string;
      port: string;
      security: string;
      usage: string;
      reliability: string;
    }>;
  }>;
}

export interface IPAddressingConcept extends LearningConcept {
  addressingConcepts: Array<{
    name: string;
    icon: string;
    color: string;
    classes?: Array<{
      class: string;
      range: string;
      mask: string;
      networks: string;
      hosts: string;
      usage: string;
    }>;
    calculator?: boolean;
    examples?: Array<{
      network: string;
      subnets: number;
      newMask: string;
      size: number;
      usable: number;
    }>;
  }>;
}

export interface SecurityConcept extends LearningConcept {
  securityTriad: Array<{
    name: string;
    icon: string;
    color: string;
    definition: string;
    threats: string[];
    controls: string[];
    measures: string[];
  }>;
}

export interface DatabaseConcept extends LearningConcept {
  designConcepts: Array<{
    name: string;
    icon: string;
    color: string;
    entities?: Array<{
      name: string;
      symbol: string;
      description: string;
      examples: string[];
    }>;
    normalForms?: Array<{
      level: string;
      rule: string;
      example: string;
    }>;
  }>;
}

export interface AlgorithmConcept extends LearningConcept {
  complexityAnalysis: Array<{
    name: string;
    icon: string;
    color: string;
    algorithms?: Array<{
      name: string;
      timeComplexity: string;
      spaceComplexity: string;
      stable: boolean;
      inplace: boolean;
    }>;
    complexities?: Array<{
      notation: string;
      name: string;
      example: string;
      performance: string;
    }>;
  }>;
}

export interface UMLConcept extends LearningConcept {
  diagramCategories: Array<{
    name: string;
    icon: string;
    color: string;
    description: string;
    diagrams: Array<{
      name: string;
      symbol: string;
      purpose: string;
      elements: string[];
      useCase: string;
      example: string;
      notation: Record<string, string>;
    }>;
  }>;
  diagramComparison: Array<{
    aspect: string;
    class: string;
    usecase: string;
    activity: string;
    state: string;
  }>;
}

// 検索・フィルタリング用の型
export interface SearchFilters {
  selectedCategory: string;
  selectedLevel: string;
  searchQuery: string;
  selectedConcept: string | null;
}

// ユニオン型で全てのコンセプトを統合
export type ConceptData = 
  | WebTechnologiesConcept
  | NetworkProtocolsConcept 
  | IPAddressingConcept
  | SecurityConcept
  | DatabaseConcept
  | AlgorithmConcept
  | UMLConcept;

export type ConceptLibrary = Record<string, ConceptData>;
