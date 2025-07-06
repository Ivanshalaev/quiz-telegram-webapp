from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from backend.app.database import get_session
from backend.app.models.quiz import Quiz, Question, Answer
from backend.app.schemas.quiz import QuizCreate, QuestionCreate, AnswerRequest

router = APIRouter(prefix="/quiz", tags=["Quiz"])

# ▶️ Создание квиза
@router.post("/create")
async def create_quiz(data: QuizCreate, db: AsyncSession = Depends(get_session)):
    quiz = Quiz(title=data.title, owner_email=data.owner_email)
    db.add(quiz)
    await db.commit()
    await db.refresh(quiz)
    return quiz

# ➕ Добавить вопрос
@router.post("/{quiz_id}/add-question")
async def add_question(quiz_id: int, data: QuestionCreate, db: AsyncSession = Depends(get_session)):
    result = await db.execute(select(Quiz).where(Quiz.id == quiz_id))
    quiz = result.scalar_one_or_none()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    question = Question(quiz_id=quiz_id, text=data.text, type=data.type)
    db.add(question)
    await db.commit()
    return {"message": "Вопрос добавлен"}

# 🔍 Получить квиз с вопросами
@router.get("/{quiz_id}")
async def get_quiz(quiz_id: int, db: AsyncSession = Depends(get_session)):
    result = await db.execute(
        select(Quiz)
        .options(selectinload(Quiz.questions))
        .where(Quiz.id == quiz_id)
    )
    quiz = result.scalar_one_or_none()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    questions_data = [{"id": q.id, "text": q.text, "type": q.type} for q in quiz.questions]
    return {"id": quiz.id, "title": quiz.title, "questions": questions_data}

# ✅ Отправить ответы
@router.post("/{quiz_id}/answer")
async def submit_answers(quiz_id: int, data: AnswerRequest, db: AsyncSession = Depends(get_session)):
    result = await db.execute(select(Quiz).where(Quiz.id == quiz_id))
    quiz = result.scalar_one_or_none()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    for a in data.answers:
        answer = Answer(
            quiz_id=quiz.id,
            question_id=a.question_id,
            user_email=data.user_email,
            answer_text=a.answer_text
        )
        db.add(answer)

    await db.commit()
    return {"message": "Ответы сохранены"}

# 📊 Посмотреть все ответы
@router.get("/{quiz_id}/results")
async def get_answers(quiz_id: int, db: AsyncSession = Depends(get_session)):
    result = await db.execute(select(Answer).where(Answer.quiz_id == quiz_id))
    answers = result.scalars().all()

    grouped = {}
    for a in answers:
        grouped.setdefault(a.user_email, []).append({
            "question_id": a.question_id,
            "answer": a.answer_text
        })

    return
