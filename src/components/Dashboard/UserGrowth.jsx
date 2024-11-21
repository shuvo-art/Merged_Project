import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const userGrowthData = [
  { month: 'Jan', value: 20 },
  { month: 'Feb', value: 50 },
  { month: 'Mar', value: 80 },
  { month: 'Apr', value: 60 },
  { month: 'May', value: 100 },
  { month: 'Jun', value: 80 },
  { month: 'Jul', value: 90 },
  { month: 'Aug', value: 75 },
  { month: 'Sep', value: 85 },
  { month: 'Oct', value: 70 },
  { month: 'Nov', value: 65 },
  { month: 'Dec', value: 60 },
];

const UserGrowth = () => (
  <div className="p-4 bg-gray-100 rounded-lg">
    <h2 className="text-lg font-semibold mb-2">User Growth</h2>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={userGrowthData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(tick) => `${tick}%`} />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#4caf50" fill="#8CAB91" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default UserGrowth;
