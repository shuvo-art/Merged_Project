import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Data for different years
const dataByYear = {
  2024: [
    { month: "Jan", value: 20 },
    { month: "Feb", value: 50 },
    { month: "Mar", value: 80 },
    { month: "Apr", value: 60 },
    { month: "May", value: 100 },
    { month: "Jun", value: 80 },
    { month: "Jul", value: 90 },
    { month: "Aug", value: 75 },
    { month: "Sep", value: 85 },
    { month: "Oct", value: 70 },
    { month: "Nov", value: 65 },
    { month: "Dec", value: 60 },
  ],
  2023: [
    { month: "Jan", value: 10 },
    { month: "Feb", value: 30 },
    { month: "Mar", value: 50 },
    { month: "Apr", value: 40 },
    { month: "May", value: 70 },
    { month: "Jun", value: 60 },
    { month: "Jul", value: 80 },
    { month: "Aug", value: 70 },
    { month: "Sep", value: 75 },
    { month: "Oct", value: 60 },
    { month: "Nov", value: 55 },
    { month: "Dec", value: 50 },
  ],
  2022: [
    { month: "Jan", value: 15 },
    { month: "Feb", value: 25 },
    { month: "Mar", value: 45 },
    { month: "Apr", value: 30 },
    { month: "May", value: 65 },
    { month: "Jun", value: 55 },
    { month: "Jul", value: 60 },
    { month: "Aug", value: 50 },
    { month: "Sep", value: 70 },
    { month: "Oct", value: 60 },
    { month: "Nov", value: 45 },
    { month: "Dec", value: 40 },
  ],
  2021: [
    { month: "Jan", value: 5 },
    { month: "Feb", value: 15 },
    { month: "Mar", value: 25 },
    { month: "Apr", value: 20 },
    { month: "May", value: 40 },
    { month: "Jun", value: 35 },
    { month: "Jul", value: 50 },
    { month: "Aug", value: 45 },
    { month: "Sep", value: 60 },
    { month: "Oct", value: 55 },
    { month: "Nov", value: 50 },
    { month: "Dec", value: 40 },
  ],
};

const UserGrowth = () => {
  const [selectedYear, setSelectedYear] = useState("2024");

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">User Growth</h2>
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="border rounded px-4 py-2 bg-white text-gray-600 focus:ring focus:ring-green-300"
        >
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={dataByYear[selectedYear]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(tick) => `${tick}%`} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#4caf50"
            fill="#8CAB91"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserGrowth;
