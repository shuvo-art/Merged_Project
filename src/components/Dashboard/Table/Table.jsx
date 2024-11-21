import React from "react";
import TableRow from "./TableRow.jsx";

const Table = ({ data }) => {
  return (
    <table className="w-full border-collapse border rounded-lg text-black">
      <thead>
        <tr className=" border-b">
          <th className="px-4 py-2 text-left">ID</th>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Email</th>
          <th className="px-4 py-2 text-left">Contact Number</th>
          <th className="px-4 py-2 text-left">Location</th>
          <th className="px-4 py-2 text-left">Subscription Type</th>
          <th className="px-4 py-2 text-left">Income</th>
          <th className="px-4 py-2 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <TableRow key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
