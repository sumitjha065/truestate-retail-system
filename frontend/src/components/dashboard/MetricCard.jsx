// src/components/dashboard/MetricCard.jsx
import React from 'react';
import { formatters } from '../../utils/formatters';

const MetricCard = ({ title, value, subtitle, loading = false }) => {
  const getFormattedValue = () => {
    if (title.toLowerCase().includes('amount') || title.toLowerCase().includes('discount')) {
      return formatters.formatCurrency(value);
    }
    return formatters.formatNumber(value);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
        <div className="h-7 bg-gray-200 rounded w-32 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-20" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 px-4 py-3">
      <p className="text-xs font-medium text-gray-500 mb-1">{title}</p>
      <p className="text-2xl font-semibold text-gray-900 leading-tight">
        {getFormattedValue()}
      </p>
      {subtitle && (
        <p className="mt-1 text-xs text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default MetricCard;
