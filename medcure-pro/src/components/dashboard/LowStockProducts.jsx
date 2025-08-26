// src/components/dashboard/LowStockProducts.jsx
import React from "react";

const LowStockProducts = ({ products }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-4">Low Stock Items</h3>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {products.length === 0 ? (
          <p className="text-gray-500">No items with low stock. Great job!</p>
        ) : (
          products.map((product) => (
            <div
              key={`${product.id}-${product.unit_name}`}
              className="flex justify-between items-center text-sm"
            >
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-xs text-gray-500">{product.unit_name}</p>
              </div>
              <span className="font-bold text-red-500 bg-red-100 px-2 py-1 rounded-full">
                {product.stock_quantity}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LowStockProducts;
