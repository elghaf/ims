"use client";
import { useState } from "react";
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
} from "@heroicons/react/24/outline";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useCurrentUser();
    const { data: stats } = useDashboardStats();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        deleteCookie('access_token');
        router.push("/auth/login");
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const isActivePath = (path: string) => {
        return pathname === path;
    };

    const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
        <Link 
            href={href} 
            className={`flex items-center p-2 rounded transition-colors ${
                isActivePath(href) 
                    ? 'bg-gray-700 text-white' 
                    : 'hover:bg-gray-700 text-gray-300 hover:text-white'
            }`}
            onClick={() => setIsOpen(false)} // Close mobile menu when clicking a link
        >
            {children}
        </Link>
    );

    return (
        <>
            {/* Hamburger Menu for Mobile */}
            <button
                className="md:hidden p-4 text-gray-600 focus:outline-none"
                onClick={toggleSidebar}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    />
                </svg>
            </button>

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 transition-transform duration-300 ease-in-out md:fixed md:inset-y-0 md:left-0 md:w-64 flex flex-col`}
            >
                {/* Sidebar Header */}
                <div className="p-4 border-b border-gray-700">
                    <h2 className="text-xl font-semibold">IMS Dashboard</h2>
                    {user && (
                        <p className="text-sm text-gray-400 mt-1">
                            Welcome, {user.username}
                        </p>
                    )}
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-4 space-y-2">
                    <NavLink href="/dashboard">
                        <HomeIcon className="w-5 h-5 mr-2" />
                        Dashboard
                    </NavLink>
                    <NavLink href="/products">
                        <CubeIcon className="w-5 h-5 mr-2" />
                        Products
                    </NavLink>
                    <NavLink href="/categories">
                        <TagIcon className="w-5 h-5 mr-2" />
                        Categories
                    </NavLink>
                    <NavLink href="/stock-alerts">
                        <BellIcon className="w-5 h-5 mr-2" />
                        Stock Alerts
                    </NavLink>
                    <NavLink href="/settings">
                        <CogIcon className="w-5 h-5 mr-2" />
                        Settings
                    </NavLink>
                </nav>

                {/* Quick Stats Overview */}
                <div className="p-4 border-t border-gray-700">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Quick Stats</h3>
                    <div className="space-y-2 text-sm">
                        <p>
                            Total Products: <span className="font-semibold">{stats?.total_products ?? 0}</span>
                        </p>
                        <p>
                            Low Stock: <span className="font-semibold">{stats?.low_stock ?? 0}</span>
                        </p>
                        <p>
                            Categories: <span className="font-semibold">{stats?.total_categories ?? 0}</span>
                        </p>
                    </div>
                </div>

                {/* Logout Button */}
                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full p-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
                    >
                        <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
}
