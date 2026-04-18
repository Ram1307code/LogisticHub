from fastapi import FastAPI
from app.config.database import engine, Base, SessionLocal
from app.models import user  # IMPORTANT: loads model

app = FastAPI(
    title="LogisticHub API",
    version="1.0.0"
)

# Create tables
Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "LogisticHub Backend Running 🚀"}

from sqlalchemy import text
@app.get("/test-db")
def test_db():
    try:
        db = SessionLocal()
        db.execute(text("SELECT 1"))# simple test query
        return {"status": "DB Connected ✅"}
    except Exception as e:
        return {"error": str(e)}
    finally:
        db.close()

from fastapi import FastAPI
from app.config.database import engine, Base
from app.models import user
from app.routes import auth

app = FastAPI(title="LogisticHub API")

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)


@app.get("/")
def root():
    return {"message": "LogisticHub Backend Running 🚀"}

from app.routes import auth, user

app.include_router(auth.router)
app.include_router(user.router)


from app.routes import auth, user, product

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(product.router)

from app.routes import auth, user, product, inventory

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(product.router)
app.include_router(inventory.router)

from app.routes import auth, user, product, inventory, order

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(product.router)
app.include_router(inventory.router)
app.include_router(order.router)