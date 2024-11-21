import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const subscriberData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 70 },
  { month: 'Mar', value: 50 },
  { month: 'Apr', value: 60 },
  { month: 'May', value: 30 },
  { month: 'Jun', value: 40 },
  { month: 'Jul', value: 80 },
  { month: 'Aug', value: 75 },
  { month: 'Sep', value: 90 },
  { month: 'Oct', value: 85 },
  { month: 'Nov', value: 95 },
  { month: 'Dec', value: 50 },
];

const SubscriberGrowth = () => (
  <div className="p-4 bg-gray-100 rounded-lg">
    <h2 className="text-lg font-semibold mb-2">Subscriber Growth</h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={subscriberData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(tick) => `${tick}%`} />
        <Tooltip />
        <Bar dataKey="value" fill="#8CAB91" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default SubscriberGrowth;
