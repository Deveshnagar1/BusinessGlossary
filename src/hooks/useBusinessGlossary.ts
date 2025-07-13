import { useState, useMemo, useEffect, useCallback } from 'react';
import { DataRecord, FilterState } from '../types';
import { parseCSV, calculateDataQuality } from '../utils/csvParser';

export const useBusinessGlossary = () => {
  const [filters, setFilters] = useState<FilterState>({
    domain: 'All Domains',
    logicalTable: 'All Tables',
    attribute: 'All Attributes',
    searchTerm: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [view, setView] = useState<'card' | 'table'>('table');
  const [csvText, setCsvText] = useState('');

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const res = await fetch('/bg.csv');
        const text = await res.text();
        setCsvText(text);
      } catch (err) {
        setCsvText('');
      }
    };
    fetchCSV();
  }, []);

  const allRecords = useMemo(() => csvText ? parseCSV(csvText) : [], [csvText]);

  const uniqueDomains = useMemo(() => {
    return ['All Domains', ...Array.from(new Set(allRecords.map(r => r.domain))).sort()];
  }, [allRecords]);

  const availableLogicalTables = useMemo(() => {
    const tables = filters.domain === 'All Domains'
      ? allRecords.map(r => r.logicalTableName)
      : allRecords.filter(r => r.domain === filters.domain).map(r => r.logicalTableName);
    return ['All Tables', ...Array.from(new Set(tables)).sort()];
  }, [allRecords, filters.domain]);

  const availableAttributes = useMemo(() => {
    let filtered = allRecords;
    if (filters.domain !== 'All Domains') filtered = filtered.filter(r => r.domain === filters.domain);
    if (filters.logicalTable !== 'All Tables') filtered = filtered.filter(r => r.logicalTableName === filters.logicalTable);
    return ['All Attributes', ...Array.from(new Set(filtered.map(r => r.attributeName))).sort()];
  }, [allRecords, filters.domain, filters.logicalTable]);

  const filteredRecords = useMemo(() => {
    let filtered = allRecords;
    if (filters.domain !== 'All Domains') filtered = filtered.filter(r => r.domain === filters.domain);
    if (filters.logicalTable !== 'All Tables') filtered = filtered.filter(r => r.logicalTableName === filters.logicalTable);
    if (filters.attribute !== 'All Attributes') filtered = filtered.filter(r => r.attributeName === filters.attribute);
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(r =>
        r.domain.toLowerCase().includes(searchLower) ||
        r.logicalTableName.toLowerCase().includes(searchLower) ||
        r.attributeName.toLowerCase().includes(searchLower) ||
        (r.definition && r.definition.toLowerCase().includes(searchLower))
      );
    }
    return filtered;
  }, [allRecords, filters]);

  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(start, start + itemsPerPage);
  }, [filteredRecords, currentPage, itemsPerPage]);

  const dataQualityStats = useMemo(() => calculateDataQuality(allRecords), [allRecords]);

  const updateFilter = useCallback((key: keyof FilterState, value: string) => {
    setFilters(prev => {
      if (key === 'domain') {
        return {
          domain: value,
          logicalTable: 'All Tables',
          attribute: 'All Attributes',
          searchTerm: ''
        };
      }
      if (key === 'logicalTable') {
        return {
          domain: prev.domain,
          logicalTable: value,
          attribute: 'All Attributes',
          searchTerm: ''
        };
      }
      if (key === 'attribute') {
        return {
          domain: prev.domain,
          logicalTable: prev.logicalTable,
          attribute: value,
          searchTerm: prev.searchTerm
        };
      }
      if (key === 'searchTerm') {
        return {
          domain: prev.domain,
          logicalTable: prev.logicalTable,
          attribute: prev.attribute,
          searchTerm: value
        };
      }
      return prev;
    });
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      domain: 'All Domains',
      logicalTable: 'All Tables',
      attribute: 'All Attributes',
      searchTerm: ''
    });
    setCurrentPage(1);
  }, []);

  return {
    filters,
    filteredRecords,
    paginatedRecords,
    dataQualityStats,
    uniqueDomains,
    availableLogicalTables,
    availableAttributes,
    currentPage,
    totalPages: Math.ceil(filteredRecords.length / itemsPerPage),
    itemsPerPage,
    view,
    updateFilter,
    clearFilters,
    setCurrentPage,
    setView
  };
};