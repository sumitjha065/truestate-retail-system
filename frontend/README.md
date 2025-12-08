# TruEstate Retail System - Frontend

## Overview
The frontend of the TruEstate Retail System is a modern, high-performance Single Page Application (SPA) built to deliver a seamless data visualization experience. It leverages React's component-based architecture and Vite's rapid build tooling to provide instant feedback and smooth interactions for retail managers.

## Tech Stack
- **Core**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (Utility-first framework)
- **HTTP Client**: Axios
- **Icons**: React Icons (Lucide/Feather)

## Key Features
- **Dashboard UI**: Responsive layout with stats cards and charts.
- **Dynamic Table**: Custom reusable table component with sortable headers.
- **Smart Filtering**: Sidebar filter component with multi-select and range inputs.
- **State Management**: Custom hook `useTransactions` for efficient logic separation.

## Folder Structure
```
frontend/
├── src/
│   ├── components/    # Reusable UI (Table, FilterBar, etc.)
│   ├── hooks/         # Custom Business Logic Hooks
│   ├── pages/         # Page Views (Dashboard)
│   ├── services/      # API Integration Layer
│   ├── App.jsx        # Root Component
│   └── main.jsx       # Entry Point
```

## Setup & Development

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```
    The app will render at `http://localhost:5173`.

3.  **Build for Production**
    ```bash
    npm run build
    ```
