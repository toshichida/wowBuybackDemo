import { useNavigate } from 'react-router-dom';
import { AdminLayout } from './components/AdminLayout';
import { CategoryManager } from './category/CategoryManager';
import { ProductManager } from './product/ProductManager';
import { useAdminData } from '../shared/hooks/useAdminData';
import { savePreviewItems } from '../shared/utils/previewStorage';
import { Button } from '../shared/components';

export function Admin() {
  const navigate = useNavigate();
  const {
    categories,
    products,
    addCategory,
    updateCategory,
    deleteCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefault,
  } = useAdminData();

  const productsCount = (categoryId: string) =>
    products.filter((p) => p.categoryId === categoryId).length;

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">管理者画面</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              savePreviewItems(products.map((p) => ({ productId: p.id, quantity: 1 })));
              navigate('/preview');
            }}
          >
            画像プレビュー（全商品）
          </Button>
          <Button variant="secondary" size="sm" onClick={resetToDefault}>
            初期データに戻す
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        <CategoryManager
          categories={categories}
          productsCount={productsCount}
          onAdd={addCategory}
          onUpdate={updateCategory}
          onDelete={deleteCategory}
        />
        <ProductManager
          categories={categories}
          products={products}
          onAdd={addProduct}
          onUpdate={updateProduct}
          onDelete={deleteProduct}
        />
      </div>
    </AdminLayout>
  );
}
