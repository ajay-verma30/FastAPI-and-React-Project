import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import './Common.css';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function Booking() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { token, user } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBookClick = () => {
    setShowPayment(true);
  };

  const handleFakePay = async () => {
    setLoading(true);
    setTimeout(async () => {
      setShowPayment(false);
      setPaymentSuccess(true);

      const bookingPayload = {
  booking_type: state.selected || "solo",
  checkin: new Date(state.checkInDate).toISOString().split('T')[0],
  checkout: new Date(state.checkOutDate).toISOString().split('T')[0],
  rooms: parseInt(state.rooms, 10),
  guests: parseInt(state.people, 10)
};

      console.log(bookingPayload)

      try {
        const res = await axios.post('http://localhost:8000/bookings', bookingPayload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('Booking successful:', res.data);
        alert('Booking successful!');
        navigate('/profile'); 
      } catch (error) {
        console.error('Booking failed:', error);
        alert('Booking failed. Please try again.');
      }

      setLoading(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleBookClick(); 
  };

  return (
    <>
      <div className="final-booking">
        <div className="booking-container1">
          <h2>Complete Your Booking</h2>
          <p><strong>Type:</strong> {state.selected}</p>
          <p><strong>Check-in:</strong> {new Date(state.checkInDate).toDateString()}</p>
          <p><strong>Check-out:</strong> {new Date(state.checkOutDate).toDateString()}</p>
          <p><strong>Rooms:</strong> {state.rooms}</p>
          <p><strong>Guests:</strong> {state.people}</p>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" value={user.name} onChange={(e) => setName(e.target.value)} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={user.email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
              </Col>
            </Row>
            <br />
            <Button
              className="btn btn-success booking-btn"
              id="confirm-booking"
              disabled={!name || !email }
              type="submit"
            >
              Confirm Booking
            </Button>
          </Form>
        </div>

        {/* Payment Modal */}
        <Modal show={showPayment} onHide={() => setShowPayment(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Fake Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Card Number</Form.Label>
                <Form.Control placeholder="1234 5678 9012 3456" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control placeholder="MM/YY" />
              </Form.Group>
              <Form.Group>
                <Form.Label>CVV</Form.Label>
                <Form.Control placeholder="123" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowPayment(false)}>Cancel</Button>
            <Button variant="success" onClick={handleFakePay} disabled={loading}>
              {loading ? 'Processing...' : 'Pay'}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Payment Success Message */}
        {paymentSuccess && (
          <div className="alert alert-success text-center mt-3">
            Payment Successful! Booking is being confirmed...
          </div>
        )}
      </div>
    </>
  );
}

export default Booking;
