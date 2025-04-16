"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, login, register, updateUser } from "../services/api";
import { UserUpdate } from "../types";
import axios from '@/utils/axios';  // Import our configured axios instance

export const useLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const data = await login(username, password);
            localStorage.setItem("access_token", data.access_token);
            router.push("/dashboard");
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return { username, setUsername, password, setPassword, error, handleSubmit };
};

export const useRegister = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await register(username, email, password);
            router.push("/auth/login");
        } catch (err: any) {
            setError(err.response?.data?.detail || "Registration failed");
        }
    };

    return { username, setUsername, email, setEmail, password, setPassword, error, handleSubmit };
};

type User = {
    id: string;
    email: string;
    name?: string;
};

export const useCurrentUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    setUser(null);
                    setLoading(false);
                    router.push('/auth/login');
                    return;
                }

                const response = await axios.get('/api/users/me');  // Using configured axios instance
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
                setUser(null);
                localStorage.removeItem('access_token'); // Clear invalid token
                router.push('/auth/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    return { user, loading };
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            router.push("/dashboard");
        },
    });
};
