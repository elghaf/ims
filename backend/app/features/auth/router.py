from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from ...core.database import get_db
from ...core.dependencies import get_current_user
from ...models import User
from .service import AuthService
from .schemas import UserCreate, UserResponse, Token

router = APIRouter()

@router.post("/users", response_model=UserResponse, status_code=201)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    service = AuthService(db)
    return service.create_user(user)

@router.post("/users/", response_model=UserResponse, status_code=201)
def create_user_with_slash(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(user, db)

@router.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    service = AuthService(db)
    user = service.authenticate_user(form_data.username, form_data.password)
    token = service.create_token(user)
    return token

@router.post("/token/", response_model=Token)
def login_for_access_token_with_slash(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    return login_for_access_token(form_data, db)

@router.get("/users/me", response_model=UserResponse)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/users/me/", response_model=UserResponse)
def read_users_me_with_slash(current_user: User = Depends(get_current_user)):
    return read_users_me(current_user)