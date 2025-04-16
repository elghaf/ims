import axios from "@/utils/axios";
import { Category } from "../types";

export const getCategories = async (): Promise<Category[]> => {
    const token = localStorage.getItem("access_token");
    if (!token) {
        throw new Error("No access token found");
    }

    const response = await axios.get<Category[]>("/api/categories");
    return response.data;
};

export const createCategory = async (category: Omit<Category, "id">): Promise<Category> => {
    const response = await axios.post<Category>("/api/categories", category);
    return response.data;
};

export const updateCategory = async (id: number, category: Partial<Category>): Promise<Category> => {
    const response = await axios.put<Category>(`/api/categories/${id}`, category);
    return response.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
    await axios.delete(`/api/categories/${id}`);
};
