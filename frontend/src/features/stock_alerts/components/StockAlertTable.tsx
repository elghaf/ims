"use client";
import { useStockAlerts } from "../hooks/useStockAlerts";
import Link from "next/link";

export default function StockAlertTable() {
    const { data: alerts, isLoading, error } = useStockAlerts();

    if (isLoading) return <div>Loading stock alerts...</div>;
    if (error) return <div className="text-red-500">Error loading stock alerts: {error.message}</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Stock Alerts</h2>
            {alerts?.length === 0 ? (
                <p className="text-gray-500">No low stock alerts.</p>
            ) : (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                SKU
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Stock Quantity
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {alerts?.map((alert) => (
                            <tr key={alert.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{alert.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{alert.sku}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{alert.stock_quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link
                                        href={`/products/edit/${alert.id}`}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Update Stock
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}