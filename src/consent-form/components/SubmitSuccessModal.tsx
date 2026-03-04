import { Link } from 'react-router-dom';
import { Button } from '../../shared/components';

interface SubmitSuccessModalProps {
  onClose: () => void;
}

export function SubmitSuccessModal({ onClose }: SubmitSuccessModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
    >
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 id="success-modal-title" className="mb-2 text-2xl font-bold text-slate-900">
            送信完了
          </h2>
          <p className="mb-8 text-slate-600">
            買取同意書を送信しました。ご確認のため、担当者よりご連絡いたします。
          </p>
          <div className="flex flex-col gap-3">
            <Button onClick={onClose} fullWidth size="lg">
              閉じる
            </Button>
            <Link to="/buyback">
              <Button variant="outline" fullWidth size="lg">
                買取票に戻る
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
