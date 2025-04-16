from sqlalchemy.orm import Session
from ...models import Product

class StockAlertService:
    def __init__(self, db: Session):
        self.db = db
    
    def get_low_stock_products(self, threshold: int = 10):
        """
        Get products with stock quantity below the specified threshold
        """
        return self.db.query(Product).filter(
            Product.stock_quantity <= threshold
        ).all() 