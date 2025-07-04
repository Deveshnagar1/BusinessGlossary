import React, { useState } from 'react';
import { Download, FileText, Database, ChevronDown } from 'lucide-react';
import { DataRecord } from '../types';
import { exportToCSV, exportToJSON } from '../utils/csvExporter';

interface ExportDropdownProps {
  records: DataRecord[];
  totalRecords: number;
}

export const ExportDropdown: React.FC<ExportDropdownProps> = ({ records, totalRecords }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = (format: 'csv' | 'json') => {
    const filename = `business-glossary-${records.length}-records`;
    
    if (format === 'csv') {
      exportToCSV(records, filename);
    } else {
      exportToJSON(records, filename);
    }
    
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        <Download className="h-5 w-5 group-hover:scale-110 transition-transform" />
        <span className="font-medium">Export Data</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 z-20 overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Export Options</h3>
              <p className="text-sm text-gray-600 mt-1">
                Exporting {records.length.toLocaleString()} of {totalRecords.toLocaleString()} records
              </p>
            </div>
            
            <div className="p-2">
              <button
                onClick={() => handleExport('csv')}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">CSV Format</div>
                  <div className="text-sm text-gray-500">Comma-separated values for Excel</div>
                </div>
              </button>
              
              <button
                onClick={() => handleExport('json')}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">JSON Format</div>
                  <div className="text-sm text-gray-500">Structured data for developers</div>
                </div>
              </button>
            </div>
            
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Files will be downloaded with timestamp: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};