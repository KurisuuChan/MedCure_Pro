// src/hooks/useSales.js
import { useState } from "react";
import * as salesService from "../services/salesService";
import { useAuth } from "./useAuth";

export const useSales = () => {
  const [cart, setCart] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const { session } = useAuth();

  const addToCart = (product, variant) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.variant_id === variant.id
      );

      if (existingItem) {
        // Increase quantity if item already in cart, but don't exceed stock
        const newQuantity = Math.min(
          existingItem.quantity + 1,
          variant.stock_quantity
        );
        return prevCart.map((item) =>
          item.variant_id === variant.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        // Add new item to cart
        if (variant.stock_quantity > 0) {
          return [
            ...prevCart,
            {
              product_id: product.id,
              product_name: product.name,
              variant_id: variant.id,
              unit_name: variant.unit_name,
              price: variant.price,
              quantity: 1,
              max_stock: variant.stock_quantity,
            },
          ];
        }
        return prevCart; // Do not add if stock is 0
      }
    });
  };

  const updateQuantity = (variant_id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.variant_id === variant_id) {
          // Clamp quantity between 1 and max stock
          const clampedQuantity = Math.max(
            1,
            Math.min(newQuantity, item.max_stock)
          );
          return { ...item, quantity: clampedQuantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (variant_id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.variant_id !== variant_id)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const processSale = async (paymentMethod) => {
    setIsProcessing(true);
    setError(null);
    try {
      const saleDetails = {
        total_amount: cartTotal,
        payment_method: paymentMethod,
        processed_by_email: session.user.email,
        cart_items: cart.map((item) => ({
          variant_id: item.variant_id,
          quantity: item.quantity,
          price_per_item: item.price,
        })),
      };

      await salesService.processSaleTransaction(saleDetails);
      clearCart();
      return true; // Success
    } catch (err) {
      setError(err.message);
      return false; // Failure
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    processSale,
    isProcessing,
    error,
  };
};
