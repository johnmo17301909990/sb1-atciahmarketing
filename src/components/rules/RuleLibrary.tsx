import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Props {
  platformId: string;
}

export function RuleLibrary({ platformId }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const rules = [
    {
      id: '1',
      title: '搜索标题长度限制',
      category: '搜索优化',
      summary: '商品标题长度不得超过60个字符',
      severity: 'high',
      effectiveDate: '2024-02-01',
      updatedAt: '2024-01-20'
    },
    {
      id: '2',
      title: '关键词密度要求',
      category: '搜索优化',
      summary: '核心关键词密度不得超过8%',
      severity: 'medium',
      effectiveDate: '2024-02-01',
      updatedAt: '2024-01-20'
    },
    {
      id: '3',
      title: '搜索权重算法更新',
      category: '搜索优化',
      summary: '新增用户行为数据对搜索排名的影响',
      severity: 'high',
      effectiveDate: '2024-02-15',
      updatedAt: '2024-01-20'
    }
  ];

  const categories = [
    { id: 'search', name: '搜索优化' },
    { id: 'ranking', name: '排名规则' },
    { id: 'algorithm', name: '算法更新' }
  ];

  return (
    <div className="space-y-6">
      {/* 搜索和筛选 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索规则..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white"
        >
          <option value="all">全部分类</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* 规则列表 */}
      <div className="grid grid-cols-1 gap-6">
        {rules.map(rule => (
          <div key={rule.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{rule.title}</h3>
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 mt-2">
                  {rule.category}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                更新于 {new Date(rule.updatedAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{rule.summary}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  rule.severity === 'high' 
                    ? 'bg-red-100 text-red-800'
                    : rule.severity === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {rule.severity === 'high' ? '重要更新' : 
                   rule.severity === 'medium' ? '一般更新' : '小幅更新'}
                </span>
                <span className="text-sm text-gray-500">
                  生效时间：{new Date(rule.effectiveDate).toLocaleDateString()}
                </span>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                查看详情
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}