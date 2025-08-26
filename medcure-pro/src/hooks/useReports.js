// src/hooks/useReports.js
import { useState, useCallback } from "react";
import * as reportService from "../services/reportService";

export const useReports = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Default to the last 7 days
  const [dateRange, setDateRange] = useState(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);
    return { startDate, endDate };
  });

  const fetchReport = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await reportService.getSalesReport(
        dateRange.startDate,
        dateRange.endDate
      );
      setReportData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  return {
    reportData,
    loading,
    error,
    dateRange,
    setDateRange,
    fetchReport,
  };
};
