import { useMemo } from 'react';

export interface AgendaItem {
  id: number;
  title: string;
  category: string;
  day: string;
  time: string;
  description: string;
  goals: string;
  labels: string;
  organizers: string;
  room: string;
  speakers: string;
  target_audience: string;
  highlight: boolean;
  ready_to_publish: boolean;
  focus: any;
  format: any;
  'building blocks': any;
  regions: any;
  'use-cases': any;
  level: any;
  'co-organizer': any;
}

export interface FilterOptions {
  'use-cases': string[];
  focus: string[];
  level: string[];
  goals: string[];
  regions: string[];
  'co-organizer': string[];
  'building blocks': string[];
  format: string[];
}

export interface ActiveFilters {
  'use-cases': string[];
  focus: string[];
  level: string[];
  goals: string[];
  regions: string[];
  'co-organizer': string[];
  'building blocks': string[];
  format: string[];
}

// Helper function to parse comma-separated values or arrays
const parseFilterValues = (value: any): string[] => {
  if (!value) return [];
  
  // If it's already an array, process it directly
  if (Array.isArray(value)) {
    return value.map(item => String(item).trim()).filter(Boolean);
  }
  
  // If it's a string, split by comma
  if (typeof value === 'string') {
    return value.split(',').map(item => item.trim()).filter(Boolean);
  }
  
  return [];
};

export function useAgendaFilters(agendaItems: AgendaItem[] | undefined) {
  // Extract all unique filter options from agenda items
  const filterOptions = useMemo((): FilterOptions => {
    if (!agendaItems) {
      return {
        'use-cases': [],
        focus: [],
        level: [],
        goals: [],
        regions: [],
        'co-organizer': [],
        'building blocks': [],
        format: []
      };
    }

    const options: FilterOptions = {
      'use-cases': [],
      focus: [],
      level: [],
      goals: [],
      regions: [],
      'co-organizer': [],
      'building blocks': [],
      format: []
    };

    agendaItems.forEach(item => {
      // Extract use-cases
      const useCases = parseFilterValues(item['use-cases']);
      options['use-cases'].push(...useCases);

      // Extract focus areas
      const focusAreas = parseFilterValues(item.focus);
      options.focus.push(...focusAreas);

      // Extract levels
      const levels = parseFilterValues(item.level);
      options.level.push(...levels);

      // Extract goals (split by comma or newline) - ensure it's a string first
      if (item.goals && typeof item.goals === 'string') {
        const goals = item.goals.split(/[,\n]/).map(g => g.trim()).filter(Boolean);
        options.goals.push(...goals);
      } else if (item.goals) {
        // If goals exists but is not a string, convert it to string first
        const goalsString = String(item.goals);
        const goals = goalsString.split(/[,\n]/).map(g => g.trim()).filter(Boolean);
        options.goals.push(...goals);
      }

      // Extract regions
      const regions = parseFilterValues(item.regions);
      options.regions.push(...regions);

      // Extract co-organizers
      const coOrganizers = parseFilterValues(item['co-organizer']);
      options['co-organizer'].push(...coOrganizers);

      // Extract building blocks
      const buildingBlocks = parseFilterValues(item['building blocks']);
      options['building blocks'].push(...buildingBlocks);

      // Extract formats
      const formats = parseFilterValues(item.format);
      options.format.push(...formats);
    });

    // Remove duplicates and sort alphabetically (case-insensitive)
    Object.keys(options).forEach(key => {
      const filterKey = key as keyof FilterOptions;
      options[filterKey] = [...new Set(options[filterKey])]
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    });

    return options;
  }, [agendaItems]);

  // Filter agenda items based on active filters
  const filterAgendaItems = (items: AgendaItem[], activeFilters: ActiveFilters): AgendaItem[] => {
    return items.filter(item => {
      // Check use-cases filter
      if (activeFilters['use-cases'].length > 0) {
        const itemUseCases = parseFilterValues(item['use-cases']);
        if (!activeFilters['use-cases'].some(filter => itemUseCases.includes(filter))) {
          return false;
        }
      }

      // Check focus filter
      if (activeFilters.focus.length > 0) {
        const itemFocus = parseFilterValues(item.focus);
        if (!activeFilters.focus.some(filter => itemFocus.includes(filter))) {
          return false;
        }
      }

      // Check level filter
      if (activeFilters.level.length > 0) {
        const itemLevels = parseFilterValues(item.level);
        if (!activeFilters.level.some(filter => itemLevels.includes(filter))) {
          return false;
        }
      }

      // Check goals filter - ensure it's a string first
      if (activeFilters.goals.length > 0) {
        if (!item.goals) {
          return false;
        }
        const goalsString = typeof item.goals === 'string' ? item.goals : String(item.goals);
        const itemGoals = goalsString.split(/[,\n]/).map(g => g.trim()).filter(Boolean);
        if (!activeFilters.goals.some(filter => itemGoals.some(goal => goal.toLowerCase().includes(filter.toLowerCase())))) {
          return false;
        }
      }

      // Check regions filter
      if (activeFilters.regions.length > 0) {
        const itemRegions = parseFilterValues(item.regions);
        if (!activeFilters.regions.some(filter => itemRegions.includes(filter))) {
          return false;
        }
      }

      // Check co-organizer filter
      if (activeFilters['co-organizer'].length > 0) {
        const itemCoOrganizers = parseFilterValues(item['co-organizer']);
        if (!activeFilters['co-organizer'].some(filter => itemCoOrganizers.includes(filter))) {
          return false;
        }
      }

      // Check building blocks filter
      if (activeFilters['building blocks'].length > 0) {
        const itemBuildingBlocks = parseFilterValues(item['building blocks']);
        if (!activeFilters['building blocks'].some(filter => itemBuildingBlocks.includes(filter))) {
          return false;
        }
      }

      // Check format filter
      if (activeFilters.format.length > 0) {
        const itemFormats = parseFilterValues(item.format);
        if (!activeFilters.format.some(filter => itemFormats.includes(filter))) {
          return false;
        }
      }

      return true;
    });
  };

  return {
    filterOptions,
    filterAgendaItems
  };
}