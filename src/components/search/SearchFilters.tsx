import React from 'react';
import type { Category } from '@/types';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ 
  searchQuery, 
  onSearchChange, 
  placeholder = "キーワードで検索（例：HTTP、セキュリティ、IP）" 
}: SearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-400 text-xl">🔍</span>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full pl-12 pr-4 py-3 text-lg rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        aria-label="学習コンテンツを検索"
      />
    </div>
  );
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
        📂 カテゴリ
      </h3>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              selectedCategory === category.id
                ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            aria-pressed={selectedCategory === category.id}
          >
            <span className="mr-2" aria-hidden="true">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

interface LevelFilterProps {
  levels: Array<{ id: string; name: string; color: string }>;
  selectedLevel: string;
  onLevelChange: (levelId: string) => void;
}

export function LevelFilter({ 
  levels, 
  selectedLevel, 
  onLevelChange 
}: LevelFilterProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
        📊 学習レベル
      </h3>
      <div className="flex flex-wrap gap-3">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => onLevelChange(level.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              selectedLevel === level.id
                ? `${level.color} border-2 border-current shadow-md`
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            aria-pressed={selectedLevel === level.id}
          >
            {level.name}
          </button>
        ))}
      </div>
    </div>
  );
}
