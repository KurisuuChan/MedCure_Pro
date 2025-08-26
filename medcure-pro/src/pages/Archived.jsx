// src/pages/Archived.jsx
import React, { useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import { useConfirm } from "../hooks/useConfirm"; // Import useConfirm
import toast from "react-hot-toast";
import { RotateCcw } from "lucide-react";

const Archived = () => {
  const {
    archivedProducts,
    loading,
    error,
    fetchArchivedProducts,
    restoreProduct,
  } = useProducts();
  const { showConfirm, ConfirmationDialog } = useConfirm(); // Use the hook

  useEffect(() => {
    fetchArchivedProducts();
  }, [fetchArchivedProducts]);

  const handleRestore = (product) => {
    showConfirm(
      "Confirm Restoration",
      `Are you sure you want to restore "${product.name}" to the main inventory?`,
      async () => {
        await restoreProduct(product);
        toast.success(`"${product.name}" has been restored.`);
      }
    );
  };

  // ... (loading and error states are the same)
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <>
      <ConfirmationDialog /> {/* Add the dialog component to the tree */}
      <div>
        <h1 className="text-3xl font-bold mb-6">Archived Products</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* ... (table is the same) ... */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock at Archive
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Archived At
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {archivedProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.stock_at_archive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(product.archived_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleRestore(product)}
                      className="text-emerald-600 hover:text-emerald-900 flex items-center ml-auto"
                    >
                      <RotateCcw className="w-4 h-4 mr-1" /> Restore
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Archived;
