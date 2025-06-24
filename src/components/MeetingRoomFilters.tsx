import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Calendar, Clock, Users, Timer } from 'lucide-react';
import { CONFERENCE_DATES, DURATION_OPTIONS, generateTimeSlots } from '../utils/timeSlots';

export interface RoomFilters {
  day: string;
  startTime: string;
  duration: number;
  minCapacity: number;
}

interface MeetingRoomFiltersProps {
  filters: RoomFilters;
  onFiltersChange: (filters: RoomFilters) => void;
  onClearFilters: () => void;
}

interface DropdownProps {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onChange,
  icon,
  placeholder = "Select..."
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

  const selectedOption = options.find(option => option.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <div className="flex items-center gap-2">
          {icon}
          {label}
        </div>
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-md py-2.5 pl-3 pr-10 text-sm text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 flex items-center justify-between hover:border-gray-400 transition-colors"
      >
        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
          {displayText}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 flex items-center justify-between"
            >
              <span className={option.value === value ? 'font-medium text-primary-600' : 'text-gray-900'}>
                {option.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const MeetingRoomFilters: React.FC<MeetingRoomFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters
}) => {
  const hasActiveFilters = filters.day || filters.startTime || filters.duration > 0 || filters.minCapacity > 0;

  // Generate time slot options
  const timeSlots = generateTimeSlots([]);
  const timeOptions = [
    { value: '', label: 'Any time' },
    ...timeSlots.map(slot => ({
      value: slot.time,
      label: slot.label
    }))
  ];

  // Duration options
  const durationOptions = [
    { value: '0', label: 'Any duration' },
    ...DURATION_OPTIONS.map(option => ({
      value: option.value.toString(),
      label: option.label
    }))
  ];

  // Capacity options
  const capacityOptions = [
    { value: '0', label: 'Any capacity' },
    { value: '2', label: '2+ people' },
    { value: '4', label: '4+ people' },
    { value: '6', label: '6+ people' },
    { value: '8', label: '8+ people' },
    { value: '10', label: '10+ people' },
    { value: '12', label: '12+ people' },
    { value: '15', label: '15+ people' },
    { value: '20', label: '20+ people' }
  ];

  // Day options
  const dayOptions = [
    { value: '', label: 'Any day' },
    ...CONFERENCE_DATES.map(date => ({
      value: date.value,
      label: date.label
    }))
  ];

  const handleFilterChange = (key: keyof RoomFilters, value: string) => {
    const newFilters = { ...filters };
    
    if (key === 'duration' || key === 'minCapacity') {
      newFilters[key] = parseFloat(value) || 0;
    } else {
      newFilters[key] = value;
    }
    
    onFiltersChange(newFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filter Meeting Rooms</h3>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Dropdown
          label="Conference Day"
          value={filters.day}
          options={dayOptions}
          onChange={(value) => handleFilterChange('day', value)}
          icon={<Calendar className="h-4 w-4 text-gray-500" />}
          placeholder="Any day"
        />

        <Dropdown
          label="Start Time"
          value={filters.startTime}
          options={timeOptions}
          onChange={(value) => handleFilterChange('startTime', value)}
          icon={<Clock className="h-4 w-4 text-gray-500" />}
          placeholder="Any time"
        />

        <Dropdown
          label="Duration"
          value={filters.duration.toString()}
          options={durationOptions}
          onChange={(value) => handleFilterChange('duration', value)}
          icon={<Timer className="h-4 w-4 text-gray-500" />}
          placeholder="Any duration"
        />

        <Dropdown
          label="Minimum Capacity"
          value={filters.minCapacity.toString()}
          options={capacityOptions}
          onChange={(value) => handleFilterChange('minCapacity', value)}
          icon={<Users className="h-4 w-4 text-gray-500" />}
          placeholder="Any capacity"
        />
      </div>

      {hasActiveFilters && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            
            {filters.day && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                Day: {CONFERENCE_DATES.find(d => d.value === filters.day)?.label}
                <button
                  onClick={() => handleFilterChange('day', '')}
                  className="ml-1.5 h-3 w-3 rounded-full hover:bg-primary-200 flex items-center justify-center"
                >
                  <X className="h-2 w-2" />
                </button>
              </span>
            )}
            
            {filters.startTime && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                Time: {timeSlots.find(t => t.time === filters.startTime)?.label}
                <button
                  onClick={() => handleFilterChange('startTime', '')}
                  className="ml-1.5 h-3 w-3 rounded-full hover:bg-primary-200 flex items-center justify-center"
                >
                  <X className="h-2 w-2" />
                </button>
              </span>
            )}
            
            {filters.duration > 0 && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                Duration: {DURATION_OPTIONS.find(d => d.value === filters.duration)?.label}
                <button
                  onClick={() => handleFilterChange('duration', '0')}
                  className="ml-1.5 h-3 w-3 rounded-full hover:bg-primary-200 flex items-center justify-center"
                >
                  <X className="h-2 w-2" />
                </button>
              </span>
            )}
            
            {filters.minCapacity > 0 && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                Capacity: {filters.minCapacity}+ people
                <button
                  onClick={() => handleFilterChange('minCapacity', '0')}
                  className="ml-1.5 h-3 w-3 rounded-full hover:bg-primary-200 flex items-center justify-center"
                >
                  <X className="h-2 w-2" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingRoomFilters;