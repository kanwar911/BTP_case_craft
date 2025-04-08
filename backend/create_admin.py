from sqlalchemy.orm import Session
from app.db import SessionLocal, engine, Base
from app.models import User
from app.auth.jwt import get_password_hash

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

# Admin user details
ADMIN_EMAIL = "admin@casecraft.com"
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "adminpass123"
ADMIN_FULLNAME = "Admin User"

def create_admin_user():
    """Create an admin user in the database."""
    db = SessionLocal()
    
    try:
        # Check if admin already exists
        admin = db.query(User).filter(User.username == ADMIN_USERNAME).first()
        
        if admin:
            print(f"Admin user '{ADMIN_USERNAME}' already exists.")
            return
        
        # Create new admin user
        admin_user = User(
            email=ADMIN_EMAIL,
            username=ADMIN_USERNAME,
            full_name=ADMIN_FULLNAME,
            hashed_password=get_password_hash(ADMIN_PASSWORD),
            is_admin=True
        )
        
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        
        print(f"Admin user '{ADMIN_USERNAME}' created successfully!")
        print(f"Email: {ADMIN_EMAIL}")
        print(f"Password: {ADMIN_PASSWORD}")
        
    except Exception as e:
        print(f"Error creating admin user: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    create_admin_user() 