from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ...core.database import get_db
from ...core.dependencies import get_current_user
from ...models import Product, Category, User
from .service import DashboardStatsService
from .schemas import DashboardStats, ActivityLogResponse

router = APIRouter()

@router.get("/stats", response_model=DashboardStats)
def get_dashboard_stats(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    service = DashboardStatsService(db)
    return service.get_stats()

@router.get("/activities", response_model=list[ActivityLogResponse])
def get_recent_activities(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    service = DashboardStatsService(db)
    activities = service.get_recent_activities()
    return activities
