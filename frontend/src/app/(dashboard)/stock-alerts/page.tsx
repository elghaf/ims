"use client";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import StockAlertTable from "@/features/stock_alerts/components/StockAlertTable";
import { FiBell, FiFilter } from 'react-icons/fi';

export default function StockAlerts() {
    const { user, loading: userLoading } = useCurrentUser();

    if (userLoading || !user) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center">
                            <FiBell className="h-6 w-6 text-red-500 mr-2" />
                            <h1 className="text-2xl font-semibold text-gray-900">Stock Alerts</h1>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">Monitor low stock and out-of-stock items</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <button 
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <FiFilter className="mr-2 -ml-1 h-4 w-4" />
                            Filter Alerts
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-700">Critical Stock Levels</span>
                        </div>
                        <span className="text-sm text-gray-500">Updated just now</span>
                    </div>
                </div>
                <StockAlertTable />
            </div>
        </div>
    );
}
