import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loadPreviewItems } from '../shared/utils/previewStorage';
import { useStoreData } from '../shared/hooks/useStoreData';
import { SingleProductLayout } from './layouts/SingleProductLayout';
import { MultiProductLayout } from './layouts/MultiProductLayout';
import { ListProductLayout } from './layouts/ListProductLayout';
import { Header } from '../buyback-ticket/components/Header';
import { Button } from '../shared/components';
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
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">画像プレビュー</h1>
          <p className="mt-1 text-slate-600">
            X投稿用の画像を3パターンでプレビューできます
          </p>
        </div>

        {!hasProducts ? (
          <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <svg
                className="h-8 w-8 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="mb-4 text-xl font-bold text-amber-800">
              プレビューする商品がありません
            </h3>
            <p className="mb-6 text-slate-600">
              買取票で商品を選択してから「画像プレビュー」をクリックするか、
              管理者画面から商品を選択してプレビューしてください。
            </p>
            <Link to="/buyback">
              <Button size="lg">買取票で商品を選択</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div>
                <label className="mr-2 text-sm font-medium text-slate-700">アスペクト比:</label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value as '16:9' | '1:1')}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                >
                  <option value="16:9">16:9（X投稿向け）</option>
                  <option value="1:1">1:1（正方形）</option>
                </select>
              </div>
            </div>

            <div className="space-y-12">
              {displayProducts.length >= 1 && (
                <section>
                  <h2 className="mb-4 text-lg font-semibold text-slate-900">
                    パターンA: 単品表示
                  </h2>
                  <SingleProductLayout
                    product={displayProducts[0]}
                    width={1200}
                    aspectRatio={aspectRatio}
                  />
                </section>
              )}

              {displayProducts.length >= 2 && (
                <section>
                  <h2 className="mb-4 text-lg font-semibold text-slate-900">
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
                <h2 className="mb-4 text-lg font-semibold text-slate-900">
                  パターンC: 一覧表示
                </h2>
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
