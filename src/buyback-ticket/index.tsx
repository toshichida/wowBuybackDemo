import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useStoreData } from '../shared/hooks/useStoreData';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { Button } from '../shared/components';
import { useSelectedItems } from './hooks/useSelectedItems';
import { calculateTotal } from '../shared/utils/calculateTotal';
import { saveSelectedItems } from '../shared/utils/storage';
import { savePreviewItems } from '../shared/utils/previewStorage';
export function BuybackTicket() {
  const { categories, products } = useStoreData();
  const navigate = useNavigate();
  const { selectedItems, toggleProduct, setQuantity, isSelected, getQuantity } = useSelectedItems();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    categories[0]?.id ?? null
  );

  const filteredProducts = useMemo(() => {
    if (!selectedCategoryId) return products;
    return products.filter((p) => p.categoryId === selectedCategoryId);
  }, [selectedCategoryId, products]);

  const total = useMemo(() => calculateTotal(selectedItems, products), [selectedItems, products]);

  const hasSelection = selectedItems.some((item) => item.quantity > 0);

  const handleProceed = () => {
    const validItems = selectedItems.filter((item) => item.quantity > 0);
    saveSelectedItems(validItems);
    navigate('/consent');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">買取票</h1>

        {/* カテゴリタブ */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategoryId === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 shadow-sm hover:bg-gray-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* 商品一覧 */}
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={isSelected(product.id)}
              quantity={getQuantity(product.id)}
              onToggle={toggleProduct}
              onQuantityChange={setQuantity}
            />
          ))}
        </div>

        {/* 合計・CTA */}
        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-medium text-gray-700">合計見積金額</span>
            <span className="text-2xl font-bold text-blue-600">¥{total.toLocaleString()}</span>
          </div>
          {!hasSelection && (
            <p className="mb-4 text-sm text-amber-600">商品を選択して数量を入力してください</p>
          )}
          <div className="flex flex-col gap-2">
            <Button onClick={handleProceed} disabled={!hasSelection} fullWidth size="lg">
              買取同意書へ進む
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const validItems = selectedItems.filter((item) => item.quantity > 0);
                savePreviewItems(validItems);
                navigate('/preview');
              }}
              disabled={!hasSelection}
              fullWidth
            >
              画像プレビュー
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
