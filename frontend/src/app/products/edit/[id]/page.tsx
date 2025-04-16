'use client';

import { useParams } from 'next/navigation';
import { useCurrentUser } from '@/features/auth/hooks/useAuth';
import Sidebar from '@/features/dashboard/components/Sidebar';
import ProductForm from '@/features/products/components/ProductForm';
import { useProduct, useUpdateProduct } from '@/features/products/hooks/useProducts';
import { ProductFormData } from '@/features/products/types';

export default function EditProductPage() {
  const { id } = useParams();
  const productId = parseInt(id as string);
  
  const { user, loading: userLoading } = useCurrentUser();
  const { product, isLoading: productLoading, error } = useProduct(productId);
  const updateMutation = useUpdateProduct(productId);

  if (userLoading || !user) return <div>Loading...</div>;
  if (productLoading) return <div>Loading product...</div>;
  if (error) return <div>Error loading product: {error.message}</div>;
  if (!product) return <div>Product not found</div>;

  const handleSubmit = (data: ProductFormData) => {
    updateMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-4">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Edit Product</h1>
          <ProductForm
            initialData={product}
            onSubmit={handleSubmit}
            isSubmitting={updateMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}
