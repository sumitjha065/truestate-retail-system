


// Table header component with sorting indicators.
import React from "react";
import { ArrowUpDown } from "lucide-react";
import { TABLE_COLUMNS } from "../../utils/constants";

const TableHeader = ({ sortBy, sortOrder, onSort }) => {
  return (
    <thead className="bg-[#1f2937]"> {/* Dark background matching image */}
      <tr>
        {TABLE_COLUMNS.map((column) => (
          <th
            key={column.key}
            style={{ width: column.width || 'auto' }}
            className={`px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap
              ${column.sortable ? "cursor-pointer hover:bg-gray-700 transition-colors" : ""}`}
            onClick={() => column.sortable && onSort(column.key)}
          >
            <div className="flex items-center gap-2">
              {column.label}

              {column.sortable && (
                <div className="flex flex-col">
                  {sortBy === column.key ? (
                    <span className="text-blue-600">
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  ) : (
                    <ArrowUpDown className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </div>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
