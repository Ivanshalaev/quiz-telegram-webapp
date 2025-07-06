from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.app.database import get_session
from backend.app.models.user import User
from backend.app.schemas.user import UserCreate, UserVerify
from backend.app.services.mail import send_confirmation_email
import random

router = APIRouter(prefix="/auth", tags=["Auth"])

# 📬 Регистрация — отправка кода
@router.post("/register")
async def register_user(user: UserCreate, db: AsyncSession = Depends(get_session)):
    code = str(random.randint(100000, 999999))

    result = await db.execute(select(User).where(User.email == user.email))
    existing_user = result.scalar_one_or_none()

    if existing_user:
        existing_user.code = code
    else:
        existing_user = User(email=user.email, code=code)
        db.add(existing_user)

    await db.commit()

    # Отправка письма
    await send_confirmation_email(user.email, code)

    return {"message": "Код подтверждения отправлен", "code": code}

# ✅ Подтверждение кода
@router.post("/verify")
async def verify_code(data: UserVerify, db: AsyncSession = Depends(get_session)):
    result = await db.execute(select(User).where(User.email == data.email))
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    if user.code != data.code:
        raise HTTPException(status_code=400, detail="Неверный код подтверждения")

    user.code = None  # Очищаем код после успешной верификации
    await db.commit()

    return {"message": "Почта подтверждена. Добро пожаловать!"}
