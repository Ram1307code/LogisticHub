from sqlalchemy.orm import Session
from app.models.user import User
from app.utils.security import hash_password, verify_password
from app.utils.jwt import create_access_token


def register_user(db: Session, name: str, email: str, password: str):
    try:
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            return None

        hashed_password = hash_password(password)

        new_user = User(
            name=name,
            email=email,
            password=hashed_password
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return new_user

    except Exception as e:
        print("REGISTER ERROR:", e)   # 👈 IMPORTANT
        db.rollback()
        return None


def login_user(db: Session, email: str, password: str):
    try:
        user = db.query(User).filter(User.email == email).first()

        if not user:
            return None

        if not verify_password(password, user.password):
            return None

        token = create_access_token({"user_id": user.id})

        return {"access_token": token}

    except Exception as e:
        print("LOGIN ERROR:", e)
        return None