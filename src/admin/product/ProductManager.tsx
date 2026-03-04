import { useState } from 'react';
import { Button, Input } from '../../shared/components';
import type { Category, Product } from '../../shared/types';

interface ProductManagerProps {
  categories: Category[];
  products: Product[];
  onAdd: (product: Omit<Product, 'id'>) => void;
  onUpdate: (id: string, updates: Partial<Product>) => void;
  onDelete: (id: string) => void;
}

export function ProductManager({
  categories,
  products,
  onAdd,
  onUpdate,
  onDelete,
}: ProductManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    buybackPrice: '',
    imageUrl: '',
    categoryId: categories[0]?.id ?? '',
  });
  const [editForm, setEditForm] = useState<Partial<Product>>({});

  const resetForm = () => {
    setForm({
      name: '',
      buybackPrice: '',
      imageUrl: '',
      categoryId: categories[0]?.id ?? '',
    });
    setShowForm(false);
  };

  const handleAdd = () => {
    const price = parseInt(form.buybackPrice, 10);
    if (form.name.trim() && !isNaN(price) && price >= 0 && form.categoryId) {
      onAdd({
        name: form.name.trim(),
        buybackPrice: price,
        imageUrl: form.imageUrl.trim() || 'https://placehold.co/120x120/1a365d/ffffff?text=NEW',
        categoryId: form.categoryId,
      });
      resetForm();
    }
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm({
      name: product.name,
      buybackPrice: product.buybackPrice,
      imageUrl: product.imageUrl,
      categoryId: product.categoryId,
    });
  };

  const saveEdit = () => {
    if (editingId && editForm.name) {
      onUpdate(editingId, {
        name: editForm.name,
        buybackPrice: editForm.buybackPrice ?? 0,
        imageUrl: editForm.imageUrl ?? '',
        categoryId: editForm.categoryId ?? '',
      });
      setEditingId(null);
      setEditForm({});
    }
  };

  const getCategoryName = (categoryId: string) =>
    categories.find((c) => c.id === categoryId)?.name ?? categoryId;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-gray-900">商品管理</h2>

      {!showForm ? (
        <Button onClick={() => setShowForm(true)} className="mb-6">
          商品を追加
        </Button>
      ) : (
        <div className="mb-6 rounded border border-gray-200 bg-gray-50 p-4">
          <h3 className="mb-3 font-semibold">新規商品</h3>
          <div className="space-y-3">
            <Input
              label="商品名"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
            <Input
              label="買取価格（円）"
              type="number"
              value={form.buybackPrice}
              onChange={(e) => setForm((f) => ({ ...f, buybackPrice: e.target.value }))}
            />
            <Input
              label="画像URL"
              value={form.imageUrl}
              onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
              placeholder="https://..."
            />
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">カテゴリ</label>
              <select
                value={form.categoryId}
                onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <Button onClick={handleAdd}>追加</Button>
            <Button variant="secondary" onClick={resetForm}>
              キャンセル
            </Button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-gray-200 text-left text-sm text-gray-600">
              <th className="pb-2 pr-4">画像</th>
              <th className="pb-2 pr-4">商品名</th>
              <th className="pb-2 pr-4">買取価格</th>
              <th className="pb-2 pr-4">カテゴリ</th>
              <th className="pb-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-100">
                <td className="py-3 pr-4">
                  <img src={product.imageUrl} alt="" className="h-12 w-12 rounded object-cover" />
                </td>
                <td className="py-3 pr-4">
                  {editingId === product.id ? (
                    <Input
                      value={editForm.name ?? ''}
                      onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-48"
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td className="py-3 pr-4">
                  {editingId === product.id ? (
                    <Input
                      type="number"
                      value={editForm.buybackPrice ?? ''}
                      onChange={(e) =>
                        setEditForm((f) => ({
                          ...f,
                          buybackPrice: parseInt(e.target.value, 10) || 0,
                        }))
                      }
                      className="w-24"
                    />
                  ) : (
                    `¥${product.buybackPrice.toLocaleString()}`
                  )}
                </td>
                <td className="py-3 pr-4">
                  {editingId === product.id ? (
                    <select
                      value={editForm.categoryId ?? ''}
                      onChange={(e) =>
                        setEditForm((f) => ({
                          ...f,
                          categoryId: e.target.value,
                        }))
                      }
                      className="rounded border border-gray-300 px-2 py-1"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    getCategoryName(product.categoryId)
                  )}
                </td>
                <td className="py-3">
                  {editingId === product.id ? (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={saveEdit}>
                        保存
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          setEditingId(null);
                          setEditForm({});
                        }}
                      >
                        キャンセル
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => startEdit(product)}>
                        編集
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => onDelete(product.id)}>
                        削除
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
