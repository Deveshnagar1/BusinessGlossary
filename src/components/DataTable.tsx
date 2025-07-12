import React from 'react';
import { Database } from 'lucide-react';
import { DataRecord } from '../types';

interface DataTableProps {
  records: DataRecord[];
}

export const DataTable: React.FC<DataTableProps> = ({ records }) => {
  const [expandedRows, setExpandedRows] = React.useState<{[key: number]: boolean}>({});
  const handleExpand = React.useCallback((index: number) => {
    setExpandedRows(prev => ({ ...prev, [index]: !prev[index] }));
  }, []);
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl overflow-hidden shadow-xl w-full">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
            <tr>
              <th className="px-3 sm:px-6 py-3 sm:py-5 text-left text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">Domain</th>
              <th className="px-3 sm:px-6 py-3 sm:py-5 text-left text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">Logical Table Name</th>
              <th className="px-3 sm:px-6 py-3 sm:py-5 text-left text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">Attribute Name</th>
              <th className="px-3 sm:px-6 py-3 sm:py-5 text-left text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">Definition</th>
            </tr>
          </thead>
          <tbody className="bg-white/50 divide-y divide-gray-100">
            {records.map((record, index) => (
              <tr key={index} className="hover:bg-white/80 transition-all duration-200 group">
                <td className="px-3 sm:px-6 py-3 sm:py-5 whitespace-nowrap text-xs sm:text-sm">
                  <span className="inline-flex items-center px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-200">{record.domain}</span>
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-5 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Database className="h-4 w-4 text-gray-400" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-900">{record.logicalTableName}</span>
                  </div>
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-5 whitespace-nowrap text-xs sm:text-sm text-gray-900 font-semibold">{record.attributeName}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-5 max-w-xs sm:max-w-md text-xs sm:text-sm relative align-top">
                  <span className={expandedRows[index] ? 'whitespace-normal' : 'truncate whitespace-nowrap overflow-hidden'} style={{textOverflow: !expandedRows[index] ? 'ellipsis' : 'unset', display: 'inline'}}>
                    {expandedRows[index] || record.definition.length <= 50
                      ? record.definition
                      : record.definition.slice(0, 50) + '...'}
                  </span>
                  {record.definition.length > 50 && (
                    <span
                      className="ml-2 text-blue-500 cursor-pointer underline text-xs"
                      onClick={() => handleExpand(index)}
                      title={expandedRows[index] ? 'Show less' : 'Show more'}
                    >
                      {expandedRows[index] ? 'Show less' : 'Show more'}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};