from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.config.database import SessionLocal
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.product import Product
from app.models.inventory_log import InventoryLog
from app.schemas.order import OrderCreate
from app.dependencies.auth import get_current_user

router = APIRouter(prefix="/api/v1/orders", tags=["Orders"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🛒 Create Order
@router.post("/")
def create_order(
    data: OrderCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    new_order = Order(user_id=user.id)
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    for item in data.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()

        if not product:
            raise HTTPException(404, f"Product {item.product_id} not found")

        if product.stock < item.quantity:
            raise HTTPException(400, f"Not enough stock for product {product.name}")

        # Reduce stock
        product.stock -= item.quantity

        # Log inventory change
        log = InventoryLog(
            product_id=product.id,
            change=-item.quantity
        )
        db.add(log)

        # Add order item
        order_item = OrderItem(
            order_id=new_order.id,
            product_id=product.id,
            quantity=item.quantity
        )
        db.add(order_item)

    db.commit()

    return {"message": "Order created successfully", "order_id": new_order.id}


# 📄 Get All Orders
@router.get("/")
def get_orders(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return db.query(Order).filter(Order.user_id == user.id).all()


# 🔍 Get One Order
@router.get("/{order_id}")
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        raise HTTPException(404, "Order not found")

    items = db.query(OrderItem).filter(OrderItem.order_id == order_id).all()

    return {
        "order": order,
        "items": items
    }