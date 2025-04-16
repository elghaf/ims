from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ...core.database import get_db
from ...core.dependencies import get_current_user
from ...models import User
from ...schemas.product import ProductCreate, ProductResponse
from .service import ProductsService

router = APIRouter()

# Get all products - no trailing slash
@router.get("", response_model=List[ProductResponse])
def get_products_no_slash(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    service = ProductsService(db)
    return service.get_products()

# Get all products - with trailing slash
@router.get("/", response_model=List[ProductResponse])
def get_products(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    service = ProductsService(db)
    return service.get_products()

# Get a single product - no trailing slash
@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    service = ProductsService(db)
    return service.get_product(product_id)

# Create a product - no trailing slash
@router.post("", response_model=ProductResponse, status_code=201)
def create_product_no_slash(
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    service = ProductsService(db)
    return service.create_product(product, user_id=current_user.id)

# Create a product - with trailing slash
@router.post("/", response_model=ProductResponse, status_code=201)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    service = ProductsService(db)
    return service.create_product(product, user_id=current_user.id)

# Update a product
@router.put("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int,
    product: dict,  # Change to dict to accept partial updates
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    service = ProductsService(db)
    return service.update_product(product_id, product, user_id=current_user.id)

# Delete a product
@router.delete("/{product_id}", status_code=204)
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    service = ProductsService(db)
    service.delete_product(product_id, user_id=current_user.id)
    return {"detail": "Product deleted"}
