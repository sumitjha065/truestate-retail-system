# System Architecture

## 1. Backend Architecture
The backend is engineered using **Node.js** and **Express.js**, adhering to the **Model-View-Controller (MVC)** design pattern (adapted for API-only usage). It emphasizes separation of concerns, scalability, and security.

### Key Architectural Components
-   **Entry Point** (`server.js` / `app.js`): Initializes the Express app, connects to MongoDB via Mongoose, and sets up global middleware (CORS, Helmet, Body Parser).
-   **Controller Layer** (`src/controllers`): Handles incoming HTTP requests, validates input parameters (like `page`, `limit`, `filters`), and formats HTTP responses. It acts as the gateway to business logic.
-   **Model Layer** (`src/models`): Defines the data schema (`Transaction.js`) using Mongoose. It encapsulates data validation rules, default values, and static methods for complex database operations (e.g., `searchWithFilters` aggregation pipelines).
-   **Middleware Pipeline**:
    1.  **Security**: `helmet` (sets HTTP headers), `cors` (controls cross-origin access).
    2.  **Parsing**: `express.json` (parses incoming JSON payloads).
    3.  **Routing**: Routes requests to specific controllers based on path (e.g., `/api/transactions`).

### Design Decisions
-   **Stateless REST API**: The server does not maintain session state between requests, ensuring horizontal scalability.
-   **Aggregation Pipelines**: Complex data processing (filtering, sorting, grouped stats) is offloaded to the database layer using MongoDB Aggregation Framework for maximum performance.

---

## 2. Frontend Architecture
The frontend is a **Single Page Application (SPA)** built with **React 18** and **Vite**, focusing on component reusability and performance.

### Component Hierarchy (Atomic Design Inspiration)
-   **Atoms**: Basic building blocks like `Button`, `Input`, `Badge` (in `src/components/common`).
-   **Molecules**: Functional groups like `FilterBar` (combining dropdowns and inputs), `StatsCard`.
-   **Organisms**: Complex sections like `TransactionTable` (combining headers, rows, pagination).
-   **Pages**: Top-level views like `Dashboard.jsx`.

### State Management Strategy
-   **Lifted State**: The persistent state (transactions list, current filters, pagination) "lifts" up to the `Dashboard` page level via the **Custom Hook** `useTransactions`.
-   **Custom Hooks**:
    -   `useTransactions.js`: Encapsulates all API fetching logic, loading states, and side effects.
    -   `useFilters.js`: Manages the available options for dropdowns (regions, categories) fetched from the backend.

---

## 3. Data Flow (Request Lifecycle)
A typical user interaction (e.g., filtering by "Region: East") follows this standardized flow:

1.  **UI Interaction**: User selects "East" in the `FilterBar` dropdown.
2.  **State Update**: The `Dashboard` component updates its local `filters` state.
3.  **Effect Trigger**: The `useEffect` hook in `useTransactions` detects the state change.
4.  **API Call**: Axios sends a `GET` request to `/api/transactions?customerRegion=East&page=1`.
5.  **Backend Routing**: Express receives the request and routes it to `transactionController.getTransactions`.
6.  **Query Construction**: The controller calls `Transaction.searchWithFilters(query)`, which builds a MongoDB Aggregation Pipeline.
7.  **Database Execution**: MongoDB executes the pipeline:
    -   `$match`: Filters documents where `Customer Region` is "East".
    -   `$sort`: Orders results by Date.
    -   `$facet`: Runs count (total) and skip/limit (pagination) in parallel.
8.  **Response**: The server returns a JSON payload with `data` (rows) and `pagination` (metadata).
9.  **Re-render**: React updates the virtual DOM with the new data, and the `TransactionTable` refreshes.

---

## 4. Folder Structure
The project follows a "Feature-First" structure in the backend and "Component-Type" structure in the frontend.

```
truestate-retail-system/
├── backend/
│   ├── src/
│   │   ├── controllers/   # Request handlers (Transaction, Stats)
│   │   ├── models/        # Database Schemas (Transaction.js)
│   │   ├── routes/        # Endpoint definitions
│   │   ├── services/      # (Optional) Service layer for complex business logic
│   │   ├── utils/         # Helpers (constants, formatters)
│   │   └── app.js         # App configuration
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/    # Generic UI (Dropdown, Loader)
│   │   │   ├── dashboard/ # Dashboard-specific (FilterBar, StatsGrid)
│   │   │   └── table/     # Table-specific (Header, Row)
│   │   ├── hooks/         # Logic encapsulation (useTransactions, useFilters)
│   │   ├── pages/         # Route views
│   │   ├── services/      # Axios instance & API methods
│   │   └── utils/         # Constants & Helpers
│   └── vite.config.js
└── docs/
    └── architecture.md    # System Blueprint
```

---

## 5. Module Responsibilities

### Transaction Module
-   **Responsibility**: CRUD operations for sales data.
-   **Key Files**: `transactionController.js`, `Transaction.js`.
-   **Logic**: Validates search terms, parses array-based filters, handles numeric casting for sorting.

### Analytics (Stats) Module
-   **Responsibility**: High-level reporting.
-   **Key Files**: `statsController.js`.
-   **Logic**: Aggregates total revenue, calculates discount impact, counts unique customers. It uses the same filter logic as transactions to ensure 'Stats' and 'Table' always match.

### UI Module
-   **Responsibility**: Presentation and User Interaction.
-   **Key Files**: `Dashboard.jsx`, `FilterBar.jsx`.
-   **Logic**: Debounces text input to prevent API flooding, normalizes user input before sending to API.