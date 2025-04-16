"use client";

export default function RecentActivity() {
    // Mock data for recent activity (replace with real data later)
    const activities = [
        { id: 1, action: "Added product: Laptop", timestamp: "2025-04-15 10:30 AM" },
        { id: 2, action: "Updated stock: T-Shirt (50 units)", timestamp: "2025-04-15 09:15 AM" },
        { id: 3, action: "Added product: Book", timestamp: "2025-04-14 03:20 PM" },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            {activities.length === 0 ? (
                <p className="text-gray-500">No recent activity.</p>
            ) : (
                <ul className="space-y-4">
                    {activities.map((activity) => (
                        <li key={activity.id} className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-700">{activity.action}</p>
                                <p className="text-xs text-gray-500">{activity.timestamp}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}