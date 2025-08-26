// src/pages/Dashboard.jsx
import React from "react";
import { useDashboardData } from "../hooks/useDashboardData";
import StatCard from "../components/dashboard/StatCard";
import SalesChart from "../components/dashboard/SalesChart";
import LowStockProducts from "../components/dashboard/LowStockProducts";
import { Package, LineChart, DollarSign, ShoppingCart } from "lucide-react";

const Dashboard = () => {
  const { stats, lowStockProducts, salesChartData, loading, error } =
    useDashboardData();

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  const formatCurrency = (amount) => {
    // In the Philippines, the currency is PHP (₱)
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          color="bg-emerald-500"
        />
        <StatCard
          title="Sales Today"
          value={formatCurrency(stats.salesToday)}
          icon={LineChart}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Package}
          color="bg-orange-500"
        />
        <StatCard
          title="Total Items in Stock"
          value={stats.totalStock}
          icon={ShoppingCart}
          color="bg-purple-500"
        />
      </div>

      {/* Charts and Lists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart data={salesChartData} />
        </div>
        <div>
          <LowStockProducts products={lowStockProducts} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
