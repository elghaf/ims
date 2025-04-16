from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    username: str    
    email: str
    password: str


class UserResponse(BaseModel):    
    id: int
    username: str   
    email: str
    
    class Config:
        from_attributes = True  # Updated from orm_mode


class Token(BaseModel):
    access_token: str
    token_type: str
