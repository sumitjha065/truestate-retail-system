/**
 * @file transactionService.js
 * @description Service layer for handling all transaction-related API calls.
 * Normalizes API responses to ensure consistent data structure across the app.
 */
import api from "./api";

export const transactionService = {
  // -----------------------------
  // Transactions list
  // -----------------------------
  /**
   * Fetches paginated transaction data.
   * @param {Object} params - Query parameters (page, limit, filters).
   * @returns {Promise<Object>} Normalized response body.
   */
  async getTransactions(params) {
    // api.get might return:
    //  - axios response  -> { data: { ...body } }
    //  - already-unwrapped body -> { ...body }
    const res = await api.get("/transactions", { params });
    const body = res && res.data !== undefined ? res.data : res;
    // backend body is: { success, data: [...], totalCount, page, totalPages, pagination? }
    return body;
  },

  // -----------------------------
  // Filter options (for dropdowns)
  // -----------------------------
  /**
   * Fetches available filter options (regions, categories, etc.).
   * @returns {Promise<Object>} Object containing arrays for each filter type.
   */
  async getFilterOptions() {
    const res = await api.get("/transactions/filter-options");
    const body = res && res.data !== undefined ? res.data : res;

    // body can be:
    //  1) { success, data: { regions, ... } }
    //  2) { regions, genders, ... }
    const inner = body && body.data ? body.data : body;

    return {
      regions: inner?.regions || [],
      genders: inner?.genders || [],
      categories: inner?.categories || [],
      paymentMethods: inner?.paymentMethods || [],
      orderStatuses: inner?.orderStatuses || [],
      tags: inner?.tags || [],
    };
  },

  // -----------------------------
  // Dashboard stats (with filters)
  // -----------------------------
  /**
   * Fetches dashboard statistics based on current filters.
   * @param {Object} params - Active filters and search terms.
   * @returns {Promise<Object>} Object containing calculated stats.
   */
  async getDashboardStats(params) {
    const res = await api.get("/stats/dashboard", { params });
    const body = res && res.data !== undefined ? res.data : res;
    // body can be { success, data: {...} } or directly {...}
    const stats = body && body.data ? body.data : body;
    return stats;
  },
};
