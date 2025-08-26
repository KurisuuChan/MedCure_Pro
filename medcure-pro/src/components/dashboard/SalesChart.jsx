// src/components/dashboard/SalesChart.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SalesChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-96">
      <h3 className="font-bold text-lg mb-4">Weekly Sales</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#10B981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
