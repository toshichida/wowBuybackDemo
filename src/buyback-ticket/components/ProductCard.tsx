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

  const increment = () => {
    const newQty = (quantity || 0) + 1;
    if (!isSelected) onToggle(product.id, 1);
    else onQuantityChange(product.id, newQty);
  };

  const decrement = () => {
    const current = quantity || 0;
    if (current <= 1) {
      onToggle(product.id, 0);
    } else {
      onQuantityChange(product.id, current - 1);
    }
  };

  const handleFocus = () => {
    if (!isSelected && quantity === 0) {
      onToggle(product.id, 1);
    }
  };

  return (
    <div
      className={`group flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm transition-all duration-200 sm:flex-row sm:items-center ${
        isSelected
          ? 'border-amber-400/60 border-2 shadow-md ring-2 ring-amber-400/20'
          : 'border-slate-200 hover:border-slate-300 hover:shadow'
      }`}
    >
      <div className="flex gap-4 sm:flex-1 sm:items-center">
        <div className="relative shrink-0 overflow-hidden rounded-lg bg-slate-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-24 w-24 object-cover sm:h-20 sm:w-20"
          />
          {isSelected && (
            <div className="absolute inset-0 flex items-center justify-center bg-amber-500/20">
              <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-white">
                選択中
              </span>
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-slate-900 line-clamp-2">{product.name}</h3>
          <p className="mt-1 text-xl font-bold text-amber-600">
            ¥{product.buybackPrice.toLocaleString()}
            <span className="ml-1 text-sm font-normal text-slate-500">/枚</span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4 sm:border-t-0 sm:border-l sm:border-slate-200 sm:pl-4 sm:pt-0">
        <Checkbox
          checked={isSelected}
          onChange={(e) => handleCheckChange(e.target.checked)}
          aria-label={`${product.name}を選択`}
        />
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={decrement}
            disabled={!isSelected || quantity <= 0}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 transition-colors hover:bg-slate-50 hover:border-slate-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
            aria-label="数量を減らす"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <label htmlFor={`qty-${product.id}`} className="sr-only">
            数量
          </label>
          <input
            id={`qty-${product.id}`}
            type="number"
            min="0"
            value={quantity || ''}
            onChange={handleQuantityChange}
            onFocus={handleFocus}
            placeholder="0"
            className="w-16 rounded-lg border border-slate-300 px-2 py-2 text-center text-sm font-medium focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          />
          <button
            type="button"
            onClick={increment}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 transition-colors hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
            aria-label="数量を増やす"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
