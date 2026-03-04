import { useRef, useEffect, useState } from 'react';
import type { Product } from '../../shared/types';

interface ListProductLayoutProps {
  products: Product[];
  width?: number;
  aspectRatio?: '16:9' | '1:1';
}

export function ListProductLayout({
  products,
  width = 1200,
  aspectRatio = '16:9',
}: ListProductLayoutProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const [w, h] = aspectRatio === '16:9' ? [width, Math.round((width * 9) / 16)] : [width, width];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || products.length === 0) {
      setLoading(false);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = w;
    canvas.height = h;

    const rowHeight = 60;
    const imgSize = 45;

    let loaded = 0;
    const total = products.length;
    const images: HTMLImageElement[] = [];

    const draw = () => {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#1a365d';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('買取専門店WOW', 20, 35);

      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(20, 50);
      ctx.lineTo(w - 20, 50);
      ctx.stroke();

      products.forEach((product, i) => {
        const y = 70 + i * rowHeight;

        const img = images[i];
        if (img && img.complete && img.naturalWidth > 0) {
          ctx.drawImage(img, 30, y - imgSize / 2, imgSize, imgSize);
        } else {
          ctx.fillStyle = '#e2e8f0';
          ctx.fillRect(30, y - imgSize / 2, imgSize, imgSize);
        }

        ctx.fillStyle = '#1e293b';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'left';
        const name = product.name.length > 50 ? product.name.slice(0, 50) + '...' : product.name;
        ctx.fillText(name, 90, y + 5);

        ctx.fillStyle = '#2563eb';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`¥${product.buybackPrice.toLocaleString()}`, w - 30, y + 5);
      });

      setDataUrl(canvas.toDataURL('image/png'));
      setLoading(false);
    };

    if (total === 0) {
      draw();
      return;
    }

    products.forEach((product, i) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = img.onerror = () => {
        images[i] = img;
        loaded++;
        if (loaded >= total) draw();
      };
      img.src = product.imageUrl;
    });
  }, [products, w, h]);

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
          alt="一覧プレビュー"
          className="w-full max-w-full rounded-lg border shadow-lg"
        />
      )}
    </div>
  );
}
