from datetime import datetime
from fastapi import HTTPException
from sqlalchemy.orm import Session
from ...models import Product, Category, ActivityLog
from ...schemas.product import ProductCreate
from typing import List, Dict, Any

class ProductsService:
    def __init__(self, db: Session):
        self.db = db

    def _log_activity(self, user_id: int, action: str, description: str):
        activity = ActivityLog(
            user_id=user_id,
            action=action,
            description=description,
        )
        self.db.add(activity)
        self.db.commit()
        self.db.refresh(activity)
        return activity

    def get_products(self) -> List[Product]:
        return self.db.query(Product).all()

    def get_product(self, product_id: int) -> Product:
        product = self.db.query(Product).filter(Product.id == product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        return product

    def create_product(self, product: ProductCreate, user_id: int) -> Product:
        category = self.db.query(Category).filter(Category.id == product.category_id).first()
        if not category:
            raise HTTPException(status_code=404, detail="Category not found")

        product_data = product.dict()
        # Ensure created_at is set if not provided
        if not product_data.get("created_at"):
            product_data["created_at"] = datetime.utcnow().isoformat()
            
        db_product = Product(**product_data)
        self.db.add(db_product)
        self.db.commit()
        self.db.refresh(db_product)

        # Log the action
        self._log_activity(
            user_id=user_id,
            action="product_added",
            description=f"Added product: {db_product.name}"
        )

        return db_product

    def update_product(self, product_id: int, product_data: Dict[str, Any], user_id: int) -> Product:
        db_product = self.get_product(product_id)
        
        # Check if category_id is being updated
        if "category_id" in product_data and product_data["category_id"]:
            category = self.db.query(Category).filter(Category.id == product_data["category_id"]).first()
            if not category:
                raise HTTPException(status_code=404, detail="Category not found")
        
        # Update product attributes
        for key, value in product_data.items():
            setattr(db_product, key, value)

        self.db.commit()
        self.db.refresh(db_product)

        # Log the action
        self._log_activity(
            user_id=user_id,
            action="stock_updated",
            description=f"Updated product: {db_product.name} (Stock: {db_product.stock_quantity})"
        )

        return db_product

    def delete_product(self, product_id: int, user_id: int):
        product = self.get_product(product_id)
        self.db.delete(product)
        self.db.commit()

        # Log the action
        self._log_activity(
            user_id=user_id,
            action="product_deleted",
            description=f"Deleted product: {product.name}"
        )
