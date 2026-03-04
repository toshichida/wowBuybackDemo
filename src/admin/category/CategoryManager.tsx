import { useState } from 'react';
import { Button, Input, Modal } from '../../shared/components';
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
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string; count: number } | null>(null);

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

  const handleDeleteClick = (id: string) => {
    const result = onDelete(id);
    if (!result.success && result.productCount > 0) {
      const cat = categories.find((c) => c.id === id);
      setDeleteTarget({
        id,
        name: cat?.name ?? '',
        count: result.productCount,
      });
    }
  };

  const confirmDelete = () => {
    setDeleteTarget(null);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-slate-900">カテゴリ管理</h2>

      <div className="mb-6 flex gap-2">
        <Input
          placeholder="カテゴリ名を入力"
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
            className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            {editingId === cat.id ? (
              <div className="flex flex-1 flex-wrap gap-2">
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="min-w-[200px] flex-1"
                />
                <div className="flex gap-2">
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
              </div>
            ) : (
              <>
                <span className="font-medium text-slate-900">{cat.name}</span>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-sm text-slate-600">
                    {productsCount(cat.id)}商品
                  </span>
                  <Button size="sm" variant="outline" onClick={() => startEdit(cat)}>
                    編集
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDeleteClick(cat.id)}>
                    削除
                  </Button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <Modal
        isOpen={!!deleteTarget}
        onClose={confirmDelete}
        title="カテゴリを削除できません"
        size="md"
      >
        {deleteTarget && (
          <div className="space-y-4">
            <p className="text-slate-600">
              「{deleteTarget.name}」には{deleteTarget.count}
              件の商品が紐づいています。先に商品を削除または他カテゴリに移動してください。
            </p>
            <Button onClick={confirmDelete} fullWidth>
              閉じる
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
