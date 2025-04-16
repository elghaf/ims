from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ...core.database import get_db
from ...core.dependencies import get_current_user
from ...models import User, Category
from ...schemas.product import CategoryResponse, CategoryBase

router = APIRouter()

# Main endpoint to get all categories (no trailing slash)
@router.get("", response_model=List[CategoryResponse])
async def get_categories_no_slash(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    print(f"Categories requested by user {current_user.username}")
    categories = db.query(Category).all()
    # Convert to CategoryResponse objects
    return [CategoryResponse(id=category.id, name=category.name) for category in categories]

# Duplicate endpoint to handle trailing slash
@router.get("/", response_model=List[CategoryResponse])
async def get_categories_with_slash(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Reuse the same implementation
    return await get_categories_no_slash(current_user, db)

@router.get("/{category_id}", response_model=CategoryResponse)
def get_category(
    category_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return CategoryResponse(id=category.id, name=category.name)

@router.post("", response_model=CategoryResponse, status_code=201)
def create_category(
    category: CategoryBase,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check if category with this name already exists
    existing = db.query(Category).filter(Category.name == category.name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Category with this name already exists")
    
    new_category = Category(name=category.name)
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return CategoryResponse(id=new_category.id, name=new_category.name)

@router.post("/", response_model=CategoryResponse, status_code=201)
def create_category_with_slash(
    category: CategoryBase,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return create_category(category, db, current_user)

@router.put("/{category_id}", response_model=CategoryResponse)
def update_category(
    category_id: int,
    category: CategoryBase,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check if category exists
    db_category = db.query(Category).filter(Category.id == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    # Check if another category with this name already exists
    existing = db.query(Category).filter(Category.name == category.name, Category.id != category_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Category with this name already exists")
    
    # Update category
    db_category.name = category.name
    db.commit()
    db.refresh(db_category)
    return CategoryResponse(id=db_category.id, name=db_category.name)

@router.delete("/{category_id}", status_code=204)
def delete_category(
    category_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check if category exists
    db_category = db.query(Category).filter(Category.id == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    # Delete category
    db.delete(db_category)
    db.commit()
    return None


