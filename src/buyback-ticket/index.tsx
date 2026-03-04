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
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">買取票</h1>
          <p className="mt-1 text-slate-600">
            売りたい商品を選択し、数量を入力してください
          </p>
        </div>

        {/* カテゴリタブ */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                selectedCategoryId === cat.id
                  ? 'bg-slate-800 text-white shadow-md'
                  : 'bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:shadow'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* 商品一覧 */}
        <div className="space-y-4">
          {filteredProducts.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-slate-300 bg-white p-12 text-center">
              <p className="text-slate-500">このカテゴリに商品はありません</p>
              <p className="mt-1 text-sm text-slate-400">
                管理者画面で商品を追加してください
              </p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isSelected={isSelected(product.id)}
                quantity={getQuantity(product.id)}
                onToggle={toggleProduct}
                onQuantityChange={setQuantity}
              />
            ))
          )}
        </div>

        {/* 合計・CTA - デスクトップ */}
        <div className="mt-8 hidden sm:block">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg font-medium text-slate-700">合計見積金額</span>
              <span className="text-2xl font-bold text-amber-600">
                ¥{total.toLocaleString()}
              </span>
            </div>
            {!hasSelection && (
              <p className="mb-4 text-sm text-amber-700">
                商品を選択して数量を入力してください
              </p>
            )}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={handleProceed}
                disabled={!hasSelection}
                fullWidth
                size="lg"
                className="sm:flex-1"
              >
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
                size="lg"
                className="sm:flex-1"
              >
                画像プレビュー
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* モバイル用 Sticky 合計バー */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] backdrop-blur-sm sm:hidden">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <div>
            <p className="text-xs text-slate-500">合計見積</p>
            <p className="text-xl font-bold text-amber-600">
              ¥{total.toLocaleString()}
            </p>
          </div>
          <div className="flex flex-1 gap-2">
            <Button
              onClick={handleProceed}
              disabled={!hasSelection}
              size="md"
              className="flex-1"
            >
              同意書へ
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const validItems = selectedItems.filter((item) => item.quantity > 0);
                savePreviewItems(validItems);
                navigate('/preview');
              }}
              disabled={!hasSelection}
              size="md"
            >
              プレビュー
            </Button>
          </div>
        </div>
      </div>

      {/* モバイル用下部スペーサー（Stickyバー分） */}
      <div className="h-24 sm:hidden" aria-hidden />
    </div>
  );
}
