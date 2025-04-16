"use client";
import { useState } from "react";
import { useCurrentUser, useUpdateUser } from "../../features/auth/hooks/useAuth";
import Sidebar from "../../features/dashboard/components/Sidebar";

export default function Settings() {
    const { user, loading: userLoading, fetchUser } = useCurrentUser();
    const updateUserMutation = useUpdateUser();

    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await updateUserMutation.mutateAsync({
                username: username !== user?.username ? username : undefined,
                email: email !== user?.email ? email : undefined,
                password: password || undefined,
            });
        } catch (err: any) {
            setError(err.response?.data?.detail || "Failed to update profile");
        }
    };

    if (userLoading || !user) return <div>Loading...</div>;

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 md:ml-64 p-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-4">Settings</h1>
                    <div className="bg-white p-6 rounded-lg shadow max-w-md">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Update Profile</h2>
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="username" className="block mb-1">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-1">New Password (optional)</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Leave blank to keep current password"
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                                Update Profile
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}