import { DataRecord } from '../types';

export const parseCSV = (csvText: string): DataRecord[] => {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return {
      domain: values[0]?.trim() || '',
      logicalTableName: values[1]?.trim() || '',
      attributeName: values[2]?.trim() || '',
      definition: values[3]?.trim() || '',
    };
  });
};

export const calculateDataQuality = (records: DataRecord[]) => {
  const totalRecords = records.length;
  let nullCount = 0;
  let missingCount = 0;
  let duplicateCount = 0;
  const seenRecords = new Set<string>();
  records.forEach(record => {
    if (!record.definition?.trim()) nullCount++;
    if (!record.domain || !record.attributeName) missingCount++;
    const key = `${record.domain}-${record.logicalTableName}-${record.attributeName}`;
    if (seenRecords.has(key)) duplicateCount++;
    else seenRecords.add(key);
  });
  return {
    totalRecords,
    nullPercentage: Math.round((nullCount / totalRecords) * 100),
    missingPercentage: Math.round((missingCount / totalRecords) * 100),
    duplicatePercentage: Math.round((duplicateCount / totalRecords) * 100),
    completenessScore: Math.round(((totalRecords - nullCount - missingCount) / totalRecords) * 100)
  };
};