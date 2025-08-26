// src/hooks/useDashboardData.jsx
import { useState, useEffect, useCallback } from "react";
import * as dashboardService from "../services/dashboardService";

export const useDashboardData = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStock: 0,
    totalRevenue: 0,
    salesToday: 0,
  });
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [salesChartData, setSalesChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsData, lowStockData, chartData] = await Promise.all([
        dashboardService.getDashboardStats(),
        dashboardService.getLowStockProducts(),
        dashboardService.getSalesDataForChart(),
      ]);

      setStats(statsData);
      setLowStockProducts(lowStockData);
      setSalesChartData(chartData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    stats,
    lowStockProducts,
    salesChartData,
    loading,
    error,
    refreshData: fetchData,
  };
};
