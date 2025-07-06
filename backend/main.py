from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

quizzes = {}

class Question(BaseModel):
    id: int
    type: str
    text: str
    options: list[str] = []
    image: str | None = None
    min: int | None = None
    max: int | None = None
    unit: str | None = None
    emojiOptions: list[str] = []
    date: str | None = None

class Quiz(BaseModel):
    title: str
    questions: list[Question]

@app.post("/quiz")
def create_quiz(quiz: Quiz):
    quiz_id = str(uuid.uuid4())
    quizzes[quiz_id] = quiz
    return {"quiz_id": quiz_id}

@app.post("/quiz/{quiz_id}/answers")
def save_answers(quiz_id: str, data: dict):
    print("Ответы на квиз", quiz_id)
    print("Ответы:", data.get("answers"))
    print("Контакты:", data.get("user"))

    # Можешь сохранить в базу или файл
    return {"status": "ok"}


@app.get("/quiz/{quiz_id}")
def get_quiz(quiz_id: str):
    if quiz_id not in quizzes:
        raise HTTPException(status_code=404, detail="Квиз не найден")
    return quizzes[quiz_id]

from fastapi import Request

# Временное хранилище ответов
quiz_answers = {}

@app.post("/quiz/{quiz_id}/submit")
async def submit_quiz(quiz_id: str, request: Request):
    if quiz_id not in quizzes:
        raise HTTPException(status_code=404, detail="Квиз не найден")

    data = await request.json()
    quiz_answers[quiz_id] = data
    print(f"Ответы на квиз {quiz_id}:", data)
    return {"message": "Ответы сохранены"}
