import { DataRecord } from '../types';

export const parseCSV = (csvText: string): DataRecord[] => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  // DOMAIN,LOGICAL TAB NAME,ATTRIBUTE NAME,PHYSICAL TABLE NAME,TABLE NAME,DEFINITION,DATA TYPE
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return {
      domain: values[0] || '',
      logicalTableName: values[1] || '',
      attributeName: values[2] || '',
      physicalTableName: values[3] || '',
      tableName: values[4] || '',
      definition: values[5] || '',
      dataType: values[6] || ''
    };
  });
};

export const calculateDataQuality = (records: DataRecord[]) => {
  const totalRecords = records.length;
  
  let nullCount = 0;
  let missingCount = 0;
  let duplicateCount = 0;
  
  const seenRecords = new Set();
  
  records.forEach(record => {
    // Check for null values
    if (!record.definition || record.definition.trim() === '') {
      nullCount++;
    }
    
    // Check for missing critical fields
    if (!record.domain || !record.attributeName || !record.physicalTableName) {
      missingCount++;
    }
    
    // Check for duplicates based on physical table name + attribute name
    const key = `${record.physicalTableName}-${record.attributeName}`;
    if (seenRecords.has(key)) {
      duplicateCount++;
    } else {
      seenRecords.add(key);
    }
  });
  
  return {
    totalRecords,
    nullPercentage: Math.round((nullCount / totalRecords) * 100),
    missingPercentage: Math.round((missingCount / totalRecords) * 100),
    duplicatePercentage: Math.round((duplicateCount / totalRecords) * 100),
    completenessScore: Math.round(((totalRecords - nullCount - missingCount) / totalRecords) * 100)
  };
};