export interface DashboardStats {
    total_products: number;
    total_categories: number;
    low_stock_products: number;
    total_inventory_value: number;
    recent_products: {
        id: number;
        name: string;
        quantity: number;
        price: number;
        created_at: string;
    }[];
}
