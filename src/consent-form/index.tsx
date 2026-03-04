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
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="mb-4 text-xl font-bold text-amber-800">商品が選択されていません</h3>
            <p className="mb-6 text-slate-600">
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
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">買取同意書</h1>
          <p className="mt-1 text-slate-600">
            個人情報をご入力の上、同意して送信してください
          </p>
        </div>

        {/* 引き継ぎ商品 */}
        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-sm text-amber-700">
              1
            </span>
            売りたい商品
          </h2>
          <ul className="space-y-2">
            {form.selectedItems.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              if (!product) return null;
              return (
                <li
                  key={item.productId}
                  className="flex justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm"
                >
                  <span className="text-slate-700">
                    {product.name} × {item.quantity}
                  </span>
                  <span className="font-medium text-slate-900">
                    ¥{(product.buybackPrice * item.quantity).toLocaleString()}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 border-t border-slate-200 pt-3 text-right text-lg font-bold text-amber-600">
            合計見積: ¥{total.toLocaleString()}
          </p>
        </section>

        {/* 入力フォーム */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="space-y-8"
        >
          {/* 個人情報セクション */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 font-semibold text-slate-900">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-sm text-white">
                2
              </span>
              個人情報
            </h2>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
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
                  placeholder="ヤマダ タロウ"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  性別 <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-4">
                  {[
                    { value: 'male' as const, label: '男性' },
                    { value: 'female' as const, label: '女性' },
                    { value: 'other' as const, label: 'その他' },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 transition-colors has-[:checked]:border-slate-800 has-[:checked]:bg-slate-50"
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={opt.value}
                        checked={form.gender === opt.value}
                        onChange={() => updateField('gender', opt.value)}
                        className="h-4 w-4 border-slate-300 text-slate-800 focus:ring-slate-400"
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
                placeholder="会社員"
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
            </div>
          </section>

          {/* 連絡先セクション */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 font-semibold text-slate-900">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-sm text-white">
                3
              </span>
              連絡先
            </h2>
            <div className="space-y-4">
              <Input
                label="電話番号"
                type="tel"
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                error={errors.phone}
                placeholder="090-1234-5678"
                required
              />
              <Input
                label="メールアドレス"
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                error={errors.email}
                placeholder="example@email.com"
                required
              />
              <Textarea
                label="住所"
                value={form.address}
                onChange={(e) => updateField('address', e.target.value)}
                error={errors.address}
                rows={3}
                placeholder="〒123-4567 東京都..."
                required
              />
            </div>
          </section>

          {/* 振込先・その他セクション */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 font-semibold text-slate-900">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-sm text-white">
                4
              </span>
              振込先・その他
            </h2>
            <div className="space-y-4">
              <Textarea
                label="銀行口座情報"
                value={form.bankAccount}
                onChange={(e) => updateField('bankAccount', e.target.value)}
                error={errors.bankAccount}
                rows={2}
                placeholder="銀行名・支店名・口座番号・口座名義"
                hint="振込先の口座情報をご入力ください"
                required
              />
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  適格請求書発行事業者 <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 transition-colors has-[:checked]:border-slate-800 has-[:checked]:bg-slate-50">
                    <input
                      type="radio"
                      name="invoiceEligible"
                      checked={form.invoiceEligible === true}
                      onChange={() => updateField('invoiceEligible', true)}
                      className="h-4 w-4 border-slate-300 text-slate-800 focus:ring-slate-400"
                    />
                    はい
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 transition-colors has-[:checked]:border-slate-800 has-[:checked]:bg-slate-50">
                    <input
                      type="radio"
                      name="invoiceEligible"
                      checked={form.invoiceEligible === false}
                      onChange={() => updateField('invoiceEligible', false)}
                      className="h-4 w-4 border-slate-300 text-slate-800 focus:ring-slate-400"
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
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  顔写真付き身分証明書 <span className="text-red-500">*</span>
                </label>
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 transition-colors hover:border-slate-400 hover:bg-slate-100 has-[:focus]:border-slate-400 has-[:focus]:ring-2 has-[:focus]:ring-slate-400 has-[:focus]:ring-offset-2">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                  <svg
                    className="mb-2 h-10 w-10 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="text-sm font-medium text-slate-600">
                    {form.idDocument ? form.idDocument.name : 'クリックしてファイルを選択'}
                  </span>
                  <span className="mt-1 text-xs text-slate-500">
                    JPEG / PNG / PDF（10MB以下）
                  </span>
                </label>
                <p className="mt-1 text-xs text-slate-500">
                  モックアップでは選択のみ。実保存は行いません。
                </p>
              </div>
            </div>
          </section>

          {/* 注意書き・免責事項 */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <h3 className="mb-2 font-semibold text-slate-900">注意書き・免責事項</h3>
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
          <Link
            to="/buyback"
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            買取票に戻る
          </Link>
        </div>
      </main>

      {isSubmitted && <SubmitSuccessModal onClose={closeModal} />}
    </div>
  );
}
