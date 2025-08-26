// src/services/reportService.js
import { supabase } from "../config/supabase";

export const getSalesReport = async (startDate, endDate) => {
  if (!startDate || !endDate) return [];

  const { data, error } = await supabase.rpc("get_sales_report", {
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString(),
  });

  if (error) {
    console.error("Error fetching sales report:", error);
    throw error;
  }

  return data;
};
