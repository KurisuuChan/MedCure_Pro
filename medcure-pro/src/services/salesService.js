// src/services/salesService.js
import { supabase } from "../config/supabase";

export const processSaleTransaction = async (saleDetails) => {
  const { total_amount, payment_method, processed_by_email, cart_items } =
    saleDetails;

  const { data, error } = await supabase.rpc("process_sale", {
    total_amount,
    payment_method,
    processed_by_email,
    cart_items,
  });

  if (error) {
    console.error("Error in process_sale RPC:", error);
    throw error;
  }

  return data; // Returns the new sale_id
};
