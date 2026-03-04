import { useRef, useEffect, useState } from 'react';
import type { Product } from '../../shared/types';

interface MultiProductLayoutProps {
  products: Product[];
  width?: number;
  aspectRatio?: '16:9' | '1:1';
}

export function MultiProductLayout({
  products,
  width = 1200,
  aspectRatio = '16:9',
}: MultiProductLayoutProps) {
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

    const cols = Math.min(products.length, 5);
    const rows = Math.ceil(products.length / cols);
    const cellW = w / cols;
    const cellH = h / rows;
    const imgSize = Math.min(cellW * 0.5, cellH * 0.5, 150);

    let loaded = 0;
    const total = products.length;
    const images: HTMLImageElement[] = [];

    const draw = () => {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#1a365d';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText('買取専門店WOW', 30, 40);

      products.forEach((product, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = col * cellW + (cellW - imgSize) / 2;
        const y = 60 + row * cellH + 20;

        const img = images[i];
        if (img && img.complete && img.naturalWidth > 0) {
          ctx.drawImage(img, x, y, imgSize, imgSize);
        } else {
          ctx.fillStyle = '#e2e8f0';
          ctx.fillRect(x, y, imgSize, imgSize);
        }

        ctx.fillStyle = '#1e293b';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        const name = product.name.length > 12 ? product.name.slice(0, 12) + '...' : product.name;
        ctx.fillText(name, col * cellW + cellW / 2, y + imgSize + 25);

        ctx.fillStyle = '#b45309';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText(
          `¥${product.buybackPrice.toLocaleString()}`,
          col * cellW + cellW / 2,
          y + imgSize + 45
        );
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
        <div className="flex h-64 items-center justify-center rounded-xl bg-slate-100">
          <span className="flex items-center gap-2 text-slate-500">
            <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            生成中...
          </span>
        </div>
      ) : (
        <img
          src={dataUrl}
          alt="複数商品プレビュー"
          className="w-full max-w-full rounded-xl border border-slate-200 shadow-lg"
        />
      )}
    </div>
  );
}
