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
  'use-cases': string;
  focus: string;
  level: string;
  goals: string;
  regions: string;
  'co-organizer': string;
  'building blocks': string;
  format: string;
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

      // Extract goals (split by comma or newline)
      if (item.goals) {
        const goals = item.goals.split(/[,\n]/).map(g => g.trim()).filter(Boolean);
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

    // Remove duplicates and sort
    Object.keys(options).forEach(key => {
      const filterKey = key as keyof FilterOptions;
      options[filterKey] = [...new Set(options[filterKey])].sort();
    });

    return options;
  }, [agendaItems]);

  // Filter agenda items based on active filters
  const filterAgendaItems = (items: AgendaItem[], activeFilters: ActiveFilters): AgendaItem[] => {
    return items.filter(item => {
      // Check use-cases filter
      if (activeFilters['use-cases']) {
        const itemUseCases = parseFilterValues(item['use-cases']);
        if (!itemUseCases.includes(activeFilters['use-cases'])) {
          return false;
        }
      }

      // Check focus filter
      if (activeFilters.focus) {
        const itemFocus = parseFilterValues(item.focus);
        if (!itemFocus.includes(activeFilters.focus)) {
          return false;
        }
      }

      // Check level filter
      if (activeFilters.level) {
        const itemLevels = parseFilterValues(item.level);
        if (!itemLevels.includes(activeFilters.level)) {
          return false;
        }
      }

      // Check goals filter
      if (activeFilters.goals) {
        if (!item.goals || !item.goals.toLowerCase().includes(activeFilters.goals.toLowerCase())) {
          return false;
        }
      }

      // Check regions filter
      if (activeFilters.regions) {
        const itemRegions = parseFilterValues(item.regions);
        if (!itemRegions.includes(activeFilters.regions)) {
          return false;
        }
      }

      // Check co-organizer filter
      if (activeFilters['co-organizer']) {
        const itemCoOrganizers = parseFilterValues(item['co-organizer']);
        if (!itemCoOrganizers.includes(activeFilters['co-organizer'])) {
          return false;
        }
      }

      // Check building blocks filter
      if (activeFilters['building blocks']) {
        const itemBuildingBlocks = parseFilterValues(item['building blocks']);
        if (!itemBuildingBlocks.includes(activeFilters['building blocks'])) {
          return false;
        }
      }

      // Check format filter
      if (activeFilters.format) {
        const itemFormats = parseFilterValues(item.format);
        if (!itemFormats.includes(activeFilters.format)) {
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