import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Shield, Activity, Info } from 'lucide-react';
import { DataQualityStats } from '../types';

interface DataGovernanceProps {
  stats: DataQualityStats;
}

export const DataGovernance: React.FC<DataGovernanceProps> = ({ stats }) => {
  const qualityMetrics = [
    {
      label: 'Completeness Score',
      value: `${stats.completenessScore}%`,
      icon: CheckCircle,
      color: stats.completenessScore >= 80 ? 'text-emerald-600' : stats.completenessScore >= 60 ? 'text-amber-600' : 'text-red-600',
      bgColor: stats.completenessScore >= 80 ? 'from-emerald-50 to-emerald-100' : stats.completenessScore >= 60 ? 'from-amber-50 to-amber-100' : 'from-red-50 to-red-100',
      borderColor: stats.completenessScore >= 80 ? 'border-emerald-200' : stats.completenessScore >= 60 ? 'border-amber-200' : 'border-red-200',
      tooltip: 'Percentage of records with all required fields populated.'
    },
    {
      label: 'Null Values',
      value: `${stats.nullPercentage}%`,
      icon: AlertTriangle,
      color: stats.nullPercentage <= 5 ? 'text-emerald-600' : stats.nullPercentage <= 15 ? 'text-amber-600' : 'text-red-600',
      bgColor: stats.nullPercentage <= 5 ? 'from-emerald-50 to-emerald-100' : stats.nullPercentage <= 15 ? 'from-amber-50 to-amber-100' : 'from-red-50 to-red-100',
      borderColor: stats.nullPercentage <= 5 ? 'border-emerald-200' : stats.nullPercentage <= 15 ? 'border-amber-200' : 'border-red-200',
      tooltip: 'Percentage of fields that are empty or null.'
    },
    {
      label: 'Missing Fields',
      value: `${stats.missingPercentage}%`,
      icon: TrendingUp,
      color: stats.missingPercentage <= 5 ? 'text-emerald-600' : stats.missingPercentage <= 15 ? 'text-amber-600' : 'text-red-600',
      bgColor: stats.missingPercentage <= 5 ? 'from-emerald-50 to-emerald-100' : stats.missingPercentage <= 15 ? 'from-amber-50 to-amber-100' : 'from-red-50 to-red-100',
      borderColor: stats.missingPercentage <= 5 ? 'border-emerald-200' : stats.missingPercentage <= 15 ? 'border-amber-200' : 'border-red-200',
      tooltip: 'Percentage of records missing critical fields.'
    },
    {
      label: 'Duplicates',
      value: `${stats.duplicatePercentage}%`,
      icon: BarChart3,
      color: stats.duplicatePercentage <= 2 ? 'text-emerald-600' : stats.duplicatePercentage <= 10 ? 'text-amber-600' : 'text-red-600',
      bgColor: stats.duplicatePercentage <= 2 ? 'from-emerald-50 to-emerald-100' : stats.duplicatePercentage <= 10 ? 'from-amber-50 to-amber-100' : 'from-red-50 to-red-100',
      borderColor: stats.duplicatePercentage <= 2 ? 'border-emerald-200' : stats.duplicatePercentage <= 10 ? 'border-amber-200' : 'border-red-200',
      tooltip: 'Percentage of duplicate records detected.'
    }
  ];

  // Commentary logic
  let commentary = '';
  let trendIcon = null;
  if (stats.completenessScore >= 90 && stats.nullPercentage <= 5) {
    commentary = 'Excellent data quality! Keep up the good governance.';
    trendIcon = <TrendingUp className="inline h-5 w-5 text-emerald-500 ml-1" />;
  } else if (stats.completenessScore >= 70) {
    commentary = 'Data quality is good, but there is room for improvement.';
    trendIcon = <TrendingUp className="inline h-5 w-5 text-amber-500 ml-1" />;
  } else {
    commentary = 'Attention needed: Data quality issues detected. Review missing and null fields.';
    trendIcon = <TrendingDown className="inline h-5 w-5 text-red-500 ml-1" />;
  }

  return (
    <div className="bg-white/90 backdrop-blur border border-white/50 rounded-2xl p-4 sm:p-8 shadow-2xl w-full max-w-full">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
          <Shield className="h-7 w-7 text-white max-w-full" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-transparent">
            Data Governance & Quality
          </h2>
          <p className="text-gray-600 mt-1 text-xs sm:text-sm">Monitor data quality metrics and governance standards</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {qualityMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className={`relative bg-gradient-to-br ${metric.bgColor} rounded-2xl p-6 border ${metric.borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/80 rounded-xl shadow-sm">
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <span className={`text-3xl font-bold ${metric.color}`}>{metric.value}</span>
              </div>
              <p className="text-sm font-semibold text-gray-700 flex items-center">
                {metric.label}
                <span className="ml-1 group relative">
                  <Info className="h-4 w-4 text-gray-400 hover:text-blue-500 cursor-pointer" />
                  <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-gray-900 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    {metric.tooltip}
                  </span>
                </span>
              </p>
              {/* Progress bar for completeness */}
              {metric.label === 'Completeness Score' && (
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: stats.completenessScore + '%' }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Activity className="h-5 w-5 text-blue-600" />
            <div>
              <span className="text-sm text-gray-600">Total Records: </span>
              <span className="font-bold text-gray-900 text-lg">{stats.totalRecords.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Last Updated: </span>
            <span className="font-semibold text-gray-900">Just now</span>
          </div>
        </div>
      </div>
      {/* Commentary Section */}
      <div className="mt-2 p-4 rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 flex items-center">
        <span className="text-base font-semibold text-gray-800 flex items-center">
          {commentary} {trendIcon}
        </span>
      </div>
    </div>
  );
};