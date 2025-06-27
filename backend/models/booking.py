from sqlalchemy import Column, Integer, String, Date, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from db.conn import Base

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    created_by = Column(Integer, ForeignKey("users.id"))
    status = Column(String(50), default="confirmed")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    checkin = Column(Date)
    checkout = Column(Date)
    booking_type = Column(String(20), default='couple')
    rooms = Column(Integer)
    guests = Column(Integer)

    user = relationship("User", back_populates="bookings")
