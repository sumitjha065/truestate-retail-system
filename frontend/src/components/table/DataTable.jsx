

// Main data table component handling loading and error states.
import React, { useState } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import { Loader2, AlertCircle } from "lucide-react";

const DataTable = ({ data, loading, error, sortBy, sortOrder, onSort, selectedRow, onSelectRow }) => {
  const [selected, setSelected] = useState(selectedRow);

  const handleSelect = (transaction) => {
    setSelected(transaction);
    onSelectRow && onSelectRow(transaction);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <AlertCircle className="w-10 h-10 text-red-600" />
        <p className="mt-2 text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[1400px] w-full text-sm">
          <TableHeader sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />

          <tbody>
            {data.map((t, idx) => (
              <TableRow
                key={idx}
                transaction={t}
                isSelected={selected?.["Transaction ID"] === t["Transaction ID"]}
                onSelect={handleSelect}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
