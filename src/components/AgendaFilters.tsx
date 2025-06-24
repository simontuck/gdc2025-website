import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';
import { FilterOptions, ActiveFilters } from '../hooks/useAgendaFilters';

interface AgendaFiltersProps {
  filterOptions: FilterOptions;
  activeFilters: ActiveFilters;
  onFilterChange: (category: keyof ActiveFilters, values: string[]) => void;
  onClearFilters: () => void;
}

const filterLabels: Record<keyof FilterOptions, string> = {
  'use-cases': 'Use Cases',
  focus: 'Focus Areas',
  level: 'Level',
  goals: 'Goals',
  regions: 'Regions',
  'co-organizer': 'Organizer',
  'building blocks': 'Building Blocks',
  format: 'Format'
};

interface MultiSelectDropdownProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  label,
  options,
  selectedValues,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionToggle = (option: string) => {
    const newValues = selectedValues.includes(option)
      ? selectedValues.filter(v => v !== option)
      : [...selectedValues, option];
    onChange(newValues);
  };

  const displayText = selectedValues.length === 0 
    ? `All ${label}` 
    : selectedValues.length === 1 
      ? selectedValues[0]
      : `${selectedValues.length} selected`;

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 flex items-center justify-between"
      >
        <span className={selectedValues.length === 0 ? 'text-gray-500' : 'text-gray-900'}>
          {displayText}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => {
            const isSelected = selectedValues.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => handleOptionToggle(option)}
                className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 flex items-center justify-between"
              >
                <span className={isSelected ? 'font-medium text-primary-600' : 'text-gray-900'}>
                  {option}
                </span>
                {isSelected && <Check className="h-4 w-4 text-primary-600" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const AgendaFilters: React.FC<AgendaFiltersProps> = ({
  filterOptions,
  activeFilters,
  onFilterChange,
  onClearFilters
}) => {
  const hasActiveFilters = Object.values(activeFilters).some(values => values.length > 0);

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
          const selectedValues = activeFilters[category];
          
          if (options.length === 0) return null;

          return (
            <MultiSelectDropdown
              key={category}
              label={filterLabels[category]}
              options={options}
              selectedValues={selectedValues}
              onChange={(values) => onFilterChange(category, values)}
            />
          );
        })}
      </div>

      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {(Object.entries(activeFilters) as Array<[keyof ActiveFilters, string[]]>).map(([category, values]) => {
              if (values.length === 0) return null;
              
              return values.map((value) => (
                <span
                  key={`${category}-${value}`}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                >
                  {filterLabels[category]}: {value}
                  <button
                    onClick={() => {
                      const newValues = values.filter(v => v !== value);
                      onFilterChange(category, newValues);
                    }}
                    className="ml-1.5 h-3 w-3 rounded-full hover:bg-primary-200 flex items-center justify-center"
                  >
                    <X className="h-2 w-2" />
                  </button>
                </span>
              ));
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendaFilters;