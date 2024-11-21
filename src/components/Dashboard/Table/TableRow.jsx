import React from "react";
import { FaEye } from "react-icons/fa";

const TableRow = ({ item }) => {
  return (
    <tr className="border-b">
      <td className="px-4 py-2">{item.id}</td>
      <td className="px-4 py-2 flex items-center space-x-2">
        <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-lg" />
        <span>{item.name}</span>
      </td>
      <td className="px-4 py-2">{item.email}</td>
      <td className="px-4 py-2">{item.contactNumber}</td>
      <td className="px-4 py-2">{item.location}</td>
      <td className="px-4 py-2 relative left-7">{item.subscriptionType}</td>
      <td className="px-4 py-2 relative left-3">${item.price}</td>
      <td className="px-4 py-2 relative left-5">
        <FaEye className="text-gray-500 cursor-pointer" />
      </td>
    </tr>
  );
};

export default TableRow;
