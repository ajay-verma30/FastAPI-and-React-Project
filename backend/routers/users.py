from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from schemas.users import UserCreate, UserOut, UserResponse
from models.users import User
from db.conn import get_db
from utils.auth import hash_password
from utils.token import get_current_user

router = APIRouter(prefix="/users", tags=["Users"])

# ✅ Create a new user
@router.post("/", response_model=UserOut)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter((User.email == user.email)).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    new_user = User(
        email=user.email,
        name=user.name,
        password=hash_password(user.password),
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user