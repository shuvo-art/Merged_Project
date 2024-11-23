import React from "react";
import TableRow from "./TableRow";

const Table = ({ data, onRowClick, isOrderManagement }) => {
  return (
    <table className="w-full border-collapse border rounded-lg">
      <thead>
        <tr className="bg-gray-200 border-b">
          <th className="px-4 py-2 text-left">ID</th>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Email</th>
          <th className="px-4 py-2 text-left">Contact Number</th>
          <th className="px-4 py-2 text-left">Location</th>
          {/* Conditionally render Subscription Type */}
          {!isOrderManagement && (
            <th className="px-4 py-2 text-left">Subscription Type</th>
          )}
          {/* Conditionally render Income */}
          {!isOrderManagement && <th className="px-4 py-2 text-left">Income</th>}
          <th className="px-4 py-2 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <TableRow
            key={item.id}
            item={item}
            onRowClick={onRowClick}
            isOrderManagement={isOrderManagement}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
