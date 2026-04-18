from sqlalchemy import Column, Integer, ForeignKey, DateTime
from datetime import datetime
from app.config.database import Base

class InventoryLog(Base):
    __tablename__ = "inventory_logs"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    change = Column(Integer)  # +10 or -5
    timestamp = Column(DateTime, default=datetime.utcnow)