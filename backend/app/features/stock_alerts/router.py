from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ...core.database import get_db
from ...core.dependencies import get_current_user
from ...models import User
from .schemas import StockAlertResponse
from .service import StockAlertService

router = APIRouter()

# Configure the threshold for low stock alerts (can be moved to config file later)
LOW_STOCK_THRESHOLD = 10

@router.get("", response_model=List[StockAlertResponse])
async def get_low_stock_products(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Use service to get products with stock quantity below threshold
    service = StockAlertService(db)
    low_stock_products = service.get_low_stock_products(LOW_STOCK_THRESHOLD)
    
    # Convert to StockAlertResponse objects
    return [
        StockAlertResponse(
            id=product.id,
            name=product.name,
            sku=product.sku,
            stock_quantity=product.stock_quantity
        ) 
        for product in low_stock_products
    ]

@router.get("/", response_model=List[StockAlertResponse])
async def get_low_stock_products_with_slash(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Reuse the same implementation
    return await get_low_stock_products(current_user, db) 