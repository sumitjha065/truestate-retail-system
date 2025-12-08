# TruEstate Retail System - Backend

## Overview
The backend service acts as the centralized data processing unit for the retail system. It provides a robust RESTful API to handle complex queries, data aggregation, and business rules, ensuring that the frontend receives optimized and accurate datasets.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose ODM)
- **Middleware**: CORS, Dotenv, Helmet (Security)

## Key API Endpoints

### Transactions
- **GET /api/transactions**
    - **Description**: Fetch paginated list of transactions with extensive filtering capabilities.
    - **Parameters**: `page`, `limit`, `search`, `sortBy`, `sortOrder`, and all filters (region, gender, etc.).

### Stats
- **GET /api/transactions/dashboard-stats**
    - **Description**: Retrieve high-level dashboard metrics (Total Sales, Net Discount, etc.) based on current active filters.

- **GET /api/transactions/filter-options**
    - **Description**: Get dynamic lists of available categories, regions, and tags for UI dropdowns.

## Folder Structure
```
backend/
├── src/
│   ├── controllers/   # Request Logic (Transactions, Stats)
│   ├── models/        # Mongoose Schema Definitions
│   ├── routes/        # API Routes
│   ├── services/      # Business Logic Layer
│   └── app.js         # App Configuration
```

## Setup & Development

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Configuration**
    - Copy `.env.example` to `.env`
    - Update `MONGODB_URI` with your connection string.

3.  **Start Server**
    - Development (with hot-reload):
      ```bash
      npm run dev
      ```
    - Production:
      ```bash
      npm start
      ```