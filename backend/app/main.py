from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from backend.app.database import Base, engine, get_session
from backend.app.models.quiz import Quiz
from backend.app.routes import quiz as quiz_routes
from backend.app.routes import auth  # если используешь авторизацию

app = FastAPI(
    title="Quiz Telegram WebApp API",
    version="1.0.0"
)

# 🚀 Создание таблиц при запуске
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# ✅ Новый маршрут: GET /quizzes
@app.get("/quizzes")
async def get_quizzes(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Quiz))
    quizzes = result.scalars().all()
    return [{"id": q.id, "title": q.title} for q in quizzes]

# 🔌 Подключаем остальные маршруты
app.include_router(quiz_routes.router)
app.include_router(auth.router)
