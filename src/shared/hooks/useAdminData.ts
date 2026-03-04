import { useState, useEffect, useCallback } from 'react';
import categoriesData from '../mock-data/categories.json';
import productsData from '../mock-data/products.json';
import type { Category, Product } from '../types';

const CATEGORIES_KEY = 'wow-admin-categories';
const PRODUCTS_KEY = 'wow-admin-products';

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored) as T;
    }
  } catch {
    // ignore
  }
  return fallback;
}

function saveToStorage<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

const initialCategories = categoriesData as Category[];
const initialProducts = productsData as Product[];

export function useAdminData() {
  const [categories, setCategories] = useState<Category[]>(() =>
    loadFromStorage(CATEGORIES_KEY, initialCategories)
  );
  const [products, setProducts] = useState<Product[]>(() =>
    loadFromStorage(PRODUCTS_KEY, initialProducts)
  );

  useEffect(() => {
    saveToStorage(CATEGORIES_KEY, categories);
  }, [categories]);

  useEffect(() => {
    saveToStorage(PRODUCTS_KEY, products);
  }, [products]);

  const addCategory = useCallback((name: string) => {
    const id = `cat-${Date.now()}`;
    const newCat: Category = {
      id,
      name,
      sortOrder: 999,
    };
    setCategories((prev) => [...prev, newCat]);
  }, []);

  const updateCategory = useCallback((id: string, name: string) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, name } : c)));
  }, []);

  const deleteCategory = useCallback(
    (id: string) => {
      const productCount = products.filter((p) => p.categoryId === id).length;
      if (productCount > 0) {
        return { success: false, productCount };
      }
      setCategories((prev) => prev.filter((c) => c.id !== id));
      return { success: true, productCount: 0 };
    },
    [products]
  );

  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    setProducts((prev) => [...prev, { ...product, id }]);
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const resetToDefault = useCallback(() => {
    setCategories(initialCategories);
    setProducts(initialProducts);
  }, []);

  return {
    categories,
    products,
    addCategory,
    updateCategory,
    deleteCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefault,
  };
}
