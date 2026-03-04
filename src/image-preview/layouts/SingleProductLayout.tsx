import { useRef, useEffect, useState } from 'react';
import type { Product } from '../../shared/types';

interface SingleProductLayoutProps {
  product: Product;
  width?: number;
  aspectRatio?: '16:9' | '1:1';
}

export function SingleProductLayout({
  product,
  width = 1200,
  aspectRatio = '16:9',
}: SingleProductLayoutProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const [w, h] = aspectRatio === '16:9' ? [width, Math.round((width * 9) / 16)] : [width, width];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = w;
    canvas.height = h;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#1a365d';
      ctx.font = 'bold 32px sans-serif';
      ctx.fillText('買取専門店WOW', 40, 50);

      const imgSize = Math.min(w * 0.4, h * 0.5, 400);
      const imgX = (w - imgSize) / 2;
      const imgY = 120;
      ctx.drawImage(img, imgX, imgY, imgSize, imgSize);

      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 28px sans-serif';
      ctx.textAlign = 'center';
      const name = product.name.length > 30 ? product.name.slice(0, 30) + '...' : product.name;
      ctx.fillText(name, w / 2, imgY + imgSize + 50);

      ctx.fillStyle = '#2563eb';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText(`¥${product.buybackPrice.toLocaleString()}`, w / 2, imgY + imgSize + 95);

      setDataUrl(canvas.toDataURL('image/png'));
      setLoading(false);
    };
    img.onerror = () => {
      ctx.fillStyle = '#94a3b8';
      ctx.font = '24px sans-serif';
      ctx.fillText('画像読み込みエラー', w / 2 - 60, h / 2);
      setDataUrl(canvas.toDataURL('image/png'));
      setLoading(false);
    };
    img.src = product.imageUrl;
  }, [product, w, h]);

  return (
    <div className="space-y-2">
      <canvas ref={canvasRef} width={w} height={h} className="hidden" />
      {loading ? (
        <div className="flex h-64 items-center justify-center bg-gray-100">
          <span className="text-gray-500">生成中...</span>
        </div>
      ) : (
        <img
          src={dataUrl}
          alt={`${product.name} プレビュー`}
          className="w-full max-w-full rounded-lg border shadow-lg"
        />
      )}
    </div>
  );
}
