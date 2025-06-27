# 🏨 HotelMate – Hotel Booking Web App

HotelMate is a full-stack web application for hotel room booking. Built with **FastAPI** on the backend and **React.js** on the frontend, this app allows users to register, login, book rooms, and manage their bookings.

---

## 🚀 Tech Stack

### 🧠 Backend – FastAPI (Python)
- FastAPI (for API endpoints)
- SQLAlchemy (ORM)
- PostgreSQL or SQLite (database)
- JWT Authentication
- CORS, Dependency Injection
- Pydantic (for validation)

### 🌐 Frontend – React.js
- React Bootstrap (UI Components)
- Axios (API Requests)
- React Router (Navigation)
- Context API (for Authentication)

---

## 📦 Features

- 🔐 **User Authentication** (Register / Login with JWT)
- 🏨 **Hotel Booking** – Select dates, guests, check availability
- 📅 **My Bookings** – View all previous and active bookings
- ❌ **Cancel Booking** – Cancel active bookings
- 👤 **Profile Dashboard** – View user info
- 🌙 **Responsive UI** – Clean and mobile-friendly interface

---

## 🛠️ Local Setup Instructions
NOTE: Make Sure to use your own credentials in .env file inorder to connect to the Database. 

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/your-username/bookingapp.git
cd bookingapp
2️⃣ Backend Setup (FastAPI)
bash
Copy
Edit
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
✅ Make sure .env or config has DB and JWT secret properly set.

3️⃣ Frontend Setup (React)
bash
Copy
Edit
cd frontend
npm install
npm start
Frontend runs on: http://localhost:3000
Backend runs on: http://localhost:8000

🔐 Authentication Flow
JWT tokens issued after login

Stored in localStorage

AuthContext manages auth state in frontend

Protected API routes require Authorization: Bearer <token>

🧪 API Endpoints (FastAPI)
Endpoint	Method	Description
/auth/register	POST	Register a new user
/auth/login	POST	User login (JWT)
/bookings/	POST	Create a booking
/bookings/me	GET	Fetch user bookings
/bookings/{id}/cancel	PATCH	Cancel a booking


🙌 Author
Made with ❤️ by Ajay Verma
Feel free to contribute or raise issues!
