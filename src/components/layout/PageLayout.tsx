import React from 'react';
import type { Category, LearningLevel } from '@/types';
import { SearchBar, CategoryFilter, LevelFilter } from '@/components/search/SearchFilters';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
}

export function PageHeader({ title, subtitle, icon }: PageHeaderProps) {
  return (
    <div className="text-center mb-12">
      {icon && (
        <div className="text-6xl mb-4" aria-hidden="true">
          {icon}
        </div>
      )}
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

interface FiltersContainerProps {
  categories: Category[];
  levels: LearningLevel[];
  searchQuery: string;
  selectedCategory: string;
  selectedLevel: string;
  onSearchChange: (query: string) => void;
  onCategoryChange: (categoryId: string) => void;
  onLevelChange: (levelId: string) => void;
  onReset: () => void;
  showReset?: boolean;
}

export function FiltersContainer({
  categories,
  levels,
  searchQuery,
  selectedCategory,
  selectedLevel,
  onSearchChange,
  onCategoryChange,
  onLevelChange,
  onReset,
  showReset = true,
}: FiltersContainerProps) {
  return (
    <div className="mb-8 space-y-6">
      <SearchBar 
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
        
        <LevelFilter
          levels={levels}
          selectedLevel={selectedLevel}
          onLevelChange={onLevelChange}
        />
        
        {showReset && (searchQuery || selectedCategory || selectedLevel) && (
          <div className="flex justify-center">
            <button
              onClick={onReset}
              className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              🔄 フィルターをリセット
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface StatsDisplayProps {
  totalItems: number;
  filteredItems: number;
  searchQuery: string;
  selectedCategory: string;
  selectedLevel: string;
}

export function StatsDisplay({
  totalItems,
  filteredItems,
  searchQuery,
  selectedCategory,
  selectedLevel,
}: StatsDisplayProps) {
  const hasFilters = searchQuery || selectedCategory || selectedLevel;
  
  return (
    <div className="mb-6 flex justify-between items-center">
      <div className="text-gray-600 dark:text-gray-400">
        {hasFilters ? (
          <span>
            {filteredItems} / {totalItems} 件のコンテンツを表示中
          </span>
        ) : (
          <span>
            全 {totalItems} 件のコンテンツ
          </span>
        )}
      </div>
      
      {hasFilters && (
        <div className="text-sm text-gray-500 dark:text-gray-500">
          フィルター適用中
        </div>
      )}
    </div>
  );
}
