// Main dashboard view integrating filtering, metrics, and data table.
import React from "react";
import { useTransactions } from "../hooks/useTransactions";
import MetricCard from "../components/dashboard/MetricCard";
import FilterBar from "../components/dashboard/FilterBar";
import DataTable from "../components/table/DataTable";
import Pagination from "../components/common/Pagination";
import SearchBar from "../components/common/SearchBar";
import { formatters } from "../utils/formatters";
import { SORT_OPTIONS } from "../utils/constants";

const Dashboard = () => {
  const {
    data,
    loading,
    error,
    stats,
    filters,
    updateFilter,
    updateAgeRange,
    updateDateRange,
    clearFilters,
    sortBy,
    sortOrder,
    handleSort,
    search,
    handleSearch,
    page,
    totalPages,
    totalCount,
    goToPage,
    refresh,
  } = useTransactions();

  // Handlers

  const handleFilterChange = (filterName, value) => updateFilter(filterName, value);
  const handleAgeRangeChange = (min, max) => updateAgeRange(min, max);
  const handleDateRangeChange = (start, end) => updateDateRange(start, end);

  const handleSelectRow = (transaction) => {
  };

  // Dashboard Metric Cards
  const metrics = [
    {
      title: "Total units sold",
      value: stats?.totalUnitsSold || 0,
      subtitle: `${formatters.formatNumber(stats?.totalTransactions || 0)} SRs`,
    },
    {
      title: "Total Amount",
      value: stats?.totalAmount || 0,
      subtitle: `${formatters.formatNumber(
        stats?.totalSalesOrders || stats?.totalTransactions || 0
      )} SRs`,
    },
    {
      title: "Total Discount",
      value: stats?.totalDiscount || 0,
      subtitle: `${formatters.formatNumber(stats?.discountedSalesCount || 0)} SRs`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Sales Management System
          </h1>

          <div className="flex flex-col md:flex-row md:items-end gap-3 w-full md:w-auto">
            <div className="w-full md:w-72">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Name, Phone no."
                initialValue={search}
              />
            </div>

            <div className="md:w-56">
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Sort by
              </label>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => handleSort(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Filters */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onAgeRangeChange={handleAgeRangeChange}
          onDateRangeChange={handleDateRangeChange}
        />

        {/* Metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-6">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              subtitle={metric.subtitle}
              loading={!stats}
            />
          ))}
        </div>

        {/* Table Section */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-5 py-3 border-b border-gray-200">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Transactions</h2>
              <p className="text-xs text-gray-500">
                Showing {data.length} of {formatters.formatNumber(totalCount)} transactions
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={refresh}
                className="px-3 py-1.5 text-xs md:text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Refresh
              </button>
              <button
                onClick={clearFilters}
                className="px-3 py-1.5 text-xs md:text-sm bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
              >
                Clear Filters
              </button>
            </div>
          </div>

          <DataTable
            data={data}
            loading={loading}
            error={error}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
            onSelectRow={handleSelectRow}
          />
        </section>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
