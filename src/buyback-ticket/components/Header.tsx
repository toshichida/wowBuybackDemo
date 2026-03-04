import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link to="/buyback" className="flex items-center gap-2">
          <img src="/logo.svg" alt="買取専門店WOW" className="h-10 w-auto" />
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link to="/buyback" className="text-gray-600 hover:text-blue-600">
            買取票
          </Link>
          <Link to="/preview" className="text-gray-600 hover:text-blue-600">
            画像プレビュー
          </Link>
          <Link to="/admin" className="text-gray-600 hover:text-blue-600">
            管理者
          </Link>
        </nav>
      </div>
    </header>
  );
}
