import type { SelectedItem } from '../types';

const PREVIEW_ITEMS_KEY = 'wow-preview-items';

export function savePreviewItems(items: SelectedItem[]): void {
  sessionStorage.setItem(PREVIEW_ITEMS_KEY, JSON.stringify(items));
}

export function loadPreviewItems(): SelectedItem[] {
  try {
    const data = sessionStorage.getItem(PREVIEW_ITEMS_KEY);
    if (!data) return [];
    return JSON.parse(data) as SelectedItem[];
  } catch {
    return [];
  }
}
