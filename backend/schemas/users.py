from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr
    name: str
    password: str

class UserOut(BaseModel):
    id: int
    email: str
    name: str
    created_at: datetime
    class Config:
        from_attributes = True

class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    created_at: Optional[datetime]
    model_config = {
        "from_attributes": True
    }