/**
 * @file transactionController.js
 * @description Controller handling transaction-related API requests.
 * Includes methods for listing (with filters/search), retrieving details, and getting filter options.
 */

const Transaction = require("../models/Transaction");

/**
 * Retrieves a paginated list of transactions with optional filtering and sorting.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} req.query - Query parameters for filtering, sorting, and pagination.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} JSON response with transaction data and pagination info.
 */
const getTransactions = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "Date",
      sortOrder = "desc",
      ...filters
    } = req.query;

    const parsedFilters = {};

    if (filters.customerRegion) {
      parsedFilters.customerRegion = Array.isArray(filters.customerRegion)
        ? filters.customerRegion
        : [filters.customerRegion];
    }

    if (filters.gender) {
      parsedFilters.gender = Array.isArray(filters.gender)
        ? filters.gender
        : [filters.gender];
    }

    if (filters.ageRange) {
      try {
        const parsedAge = JSON.parse(filters.ageRange);
        parsedFilters.ageRange = {
          min: parseInt(parsedAge.min),
          max: parseInt(parsedAge.max)
        };
      } catch (err) {
        parsedFilters.ageRange = null;
      }
    }

    if (filters.productCategory) {
      parsedFilters.productCategory = Array.isArray(filters.productCategory)
        ? filters.productCategory
        : [filters.productCategory];
    }

    if (filters.tags) {
      parsedFilters.tags = Array.isArray(filters.tags)
        ? filters.tags
        : [filters.tags];
    }

    if (filters.paymentMethod) {
      parsedFilters.paymentMethod = Array.isArray(filters.paymentMethod)
        ? filters.paymentMethod
        : [filters.paymentMethod];
    }

    if (filters.dateRange) {
      try {
        parsedFilters.dateRange = JSON.parse(filters.dateRange);
      } catch {
        parsedFilters.dateRange = null;
      }
    }

    if (filters.orderStatus) {
      parsedFilters.orderStatus = Array.isArray(filters.orderStatus)
        ? filters.orderStatus
        : [filters.orderStatus];
    }

    const result = await Transaction.searchWithFilters({
      page: parseInt(page),
      limit: parseInt(limit),
      search,
      sortBy,
      sortOrder,
      filters: parsedFilters,
    });

    return res.json({
      success: true,
      data: result.transactions,
      totalCount: result.pagination.total,
      page: result.pagination.page,
      totalPages: result.pagination.totalPages,
      message: "Transactions retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * Retrieves distinct values for all filterable fields to populate frontend dropdowns.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} JSON response with arrays of distinct values.
 */
const getFilterOptions = async (req, res) => {
  try {
    const filterOptions = await Transaction.getFilterOptions();

    res.json({
      success: true,
      data: filterOptions,
      message: "Filter options retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching filter options:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch filter options",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * Retrieves a single transaction by its custom numeric ID.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} req.params - URL parameters (id).
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} JSON response with the transaction object or 404 error.
 */
const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOne({
      "Transaction ID": parseInt(id),
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.json({
      success: true,
      data: transaction,
      message: "Transaction retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching transaction:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch transaction",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  getTransactions,
  getFilterOptions,
  getTransactionById,
};
