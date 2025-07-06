import React from 'react';
import { Edit, Trash2, Database } from 'lucide-react';
import { DataRecord } from '../types';
import { DataLineageModal } from './DataLineageModal';

interface DataTableProps {
  records: DataRecord[];
  hidePhysicalTable?: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({ records, hidePhysicalTable }) => {
  const [lineageOpen, setLineageOpen] = React.useState(false);
  const [lineageTerm, setLineageTerm] = React.useState('');
  const [lineageRelated, setLineageRelated] = React.useState<string[]>([]);

  const handleLineage = (record: DataRecord) => {
    setLineageTerm(record.attributeName);
    // Find related terms by domain or logicalTableName (simple mock logic)
    const related = records
      .filter(r => (r.domain === record.domain || r.logicalTableName === record.logicalTableName) && r.attributeName !== record.attributeName)
      .map(r => r.attributeName)
      .slice(0, 4);
    setLineageRelated(related);
    setLineageOpen(true);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl overflow-hidden shadow-xl w-full">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
            <tr>
              <th className="px-3 sm:px-6 py-3 sm:py-5 text-left text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">
                Domain
              </th>
              <th className="px-3 sm:px-6 py-3 sm:py-5 text-left text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">
                Logical Table Name
              </th>
              <th className="px-3 sm:px-6 py-3 sm:py-5 text-left text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">
                Attribute Name
              </th>
              <th className="px-3 sm:px-6 py-3 sm:py-5 text-left text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">
                Physical Table Name
              </th>
              {(!hidePhysicalTable) && (
                <th className="px-3 sm:px-6 py-3 sm:py-5 text-left text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">
                  Table Name
                </th>
              )}
              <th className="px-3 sm:px-6 py-3 sm:py-5 text-left text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">
                Definition
              </th>
              <th className="px-3 sm:px-6 py-3 sm:py-5 text-left text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">
                Data Type
              </th>
              <th className="px-3 sm:px-6 py-3 sm:py-5 text-left text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-3 sm:px-6 py-3 sm:py-5 text-left text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white/50 divide-y divide-gray-100">
            {records.map((record, index) => (
              <tr key={index} className="hover:bg-white/80 transition-all duration-200 group">
                <td className="px-3 sm:px-6 py-3 sm:py-5 whitespace-nowrap text-xs sm:text-sm">
                  <span className="inline-flex items-center px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-200">
                    {record.domain}
                  </span>
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-5 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Database className="h-4 w-4 text-gray-400" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-900">
                      {record.logicalTableName}
                    </span>
                  </div>
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-5 whitespace-nowrap text-xs sm:text-sm text-gray-900 font-semibold cursor-pointer hover:underline" onClick={() => handleLineage(record)} title="Show data lineage">
                  {record.attributeName}
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-5 whitespace-nowrap">
                  <span className="text-xs sm:text-sm text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded-lg">
                    {record.physicalTableName}
                  </span>
                </td>
                {(!hidePhysicalTable) && (
                  <td className="px-3 sm:px-6 py-3 sm:py-5 whitespace-nowrap text-xs sm:text-sm">
                    {record.tableName}
                  </td>
                )}
                <td className="px-3 sm:px-6 py-3 sm:py-5 whitespace-nowrap max-w-xs sm:max-w-md truncate text-xs sm:text-sm">
                  {record.definition}
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-5 whitespace-nowrap text-xs sm:text-sm">
                  {record.attributeName === 'Latitude Number' || record.attributeName === 'Longitude Number'
                    ? 'Decimal(11,6)'
                    : record.dataType}
                  <span className="ml-2 text-blue-400 hover:text-blue-600 cursor-pointer" title="Show data lineage" onClick={() => handleLineage(record)}>↗</span>
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-5 whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                    Active
                  </span>
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-5 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 min-w-8 min-h-8">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 min-w-8 min-h-8">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DataLineageModal open={lineageOpen} onClose={() => setLineageOpen(false)} term={lineageTerm} related={lineageRelated} />
    </div>
  );
};