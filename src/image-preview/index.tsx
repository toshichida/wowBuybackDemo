import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loadPreviewItems } from '../shared/utils/previewStorage';
import { useStoreData } from '../shared/hooks/useStoreData';
import { SingleProductLayout } from './layouts/SingleProductLayout';
import { MultiProductLayout } from './layouts/MultiProductLayout';
import { ListProductLayout } from './layouts/ListProductLayout';
import type { Product } from '../shared/types';

function getProductsFromSelection(
  selectedItems: { productId: string; quantity: number }[],
  products: Product[]
): Product[] {
  const result: Product[] = [];
  for (const item of selectedItems) {
    const product = products.find((p) => p.id === item.productId);
    if (product) {
      for (let i = 0; i < item.quantity; i++) {
        result.push(product);
      }
    }
  }
  return result;
}

export function ImagePreview() {
  const { products } = useStoreData();
  const previewItems = loadPreviewItems();
  const displayProducts = getProductsFromSelection(previewItems, products);

  const [aspectRatio, setAspectRatio] = useState<'16:9' | '1:1'>('16:9');

  const hasProducts = displayProducts.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/buyback" className="flex items-center gap-2">
            <img src="/logo.svg" alt="買取専門店WOW" className="h-10 w-auto" />
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link to="/buyback" className="text-gray-600 hover:text-blue-600">
              買取票
            </Link>
            <Link to="/admin" className="text-gray-600 hover:text-blue-600">
              管理者
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">画像プレビュー</h1>

        {!hasProducts ? (
          <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-8 text-center">
            <h3 className="mb-4 text-xl font-bold text-amber-800">
              プレビューする商品がありません
            </h3>
            <p className="mb-6 text-gray-600">
              買取票で商品を選択してから「画像プレビュー」をクリックするか、
              管理者画面から商品を選択してプレビューしてください。
            </p>
            <Link
              to="/buyback"
              className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >
              買取票で商品を選択
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <div>
                <label className="mr-2 text-sm font-medium text-gray-700">アスペクト比:</label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value as '16:9' | '1:1')}
                  className="rounded border border-gray-300 px-3 py-1"
                >
                  <option value="16:9">16:9（X投稿向け）</option>
                  <option value="1:1">1:1（正方形）</option>
                </select>
              </div>
            </div>

            <div className="space-y-12">
              {displayProducts.length >= 1 && (
                <section>
                  <h2 className="mb-4 text-lg font-semibold text-gray-900">パターンA: 単品表示</h2>
                  <SingleProductLayout
                    product={displayProducts[0]}
                    width={1200}
                    aspectRatio={aspectRatio}
                  />
                </section>
              )}

              {displayProducts.length >= 2 && (
                <section>
                  <h2 className="mb-4 text-lg font-semibold text-gray-900">
                    パターンB: 複数表示（2〜10商品）
                  </h2>
                  <MultiProductLayout
                    products={displayProducts.slice(0, 10)}
                    width={1200}
                    aspectRatio={aspectRatio}
                  />
                </section>
              )}

              <section>
                <h2 className="mb-4 text-lg font-semibold text-gray-900">パターンC: 一覧表示</h2>
                <ListProductLayout
                  products={displayProducts}
                  width={1200}
                  aspectRatio={aspectRatio}
                />
              </section>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
