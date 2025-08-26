// src/services/productService.js
import { supabase } from "../config/supabase";

// Helper to get the current user's email
const getUserEmail = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.email;
};

// --- Product & Variant Functions ---

export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      category,
      description,
      product_variants (
        id,
        unit_name,
        price,
        stock_quantity,
        conversion_factor,
        is_base_unit
      )
    `
    )
    .order("name", { ascending: true });
  if (error) throw error;
  return data;
};

// Adds a product AND its variants in a single operation
export const addProductWithVariants = async (productData, variantsData) => {
  // 1. Insert the base product
  const { data: product, error: productError } = await supabase
    .from("products")
    .insert(productData)
    .select()
    .single();
  if (productError) throw productError;

  // 2. Prepare and insert the variants linked to the new product
  const variantsToInsert = variantsData.map((v) => ({
    ...v,
    product_id: product.id,
  }));
  const { data: variants, error: variantsError } = await supabase
    .from("product_variants")
    .insert(variantsToInsert)
    .select();
  if (variantsError) {
    // If variants fail, roll back the product creation for consistency
    await supabase.from("products").delete().eq("id", product.id);
    throw variantsError;
  }

  return { ...product, product_variants: variants };
};

// Updates a product AND its variants
export const updateProductWithVariants = async (
  productId,
  productData,
  variantsData
) => {
  // 1. Update the base product details
  const { error: productError } = await supabase
    .from("products")
    .update(productData)
    .eq("id", productId);
  if (productError) throw productError;

  // 2. Handle variant updates (delete old, insert new)
  // This is a simple but effective strategy for managing dynamic variant lists
  const { error: deleteError } = await supabase
    .from("product_variants")
    .delete()
    .eq("product_id", productId);
  if (deleteError) throw deleteError;

  const variantsToInsert = variantsData.map((v) => ({
    ...v,
    product_id: productId,
  }));
  const { error: insertError } = await supabase
    .from("product_variants")
    .insert(variantsToInsert);
  if (insertError) throw insertError;

  // 3. Fetch and return the fully updated product for UI consistency
  const { data: updatedProduct } = await supabase
    .from("products")
    .select(`*, product_variants (*)`)
    .eq("id", productId)
    .single();

  return updatedProduct;
};

// --- Archive & Restore Functions ---

export const archiveProduct = async (product, reason) => {
  const archiveData = {
    original_product_id: product.id,
    name: product.name,
    category: product.category,
    variants_snapshot: product.product_variants, // Store all variants as JSON
    reason: reason,
    archived_by: await getUserEmail(),
  };

  const { error: archiveError } = await supabase
    .from("archived_products")
    .insert(archiveData);
  if (archiveError) throw archiveError;

  // Delete the product, and variants will be deleted automatically due to CASCADE
  const { error: deleteError } = await supabase
    .from("products")
    .delete()
    .eq("id", product.id);
  if (deleteError) throw deleteError;
};

export const getArchivedProducts = async () => {
  const { data, error } = await supabase
    .from("archived_products")
    .select("*")
    .order("archived_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const restoreProduct = async (archivedProduct) => {
  // 1. Re-create the base product
  const { data: product, error: productError } = await supabase
    .from("products")
    .insert({ name: archivedProduct.name, category: archivedProduct.category })
    .select()
    .single();
  if (productError) throw productError;

  // 2. Re-create the variants from the snapshot
  const variantsToInsert = archivedProduct.variants_snapshot.map((v) => ({
    product_id: product.id,
    unit_name: v.unit_name,
    price: v.price,
    stock_quantity: v.stock_quantity,
    conversion_factor: v.conversion_factor,
    is_base_unit: v.is_base_unit,
  }));
  const { error: variantsError } = await supabase
    .from("product_variants")
    .insert(variantsToInsert);
  if (variantsError) throw variantsError;

  // 3. Delete from the archive table
  const { error: deleteError } = await supabase
    .from("archived_products")
    .delete()
    .eq("id", archivedProduct.id);
  if (deleteError) throw deleteError;
};
