import axios from "@/utils/axios";
import { StockAlert } from "../types";

export const getLowStockProducts = async (): Promise<StockAlert[]> => {
    const token = localStorage.getItem("access_token");
    if (!token) {
        throw new Error("No access token found");
    }

    const response = await axios.get<StockAlert[]>("/api/stock-alerts");
    return response.data;
};