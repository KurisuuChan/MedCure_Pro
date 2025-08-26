// src/hooks/useProducts.jsx
import { useState, useEffect, useCallback } from "react"; // <-- useEffect has been added here
import * as productService from "../services/productService";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [archivedProducts, setArchivedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchArchivedProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getArchivedProducts();
      setArchivedProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addProduct = async (productData, variantsData) => {
    try {
      const newProduct = await productService.addProductWithVariants(
        productData,
        variantsData
      );
      setProducts((prev) => [...prev, newProduct]);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateProduct = async (productId, productData, variantsData) => {
    try {
      const updatedProduct = await productService.updateProductWithVariants(
        productId,
        productData,
        variantsData
      );
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? updatedProduct : p))
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const archiveProductWithRefresh = async (product, reason) => {
    try {
      await productService.archiveProduct(product, reason);
      await fetchProducts(); // Refresh main product list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const restoreProductWithRefresh = async (archivedProduct) => {
    try {
      await productService.restoreProduct(archivedProduct);
      await fetchArchivedProducts(); // Refresh archived list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    // Initial fetch when the hook is first used
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    archivedProducts,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    archiveProduct: archiveProductWithRefresh,
    restoreProduct: restoreProductWithRefresh,
    fetchArchivedProducts,
  };
};
