import React from 'react';
import AppLayout from '@/components/AppLayout';
import { PageHeader, FiltersContainer, StatsDisplay } from '@/components/layout/PageLayout';
import { ConceptGrid } from '@/components/concept/ConceptCard';
import { useSearchAndFilter } from '@/hooks/useSearchAndFilter-simple';
import { CATEGORIES, LEARNING_LEVELS } from '@/constants';
import type { LearningConcept } from '@/types';

interface PageTemplateProps {
  title: string;
  subtitle: string;
  icon: string;
  data: LearningConcept[];
  gradientColors: string;
  onConceptClick?: (concept: LearningConcept) => void;
  emptyMessage?: string;
}

export function PageTemplate({
  title,
  subtitle,
  icon,
  data,
  gradientColors,
  onConceptClick,
  emptyMessage,
}: PageTemplateProps) {
  const {
    searchQuery,
    selectedCategory,
    selectedLevel,
    setSearchQuery,
    setSelectedCategory,
    setSelectedLevel,
    resetFilters,
  } = useSearchAndFilter();

  // 共通フィルタリングロジック
  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      // カテゴリフィルタ
      const categoryMatch = selectedCategory === 'all' || 
        (item.keywords || []).some(keyword => 
          keyword.toLowerCase().includes(selectedCategory.toLowerCase())
        );

      // レベルフィルタ  
      const levelMatch = selectedLevel === 'all' || 
        (selectedLevel === 'beginner' && item.difficulty === 'basic') ||
        (selectedLevel === 'intermediate' && item.difficulty === 'intermediate') ||
        (selectedLevel === 'advanced' && item.difficulty === 'advanced');

      // 検索クエリフィルタ
      const searchMatch = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.keywords || []).some(keyword => 
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return categoryMatch && levelMatch && searchMatch;
    });
  }, [data, selectedCategory, selectedLevel, searchQuery]);

  const handleConceptClick = (concept: LearningConcept) => {
    if (onConceptClick) {
      onConceptClick(concept);
    } else {
      console.log('Concept clicked:', concept);
    }
  };

  return (
    <AppLayout>
      <div className={`min-h-screen ${gradientColors}`}>
        <div className="container mx-auto px-4 py-8">
          <PageHeader
            title={title}
            subtitle={subtitle}
            icon={icon}
          />

          <FiltersContainer
            categories={CATEGORIES}
            levels={LEARNING_LEVELS}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            selectedLevel={selectedLevel}
            onSearchChange={setSearchQuery}
            onCategoryChange={setSelectedCategory}
            onLevelChange={setSelectedLevel}
            onReset={resetFilters}
          />

          <StatsDisplay
            totalItems={data.length}
            filteredItems={filteredData.length}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            selectedLevel={selectedLevel}
          />

          <ConceptGrid
            concepts={filteredData}
            searchQuery={searchQuery}
            onConceptClick={handleConceptClick}
            emptyMessage={emptyMessage || "該当するコンテンツが見つかりませんでした。"}
          />
        </div>
      </div>
    </AppLayout>
  );
}
