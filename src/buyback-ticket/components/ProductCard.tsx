import { Checkbox } from '../../shared/components';
import type { Product } from '../../shared/types';

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  quantity: number;
  onToggle: (productId: string, quantity: number) => void;
  onQuantityChange: (productId: string, quantity: number) => void;
}

export function ProductCard({
  product,
  isSelected,
  quantity,
  onToggle,
  onQuantityChange,
}: ProductCardProps) {
  const handleCheckChange = (checked: boolean) => {
    if (checked) {
      onToggle(product.id, 1);
    } else {
      onToggle(product.id, 0);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const num = isNaN(value) ? 0 : Math.max(0, value);
    onQuantityChange(product.id, num);
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-20 w-20 shrink-0 rounded object-cover"
      />
      <div className="min-w-0 flex-1">
        <h3 className="font-medium text-gray-900">{product.name}</h3>
        <p className="mt-1 text-lg font-bold text-blue-600">
          ¥{product.buybackPrice.toLocaleString()}
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-3">
        <Checkbox
          checked={isSelected}
          onChange={(e) => handleCheckChange(e.target.checked)}
          aria-label={`${product.name}を選択`}
        />
        <div className="flex items-center gap-1">
          <label htmlFor={`qty-${product.id}`} className="sr-only">
            数量
          </label>
          <input
            id={`qty-${product.id}`}
            type="number"
            min="0"
            value={quantity || ''}
            onChange={handleQuantityChange}
            onFocus={() => {
              if (!isSelected && quantity === 0) {
                onToggle(product.id, 1);
              }
            }}
            placeholder="0"
            className="w-16 rounded border border-gray-300 px-2 py-1 text-center text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
