import axios from "@/utils/axios";
import { Product, ProductFormData } from "../types";

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>("/api/products");
  return response.data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const response = await axios.get<Product>(`/api/products/${id}`);
  return response.data;
};

export const createProduct = async (product: ProductFormData): Promise<Product> => {
  const payload = {
    ...product,
    created_at: new Date().toISOString(), // Format the date for the backend
  };
  const response = await axios.post<Product>("/api/products", payload);
  return response.data;
};

export const updateProduct = async (id: number, product: Partial<ProductFormData>): Promise<Product> => {
  const response = await axios.put<Product>(`/api/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`/api/products/${id}`);
};
