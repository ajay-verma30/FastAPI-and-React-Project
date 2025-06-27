from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from datetime import date

class BookingCreate(BaseModel):
    booking_type: str
    checkin: date
    checkout: date
    rooms: int
    guests: int


class BookingOut(BaseModel):
    id: int
    booking_type: str
    checkin: date
    checkout: date
    rooms: int
    guests: int
    created_at: datetime
    created_by: int
    status: str


    class Config:
        from_attributes = True

class BookingResponse(BaseModel):
    id: int
    checkin: date
    checkout: date
    createdat: date
    guests: int
    rooms: int

    model_config = {
        "from_attributes": True
    }