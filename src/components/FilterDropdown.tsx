import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  value,
  options,
  onChange,
  disabled = false
}) => {
  return (
    <div className="flex flex-col space-y-3">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <div className="relative group">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full px-4 py-3.5 pr-12 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all duration-200 shadow-sm hover:shadow-md ${
            disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'hover:border-gray-300 group-hover:bg-white'
          }`}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none group-hover:text-gray-600 transition-colors" />
      </div>
    </div>
  );
};