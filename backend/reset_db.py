"""
Script to reset the database by dropping all tables and recreating them.
Run this script with 'python reset_db.py' to reset your database.
"""

from app.core.database import Base, engine
from sqlalchemy_utils import database_exists, create_database, drop_database
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Get database URL
SQLALCHEMY_DATABASE_URL = os.getenv('SQLALCHEMY_DATABASE_URL', 'postgresql://user:pass@localhost:5432/ims')

def reset_database():
    """Drop and recreate database"""
    print("Starting database reset...")
    
    # Force drop and recreate database
    if database_exists(SQLALCHEMY_DATABASE_URL):
        print("Dropping database...")
        drop_database(SQLALCHEMY_DATABASE_URL)
    
    print("Creating database...")
    create_database(SQLALCHEMY_DATABASE_URL)
    
    # Create tables
    print("Creating all tables...")
    Base.metadata.create_all(bind=engine)
    print("Database has been reset successfully.")

if __name__ == "__main__":
    reset_database() 
