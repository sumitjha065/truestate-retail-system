/**
 * @file FilterBar.jsx
 * @description Component rendering the row of filter dropdowns and date/age inputs.
 */
import React from 'react';
import Dropdown from '../common/Dropdown';
import AgeInput from './AgeInput';
import { Calendar, Filter } from 'lucide-react';
import { useFilters } from '../../hooks/useFilters';
import {
  GENDER_OPTIONS,
  PAYMENT_METHODS,
  ORDER_STATUSES,
} from '../../utils/constants';

/**
 * FilterBar Component
 * @param {Object} props
 * @param {Object} props.filters - Current filter state object.
 * @param {Function} props.onFilterChange - Handler for generic filter updates.
 * @param {Function} props.onAgeRangeChange - Handler for age range updates.
 * @param {Function} props.onDateRangeChange - Handler for date range updates.
 */
const FilterBar = ({
  filters,
  onFilterChange,
  onAgeRangeChange,
  onDateRangeChange,
}) => {
  const { filterOptions } = useFilters();

  const regionOptions =
    filterOptions.regions?.map((region) => ({ value: region, label: region })) ||
    [];
  const categoryOptions =
    filterOptions.categories?.map((cat) => ({ value: cat, label: cat })) || [];
  const tagOptions =
    filterOptions.tags?.map((tag) => ({ value: tag, label: tag })) || [];

  const handleClearAll = () => {
    onFilterChange('customerRegion', []);
    onFilterChange('gender', []);
    onFilterChange('productCategory', []);
    onFilterChange('tags', []);
    onFilterChange('paymentMethod', []);
    onFilterChange('orderStatus', []);
    onAgeRangeChange('', '');
    onDateRangeChange('', '');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
      {/* Header row: icon + "Filters" + Clear link */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-800">Filters</span>
        </div>
        <button
          onClick={handleClearAll}
          className="text-xs font-medium text-blue-600 hover:text-blue-800"
        >
          Clear all filters
        </button>
      </div>

      {/* Main filter grid – Flex wrap for better responsiveness */}
      <div className="flex flex-wrap gap-4 items-end">
        {/* Customer Region */}
        <div className="flex-1 min-w-[200px]">
          <Dropdown
            label="Customer Region"
            options={regionOptions}
            value={filters.customerRegion}
            onChange={(value) => onFilterChange('customerRegion', value)}
            multiple
            placeholder="All Regions"
          />
        </div>

        {/* Gender */}
        <div className="flex-1 min-w-[150px]">
          <Dropdown
            label="Gender"
            options={GENDER_OPTIONS}
            value={filters.gender}
            onChange={(value) => onFilterChange('gender', value)}
            multiple
            placeholder="All Genders"
          />
        </div>

        {/* Age Range */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Age Range
          </label>
          <div className="flex items-center gap-2">
            <AgeInput
              placeholder="Min"
              value={filters.ageRange.min}
              onCommit={(val) => onAgeRangeChange(val, filters.ageRange.max)}
            />
            <span className="text-gray-500 text-xs">to</span>
            <AgeInput
              placeholder="Max"
              value={filters.ageRange.max}
              onCommit={(val) => onAgeRangeChange(filters.ageRange.min, val)}
            />
          </div>
        </div>

        {/* Product Category */}
        <div className="flex-1 min-w-[180px]">
          <Dropdown
            label="Product Category"
            options={categoryOptions}
            value={filters.productCategory}
            onChange={(value) => onFilterChange('productCategory', value)}
            multiple
            placeholder="All Categories"
          />
        </div>

        {/* Payment Method */}
        <div className="flex-1 min-w-[160px]">
          <Dropdown
            label="Payment Method"
            options={PAYMENT_METHODS}
            value={filters.paymentMethod}
            onChange={(value) => onFilterChange('paymentMethod', value)}
            multiple
            placeholder="All Methods"
          />
        </div>

        {/* Tags */}
        <div className="flex-1 min-w-[140px]">
          <Dropdown
            label="Tags"
            options={tagOptions}
            value={filters.tags}
            onChange={(value) => onFilterChange('tags', value)}
            multiple
            placeholder="All Tags"
          />
        </div>

        {/* Order Status */}
        <div className="flex-1 min-w-[150px]">
          <Dropdown
            label="Order Status"
            options={ORDER_STATUSES}
            value={filters.orderStatus}
            onChange={(value) => onFilterChange('orderStatus', value)}
            multiple
            placeholder="All Statuses"
          />
        </div>
      </div>

      {/* Date range – full width under main row (like Figma) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Date Range
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={filters.dateRange.start || ''}
                onChange={(e) =>
                  onDateRangeChange(e.target.value, filters.dateRange.end)
                }
                className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <span className="text-gray-500 text-xs">to</span>
            <div className="relative flex-1">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={filters.dateRange.end || ''}
                onChange={(e) =>
                  onDateRangeChange(filters.dateRange.start, e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
