import React from 'react';
import { CheckCircle, Database, Tag } from 'lucide-react';
import { DataRecord } from '../types';

interface DataCardProps {
  record: DataRecord;
}

export const DataCard: React.FC<DataCardProps> = ({ record }) => {
  const [expanded, setExpanded] = React.useState(false);
  const isLong = record.definition.length > 80;
  return (
    <div className="group bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/90 w-full max-w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
            <Database className="h-6 w-6 text-white max-w-full" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
              {record.domain}
            </h3>
          </div>
        </div>
        {/* Removed Edit and Delete buttons */}
      </div>
      <div className="space-y-4">
        <div className="flex items-center flex-wrap gap-3">
          <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-xl border border-blue-100">
            <Tag className="h-4 w-4 text-blue-600 max-w-full" />
            <span className="text-blue-700 font-semibold text-xs sm:text-sm">{record.logicalTableName}</span>
          </div>
          <div className="flex items-center space-x-2 bg-indigo-50 px-3 py-2 rounded-xl border border-indigo-100">
            <span className="text-indigo-700 font-medium text-xs sm:text-sm">{record.attributeName}</span>
          </div>
        </div>
        <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-100">
          <p className={`text-gray-700 leading-relaxed text-xs sm:text-sm ${expanded ? '' : 'line-clamp-2'}`}>
            {expanded || !isLong ? record.definition : record.definition.slice(0, 80) + '...'}
            {isLong && (
              <span
                className="ml-2 text-blue-500 cursor-pointer underline text-xs"
                onClick={() => setExpanded(e => !e)}
              >
                {expanded ? 'Show less' : 'Show more'}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};