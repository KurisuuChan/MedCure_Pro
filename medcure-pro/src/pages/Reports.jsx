// src/pages/Reports.jsx
import React, { useEffect } from "react";
import { useReports } from "../hooks/useReports";
import { exportToCSV } from "../utils/exportUtils";
import { Download } from "lucide-react";

const Reports = () => {
  const { reportData, loading, error, dateRange, setDateRange, fetchReport } =
    useReports();

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const handleDateChange = (e, field) => {
    const newDate = new Date(e.target.value);
    setDateRange((prev) => ({ ...prev, [field]: newDate }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };

  // Format date for input field (YYYY-MM-DD)
  const formatDateForInput = (date) => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  const handleExport = () => {
    const formattedData = reportData.map((item) => ({
      ...item,
      price_per_item: formatCurrency(item.price_per_item),
      item_total: formatCurrency(item.item_total),
    }));
    exportToCSV(
      formattedData,
      `sales-report-${formatDateForInput(
        dateRange.startDate
      )}-to-${formatDateForInput(dateRange.endDate)}.csv`
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sales Reports</h1>
        <button
          onClick={handleExport}
          disabled={reportData.length === 0}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-emerald-700 disabled:opacity-50"
        >
          <Download className="w-5 h-5 mr-2" /> Export to CSV
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex items-center space-x-4">
        <div>
          <label className="text-sm">Start Date</label>
          <input
            type="date"
            value={formatDateForInput(dateRange.startDate)}
            onChange={(e) => handleDateChange(e, "startDate")}
            className="p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="text-sm">End Date</label>
          <input
            type="date"
            value={formatDateForInput(dateRange.endDate)}
            onChange={(e) => handleDateChange(e, "endDate")}
            className="p-2 border rounded-md"
          />
        </div>
        <button
          onClick={fetchReport}
          className="self-end px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {loading ? "Loading..." : "Generate Report"}
        </button>
      </div>

      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Variant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Qty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Item Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reportData.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {item.sale_created_at}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {item.product_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {item.variant_unit_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {item.quantity_sold}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {formatCurrency(item.price_per_item)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                  {formatCurrency(item.item_total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {reportData.length === 0 && !loading && (
          <p className="text-center p-4 text-gray-500">
            No sales data found for the selected period.
          </p>
        )}
      </div>
    </div>
  );
};

export default Reports;
