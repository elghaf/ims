from pydantic import BaseModel

class StockAlertResponse(BaseModel):
    id: int
    name: str
    sku: str
    stock_quantity: int
    
    class Config:
        from_attributes = True 