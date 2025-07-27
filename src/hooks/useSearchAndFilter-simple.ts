import { useState, useCallback } from 'react';

export function useSearchAndFilter() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedConcept(null);
  }, []);

  return {
    selectedCategory,
    selectedLevel,
    searchQuery,
    selectedConcept,
    setSelectedCategory,
    setSelectedLevel,
    setSearchQuery,
    setSelectedConcept,
    resetFilters,
  };
}
