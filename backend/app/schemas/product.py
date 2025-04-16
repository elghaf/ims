from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class CategoryBase(BaseModel):
    name: str
    
class CategoryResponse(CategoryBase):
    id: int
    
    class Config:
        from_attributes = True  # Changed from orm_mode
        
class ProductCreate(BaseModel):
    name: str
    sku: str
    description: Optional[str] = None
    price: int
    stock_quantity: int
    created_at: str
    category_id: int
    
    
    
class ProductResponse(BaseModel):
    id: int
    name: str
    sku: str
    description: Optional[str] = None
    price: int
    stock_quantity: int
    category_id: int
    created_at: str
    category: CategoryResponse
    
    
    class Config:
        from_attributes = True  # Changed from orm_mode
        
