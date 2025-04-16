"use client";
import { DashboardStats } from "../types/index";

interface InventoryStatsProps {
    data: DashboardStats | undefined;
    isLoading: boolean;
    error: any;
}

export default function InventoryStats({ data, isLoading, error }: InventoryStatsProps) {
    if (isLoading) return <div>Loading stats...</div>;
    if (error) return <div className="text-red-500">Error loading stats: {error.message}</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-100 rounded-lg shadow">
                <h3 className="text-sm font-medium text-blue-800">Total Products</h3>
                <p className="mt-1 text-2xl font-semibold text-blue-900">
                    {data?.total_products ?? 0}
                </p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg shadow">
                <h3 className="text-sm font-medium text-yellow-800">Low Stock Alerts</h3>
                <p className="mt-1 text-2xl font-semibold text-yellow-900">
                    {data?.low_stock ?? 0}
                </p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg shadow">
                <h3 className="text-sm font-medium text-green-800">Total Categories</h3>
                <p className="mt-1 text-2xl font-semibold text-green-900">
                    {data?.total_categories ?? 0}
                </p>
            </div>
        </div>
    );
}