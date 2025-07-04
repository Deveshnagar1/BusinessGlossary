import React from 'react';
import { Edit, Trash2, CheckCircle, Database, Tag } from 'lucide-react';
import { DataRecord } from '../types';

interface DataCardProps {
  record: DataRecord;
}

export const DataCard: React.FC<DataCardProps> = ({ record }) => {
  return (
    <div className="group bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/90">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
            <Database className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
              {record.physicalTableName}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <span className="text-sm text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded-full">Active</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
            <Edit className="h-4 w-4" />
          </button>
          <button className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center flex-wrap gap-3">
          <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-xl border border-blue-100">
            <Tag className="h-4 w-4 text-blue-600" />
            <span className="text-blue-700 font-semibold text-sm">{record.logicalTableName}</span>
          </div>
          <div className="flex items-center space-x-2 bg-indigo-50 px-3 py-2 rounded-xl border border-indigo-100">
            <span className="text-indigo-700 font-medium text-sm">{record.attributeName}</span>
          </div>
          <div className="bg-gray-100 px-3 py-2 rounded-xl border border-gray-200">
            <span className="text-gray-700 font-mono text-sm">{record.dataType}</span>
          </div>
        </div>
        
        <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-100">
          <p className="text-gray-700 leading-relaxed">{record.definition}</p>
        </div>
      </div>
    </div>
  );
};