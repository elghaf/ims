from pydantic import BaseModel
from datetime import datetime

# Existing schemas (for dashboard stats)
class DashboardStats(BaseModel):
    total_products: int
    low_stock: int
    total_categories: int

# New schemas for activity logs
class ActivityLogBase(BaseModel):
    action: str
    description: str
    timestamp: datetime

class ActivityLogResponse(ActivityLogBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True