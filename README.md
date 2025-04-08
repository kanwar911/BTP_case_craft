# Casecraft E-commerce Platform

A full-stack e-commerce application for university project BTP_CaseCraft_2.

## Project Structure

This project is organized as a monorepo with two main components:

- **backend/**: FastAPI backend application
- **frontend/**: Next.js frontend application (coming soon)

## Technology Stack

### Backend
- FastAPI (Python)
- PostgreSQL
- SQLAlchemy ORM
- JWT Authentication
- Alembic for migrations

### Frontend (Planned)
- Next.js
- React
- TypeScript
- Tailwind CSS

## Setup and Installation

### Backend

1. Navigate to the backend directory:
```bash
cd backend
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

4. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

5. Start the backend server:
```bash
uvicorn main:app --reload
```

The API will be available at http://localhost:8000

### Frontend

Frontend implementation details will be added in the next phase.

## API Documentation

API documentation is available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

```
casecraft/
├── backend/               # FastAPI backend
│   ├── app/
│   │   ├── models/        # SQLAlchemy models
│   │   ├── schemas/       # Pydantic schemas
│   │   ├── routes/        # API routes
│   │   ├── auth/          # Authentication
│   │   └── db.py          # Database config
│   ├── alembic/           # Database migrations
│   ├── main.py            # Main application
│   └── requirements.txt   # Dependencies
└── frontend/              # Next.js frontend (coming soon)
```

## License

This project is for educational purposes only. 