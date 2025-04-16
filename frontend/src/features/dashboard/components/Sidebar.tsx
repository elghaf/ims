"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useCurrentUser } from "../../auth/hooks/useAuth";
import { useDashboardStats } from "../hooks/useDashboardStats";
import { deleteCookie } from 'cookies-next';
import {
    HomeIcon,
    CubeIcon,
    TagIcon,
    BellIcon,
    CogIcon,
    ArrowLeftOnRectangleIcon,
    ChartBarIcon,
    UserGroupIcon,
    Bars3Icon,
    XMarkIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/outline";

interface NavItemProps {
    href: string;
    icon: React.ElementType;
    title: string;
    badge?: number;
}

const NavItem = ({ href, icon: Icon, title, badge }: NavItemProps) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link 
            href={href} 
            className={`
                flex items-center px-3 py-2 rounded-lg transition-all duration-200 ease-in-out
                group relative
                ${isActive 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700/50'}
            `}
        >
            <Icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
            <span className="flex-1">{title}</span>
            {badge !== undefined && (
                <span className={`
                    px-2 py-1 text-xs rounded-full
                    ${isActive 
                        ? 'bg-white text-indigo-600' 
                        : 'bg-gray-700 text-gray-300'}
                `}>
                    {badge}
                </span>
            )}
            {isActive && (
                <div className="absolute inset-y-0 -right-1 w-1 bg-indigo-400 rounded-l-full" />
            )}
        </Link>
    );
};

const NavSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-1">
        <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {title}
        </h3>
        <div className="space-y-1">
            {children}
        </div>
    </div>
);

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const router = useRouter();
    const { user } = useCurrentUser();
    const { data: stats } = useDashboardStats();

    // Close sidebar on mobile when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        deleteCookie('access_token');
        router.push("/auth/login");
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="lg:hidden fixed top-0 left-0 m-4 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white focus:outline-none"
                >
                    {isOpen ? (
                        <XMarkIcon className="h-6 w-6" />
                    ) : (
                        <Bars3Icon className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-40
                w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out
                lg:translate-x-0 lg:static lg:inset-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
            `}>
                {/* Sidebar Header */}
                <div className="flex items-center justify-between h-16 px-4 bg-gray-800">
                    <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
                        <img
                            src="/logo.svg"
                            alt="Logo"
                            className="h-8 w-8"
                        />
                        {!isCollapsed && (
                            <span className="ml-2 text-xl font-semibold text-white">IMS</span>
                        )}
                    </div>
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden lg:block p-1 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white"
                    >
                        <ChevronDownIcon className={`h-5 w-5 transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* Sidebar Content */}
                <div className="flex flex-col h-[calc(100%-4rem)] p-4 space-y-6 overflow-y-auto">
                    {/* User Profile */}
                    {!isCollapsed && (
                        <div className="flex items-center space-x-3 px-3 py-4 bg-gray-800/50 rounded-lg">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
                                    <span className="text-white text-lg font-semibold">
                                        {user?.username?.[0]?.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                    {user?.username}
                                </p>
                                <p className="text-xs text-gray-400 truncate">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <nav className="space-y-6">
                        <NavSection title={isCollapsed ? "" : "Main"}>
                            <NavItem href="/dashboard" icon={HomeIcon} title={isCollapsed ? "" : "Dashboard"} />
                            <NavItem href="/products" icon={CubeIcon} title={isCollapsed ? "" : "Products"} badge={stats?.total_products} />
                            <NavItem href="/categories" icon={TagIcon} title={isCollapsed ? "" : "Categories"} />
                        </NavSection>

                        <NavSection title={isCollapsed ? "" : "Monitoring"}>
                            <NavItem 
                                href="/stock-alerts" 
                                icon={BellIcon} 
                                title={isCollapsed ? "" : "Stock Alerts"} 
                                badge={stats?.low_stock}
                            />
                            <NavItem href="/analytics" icon={ChartBarIcon} title={isCollapsed ? "" : "Analytics"} />
                        </NavSection>

                        <NavSection title={isCollapsed ? "" : "Administration"}>
                            <NavItem href="/users" icon={UserGroupIcon} title={isCollapsed ? "" : "Users"} />
                            <NavItem href="/settings" icon={CogIcon} title={isCollapsed ? "" : "Settings"} />
                        </NavSection>
                    </nav>

                    {/* Quick Stats */}
                    {!isCollapsed && (
                        <div className="mt-auto space-y-2 p-4 bg-gray-800/50 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-400">System Status</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="flex flex-col">
                                    <span className="text-gray-400">Products</span>
                                    <span className="text-white font-medium">{stats?.total_products ?? 0}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-400">Low Stock</span>
                                    <span className="text-orange-400 font-medium">{stats?.low_stock ?? 0}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-400">Categories</span>
                                    <span className="text-white font-medium">{stats?.total_categories ?? 0}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className={`
                            flex items-center justify-center px-3 py-2 
                            text-sm font-medium text-white
                            bg-red-600 rounded-lg hover:bg-red-700 
                            transition-colors duration-150
                            ${isCollapsed ? 'w-10 h-10' : 'w-full'}
                        `}
                    >
                        <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                        {!isCollapsed && <span className="ml-2">Logout</span>}
                    </button>
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
