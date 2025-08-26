// src/pages/Management.jsx
import React, { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { Plus, Edit, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import ProductModal from "../components/modals/ProductModal";
import ArchiveReasonModal from "../components/modals/ArchiveReasonModal";

const Management = () => {
  const {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    archiveProduct,
  } = useProducts();
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenAddModal = () => {
    setSelectedProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleOpenArchiveModal = (product) => {
    setSelectedProduct(product);
    setIsArchiveModalOpen(true);
  };

  const handleSaveProduct = async (productData, variantsData) => {
    if (selectedProduct) {
      await updateProduct(selectedProduct.id, productData, variantsData);
    } else {
      await addProduct(productData, variantsData);
    }
  };

  const handleConfirmArchive = async (reason) => {
    if (selectedProduct) {
      await archiveProduct(selectedProduct, reason);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <button
          onClick={handleOpenAddModal}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-emerald-700"
        >
          <Plus className="w-5 h-5 mr-2" /> Add Product
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 w-12"></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                Variants
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <React.Fragment key={product.id}>
                <tr>
                  <td className="px-6 py-4">
                    <button onClick={() => toggleRow(product.id)}>
                      {expandedRows[product.id] ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 font-medium">{product.name}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">
                    {product.product_variants.length}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleOpenEditModal(product)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleOpenArchiveModal(product)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
                {expandedRows[product.id] && (
                  <tr>
                    <td colSpan="5" className="p-0">
                      <div className="px-8 py-4 bg-gray-50">
                        <h4 className="font-semibold mb-2">Variants:</h4>
                        <table className="min-w-full">
                          <thead className="bg-gray-200 text-xs">
                            <tr>
                              <th className="p-2 text-left">Unit Name</th>
                              <th className="p-2 text-left">Price</th>
                              <th className="p-2 text-left">Stock</th>
                              <th className="p-2 text-left">Conv. Factor</th>
                            </tr>
                          </thead>
                          <tbody>
                            {product.product_variants.map((v) => (
                              <tr key={v.id} className="text-sm">
                                <td className="p-2">
                                  {v.unit_name}{" "}
                                  {v.is_base_unit && (
                                    <span className="text-xs text-emerald-600">
                                      (Base)
                                    </span>
                                  )}
                                </td>
                                <td className="p-2">
                                  ${parseFloat(v.price).toFixed(2)}
                                </td>
                                <td className="p-2">{v.stock_quantity}</td>
                                <td className="p-2">{v.conversion_factor}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        product={selectedProduct}
      />
      <ArchiveReasonModal
        isOpen={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
        onConfirm={handleConfirmArchive}
      />
    </>
  );
};

export default Management;
