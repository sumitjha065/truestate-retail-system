



// src/components/table/TableRow.jsx
import React, { useState } from "react";
import { formatters } from "../../utils/formatters";

const TableRow = ({ transaction, isSelected, onSelect }) => {
  const [hovered, setHovered] = useState(false);

  const classes = `
    border-b border-gray-200 
    ${hovered ? "bg-gray-50" : ""}
    ${isSelected ? "bg-blue-50" : ""}
  `;

  return (
    <tr
      className={`group transition-colors duration-150 ${classes}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect && onSelect(transaction)}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        #{transaction["Transaction ID"]}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatters.formatDate(transaction.Date)}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {transaction["Customer ID"]}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {transaction["Customer Name"]}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
        {formatters.formatPhoneNumber(transaction["Phone Number"])}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${transaction.Gender === "Male"
              ? "bg-blue-50 text-blue-700 border-blue-100"
              : "bg-pink-50 text-pink-700 border-pink-100"
            }`}
        >
          {transaction.Gender}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {transaction.Age}
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-100 text-xs rounded-full font-medium">
          {transaction["Product Category"]}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
        {String(transaction.Quantity).padStart(2, '0')}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
        ₹ {formatters.formatNumber(transaction["Total Amount"])}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {transaction["Customer Region"]}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
        {transaction["Product ID"]}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {transaction["Employee Name"]}
      </td>
    </tr>
  );
};

export default TableRow;
