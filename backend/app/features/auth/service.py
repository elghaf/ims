from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from ...models import User
from ...utils.auth import get_password_hash, verify_password, create_access_token
from .schemas import UserCreate, UserResponse
from datetime import timedelta

class AuthService:
    def __init__(self, db: Session):
        self.db = db

    def create_user(self, user: UserCreate) -> UserResponse:
        existing_user = self.db.query(User).filter(
            (User.username == user.username) | (User.email == user.email)
        ).first()
        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Username or email already registered",
            )
        hashed_password = get_password_hash(user.password)
        db_user = User(
            username=user.username,
            email=user.email,
            hashed_password=hashed_password,
        )
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user

    def authenticate_user(self, username: str, password: str) -> User:
        user = self.db.query(User).filter(User.username == username).first()
        if not user or not verify_password(password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return user

    def create_token(self, user: User) -> dict:
        access_token_expires = timedelta(minutes=30)
        access_token = create_access_token(
            data={"sub": str(user.id)}, expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}