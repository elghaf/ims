"use client";
import { useQuery } from "@tanstack/react-query";
import { getLowStockProducts } from "../services/api";
import { StockAlert } from "../types";

export const useStockAlerts = () => {
    return useQuery<StockAlert[]>({
        queryKey: ["stockAlerts"],
        queryFn: getLowStockProducts,
        retry: 1,
        staleTime: 5 * 60 * 1000,
    });
};