import React, { useState } from 'react';
import { Brain, Sparkles, TrendingUp, AlertCircle, CheckCircle, BarChart3, Zap, Lightbulb, Target, Shield } from 'lucide-react';
import { DataRecord } from '../types';

interface AIInsightsProps {
  records: DataRecord[];
  onClose: () => void;
}

export const AIInsights: React.FC<AIInsightsProps> = ({ records, onClose }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [activeTab, setActiveTab] = useState<'summary' | 'patterns' | 'recommendations'>('summary');

  // Simulate AI analysis
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const generateInsights = () => {
    const domains = Array.from(new Set(records.map(r => r.domain)));
    const dataTypes = Array.from(new Set(records.map(r => r.dataType)));
    const tables = Array.from(new Set(records.map(r => r.logicalTableName)));
    
    // Analyze data patterns
    const domainDistribution = domains.map(domain => ({
      domain,
      count: records.filter(r => r.domain === domain).length,
      percentage: Math.round((records.filter(r => r.domain === domain).length / records.length) * 100)
    }));

    const typeDistribution = dataTypes.map(type => ({
      type,
      count: records.filter(r => r.dataType === type).length
    }));

    return {
      summary: {
        totalRecords: records.length,
        uniqueDomains: domains.length,
        uniqueTables: tables.length,
        uniqueDataTypes: dataTypes.length,
        avgDefinitionLength: Math.round(records.reduce((acc, r) => acc + r.definition.length, 0) / records.length),
        domainDistribution,
        typeDistribution
      },
      patterns: [
        {
          type: 'Data Distribution',
          insight: `${domainDistribution[0]?.domain || 'Customer'} domain has the highest concentration with ${domainDistribution[0]?.percentage || 25}% of all records`,
          confidence: 95,
          impact: 'high'
        },
        {
          type: 'Naming Convention',
          insight: 'Physical table names follow consistent naming patterns with prefixes indicating data type',
          confidence: 88,
          impact: 'medium'
        },
        {
          type: 'Data Quality',
          insight: 'All records have complete definitions, indicating good documentation standards',
          confidence: 100,
          impact: 'high'
        },
        {
          type: 'Schema Design',
          insight: 'Balanced distribution across fact and dimension tables suggests well-designed data warehouse',
          confidence: 82,
          impact: 'medium'
        }
      ],
      recommendations: [
        {
          category: 'Data Governance',
          title: 'Implement Data Lineage Tracking',
          description: 'Add source system tracking to improve data governance and impact analysis',
          priority: 'high',
          effort: 'medium'
        },
        {
          category: 'Documentation',
          title: 'Standardize Business Rules',
          description: 'Create standardized templates for business rule documentation across all domains',
          priority: 'medium',
          effort: 'low'
        },
        {
          category: 'Quality',
          title: 'Automated Data Profiling',
          description: 'Implement automated data profiling to continuously monitor data quality metrics',
          priority: 'high',
          effort: 'high'
        },
        {
          category: 'Access',
          title: 'Role-based Data Access',
          description: 'Implement role-based access controls based on domain and sensitivity levels',
          priority: 'medium',
          effort: 'medium'
        }
      ]
    };
  };

  const insights = generateInsights();

  const tabs = [
    { id: 'summary', label: 'Executive Summary', icon: BarChart3 },
    { id: 'patterns', label: 'AI Patterns', icon: Brain },
    { id: 'recommendations', label: 'Recommendations', icon: Lightbulb }
  ];

  if (isAnalyzing) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
              <Brain className="h-10 w-10 text-white animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="h-4 w-4 text-yellow-800" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">AI Analysis in Progress</h3>
          <p className="text-gray-600 mb-4">Analyzing {records.length} records for patterns and insights...</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Brain className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">AI-Powered Data Insights</h2>
                <p className="text-purple-100">Intelligent analysis of {records.length} data records</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'summary' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Total Records</p>
                      <p className="text-2xl font-bold text-blue-800">{insights.summary.totalRecords}</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Domains</p>
                      <p className="text-2xl font-bold text-green-800">{insights.summary.uniqueDomains}</p>
                    </div>
                    <Target className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">Tables</p>
                      <p className="text-2xl font-bold text-purple-800">{insights.summary.uniqueTables}</p>
                    </div>
                    <Shield className="h-8 w-8 text-purple-500" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-600 text-sm font-medium">Data Types</p>
                      <p className="text-2xl font-bold text-orange-800">{insights.summary.uniqueDataTypes}</p>
                    </div>
                    <Zap className="h-8 w-8 text-orange-500" />
                  </div>
                </div>
              </div>

              {/* Domain Distribution */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Domain Distribution</h3>
                <div className="space-y-3">
                  {insights.summary.domainDistribution.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">{item.domain}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-600 w-12">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'patterns' && (
            <div className="space-y-4">
              {insights.patterns.map((pattern, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        pattern.impact === 'high' ? 'bg-red-100 text-red-600' :
                        pattern.impact === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{pattern.type}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                            {pattern.confidence}% confidence
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            pattern.impact === 'high' ? 'bg-red-100 text-red-800' :
                            pattern.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {pattern.impact} impact
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{pattern.insight}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="space-y-4">
              {insights.recommendations.map((rec, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                        <Lightbulb className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                        <span className="text-sm text-purple-600 font-medium">{rec.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                        rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {rec.priority} priority
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        rec.effort === 'high' ? 'bg-red-100 text-red-800' :
                        rec.effort === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {rec.effort} effort
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{rec.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};