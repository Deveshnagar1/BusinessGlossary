import React from 'react';
import { Grid, List } from 'lucide-react';

interface ViewToggleProps {
  view: 'card' | 'table';
  onViewChange: (view: 'card' | 'table') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-xl p-1.5 border border-gray-200 shadow-sm">
      <button
        onClick={() => onViewChange('card')}
        className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
          view === 'card'
            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105'
            : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
        }`}
      >
        <Grid className="h-4 w-4" />
        <span>Cards</span>
      </button>
      <button
        onClick={() => onViewChange('table')}
        className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
          view === 'table'
            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105'
            : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
        }`}
      >
        <List className="h-4 w-4" />
        <span>Table</span>
      </button>
    </div>
  );
};