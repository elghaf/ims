"use client";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../services/api";
import { DashboardStats } from "../types";

export const useDashboardStats = () => {
    return useQuery<DashboardStats>({
        queryKey: ["dashboardStats"],
        queryFn: getDashboardStats,
        retry: 1, // Retry once on failure
        staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    });
};