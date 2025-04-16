"use client";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import CategoryTable from "@/features/categories/components/CategoryTable";
import { FiPlus } from 'react-icons/fi';

export default function Categories() {
    const { user, loading: userLoading } = useCurrentUser();

    if (userLoading || !user) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
                        <p className="mt-1 text-sm text-gray-600">Manage your product categories</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <button 
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <FiPlus className="mr-2 -ml-1 h-4 w-4" />
                            Add Category
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <CategoryTable />
            </div>
        </div>
    );
}
