from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from db.conn import get_db
from models.users import User
from utils.auth import verify_password
from utils.token import create_access_token
from schemas.auth import Token
from schemas.auth import LoginInput

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/login", response_model=Token)
def login(user_input: LoginInput, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_input.email).first()

    if not user or not verify_password(user_input.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer", "email": user.email, "name": user.name, "created_at": user.created_at}
