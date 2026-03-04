import type { Product } from '../types';
import type { SelectedItem } from '../types';

/**
 * 選択商品 × 数量 × 買取価格の合計を計算
 */
export function calculateTotal(selectedItems: SelectedItem[], products: Product[]): number {
  return selectedItems.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product || item.quantity <= 0) return total;
    return total + product.buybackPrice * item.quantity;
  }, 0);
}
