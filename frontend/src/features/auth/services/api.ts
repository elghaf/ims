import axios from "@/utils/axios";
import { UserUpdate } from "../types";

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
    const response = await axios.post("/api/users", { username, email, password });
    return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
    const token = localStorage.getItem("access_token");
    console.log("getCurrentUser - Token:", token ? "Token present" : "No token found");
    if (!token) throw new Error("No access token found");

    const response = await axios.get<User>("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
    });
    console.log("getCurrentUser - Response status:", response.status);
    return response.data;
};

export const updateUser = async (userUpdate: UserUpdate): Promise<User> => {
    const token = localStorage.getItem("access_token");
    console.log("updateUser - Token:", token ? "Token present" : "No token found");
    if (!token) throw new Error("No access token found");

    const response = await axios.put<User>("/api/users/me", userUpdate, {
        headers: { Authorization: `Bearer ${token}` },
    });
    console.log("updateUser - Response status:", response.status);
    return response.data;
};