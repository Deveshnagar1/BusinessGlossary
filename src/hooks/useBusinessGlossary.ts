import { useState, useMemo } from 'react';
import { DataRecord, FilterState } from '../types';
import { parseCSV, calculateDataQuality } from '../utils/csvParser';
import { csvData } from '../data/csvData';

export const useBusinessGlossary = () => {
  const [filters, setFilters] = useState<FilterState>({
    domain: 'All Domains',
    logicalTable: 'All Tables',
    attribute: 'All Attributes',
    status: 'All Status',
    searchTerm: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [view, setView] = useState<'card' | 'table'>('table');

  const allRecords = useMemo(() => parseCSV(csvData), []);

  const uniqueDomains = useMemo(() => {
    const domains = Array.from(new Set(allRecords.map(r => r.domain))).sort();
    return ['All Domains', ...domains];
  }, [allRecords]);

  const availableLogicalTables = useMemo(() => {
    if (filters.domain === 'All Domains') {
      const tables = Array.from(new Set(allRecords.map(r => r.logicalTableName))).sort();
      return ['All Tables', ...tables];
    }
    const tables = Array.from(new Set(
      allRecords
        .filter(r => r.domain === filters.domain)
        .map(r => r.logicalTableName)
    )).sort();
    return ['All Tables', ...tables];
  }, [allRecords, filters.domain]);

  const availableAttributes = useMemo(() => {
    let filteredRecords = allRecords;
    
    if (filters.domain !== 'All Domains') {
      filteredRecords = filteredRecords.filter(r => r.domain === filters.domain);
    }
    
    if (filters.logicalTable !== 'All Tables') {
      filteredRecords = filteredRecords.filter(r => r.logicalTableName === filters.logicalTable);
    }
    
    const attributes = Array.from(new Set(filteredRecords.map(r => r.attributeName))).sort();
    return ['All Attributes', ...attributes];
  }, [allRecords, filters.domain, filters.logicalTable]);

  const filteredRecords = useMemo(() => {
    let filtered = allRecords;

    if (filters.domain !== 'All Domains') {
      filtered = filtered.filter(r => r.domain === filters.domain);
    }

    if (filters.logicalTable !== 'All Tables') {
      filtered = filtered.filter(r => r.logicalTableName === filters.logicalTable);
    }

    if (filters.attribute !== 'All Attributes') {
      filtered = filtered.filter(r => r.attributeName === filters.attribute);
    }

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(r =>
        r.definition.toLowerCase().includes(searchLower) ||
        r.attributeName.toLowerCase().includes(searchLower) ||
        r.physicalTableName.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [allRecords, filters]);

  const paginatedRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredRecords.slice(startIndex, endIndex);
  }, [filteredRecords, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);

  const dataQualityStats = useMemo(() => {
    return calculateDataQuality(filteredRecords);
  }, [filteredRecords]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      
      // Reset dependent filters when parent filter changes
      if (key === 'domain') {
        newFilters.logicalTable = 'All Tables';
        newFilters.attribute = 'All Attributes';
      } else if (key === 'logicalTable') {
        newFilters.attribute = 'All Attributes';
      }
      
      return newFilters;
    });
    
    // Reset to first page when filters change
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      domain: 'All Domains',
      logicalTable: 'All Tables',
      attribute: 'All Attributes',
      status: 'All Status',
      searchTerm: ''
    });
    setCurrentPage(1);
  };

  return {
    filters,
    filteredRecords,
    paginatedRecords,
    dataQualityStats,
    uniqueDomains,
    availableLogicalTables,
    availableAttributes,
    currentPage,
    totalPages,
    itemsPerPage,
    view,
    updateFilter,
    clearFilters,
    setCurrentPage,
    setView
  };
};