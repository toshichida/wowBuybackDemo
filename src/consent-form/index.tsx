import { Link } from 'react-router-dom';
import { Header } from '../buyback-ticket/components/Header';
import { Input, Textarea, Button } from '../shared/components';
import { SubmitSuccessModal } from './components/SubmitSuccessModal';
import { useConsentForm } from './hooks/useConsentForm';
import { loadSelectedItems } from '../shared/utils/storage';
import { calculateTotal } from '../shared/utils/calculateTotal';
import { useStoreData } from '../shared/hooks/useStoreData';

export function ConsentForm() {
  const { products } = useStoreData();
  const initialItems = loadSelectedItems();
  const { form, errors, isSubmitted, updateField, submit, closeModal } =
    useConsentForm(initialItems);

  const total = calculateTotal(form.selectedItems, products);
  const hasItems = form.selectedItems.length > 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateField('idDocument', file);
    }
  };

  // 買取票から遷移していない場合のフォールバック
  if (!hasItems) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="mx-auto max-w-2xl px-4 py-12">
          <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-8 text-center">
            <h3 className="mb-4 text-xl font-bold text-amber-800">商品が選択されていません</h3>
            <p className="mb-6 text-gray-600">
              買取同意書を入力するには、まず買取票で売りたい商品を選択してください。
            </p>
            <Link to="/buyback">
              <Button size="lg">買取票で商品を選択する</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">買取同意書</h1>

        {/* 引き継ぎ商品 */}
        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="mb-3 font-semibold text-gray-900">売りたい商品</h2>
          <ul className="space-y-2">
            {form.selectedItems.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              if (!product) return null;
              return (
                <li key={item.productId} className="flex justify-between text-sm text-gray-700">
                  <span>
                    {product.name} × {item.quantity}
                  </span>
                  <span>¥{(product.buybackPrice * item.quantity).toLocaleString()}</span>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 border-t pt-3 text-right font-bold text-blue-600">
            合計見積: ¥{total.toLocaleString()}
          </p>
        </div>

        {/* 入力フォーム */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="space-y-6"
        >
          <Input
            label="氏名"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            error={errors.name}
            required
          />
          <Input
            label="氏名（読み仮名）"
            value={form.nameKana}
            onChange={(e) => updateField('nameKana', e.target.value)}
            error={errors.nameKana}
            required
          />
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">性別</label>
            <div className="flex gap-4">
              {[
                { value: 'male' as const, label: '男' },
                { value: 'female' as const, label: '女' },
                { value: 'other' as const, label: 'その他' },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={opt.value}
                    checked={form.gender === opt.value}
                    onChange={() => updateField('gender', opt.value)}
                    className="rounded-full border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
          <Input
            label="職業"
            value={form.occupation}
            onChange={(e) => updateField('occupation', e.target.value)}
            error={errors.occupation}
            required
          />
          <Input
            label="生年月日"
            type="date"
            value={form.birthDate}
            onChange={(e) => updateField('birthDate', e.target.value)}
            error={errors.birthDate}
            required
          />
          <Input
            label="電話番号"
            type="tel"
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            error={errors.phone}
            required
          />
          <Input
            label="メールアドレス"
            type="email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            error={errors.email}
            required
          />
          <Textarea
            label="住所"
            value={form.address}
            onChange={(e) => updateField('address', e.target.value)}
            error={errors.address}
            rows={3}
            required
          />
          <Textarea
            label="銀行口座情報（銀行名・支店名・口座番号等）"
            value={form.bankAccount}
            onChange={(e) => updateField('bankAccount', e.target.value)}
            error={errors.bankAccount}
            rows={2}
            required
          />
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              適格請求書発行事業者の該否
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="invoiceEligible"
                  checked={form.invoiceEligible === true}
                  onChange={() => updateField('invoiceEligible', true)}
                  className="rounded-full border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                はい
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="invoiceEligible"
                  checked={form.invoiceEligible === false}
                  onChange={() => updateField('invoiceEligible', false)}
                  className="rounded-full border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                いいえ
              </label>
            </div>
          </div>
          <Input
            label="Xアカウント名"
            value={form.xAccountName}
            onChange={(e) => updateField('xAccountName', e.target.value)}
            error={errors.xAccountName}
            placeholder="@username"
            required
          />
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              顔写真付き身分証明書（JPEG/PNG/PDF）
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:rounded file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-600 hover:file:bg-blue-100"
            />
            <p className="mt-1 text-xs text-gray-500">
              モックアップでは選択のみ。実保存は行いません。
            </p>
          </div>

          {/* 注意書き・免責事項 */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            <h3 className="mb-2 font-semibold">注意書き・免責事項</h3>
            <ul className="list-inside list-disc space-y-1">
              <li>最終的な買取金額は、当方での査定結果を確認後、正式にお伝えいたします。</li>
              <li>
                古物商に基づく個人情報の取り扱いに関する説明に同意いただいたものとみなします。
              </li>
              <li>古物商取引に必要な法的注意事項にご同意の上、送信してください。</li>
            </ul>
          </div>

          <Button type="submit" fullWidth size="lg">
            同意して送信
          </Button>
        </form>

        <div className="mt-6">
          <Link to="/buyback" className="text-sm text-blue-600 hover:underline">
            ← 買取票に戻る
          </Link>
        </div>
      </main>

      {isSubmitted && <SubmitSuccessModal onClose={closeModal} />}
    </div>
  );
}
