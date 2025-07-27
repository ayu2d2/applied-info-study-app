import { useState, useMemo, useCallback } from 'react';
import type { SearchFilters, ConceptLibrary } from '@/types';

interface UseSearchAndFilterProps {
  conceptLibrary: ConceptLibrary;
}

interface UseSearchAndFilterReturn extends SearchFilters {
  setSelectedCategory: (category: string) => void;
  setSelectedLevel: (level: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedConcept: (concept: string | null) => void;
  filteredConcepts: [string, any][];
  resetFilters: () => void;
}

export function useSearchAndFilter({ 
  conceptLibrary 
}: UseSearchAndFilterProps): UseSearchAndFilterReturn {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  const filteredConcepts = useMemo(() => {
    return Object.entries(conceptLibrary).filter(([key, concept]) => {
      const categoryMatch = selectedCategory === 'all' || concept.category === selectedCategory;
      const levelMatch = selectedLevel === 'all' || concept.level === selectedLevel;
      const searchMatch = searchQuery === '' || 
        concept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        concept.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        concept.keywords?.some(keyword => 
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return categoryMatch && levelMatch && searchMatch;
    });
  }, [conceptLibrary, selectedCategory, selectedLevel, searchQuery]);

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
    filteredConcepts,
    resetFilters
  };
}
