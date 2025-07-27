import React from 'react';
import type { LearningConcept } from '@/types';
import { getDifficultyStars, highlightSearchQuery } from '@/lib/utils';

interface ConceptCardProps {
  concept: LearningConcept;
  searchQuery?: string;
  onClick?: () => void;
}

export function ConceptCard({ concept, searchQuery = '', onClick }: ConceptCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-200 dark:border-gray-700"
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label={`${concept.title}について学習する`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 
            className="text-xl font-bold text-gray-800 dark:text-white"
            dangerouslySetInnerHTML={{ 
              __html: highlightSearchQuery(concept.title, searchQuery)
            }}
          />
          <div className="flex items-center text-yellow-500">
            {getDifficultyStars(concept.difficulty)}
          </div>
        </div>
        
        <p 
          className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed"
          dangerouslySetInnerHTML={{ 
            __html: highlightSearchQuery(concept.description, searchQuery)
          }}
        />
        
        <div className="flex flex-wrap gap-2 mb-4">
          {concept.keywords?.map((keyword, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
            >
              {keyword}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            concept.difficulty === 'basic'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : concept.difficulty === 'intermediate'
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {concept.difficulty === 'basic' ? '基礎' : 
             concept.difficulty === 'intermediate' ? '中級' : '上級'}
          </span>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            👁️ {concept.views || 0} views
          </div>
        </div>
      </div>
    </div>
  );
}

interface ConceptGridProps {
  concepts: LearningConcept[];
  searchQuery?: string;
  onConceptClick?: (concept: LearningConcept) => void;
  emptyMessage?: string;
}

export function ConceptGrid({ 
  concepts, 
  searchQuery = '', 
  onConceptClick,
  emptyMessage = "該当するコンテンツが見つかりませんでした。"
}: ConceptGridProps) {
  if (concepts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
          {emptyMessage}
        </h3>
        <p className="text-gray-500 dark:text-gray-500">
          検索条件を変更してお試しください。
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {concepts.map((concept) => (
        <ConceptCard
          key={concept.id}
          concept={concept}
          searchQuery={searchQuery}
          onClick={() => onConceptClick?.(concept)}
        />
      ))}
    </div>
  );
}
