'use client';

import { useCurrentUser } from '../../features/auth/hooks/useAuth';
import Sidebar from '../../features/dashboard/components/Sidebar';
import ProductTable from '../../features/products/components/ProductTable';

export default function ProductsPage() {
  const { user, loading: userLoading } = useCurrentUser();

  if (userLoading || !user) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Products</h1>
          <ProductTable />
        </div>
      </div>
    </div>
  );
}
