import type { SelectedItem } from '../types';

const STORAGE_KEY = 'wow-buyback-selected-items';

export function saveSelectedItems(items: SelectedItem[]): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function loadSelectedItems(): SelectedItem[] {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as SelectedItem[];
  } catch {
    return [];
  }
}

export function clearSelectedItems(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}
