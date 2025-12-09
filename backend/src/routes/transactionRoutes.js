// API route definitions for transaction management.

const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

// Get transactions with filters
router.get("/", transactionController.getTransactions);

// Get filter options
router.get("/filter-options", transactionController.getFilterOptions);

// Get transaction by ID
router.get("/:id", transactionController.getTransactionById);

module.exports = router;
