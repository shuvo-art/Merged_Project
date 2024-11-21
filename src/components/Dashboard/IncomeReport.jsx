import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const incomeData = [
  { month: 'Jan', value: 30000 },
  { month: 'Feb', value: 12000 },
  { month: 'Mar', value: 15000 },
  { month: 'Apr', value: 0 },
  { month: 'May', value: 25000 },
  { month: 'Jun', value: 35000 },
  { month: 'Jul', value: 35000 },
  { month: 'Aug', value: 13000 },
  { month: 'Sep', value: 31000 },
  { month: 'Oct', value: 21000 },
  { month: 'Nov', value: 17000 },
  { month: 'Dec', value: 15000 },
];

const IncomeReport = () => (
  <div className="p-4 bg-gray-100 rounded-lg">
    <h2 className="text-lg font-semibold mb-2">Income Report</h2>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={incomeData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        {/* Set the Y-axis ticks to specific values */}
        <YAxis
          ticks={[0, 10000, 20000, 30000, 40000]}
          tickFormatter={(tick) => `${tick / 1000}k`}
        />
        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#4caf50"
          fill="url(#colorValue)"
        />
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4caf50" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default IncomeReport;
