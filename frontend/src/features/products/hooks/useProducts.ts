import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../services/api';
import { Product, ProductFormData } from '../types';

// Hook for fetching all products
export const useProducts = () => {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return { products, isLoading, error };
};

// Hook for fetching a single product
export const useProduct = (id: number) => {
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!id, // Only run the query if id is provided
  });

  return { product, isLoading, error };
};

// Hook for creating a product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: ProductFormData) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      router.push('/products');
    },
  });

  return mutation;
};

// Hook for updating a product
export const useUpdateProduct = (id: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: Partial<ProductFormData>) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      router.push('/products');
    },
  });

  return mutation;
};

// Hook for deleting a product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return mutation;
};
