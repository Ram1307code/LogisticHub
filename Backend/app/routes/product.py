from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.config.database import SessionLocal
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate
from app.dependencies.auth import get_current_user

router = APIRouter(prefix="/api/v1/products", tags=["Products"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ➕ Create Product
@router.post("/")
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    new_product = Product(**product.dict())

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


# 📄 Get All Products
@router.get("/")
def get_products(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return db.query(Product).all()


# 🔍 Get One Product
@router.get("/{product_id}")
def get_product(
    product_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise HTTPException(404, "Product not found")

    return product


# ✏️ Update Product
@router.put("/{product_id}")
def update_product(
    product_id: int,
    data: ProductUpdate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise HTTPException(404, "Product not found")

    for key, value in data.dict().items():
        setattr(product, key, value)

    db.commit()
    return product


# ❌ Delete Product
@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise HTTPException(404, "Product not found")

    db.delete(product)
    db.commit()

    return {"message": "Product deleted"}