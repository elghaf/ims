from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from ..utils.auth import verify_token
from ..models.user import User
from sqlalchemy.orm import Session
from .database import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/token")

async def get_current_user(
    request: Request,
    token: str = Depends(oauth2_scheme), 
    db: Session = Depends(get_db)
):
    print(f"Request path: {request.url.path}")
    print(f"Request headers: {request.headers.get('authorization')}")
    print(f"Authenticating request with token: {token[:20]}...")
    
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    payload = verify_token(token)
    if payload is None:
        print("Token verification failed")
        raise credentials_exception
        
    user_id = payload.get("sub")
    if user_id is None:
        print("No user_id in token payload")
        raise credentials_exception
        
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        print(f"No user found with id {user_id}")
        raise credentials_exception
        
    print(f"Successfully authenticated user {user.username}")
    return user
