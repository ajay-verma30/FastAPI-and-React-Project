from fastapi import FastAPI
from routers import users as user_router
from routers import booking as booking_router
from routers import auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Include ticket routes
app.include_router(user_router.router)
app.include_router(auth.router)
app.include_router(booking_router.router)
