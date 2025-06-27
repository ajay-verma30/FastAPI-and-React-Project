from pydantic import BaseModel
from datetime import datetime

class LoginInput(BaseModel):
    email: str
    password: str

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
   

class Token(BaseModel):
    access_token: str
    token_type: str
    email: str
    name: str
    created_at: datetime