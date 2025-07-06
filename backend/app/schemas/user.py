from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr

class UserVerify(BaseModel):
    email: EmailStr
    code: str
