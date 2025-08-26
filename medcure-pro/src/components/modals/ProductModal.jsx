// src/components/modals/ProductModal.jsx
import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

const ProductModal = ({ isOpen, onClose, onSave, product }) => {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    description: "",
  });
  const [variants, setVariants] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (product) {
        setProductData({
          name: product.name,
          category: product.category,
          description: product.description || "",
        });
        setVariants(
          product.product_variants.map((v) => ({
            ...v,
            client_id: Math.random(),
          })) || []
        ); // Add client_id for stable keys
      } else {
        setProductData({ name: "", category: "", description: "" });
        setVariants([
          {
            client_id: Math.random(),
            unit_name: "Piece",
            price: "",
            stock_quantity: "",
            conversion_factor: 1,
            is_base_unit: true,
          },
        ]);
      }
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleProductChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (index, e) => {
    const newVariants = [...variants];
    newVariants[index][e.target.name] = e.target.value;
    setVariants(newVariants);
  };

  const handleSetBaseUnit = (index) => {
    const newVariants = variants.map((v, i) => ({
      ...v,
      is_base_unit: i === index,
      conversion_factor: i === index ? 1 : v.conversion_factor,
    }));
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        client_id: Math.random(),
        unit_name: "",
        price: "",
        stock_quantity: "",
        conversion_factor: "",
        is_base_unit: false,
      },
    ]);
  };

  const removeVariant = (index) => {
    if (variants[index].is_base_unit && variants.length > 1) {
      alert(
        "Cannot remove the base unit. Please set another variant as the base unit first."
      );
      return;
    }
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // Remove client_id before saving
      const variantsToSave = variants.map(({ client_id, ...rest }) => rest);
      await onSave(productData, variantsToSave);
      onClose();
    } catch (error) {
      console.error("Failed to save product:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl my-8">
        <h2 className="text-2xl font-bold mb-4">
          {product ? "Edit Product" : "Add New Product"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Product Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <input
              name="name"
              value={productData.name}
              onChange={handleProductChange}
              placeholder="Product Name"
              required
              className="p-2 border rounded"
            />
            <input
              name="category"
              value={productData.category}
              onChange={handleProductChange}
              placeholder="Category"
              required
              className="p-2 border rounded"
            />
            <textarea
              name="description"
              value={productData.description}
              onChange={handleProductChange}
              placeholder="Description (optional)"
              className="col-span-2 p-2 border rounded"
            ></textarea>
          </div>

          {/* Variants Section */}
          <h3 className="text-lg font-semibold mb-2 border-t pt-4">Variants</h3>
          <div className="space-y-3">
            {variants.map((variant, index) => (
              <div
                key={variant.client_id}
                className="grid grid-cols-12 gap-2 items-center p-2 bg-gray-50 rounded"
              >
                <input
                  name="unit_name"
                  value={variant.unit_name}
                  onChange={(e) => handleVariantChange(index, e)}
                  placeholder="Unit (e.g., Box)"
                  required
                  className="col-span-3 p-2 border rounded"
                />
                <input
                  type="number"
                  name="price"
                  value={variant.price}
                  onChange={(e) => handleVariantChange(index, e)}
                  placeholder="Price"
                  required
                  className="col-span-2 p-2 border rounded"
                />
                <input
                  type="number"
                  name="stock_quantity"
                  value={variant.stock_quantity}
                  onChange={(e) => handleVariantChange(index, e)}
                  placeholder="Stock"
                  required
                  className="col-span-2 p-2 border rounded"
                />
                <input
                  type="number"
                  name="conversion_factor"
                  value={variant.conversion_factor}
                  onChange={(e) => handleVariantChange(index, e)}
                  placeholder="Conv. Factor"
                  required
                  disabled={variant.is_base_unit}
                  className="col-span-2 p-2 border rounded disabled:bg-gray-200"
                />
                <div className="col-span-2 flex items-center justify-center space-x-2">
                  <input
                    type="radio"
                    name="is_base_unit"
                    checked={variant.is_base_unit}
                    onChange={() => handleSetBaseUnit(index)}
                    title="Set as base unit"
                  />
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="text-red-500 hover:text-red-700"
                    disabled={variants.length === 1}
                  >
                    {" "}
                    <Trash2 size={18} />{" "}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addVariant}
            className="mt-4 flex items-center text-sm text-emerald-600 hover:text-emerald-800"
          >
            {" "}
            <Plus size={16} className="mr-1" /> Add Variant{" "}
          </button>

          {/* Actions */}
          <div className="mt-6 flex justify-end space-x-3 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:bg-emerald-300"
            >
              {isSaving ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
