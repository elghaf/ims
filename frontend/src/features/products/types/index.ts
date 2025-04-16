export interface Product {
  id: number;
  name: string;
  sku: string;
  description?: string;
  price: number;
  stock_quantity: number;
  category_id: number;
  created_at: string;
  category?: {
    id: number;
    name: string;
  };
}

export interface ProductFormData {
  name: string;
  sku: string;
  description?: string;
  price: number;
  stock_quantity: number;
  category_id: number;
}
