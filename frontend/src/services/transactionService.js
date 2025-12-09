// Service layer for handling all transaction-related API calls and normalization.
import api from "./api";

export const transactionService = {
  // Fetches paginated transaction data
  async getTransactions(params) {
    // api.get might return:
    //  - axios response  -> { data: { ...body } }
    //  - already-unwrapped body -> { ...body }
    const res = await api.get("/transactions", { params });
    const body = res && res.data !== undefined ? res.data : res;
    // backend body is: { success, data: [...], totalCount, page, totalPages, pagination? }
    return body;
  },

  // Get dynamic filter options from backend

  async getFilterOptions() {
    const res = await api.get("/transactions/filter-options");
    const body = res && res.data !== undefined ? res.data : res;

    // body can be:
    //  1) {success, data: {regions, ... } }
    //  2) {regions, genders, ... }
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

  // Fetch dashboard statistics based on current filters
  async getDashboardStats(params) {
    const res = await api.get("/stats/dashboard", { params });
    const body = res && res.data !== undefined ? res.data : res;
    // body can be {success, data: {...} } or directly {...}
    const stats = body && body.data ? body.data : body;
    return stats;
  },
};
