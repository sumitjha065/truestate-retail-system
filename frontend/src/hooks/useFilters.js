/**
 * @file useFilters.js
 * @description Custom hook to fetch dynamic filter options (regions, categories, etc.) from the backend.
 */
import { useState, useEffect } from "react";
import { transactionService } from "../services/transactionService";

const EMPTY_OPTIONS = {
  regions: [],
  genders: [],
  categories: [],
  paymentMethods: [],
  orderStatuses: [],
  tags: [],
};

/**
 * Hook to load and store filter dropdown options.
 * @returns {Object} filterOptions object and loading state.
 */
export const useFilters = () => {
  const [filterOptions, setFilterOptions] = useState(EMPTY_OPTIONS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        setLoading(true);
        const options = await transactionService.getFilterOptions();
        // options is already { regions, genders, ... } from the service
        setFilterOptions({
          ...EMPTY_OPTIONS,
          ...options,
        });
      } catch (error) {
        console.error("Error loading filter options:", error);
        setFilterOptions(EMPTY_OPTIONS);
      } finally {
        setLoading(false);
      }
    };

    loadFilterOptions();
  }, []);

  return {
    filterOptions,
    loading,
  };
};
