# TruEstate Retail System

## Overview
This enterprise-grade retail management dashboard is engineered to provide real-time visibility into transaction metrics and sales performance. Built on the MERN stack, it features a highly responsive UI for analyzing complex datasets through simplified filtering and aggregation. The system emphasizes data accuracy, optimized query performance, and a seamless user experience for retail administrators.

## Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **State Management**: React Hooks (useContext/useState)

## Search Implementation Summary
Search functionality is implemented server-side using MongoDB's `$or` operator to perform multi-field matching. It utilizes regex pattern matching with the `i` (case-insensitive) flag against indexed `Customer Name` columns. Additionally, it employs an aggregation expression to dynamically cast mixed-type `Phone Number` fields to strings, ensuring comprehensive recall across diverse data formats.

## Filter Implementation Summary
The filtering engine dynamically constructs complex MongoDB query objects based on request parameters. It supports multi-select values using the `$in` operator for categorical fields (Region, Gender, Payment). For range-based filtering (Age), it utilizes the `$expr` operator with `$toInt` logic to enforce type safety on legacy string data, while date filtering employs `$gte` and `$lte` timestamp comparisons.

## Sorting Implementation Summary
Sorting is handled at the database layer to ensure O(n) efficiency on large datasets. The API accepts dynamic `sortBy` and `sortOrder` parameters, which are translated into Mongoose sort objects (e.g., `{ "Date": -1 }`). Numeric sorting on potentially non-numeric fields is handled via aggregation projections to ensure mathematical correctness over lexicographical order.

## Pagination Implementation Summary
Server-side pagination is architected using the efficient `skip` and `limit` approach on the database cursor. The backend calculates total document counts and page metadata (total pages, current page, hasNext) in parallel with the data fetch, delivering a complete paginated response object that drives the frontend's navigation controls.

## Setup Instructions

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd truestate-retail-system
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    # Create .env with: PORT=5000, MONGODB_URI=your_connection_string
    npm start
    ```

3.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```