from sqlalchemy import Column, String, Float, Text, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class Product(BaseModel):
    """
    Product model for storing product details in the e-commerce application.
    """
    __tablename__ = "products"
    
    name = Column(String(100), nullable=False, index=True)
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
    stock = Column(Integer, default=0)
    image_url = Column(String(255), nullable=True)
    category = Column(String(50), nullable=True, index=True)
    
    # Optional: Add a relationship to User (as creator/owner)
    # creator_id = Column(Integer, ForeignKey("users.id"))
    # creator = relationship("User", back_populates="products") 