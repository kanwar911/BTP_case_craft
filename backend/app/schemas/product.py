from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

# Shared properties
class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float = Field(..., gt=0)
    stock: int = Field(..., ge=0)
    image_url: Optional[str] = None
    category: Optional[str] = None

# Properties to receive via API on creation
class ProductCreate(ProductBase):
    pass

# Properties to receive via API on update
class ProductUpdate(ProductBase):
    name: Optional[str] = None
    price: Optional[float] = Field(None, gt=0) 
    stock: Optional[int] = Field(None, ge=0)

# Properties to return via API
class ProductInDB(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True

# Additional properties to return via API
class Product(ProductInDB):
    pass 