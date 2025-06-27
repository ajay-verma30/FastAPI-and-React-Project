import React, { useEffect, useState } from 'react';
import { Card, Container, Modal, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Profile.css';

function Profile() {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleShow = (booking) => {
    setSelectedBooking(booking);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedBooking(null);
  };

  const fetchBookings = async () => {
    if (!token) return;
    try {
      const res = await axios.get('http://localhost:8000/bookings/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      setBookings(res.data);
    } catch (error) {
      console.error('Error fetching bookings', error);
      alert('Session expired or invalid token. Please login again.');
    }
  };

  const handleCancel = async () => {
    if (!selectedBooking) return;

    try {
      console.log(selectedBooking.id)
      await axios.patch(
  `http://localhost:8000/bookings/${selectedBooking.id}/cancel`,
  {},
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
      alert('Booking Cancelled Successfully');
      handleClose();
      fetchBookings();
    } catch (e) {
      alert('Unable to cancel booking. Please try again later!');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [token]);

  if (!user) {
    return <p className="text-center mt-5">Loading or not logged in</p>;
  }

  return (
    <>
      <section className="profile">
        <div className="d-flex justify-content-center mt-5">
          <Card style={{ width: '22rem', padding: '20px' }}>
            <Card.Body className="text-center">
              <Card.Title>{user.name}</Card.Title>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Joined:</strong> {user.createdOn}</p>
            </Card.Body>
          </Card>
        </div>
      </section>

      <br />

      <section className="my-bookings">
        <h4 className="text-center">My Bookings</h4>

        {bookings.length === 0 ? (
          <p className="text-center text-muted">No bookings found.</p>
        ) : (
          <Container>
            <div className="table-responsive">
              <table className="table table-bordered table-striped text-center">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
                    <th>Guests</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr key={booking.id || index}>
                      <td>{index + 1}</td>
                      <td>{new Date(booking.checkin).toLocaleDateString()}</td>
                      <td>{new Date(booking.checkout).toLocaleDateString()}</td>
                      <td>{booking.guests}</td>
                      <td>{booking.status}</td>
                      <td>
  <FontAwesomeIcon
    icon={faPencil}
    className="edit"
    style={{
      cursor: booking.status === 'cancelled' ? 'not-allowed' : 'pointer',
      opacity: booking.status === 'cancelled' ? 0.4 : 1,
    }}
    onClick={booking.status === 'cancelled' ? null : () => handleShow(booking)}
  />
</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        )}
      </section>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedBooking ? `Booking #${selectedBooking.id}` : 'Loading...'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking ? (
            <>
              <p><strong>Check-in:</strong> {new Date(selectedBooking.checkin).toDateString()}</p>
              <p><strong>Check-out:</strong> {new Date(selectedBooking.checkout).toDateString()}</p>
              <p><strong>Guests:</strong> {selectedBooking.guests}</p>
              <p><strong>Status:</strong> {selectedBooking.status}</p>
            </>
          ) : (
            <p>Loading booking details...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {selectedBooking?.status !== 'cancelled' && (
            <Button variant="danger" onClick={handleCancel}>
              Cancel Booking
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Profile;
