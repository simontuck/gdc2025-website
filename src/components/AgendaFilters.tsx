import React from 'react';
import { ChevronDown, X } from 'lucide-react';
import { FilterOptions, ActiveFilters } from '../hooks/useAgendaFilters';

interface AgendaFiltersProps {
  filterOptions: FilterOptions;
  activeFilters: ActiveFilters;
  onFilterChange: (category: keyof ActiveFilters, value: string) => void;
  onClearFilters: () => void;
}

const filterLabels: Record<keyof FilterOptions, string> = {
  'use-cases': 'Use Cases',
  focus: 'Focus Areas',
  level: 'Level',
  goals: 'Goals',
  regions: 'Regions',
  'co-organizer': 'Co-organizer',
  'building blocks': 'Building Blocks',
  format: 'Format'
};

const AgendaFilters: React.FC<AgendaFiltersProps> = ({
  filterOptions,
  activeFilters,
  onFilterChange,
  onClearFilters
}) => {
  const hasActiveFilters = Object.values(activeFilters).some(value => value !== '');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filter Agenda Items</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(Object.keys(filterOptions) as Array<keyof FilterOptions>).map((category) => {
          const options = filterOptions[category];
          const activeValue = activeFilters[category];
          
          if (options.length === 0) return null;

          return (
            <div key={category} className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {filterLabels[category]}
              </label>
              <div className="relative">
                <select
                  value={activeValue}
                  onChange={(e) => onFilterChange(category, e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All {filterLabels[category]}</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          );
        })}
      </div>

      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {(Object.entries(activeFilters) as Array<[keyof ActiveFilters, string]>).map(([category, value]) => {
              if (!value) return null;
              
              return (
                <span
                  key={category}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                >
                  {filterLabels[category]}: {value}
                  <button
                    onClick={() => onFilterChange(category, '')}
                    className="ml-1.5 h-3 w-3 rounded-full hover:bg-primary-200 flex items-center justify-center"
                  >
                    <X className="h-2 w-2" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendaFilters;