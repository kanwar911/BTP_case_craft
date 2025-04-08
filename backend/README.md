# Casecraft Backend

This is the backend API for the Casecraft e-commerce platform, built with FastAPI and PostgreSQL.

## Features

- RESTful API with FastAPI
- JWT Authentication
- PostgreSQL database with SQLAlchemy ORM
- Pydantic models for request/response validation
- User registration and authentication
- Product management

## Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/casecraft.git
cd casecraft/backend
```

2. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Set up database:

- Create a PostgreSQL database
- Copy `.env.example` to `.env` and update with your database credentials

5. Run migrations (if using Alembic):

```bash
alembic upgrade head
```

## Running the API

Start the development server:

```bash
uvicorn main:app --reload
```

The API will be available at http://localhost:8000

## API Documentation

FastAPI automatically generates documentation:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Testing

Run tests with pytest:

```bash
pytest
```

## Project Structure

```
backend/
├── app/
│   ├── models/         # SQLAlchemy models
│   ├── schemas/        # Pydantic schemas
│   ├── routes/         # API routes
│   ├── auth/           # Authentication utilities
│   └── db.py           # Database configuration
├── main.py             # FastAPI application
├── requirements.txt    # Dependencies
└── .env                # Environment variables (not in git)
``` 