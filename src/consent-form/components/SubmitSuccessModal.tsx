import { Link } from 'react-router-dom';
import { Button } from '../../shared/components';

interface SubmitSuccessModalProps {
  onClose: () => void;
}

export function SubmitSuccessModal({ onClose }: SubmitSuccessModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
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
          <h2 className="mb-2 text-xl font-bold text-gray-900">送信完了</h2>
          <p className="mb-6 text-gray-600">
            買取同意書を送信しました。ご確認のため、担当者よりご連絡いたします。
          </p>
          <div className="flex flex-col gap-2">
            <Button onClick={onClose} fullWidth>
              閉じる
            </Button>
            <Link to="/buyback">
              <Button variant="outline" fullWidth>
                買取票に戻る
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
