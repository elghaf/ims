'use client';

import { useCurrentUser } from '@/features/auth/hooks/useAuth';
import Sidebar from '@/features/dashboard/components/Sidebar';
import ProductForm from '@/features/products/components/ProductForm';
import { useCreateProduct } from '@/features/products/hooks/useProducts';
import { ProductFormData } from '@/features/products/types';

export default function AddProductPage() {
  const { user, loading: userLoading } = useCurrentUser();
  const createMutation = useCreateProduct();

  if (userLoading || !user) return <div>Loading...</div>;

  const handleSubmit = (data: ProductFormData) => {
    createMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-4">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Add New Product</h1>
          <ProductForm
            onSubmit={handleSubmit}
            isSubmitting={createMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}
