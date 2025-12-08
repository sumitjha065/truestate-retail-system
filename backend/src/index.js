/**
 * @file index.js
 * @description Entry point for the Retail Management System API.
 * Handles server configuration, database connection, middleware setup, and route aggregation.
 */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Debug env
console.log("📋 Environment Check:");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);
console.log("MONGODB_URI exists?", !!process.env.MONGODB_URI);

// Clean debug URI
let mongoURIDebug = process.env.MONGODB_URI || "";
if (mongoURIDebug.startsWith("MONGODB_URI=")) {
  mongoURIDebug = mongoURIDebug.substring("MONGODB_URI=".length);
}
console.log(
  "MONGODB_URI value:",
  mongoURIDebug ? mongoURIDebug.substring(0, 50) + "..." : "NOT FOUND"
);

// Import routes
const transactionRoutes = require("./routes/transactionRoutes");
const statsRoutes = require("./routes/statsRoutes");

// -----------------------------------------------------------------------------
// CORE CONFIGURATION
// -----------------------------------------------------------------------------
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  })
);
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Retail Management System API is running",
    timestamp: new Date().toISOString(),
  });
});

// Test MongoDB connection endpoint
app.get("/test-db", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({
      status: "OK",
      message: "MongoDB connection is working",
      connectionState: mongoose.connection.readyState,
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "MongoDB connection failed",
      error: error.message,
    });
  }
});

// API Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/stats", statsRoutes);

// -----------------------------------------------------------------------------
// DATABASE CONNECTION
// -----------------------------------------------------------------------------

/**
 * Connects to MongoDB Atlas using Mongoose.
 * Validates environment variables and handles connection errors gracefully.
 */
const connectDB = async () => {
  try {
    let mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("❌ MONGODB_URI is not defined in environment variables");
    }

    mongoURI = mongoURI.trim();
    if (mongoURI.startsWith("MONGODB_URI=")) {
      console.log('⚠️  Cleaning duplicate "MONGODB_URI=" from URI');
      mongoURI = mongoURI.substring("MONGODB_URI=".length);
    }

    console.log("🔗 Attempting to connect to MongoDB...");
    console.log("Cleaned URI starts with:", mongoURI.substring(0, 30) + "...");

    await mongoose.connect(mongoURI, {
      maxPoolSize: 100,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ MongoDB Atlas connected successfully");
    console.log("📊 Database:", mongoose.connection.name);
    console.log("🔌 Connection state:", mongoose.connection.readyState);

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log("📚 Collections found:", collections.map((c) => c.name));

    const salesCollection = collections.find((c) => c.name === "sales");
    if (salesCollection) {
      const count = await mongoose.connection.db
        .collection("sales")
        .countDocuments();
      console.log(
        `📊 Documents in 'sales' collection: ${count.toLocaleString()}`
      );
    } else {
      console.warn(
        '⚠️  "sales" collection not found! Available collections:',
        collections.map((c) => c.name)
      );
    }

    mongoose.set("debug", process.env.NODE_ENV === "development");
  } catch (error) {
    console.error("❌ MongoDB connection failed:");
    console.error("Error:", error.message);

    if (error.name === "MongoParseError") {
      console.error(
        "💡 URI parsing error. Check your connection string format (mongodb+srv:// or mongodb://)."
      );
    }

    if (error.code === "ENOTFOUND") {
      console.error("💡 Network error: Cannot resolve MongoDB hostname");
    }

    console.error("💡 Check your .env file for MONGODB_URI variable");
    process.exit(1);
  }
};

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

/**
 * Initializes and starts the Express server.
 */
const startServer = async () => {
  try {
    console.log("🚀 Starting Retail Management System Server...");
    console.log("📁 Current directory:", __dirname);

    await connectDB();

    app.listen(PORT, () => {
      console.log("=========================================");
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 API Base URL: http://localhost:${PORT}`);
      console.log(`🏥 Health check: http://localhost:${PORT}/health`);
      console.log(`🗄️  DB test: http://localhost:${PORT}/test-db`);
      console.log("=========================================");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
