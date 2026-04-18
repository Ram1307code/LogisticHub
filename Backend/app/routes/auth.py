from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.config.database import SessionLocal
from app.schemas.user import UserCreate, UserLogin
from app.services.auth_service import register_user, login_user

router = APIRouter(prefix="/api/v1/auth", tags=["Auth"])


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    new_user = register_user(db, user.name, user.email, user.password)

    if not new_user:
        raise HTTPException(status_code=400, detail="Registration failed or user exists")

    return {"message": "User registered successfully"}


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    result = login_user(db, user.email, user.password)

    if not result:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return result