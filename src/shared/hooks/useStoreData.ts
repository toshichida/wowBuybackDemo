import { useState } from 'react';
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

const initialCategories = categoriesData as Category[];
const initialProducts = productsData as Product[];

/**
 * 買取票・フォーム用：localStorage または初期JSONからカテゴリ・商品を取得
 * 管理者画面の変更がlocalStorageに保存されていればそれを反映
 */
export function useStoreData() {
  const [categories] = useState<Category[]>(() =>
    loadFromStorage(CATEGORIES_KEY, initialCategories)
  );
  const [products] = useState<Product[]>(() => loadFromStorage(PRODUCTS_KEY, initialProducts));

  return { categories, products };
}
