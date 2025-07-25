import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check, MapPin, Filter } from 'lucide-react';
import { FilterOptions, ActiveFilters } from '../hooks/useAgendaFilters';

export interface RoomActiveFilters extends Omit<ActiveFilters, 'rooms'> {
  selectedRooms: string[];
}

interface RoomAgendaFiltersProps {
  filterOptions: FilterOptions;
  activeFilters: RoomActiveFilters;
  onFilterChange: (category: keyof RoomActiveFilters, values: string[]) => void;
  onClearFilters: () => void;
  availableRooms: string[];
}

const filterLabels: Record<keyof Omit<FilterOptions, 'rooms'>, string> = {
  'use-cases': 'Use Cases',
  focus: 'Focus Areas',
  level: 'Level',
  goals: 'Goals',
  regions: 'Regions',
  'co-organizer': 'Co-organizer',
  'building blocks': 'Building Blocks',
  format: 'Format'
};

interface MultiSelectDropdownProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  icon?: React.ReactNode;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  label,
  options,
  selectedValues,
  onChange,
  icon
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
        <div className="flex items-center gap-2">
          {icon}
          {label}
        </div>
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

const RoomAgendaFilters: React.FC<RoomAgendaFiltersProps> = ({
  filterOptions,
  activeFilters,
  onFilterChange,
  onClearFilters,
  availableRooms
}) => {
  const hasActiveFilters = Object.values(activeFilters).some(values => values.length > 0);
  const hasRoomFilters = activeFilters.selectedRooms.length > 0;
  const hasOtherFilters = Object.entries(activeFilters).some(([key, values]) => 
    key !== 'selectedRooms' && values.length > 0
  );

  const handleRoomToggle = (room: string) => {
    const newSelectedRooms = activeFilters.selectedRooms.includes(room)
      ? activeFilters.selectedRooms.filter(r => r !== room)
      : [...activeFilters.selectedRooms, room];
    onFilterChange('selectedRooms', newSelectedRooms);
  };

  const clearRoomFilters = () => {
    onFilterChange('selectedRooms', []);
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Room Filter Pills */}
      {availableRooms.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary-500" />
              <h3 className="text-lg font-semibold text-gray-900">Filter by Room</h3>
            </div>
            {hasRoomFilters && (
              <button
                onClick={clearRoomFilters}
                className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <X className="h-4 w-4 mr-1" />
                Clear Rooms
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {availableRooms.map((room) => {
              const isSelected = activeFilters.selectedRooms.includes(room);
              return (
                <button
                  key={room}
                  onClick={() => handleRoomToggle(room)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isSelected
                      ? 'bg-primary-500 text-white shadow-md hover:bg-primary-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  {room}
                </button>
              );
            })}
          </div>
          
          {hasRoomFilters && (
            <div className="mt-3 text-sm text-gray-600">
              {activeFilters.selectedRooms.length === 0 
                ? 'Showing all rooms' 
                : `Showing ${activeFilters.selectedRooms.length} of ${availableRooms.length} rooms`
              }
            </div>
          )}
        </div>
      )}

      {/* Main Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Filter Sessions</h3>
          {hasOtherFilters && (
            <button
              onClick={() => {
                // Clear all filters except room filters
                const clearedFilters = { ...activeFilters };
                Object.keys(clearedFilters).forEach(key => {
                  if (key !== 'selectedRooms') {
                    (clearedFilters as any)[key] = [];
                  }
                });
                Object.entries(clearedFilters).forEach(([key, value]) => {
                  if (key !== 'selectedRooms') {
                    onFilterChange(key as keyof RoomActiveFilters, value as string[]);
                  }
                });
              }}
              className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <X className="h-4 w-4 mr-1" />
              Clear Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Other filters */}
          {(Object.keys(filterOptions) as Array<keyof FilterOptions>).map((category) => {
            if (category === 'rooms') return null; // Skip rooms as we handle it separately
            
            const options = filterOptions[category];
            const selectedValues = activeFilters[category as keyof RoomActiveFilters] as string[];
            
            if (options.length === 0) return null;

            return (
              <MultiSelectDropdown
                key={category}
                label={filterLabels[category as keyof typeof filterLabels]}
                options={options}
                selectedValues={selectedValues}
                onChange={(values) => onFilterChange(category as keyof RoomActiveFilters, values)}
              />
            );
          })}
        </div>

        {hasOtherFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              
              {/* Other filters */}
              {(Object.entries(activeFilters) as Array<[keyof RoomActiveFilters, string[]]>).map(([category, values]) => {
                if (category === 'selectedRooms' || values.length === 0) return null;
                
                return values.map((value) => (
                  <span
                    key={`${category}-${value}`}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                  >
                    {filterLabels[category as keyof typeof filterLabels]}: {value}
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

      {/* Clear All Button */}
      {hasActiveFilters && (
        <div className="text-center">
          <button
            onClick={onClearFilters}
            className="inline-flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <X className="h-4 w-4 mr-2" />
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomAgendaFilters;