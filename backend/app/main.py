from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.database import Base, engine
from .features.auth.router import router as auth_router
from .features.products.router import router as products_router
from .features.dashboard.router import router as dashboard_router
from .features.categories.router import router as categories_router
from .features.stock_alerts.router import router as stock_alerts_router

# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = ["DELETE", "GET", "OPTIONS", "PATCH", "POST", "PUT"]
CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]

# Create FastAPI app with disabled redirect for trailing slashes
app = FastAPI(
    redirect_slashes=False  # Prevent automatic redirection for URLs with/without trailing slash
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ALLOWED_ORIGINS,
    allow_credentials=CORS_ALLOW_CREDENTIALS,
    allow_methods=CORS_ALLOW_METHODS,
    allow_headers=CORS_ALLOW_HEADERS,
    expose_headers=["*"]
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Include routers with consistent prefixes
app.include_router(auth_router, prefix="/api")
app.include_router(products_router, prefix="/api/products")
app.include_router(dashboard_router, prefix="/api/dashboard")
app.include_router(categories_router, prefix="/api/categories")
app.include_router(stock_alerts_router, prefix="/api/stock-alerts")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Inventory Management System API"}
