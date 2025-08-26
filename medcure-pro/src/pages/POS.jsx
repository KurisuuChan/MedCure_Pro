// src/pages/POS.jsx
import React, { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useSales } from "../hooks/useSales";
import { Search, X, Trash2 } from "lucide-react";
import PaymentModal from "../components/modals/PaymentModal";

const POS = () => {
  const { products, loading: productsLoading } = useProducts();
  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    processSale,
    isProcessing,
  } = useSales();
  const [searchTerm, setSearchTerm] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const filteredProducts = searchTerm
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };

  const handleProcessSale = async (paymentMethod) => {
    const success = await processSale(paymentMethod);
    if (success) {
      alert("Sale completed successfully!");
      return true;
    } else {
      alert("Failed to process sale. Please check stock and try again.");
      return false;
    }
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-120px)]">
        {/* Product Selection */}
        <div className="col-span-7 bg-white p-4 rounded-lg shadow-md flex flex-col">
          <div className="relative mb-4">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <div className="flex-grow overflow-y-auto">
            {productsLoading ? (
              <p>Loading products...</p>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="border rounded-lg p-2">
                    <p className="font-bold text-sm mb-2">{product.name}</p>
                    {product.product_variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => addToCart(product, variant)}
                        disabled={variant.stock_quantity === 0}
                        className="w-full text-left text-xs p-2 mb-1 rounded hover:bg-emerald-100 disabled:opacity-50 disabled:hover:bg-transparent"
                      >
                        {variant.unit_name} ({formatCurrency(variant.price)}) -
                        Stock: {variant.stock_quantity}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Cart */}
        <div className="col-span-5 bg-white p-4 rounded-lg shadow-md flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Cart</h2>
          <div className="flex-grow overflow-y-auto border-t border-b py-2">
            {cart.length === 0 ? (
              <p className="text-gray-500">Cart is empty</p>
            ) : (
              cart.map((item) => (
                <div key={item.variant_id} className="flex items-center mb-2">
                  <div className="flex-grow">
                    <p className="font-semibold">
                      {item.product_name}{" "}
                      <span className="text-xs text-gray-500">
                        ({item.unit_name})
                      </span>
                    </p>
                    <p className="text-sm">{formatCurrency(item.price)}</p>
                  </div>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.variant_id, parseInt(e.target.value))
                    }
                    className="w-16 p-1 border rounded mx-2 text-center"
                  />
                  <button
                    onClick={() => removeFromCart(item.variant_id)}
                    className="text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="mt-auto pt-4">
            <div className="flex justify-between font-bold text-xl mb-4">
              <span>Total</span>
              <span>{formatCurrency(cartTotal)}</span>
            </div>
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              disabled={cart.length === 0 || isProcessing}
              className="w-full bg-emerald-600 text-white p-4 rounded-lg font-bold hover:bg-emerald-700 disabled:bg-emerald-300"
            >
              PAY
            </button>
            <button
              onClick={clearCart}
              className="w-full text-center text-sm text-red-500 mt-2"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirm={handleProcessSale}
        total={cartTotal}
        isProcessing={isProcessing}
      />
    </>
  );
};

export default POS;
