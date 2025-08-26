// src/services/dashboardService.js
import { supabase } from "../config/supabase";

export const getDashboardStats = async () => {
  // We'll call our new database functions here
  const { data: totalProducts, error: productsError } = await supabase.rpc(
    "get_total_products"
  );
  if (productsError) throw productsError;

  const { data: totalStock, error: stockError } = await supabase.rpc(
    "get_total_stock_items"
  );
  if (stockError) throw stockError;

  // Placeholder for sales data until we build the POS system
  const totalRevenue = 0;
  const salesToday = 0;

  return { totalProducts, totalStock, totalRevenue, salesToday };
};

export const getLowStockProducts = async (threshold = 10) => {
  const { data, error } = await supabase.rpc("get_low_stock_products", {
    low_stock_threshold: threshold,
  });
  if (error) throw error;
  return data;
};

// Placeholder for chart data
export const getSalesDataForChart = async () => {
  // In a real app, this would fetch from a 'sales' table. For now, we return mock data.
  return [
    { name: "Mon", sales: 4000 },
    { name: "Tue", sales: 3000 },
    { name: "Wed", sales: 2000 },
    { name: "Thu", sales: 2780 },
    { name: "Fri", sales: 1890 },
    { name: "Sat", sales: 2390 },
    { name: "Sun", sales: 3490 },
  ];
};
