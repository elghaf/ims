from app.database import engine, SessionLocal
from app.models.user import Base
from app.api.users import pwd_context
from app import models

def init_db():
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # Check if test user exists
    test_user = db.query(models.User).filter(models.User.username == "test").first()
    if not test_user:
        # Create test user
        hashed_password = pwd_context.hash("test123")
        test_user = models.User(
            username="test",
            email="test@example.com",
            hashed_password=hashed_password
        )
        db.add(test_user)
        db.commit()
        print("Test user created successfully!")
    else:
        print("Test user already exists!")

if __name__ == "__main__":
    print("Creating database tables...")
    init_db()
    print("Done!") 