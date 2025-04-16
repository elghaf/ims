'use client';
import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import InventoryStats from "@/features/dashboard/components/InventoryStats";
import RecentActivity from "@/features/dashboard/components/RecentActivity";
import { FiBox, FiDollarSign, FiAlertCircle, FiShoppingCart } from 'react-icons/fi';

export default function Dashboard() {
    const { user, loading: userLoading } = useCurrentUser();
    const { data: stats, isLoading: statsLoading } = useDashboardStats();

    if (userLoading || statsLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null;
    }

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Welcome back, {user.username}!
                </h1>
                <p className="mt-1 text-gray-600">Here's what's happening with your inventory today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Products</p>
                            <p className="text-2xl font-semibold text-gray-900 mt-2">
                                {stats?.total_products ?? 0}
                            </p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-full">
                            <FiBox className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Value</p>
                            <p className="text-2xl font-semibold text-gray-900 mt-2">
                                ${stats?.total_inventory_value?.toFixed(2) ?? '0.00'}
                            </p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-full">
                            <FiDollarSign className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                            <p className="text-2xl font-semibold text-gray-900 mt-2">
                                {stats?.low_stock_products ?? 0}
                            </p>
                        </div>
                        <div className="bg-red-100 p-3 rounded-full">
                            <FiAlertCircle className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Categories</p>
                            <p className="text-2xl font-semibold text-gray-900 mt-2">
                                {stats?.total_categories ?? 0}
                            </p>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-full">
                            <FiShoppingCart className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900">Inventory Overview</h2>
                        <p className="mt-1 text-sm text-gray-600">Current stock levels and statistics</p>
                    </div>
                    <div className="p-6">
                        <InventoryStats />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                        <p className="mt-1 text-sm text-gray-600">Latest inventory changes</p>
                    </div>
                    <div className="p-6">
                        <RecentActivity />
                    </div>
                </div>
            </div>
        </div>
    );
}
