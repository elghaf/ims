import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getCategories, createCategory as apiCreateCategory, updateCategory as apiUpdateCategory, deleteCategory as apiDeleteCategory } from '../services/api';
import { Category } from '../types';

export const useCategories = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    // Fetch categories
    const { data: categories = [], isLoading, error } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            try {
                return await getCategories();
            } catch (error: any) {
                if (error.response?.status === 401) {
                    // Let the axios interceptor handle the redirect
                    throw error;
                }
                console.error('Error fetching categories:', error);
                throw error;
            }
        },
        retry: false,
        staleTime: 5 * 60 * 1000,
    });

    // Create category mutation
    const createMutation = useMutation({
        mutationFn: (category: Omit<Category, 'id'>) => apiCreateCategory(category),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });

    // Update category mutation
    const updateMutation = useMutation({
        mutationFn: ({ id, category }: { id: number; category: Partial<Category> }) => 
            apiUpdateCategory(id, category),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });

    // Delete category mutation
    const deleteMutation = useMutation({
        mutationFn: (id: number) => apiDeleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });

    // Expose data and mutation functions
    return {
        categories,
        isLoading,
        error,
        createCategory: createMutation.mutate,
        updateCategory: updateMutation.mutate,
        deleteCategory: deleteMutation.mutate,
    };
};
