from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.config.database import SessionLocal
from app.models.product import Product
from app.models.inventory_log import InventoryLog
from app.dependencies.auth import get_current_user

router = APIRouter(prefix="/api/v1/inventory", tags=["Inventory"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 📊 Update Stock
@router.post("/update/{product_id}")
def update_stock(
    product_id: int,
    change: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise HTTPException(404, "Product not found")

    product.stock += change

    # Log entry
    log = InventoryLog(
        product_id=product_id,
        change=change
    )

    db.add(log)
    db.commit()

    return {
        "message": "Stock updated",
        "new_stock": product.stock
    }


# 📜 Get Inventory Logs
@router.get("/logs/{product_id}")
def get_logs(
    product_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    logs = db.query(InventoryLog).filter(
        InventoryLog.product_id == product_id
    ).all()

    return logs