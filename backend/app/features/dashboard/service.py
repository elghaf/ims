from sqlalchemy.orm import Session
from sqlalchemy import desc
from ...models import Product, Category, ActivityLog

class DashboardStatsService:
    def __init__(self, db: Session):
        self.db = db

    def get_stats(self):
        total_products = self.db.query(Product).count()
        low_stock = self.db.query(Product).filter(Product.stock_quantity <= 10).count()
        total_categories = self.db.query(Category).count()
        return {
            "total_products": total_products,
            "low_stock": low_stock,
            "total_categories": total_categories,
        }

    def get_recent_activities(self, limit: int = 5):
        return (
            self.db.query(ActivityLog)
            .order_by(desc(ActivityLog.timestamp))
            .limit(limit)
            .all()
        )