import requests
import json
import time

BASE_URL = "http://localhost:8000"

def test_root():
    """Test the root endpoint."""
    response = requests.get(f"{BASE_URL}/")
    print("ROOT RESPONSE:", response.status_code)
    print(response.json())
    print()

def test_register_admin():
    """Test admin user registration."""
    user_data = {
        "email": "admin@casecraft.com",
        "username": "admin",
        "password": "adminpass123",
        "full_name": "Admin User"
    }
    response = requests.post(
        f"{BASE_URL}/api/auth/register", 
        json=user_data
    )
    print("REGISTER ADMIN RESPONSE:", response.status_code)
    print(response.json() if response.status_code == 200 else response.text)
    print()
    
    # If admin registered successfully, update to admin role
    # In a real app, we'd have a separate admin creation flow
    if response.status_code == 200:
        # This is just for testing - in a real app we'd use a proper admin creation flow
        from app.db import SessionLocal
        from app.models import User
        
        db = SessionLocal()
        try:
            admin = db.query(User).filter(User.username == "admin").first()
            if admin:
                admin.is_admin = True
                db.commit()
                print("Updated admin role successfully!")
        except Exception as e:
            print(f"Error updating admin role: {e}")
        finally:
            db.close()

def test_register_user():
    """Test regular user registration."""
    user_data = {
        "email": "user@example.com",
        "username": "testuser",
        "password": "password123",
        "full_name": "Test User"
    }
    response = requests.post(
        f"{BASE_URL}/api/auth/register", 
        json=user_data
    )
    print("REGISTER USER RESPONSE:", response.status_code)
    print(response.json() if response.status_code == 200 else response.text)
    print()

def test_login(username, password):
    """Test user login."""
    login_data = {
        "username": username,
        "password": password
    }
    response = requests.post(
        f"{BASE_URL}/api/auth/token", 
        data=login_data
    )
    print(f"LOGIN RESPONSE ({username}):", response.status_code)
    try:
        token_data = response.json()
        print(token_data)
        return token_data.get("access_token")
    except:
        print(response.text)
        return None
    finally:
        print()

def test_me(token, username):
    """Test the me endpoint with authentication."""
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(
        f"{BASE_URL}/api/auth/me", 
        headers=headers
    )
    print(f"ME RESPONSE ({username}):", response.status_code)
    print(response.json() if response.status_code == 200 else response.text)
    print()

def test_create_product(token):
    """Test creating a product."""
    headers = {"Authorization": f"Bearer {token}"}
    product_data = {
        "name": "Test Product",
        "description": "This is a test product",
        "price": 99.99,
        "stock": 10,
        "category": "Test"
    }
    response = requests.post(
        f"{BASE_URL}/api/products/", 
        json=product_data,
        headers=headers
    )
    print("CREATE PRODUCT RESPONSE:", response.status_code)
    print(response.json() if response.status_code == 200 else response.text)
    print()
    
    if response.status_code == 200:
        return response.json().get("id")
    return None

def test_get_products():
    """Test getting all products."""
    response = requests.get(f"{BASE_URL}/api/products/")
    print("GET PRODUCTS RESPONSE:", response.status_code)
    print(response.json() if response.status_code == 200 else response.text)
    print()

def test_get_product(product_id):
    """Test getting a specific product."""
    response = requests.get(f"{BASE_URL}/api/products/{product_id}")
    print(f"GET PRODUCT {product_id} RESPONSE:", response.status_code)
    print(response.json() if response.status_code == 200 else response.text)
    print()

def test_update_product(token, product_id):
    """Test updating a product."""
    headers = {"Authorization": f"Bearer {token}"}
    product_data = {
        "name": "Updated Product",
        "price": 129.99,
        "stock": 5
    }
    response = requests.put(
        f"{BASE_URL}/api/products/{product_id}", 
        json=product_data,
        headers=headers
    )
    print(f"UPDATE PRODUCT {product_id} RESPONSE:", response.status_code)
    print(response.json() if response.status_code == 200 else response.text)
    print()

def test_delete_product(token, product_id):
    """Test deleting a product."""
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.delete(
        f"{BASE_URL}/api/products/{product_id}", 
        headers=headers
    )
    print(f"DELETE PRODUCT {product_id} RESPONSE:", response.status_code)
    print(response.json() if response.status_code == 200 else response.text)
    print()

if __name__ == "__main__":
    # Test the API
    print("Testing the Casecraft API...")
    print("==========================")
    
    # Test root endpoint
    test_root()
    
    # Register admin and update role
    test_register_admin()
    
    # Register regular user
    test_register_user()
    
    # Let the server process the requests
    time.sleep(1)
    
    # Login as admin
    admin_token = test_login("admin", "adminpass123")
    
    # Login as regular user
    user_token = test_login("testuser", "password123")
    
    if admin_token:
        # Test admin profile
        test_me(admin_token, "admin")
        
        # Test creating a product as admin
        product_id = test_create_product(admin_token)
        
        if product_id:
            # Test getting products
            test_get_products()
            
            # Test getting specific product
            test_get_product(product_id)
            
            # Test updating product
            test_update_product(admin_token, product_id)
            
            # Test deleting product
            test_delete_product(admin_token, product_id)
    
    if user_token:
        # Test user profile
        test_me(user_token, "testuser")
        
        # Try to create a product as regular user (should fail with 403)
        test_create_product(user_token)
    
    # Final check of products
    test_get_products() 