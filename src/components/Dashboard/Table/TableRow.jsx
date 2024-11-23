import React from "react";
import { FaEye } from "react-icons/fa";

const TableRow = ({ item, onRowClick, isOrderManagement }) => {
  return (
    <tr className="border-b">
      <td className="px-4 py-2">{item.id}</td>
      <td className="px-4 py-2 flex items-center space-x-2">
        <button className="flex items-center justify-center gap-2" onClick={() => onRowClick(item)}>
          <img
            src={item.avatar}
            alt={item.name}
            className="w-8 h-8 rounded-full"
          />
          <span>{item.name}</span>
        </button>
      </td>
      <td className="px-4 py-2">{item.email}</td>
      <td className="px-4 py-2">{item.contactNumber}</td>
      <td className="px-4 py-2">{item.location}</td>
      {/* Conditionally render Subscription Type */}
      {!isOrderManagement && (
        <td className="px-4 py-2">{item.subscriptionType}</td>
      )}
      {/* Conditionally render Income */}
      {!isOrderManagement && <td className="px-4 py-2">${item.price}</td>}
      <td className="px-4 py-2 text-center relative left-8">
        <FaEye className="text-gray-500 cursor-pointer" />
      </td>
    </tr>
  );
};

export default TableRow;
