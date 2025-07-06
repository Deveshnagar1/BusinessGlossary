import React, { useState } from 'react';
import { RotateCcw, Sparkles, Brain } from 'lucide-react';
import { FilterDropdown } from './components/FilterDropdown';
import { SearchInput } from './components/SearchInput';
import { DataCard } from './components/DataCard';
import { DataTable } from './components/DataTable';
import { DataGovernance } from './components/DataGovernance';
import { ViewToggle } from './components/ViewToggle';
import { Pagination } from './components/Pagination';
import { AIInsights } from './components/AIInsights';
import { ExportDropdown } from './components/ExportDropdown';
import { useBusinessGlossary } from './hooks/useBusinessGlossary';

function App() {
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [executiveView, setExecutiveView] = useState(false);
  
  const {
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
  } = useBusinessGlossary();

  const statusOptions = ['All Status', 'Active', 'Inactive', 'Pending'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 w-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmMWY1ZjkiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSI3IiBjeT0iNyIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 gap-4 w-full">
          <div className="space-y-4 w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Sparkles className="h-8 w-8 text-white max-w-full" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                  Business Glossary
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mt-1">
                  Discover data definitions across <span className="font-semibold text-blue-600">{uniqueDomains.length - 1} domains</span> and <span className="font-semibold text-indigo-600">{availableLogicalTables.length - 1} logical tables</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            {/* Executive View Toggle */}
            <label className="flex items-center space-x-2 bg-white/80 px-3 py-2 rounded-xl border border-gray-200 shadow-sm cursor-pointer">
              <input
                type="checkbox"
                checked={executiveView}
                onChange={e => setExecutiveView(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Executive view</span>
            </label>
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200 shadow-sm">
              <span className="text-blue-700 font-semibold">{filteredRecords.length} results</span>
            </div>
            <button 
              onClick={() => setShowAIInsights(true)}
              className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Brain className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">AI Insights</span>
            </button>
            <ExportDropdown 
              records={filteredRecords} 
              totalRecords={dataQualityStats.totalRecords}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <FilterDropdown
              label="Domain"
              value={filters.domain}
              options={uniqueDomains}
              onChange={(value) => updateFilter('domain', value)}
            />
            <FilterDropdown
              label="Logical Table Name"
              value={filters.logicalTable}
              options={availableLogicalTables}
              onChange={(value) => updateFilter('logicalTable', value)}
            />
            <FilterDropdown
              label="Attribute Name"
              value={filters.attribute}
              options={availableAttributes}
              onChange={(value) => updateFilter('attribute', value)}
            />
            <FilterDropdown
              label="Status"
              value={filters.status}
              options={statusOptions}
              onChange={(value) => updateFilter('status', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-lg">
              <SearchInput
                value={filters.searchTerm}
                onChange={(value) => updateFilter('searchTerm', value)}
                placeholder="Search within definitions and business rules..."
              />
            </div>
            <div className="flex items-center space-x-4 ml-6">
              <ViewToggle view={view} onViewChange={setView} />
              <button
                onClick={clearFilters}
                className="group flex items-center space-x-2 px-5 py-3 text-gray-600 hover:text-gray-800 bg-white/50 hover:bg-white/80 rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-300 hover:shadow-md"
              >
                <RotateCcw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
                <span className="font-medium">Clear Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-12">
          {filteredRecords.length > 0 ? (
            <>
              {view === 'card' ? (
                <div className="space-y-6">
                  {paginatedRecords.map((record, index) => (
                    <DataCard key={index} record={record} />
                  ))}
                </div>
              ) : (
                <DataTable records={paginatedRecords} hidePhysicalTable={executiveView} />
              )}
              
              {/* Pagination */}
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredRecords.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          ) : (
            <div className="text-center py-20 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">No results found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms to discover more data definitions</p>
              </div>
            </div>
          )}
        </div>

        {/* Data Governance Section */}
        <div className="mt-12">
          <DataGovernance stats={dataQualityStats} />
        </div>

        {/* AI Insights Modal */}
        {showAIInsights && (
          <AIInsights 
            records={filteredRecords} 
            onClose={() => setShowAIInsights(false)} 
          />
        )}
      </div>
    </div>
  );
}

export default App;