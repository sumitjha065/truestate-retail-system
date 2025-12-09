// Custom hook for managing transaction state, searching, filtering, and pagination.
import { useState, useEffect, useCallback } from "react";
import { transactionService } from "../services/transactionService";
import { DEFAULT_FILTERS } from "../utils/constants";

// Hook to manage transaction data lifecycle
export const useTransactions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState("Date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");

  const [stats, setStats] = useState(null);

  // Fetch transactions



  // Fetch transactions based on current state
  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page,
        limit: 10,
        search: search.trim(),
        sortBy,
        sortOrder,

        customerRegion: filters.customerRegion,
        gender: filters.gender,
        productCategory: filters.productCategory,
        tags: filters.tags,
        paymentMethod: filters.paymentMethod,
        orderStatus: filters.orderStatus,

        ageRange: JSON.stringify({
          min: filters.ageRange.min === "" || filters.ageRange.min === undefined ? 0 : filters.ageRange.min,
          max: filters.ageRange.max === "" || filters.ageRange.max === undefined ? 100 : filters.ageRange.max,
        }),
        dateRange: JSON.stringify({ ...filters.dateRange }),
      };

      const result = await transactionService.getTransactions(params);

      const rows = result?.data || result?.transactions || [];
      const pagination = result?.pagination || result || {};

      setData(Array.isArray(rows) ? rows : []);

      const total =
        pagination.total ||
        pagination.totalCount ||
        0;

      setTotalCount(total);
      setTotalPages(
        pagination.totalPages ||
        (total ? Math.ceil(total / 10) : 1)
      );
    } catch (err) {
      console.error("❌ Fetch transactions error:", err);
      setError(err.message || "Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  }, [page, search, sortBy, sortOrder, filters]);

  // Fetches equivalent dashboard stats for the current filter set
  const fetchStats = useCallback(async () => {
    try {
      const params = {
        ...filters, // Helper arrays
        search: search.trim(),
        sortBy,
        sortOrder,
        // Override complex objects with JSON strings to match backend expectations
        ageRange: JSON.stringify({
          min: filters.ageRange.min === "" || filters.ageRange.min === undefined ? 0 : filters.ageRange.min,
          max: filters.ageRange.max === "" || filters.ageRange.max === undefined ? 100 : filters.ageRange.max,
        }),
        dateRange: JSON.stringify({ ...filters.dateRange }),
      };

      const statsObj = await transactionService.getDashboardStats(params);
      setStats(statsObj || null);
    } catch (err) {
      console.error("Fetch stats error:", err);
    }
  }, [filters, search, sortBy, sortOrder]);

  // Initial data load
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Filter & Sort updates
  const updateFilter = useCallback((filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    setPage(1);
  }, []);

  const updateAgeRange = useCallback((min, max) => {
    setFilters((prev) => ({
      ...prev,
      ageRange: {
        min: min === "" ? "" : parseInt(min),
        max: max === "" ? "" : parseInt(max),
      },
    }));
    setPage(1);
  }, []);

  const updateDateRange = useCallback((start, end) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: { start, end },
    }));
    setPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSearch("");
    setSortBy("Date");
    setSortOrder("desc");
    setPage(1);
  }, []);

  const handleSort = useCallback((sortInput) => {
    // Check if input is a composite string "Field-Order" from dropdown
    if (typeof sortInput === 'string' && sortInput.includes('-')) {
      const [field, order] = sortInput.split('-');
      setSortBy(field);
      setSortOrder(order);
      return;
    }

    // Default toggle behavior (for table headers)
    setSortBy((prevSortBy) => {
      if (prevSortBy === sortInput) {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
        return prevSortBy;
      } else {
        setSortOrder(sortInput === "Date" ? "desc" : "asc");
        return sortInput;
      }
    });
  }, []);

  const goToPage = useCallback((newPage) => {
    // Update page state
    setPage(newPage);
  }, []);

  const handleSearch = useCallback((term) => {
    setSearch(term);
    setPage(1);
  }, []);

  return {
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

    refresh: fetchTransactions,
    refreshStats: fetchStats,
  };
};
