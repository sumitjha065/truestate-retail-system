// API route definitions for dashboard analytics.

const express = require("express");
const router = express.Router();

const { getDashboardStats } = require("../controllers/statsController");

// Get dashboard statistics
router.get("/dashboard", getDashboardStats);

module.exports = router;
