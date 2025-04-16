'use client';
import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import InventoryStats from "@/features/dashboard/components/InventoryStats";
import Sidebar from "@/features/dashboard/components/Sidebar";
import RecentActivity from "@/features/dashboard/components/RecentActivity";

export default function Dashboard() {
    const { user, loading: userLoading } = useCurrentUser();
    const { data: dashboardStats, isLoading: statsLoading, error: statsError } = useDashboardStats();

    if (userLoading || !user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-lg text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 md:ml-64">
                <main className="p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                            <p className="mt-2 text-gray-600">Welcome back, {user.username}!</p>
                        </div>

                        <section className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Inventory Overview</h2>
                            <InventoryStats
                                data={dashboardStats}
                                isLoading={statsLoading}
                                error={statsError}
                            />
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                            <RecentActivity />
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
