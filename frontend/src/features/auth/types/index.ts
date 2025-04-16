export interface DashboardStats {
    total_products: number;
    low_stock: number;
    total_categories: number;
}

export interface User {
    id: number;
    username: string;
    email: string;
}

export interface UserUpdate {
    username?: string;
    email?: string;
    password?: string;
}
