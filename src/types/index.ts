export interface DataRecord {
  domain: string;
  logicalTableName: string;
  attributeName: string;
  definition: string;
  physicalTableName?: string;
  tableName?: string;
  dataType?: string;
}

export interface DataQualityStats {
  totalRecords: number;
  nullPercentage: number;
  missingPercentage: number;
  duplicatePercentage: number;
  completenessScore: number;
}

export interface FilterState {
  domain: string;
  logicalTable: string;
  attribute: string;
  searchTerm: string;
}