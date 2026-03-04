import { useState, useCallback } from 'react';
import type { SelectedItem } from '../../shared/types';

export function useSelectedItems() {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const toggleProduct = useCallback((productId: string, quantity: number) => {
    setSelectedItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (quantity > 0) {
        if (existing) {
          return prev.map((item) => (item.productId === productId ? { ...item, quantity } : item));
        }
        return [...prev, { productId, quantity }];
      }
      return prev.filter((item) => item.productId !== productId);
    });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setSelectedItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.productId !== productId);
      }
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) => (item.productId === productId ? { ...item, quantity } : item));
      }
      return [...prev, { productId, quantity }];
    });
  }, []);

  const isSelected = useCallback(
    (productId: string) => selectedItems.some((item) => item.productId === productId),
    [selectedItems]
  );

  const getQuantity = useCallback(
    (productId: string) =>
      selectedItems.find((item) => item.productId === productId)?.quantity ?? 0,
    [selectedItems]
  );

  const clearSelection = useCallback(() => setSelectedItems([]), []);

  return {
    selectedItems,
    toggleProduct,
    setQuantity,
    isSelected,
    getQuantity,
    clearSelection,
  };
}
