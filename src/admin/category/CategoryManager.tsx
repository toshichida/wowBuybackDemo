import { useState } from 'react';
import { Button, Input } from '../../shared/components';
import type { Category } from '../../shared/types';

interface CategoryManagerProps {
  categories: Category[];
  productsCount: (categoryId: string) => number;
  onAdd: (name: string) => void;
  onUpdate: (id: string, name: string) => void;
  onDelete: (id: string) => { success: boolean; productCount: number };
}

export function CategoryManager({
  categories,
  productsCount,
  onAdd,
  onUpdate,
  onDelete,
}: CategoryManagerProps) {
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const handleAdd = () => {
    if (newName.trim()) {
      onAdd(newName.trim());
      setNewName('');
    }
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  const saveEdit = () => {
    if (editingId && editName.trim()) {
      onUpdate(editingId, editName.trim());
      setEditingId(null);
      setEditName('');
    }
  };

  const handleDelete = (id: string) => {
    const result = onDelete(id);
    if (!result.success && result.productCount > 0) {
      alert(
        `このカテゴリには${result.productCount}件の商品が紐づいています。先に商品を削除または他カテゴリに移動してください。`
      );
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-gray-900">カテゴリ管理</h2>

      <div className="mb-6 flex gap-2">
        <Input
          placeholder="カテゴリ名"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          className="flex-1"
        />
        <Button onClick={handleAdd}>追加</Button>
      </div>

      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="flex items-center justify-between rounded border border-gray-200 bg-gray-50 p-3"
          >
            {editingId === cat.id ? (
              <div className="flex flex-1 gap-2">
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1"
                />
                <Button size="sm" onClick={saveEdit}>
                  保存
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setEditingId(null);
                    setEditName('');
                  }}
                >
                  キャンセル
                </Button>
              </div>
            ) : (
              <>
                <span className="font-medium">{cat.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{productsCount(cat.id)}商品</span>
                  <Button size="sm" variant="outline" onClick={() => startEdit(cat)}>
                    編集
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(cat.id)}>
                    削除
                  </Button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
