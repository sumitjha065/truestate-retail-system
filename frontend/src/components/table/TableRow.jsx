



// Single table row component with copy functionality.
import React, { useState } from "react";
import { formatters } from "../../utils/formatters";

const TableRow = ({ transaction, isSelected, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e, text) => {
    e.stopPropagation(); // Prevent row selection
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const classes = `
    border-b border-gray-200 
    ${hovered ? "bg-gray-50" : ""}
    ${isSelected ? "bg-blue-50" : ""}
  `;

  return (
    <tr
      className={`group transition-colors duration-150 border-b border-gray-200 hover:bg-gray-50
        ${isSelected ? "bg-blue-50" : ""}
      `}
      onClick={() => onSelect && onSelect(transaction)}
    >
      {/* 1. Transaction ID */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
        {transaction["Transaction ID"]}
      </td>

      {/* 2. Date */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
        {formatters.formatDate(transaction.Date)}
      </td>

      {/* 3. Customer ID */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
        {transaction["Customer ID"]}
      </td>

      {/* 4. Customer Name */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
        {transaction["Customer Name"]}
      </td>

      {/* 5. Phone Number (with Copy Icon) */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 font-mono">
        <div className="flex items-center gap-2">
          {formatters.formatPhoneNumber(transaction["Phone Number"])}
          <button
            onClick={(e) => handleCopy(e, transaction["Phone Number"])}
            className={`transition-colors p-1 ${copied ? 'text-green-600' : 'text-gray-400 hover:text-blue-600'}`}
            title="Copy Number"
          >
            {copied ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
            )}
          </button>
        </div>
      </td>

      {/* 6. Gender */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
        {transaction.Gender}
      </td>

      {/* 7. Age */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
        {transaction.Age}
      </td>

      {/* 8. Product Category (Bold, no pill) */}
      <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-800">
        {transaction["Product Category"]}
      </td>

      {/* 9. Quantity */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
        {String(transaction.Quantity).padStart(2, '0')}
      </td>

      {/* 10. Total Amount (Bold) */}
      <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900">
        ₹ {formatters.formatNumber(transaction["Total Amount"])}
      </td>

      {/* 11. Customer Region */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
        {transaction["Customer Region"]}
      </td>

      {/* 12. Product ID */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
        {transaction["Product ID"] || "PROD001"}
      </td>

      {/* 13. Employee Name */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
        {transaction["Employee Name"]}
      </td>
    </tr>
  );
};

export default TableRow;
