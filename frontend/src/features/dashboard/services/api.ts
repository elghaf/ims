import axios from "axios";
import { DashboardStats } from "../types";

export interface User {
    id: number;
    username: string;
    email: string;
}

export const login = async (username: string, password: string) => {
    const response = await axios.post("/api/token", { username, password });
    return response.data;
};

export const register = async (username: string, email: string, password: string) => {
    const response = await axios.post("/api/users/", { username, email, password });
    return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No access token found");

    const response = await axios.get<User>("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No access token found");

    const response = await axios.get<DashboardStats>("/api/dashboard/stats", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};