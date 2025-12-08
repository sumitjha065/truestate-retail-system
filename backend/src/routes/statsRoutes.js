/**
 * @file statsRoutes.js
 * @description API route definitions for dashboard analytics.
 */

const express = require("express");
const router = express.Router();

const { getDashboardStats } = require("../controllers/statsController");

/**
 * @route GET /api/stats/dashboard
 * @description Get aggregated statistics for the dashboard (units, revenue, discounts).
 * Supports all transaction filters.
 * @access Public
 */
router.get("/dashboard", getDashboardStats);

module.exports = router;
