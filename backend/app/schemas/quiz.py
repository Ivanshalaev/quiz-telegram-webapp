from pydantic import BaseModel
from typing import Optional, List

class QuizCreate(BaseModel):
    title: str

class QuestionCreate(BaseModel):
    text: str
    type: Optional[str] = "text"

class QuizResponse(BaseModel):
    id: int
    title: str

    class Config:
        orm_mode = True

class AnswerSubmit(BaseModel):
    question_id: int
    answer_text: str

class AnswerRequest(BaseModel):
    user_email: str
    answers: List[AnswerSubmit]
