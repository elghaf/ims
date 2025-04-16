"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, login, register, updateUser } from "../services/api";
import { UserUpdate } from "../types";

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

export const useCurrentUser = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchUser = async () => {
        setLoading(true);
        try {
            const data = await getCurrentUser();
            setUser(data);
        } catch (err) {
            localStorage.removeItem("access_token");
            router.push("/auth/login");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return { user, loading, fetchUser };
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