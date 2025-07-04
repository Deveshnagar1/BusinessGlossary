import { DataRecord } from '../types';

export const exportToCSV = (records: DataRecord[], filename: string = 'business-glossary-data') => {
  // Create CSV headers
  const headers = [
    'Domain',
    'Logical Table Name',
    'Attribute Name',
    'Physical Table Name',
    'Definition',
    'Data Type'
  ];

  // Convert records to CSV rows
  const csvRows = [
    headers.join(','), // Header row
    ...records.map(record => [
      `"${record.domain}"`,
      `"${record.logicalTableName}"`,
      `"${record.attributeName}"`,
      `"${record.physicalTableName}"`,
      `"${record.definition.replace(/"/g, '""')}"`, // Escape quotes in definition
      `"${record.dataType}"`
    ].join(','))
  ];

  // Create CSV content
  const csvContent = csvRows.join('\n');

  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const exportToJSON = (records: DataRecord[], filename: string = 'business-glossary-data') => {
  const jsonContent = JSON.stringify(records, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};