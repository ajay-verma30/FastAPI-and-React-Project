from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.booking import BookingCreate, BookingOut
from models.booking import Booking
from db.conn import get_db
from utils.token import get_current_user
from typing import List

router = APIRouter(prefix="/bookings", tags=["Bookings"])

@router.post("/", response_model=BookingOut)
def create_booking(
    booking: BookingCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    new_booking = Booking(
        booking_type=booking.booking_type,
        checkin=booking.checkin,
        checkout=booking.checkout,
        rooms=booking.rooms,
        guests=booking.guests,
        created_by=current_user.id 
    )
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    return new_booking


@router.get("/me", response_model=List[BookingOut])
def get_my_bookings(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    bookings = db.query(Booking).filter(Booking.created_by == current_user.id).all()
    return bookings

@router.patch("/{booking_id}/cancel")
def cancel_booking(booking_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    booking = db.query(Booking).filter(Booking.id == booking_id, Booking.created_by == current_user.id).first()

    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    if booking.status.lower() == "cancelled":
        raise HTTPException(status_code=400, detail="Booking already cancelled")

    booking.status = "cancelled"
    db.commit()
    db.refresh(booking)

    return {"message": "Booking cancelled successfully", "booking_id": booking.id, "status": booking.status}