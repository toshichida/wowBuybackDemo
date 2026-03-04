/**
 * カテゴリ型定義
 */
export interface Category {
  id: string;
  name: string;
  sortOrder?: number;
}

/**
 * 商品型定義
 */
export interface Product {
  id: string;
  name: string;
  buybackPrice: number;
  imageUrl: string;
  categoryId: string;
}

/**
 * 買取票での選択状態
 */
export interface SelectedItem {
  productId: string;
  quantity: number;
}

/**
 * 買取同意書フォーム入力
 */
export interface ConsentFormInput {
  name: string;
  nameKana: string;
  gender: 'male' | 'female' | 'other';
  occupation: string;
  birthDate: string;
  phone: string;
  email: string;
  address: string;
  bankAccount: string;
  invoiceEligible: boolean;
  xAccountName: string;
  idDocument?: File;
  selectedItems: SelectedItem[];
}
