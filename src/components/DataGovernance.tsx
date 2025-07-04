import React from 'react';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle, Shield, Activity } from 'lucide-react';
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
      borderColor: stats.completenessScore >= 80 ? 'border-emerald-200' : stats.completenessScore >= 60 ? 'border-amber-200' : 'border-red-200'
    },
    {
      label: 'Null Values',
      value: `${stats.nullPercentage}%`,
      icon: AlertTriangle,
      color: stats.nullPercentage <= 5 ? 'text-emerald-600' : stats.nullPercentage <= 15 ? 'text-amber-600' : 'text-red-600',
      bgColor: stats.nullPercentage <= 5 ? 'from-emerald-50 to-emerald-100' : stats.nullPercentage <= 15 ? 'from-amber-50 to-amber-100' : 'from-red-50 to-red-100',
      borderColor: stats.nullPercentage <= 5 ? 'border-emerald-200' : stats.nullPercentage <= 15 ? 'border-amber-200' : 'border-red-200'
    },
    {
      label: 'Missing Fields',
      value: `${stats.missingPercentage}%`,
      icon: TrendingUp,
      color: stats.missingPercentage <= 5 ? 'text-emerald-600' : stats.missingPercentage <= 15 ? 'text-amber-600' : 'text-red-600',
      bgColor: stats.missingPercentage <= 5 ? 'from-emerald-50 to-emerald-100' : stats.missingPercentage <= 15 ? 'from-amber-50 to-amber-100' : 'from-red-50 to-red-100',
      borderColor: stats.missingPercentage <= 5 ? 'border-emerald-200' : stats.missingPercentage <= 15 ? 'border-amber-200' : 'border-red-200'
    },
    {
      label: 'Duplicates',
      value: `${stats.duplicatePercentage}%`,
      icon: BarChart3,
      color: stats.duplicatePercentage <= 2 ? 'text-emerald-600' : stats.duplicatePercentage <= 10 ? 'text-amber-600' : 'text-red-600',
      bgColor: stats.duplicatePercentage <= 2 ? 'from-emerald-50 to-emerald-100' : stats.duplicatePercentage <= 10 ? 'from-amber-50 to-amber-100' : 'from-red-50 to-red-100',
      borderColor: stats.duplicatePercentage <= 2 ? 'border-emerald-200' : stats.duplicatePercentage <= 10 ? 'border-amber-200' : 'border-red-200'
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-4 sm:p-8 shadow-xl w-full max-w-full">
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
            <div key={index} className={`bg-gradient-to-br ${metric.bgColor} rounded-2xl p-6 border ${metric.borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/80 rounded-xl shadow-sm">
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <span className={`text-3xl font-bold ${metric.color}`}>{metric.value}</span>
              </div>
              <p className="text-sm font-semibold text-gray-700">{metric.label}</p>
            </div>
          );
        })}
      </div>
      
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
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
    </div>
  );
};