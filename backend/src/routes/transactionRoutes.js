/**
 * @file transactionRoutes.js
 * @description API route definitions for transaction management.
 * Maps HTTP methods to specific controller functions.
 */

const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

/**
 * @route GET /api/transactions
 * @description Retrieve a list of transactions with optional filters.
 * @access Public
 */
router.get("/", transactionController.getTransactions);

/**
 * @route GET /api/transactions/filter-options
 * @description Get valid options for filter dropdowns.
 * @access Public
 */
router.get("/filter-options", transactionController.getFilterOptions);

/**
 * @route GET /api/transactions/:id
 * @description Get details of a specific transaction.
 * @access Public
 */
router.get("/:id", transactionController.getTransactionById);

module.exports = router;
