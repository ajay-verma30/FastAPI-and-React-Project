import React, { useState } from 'react';
import { Navbar, Nav, Container, Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './FlipModal.css';
import { useAuth } from '../context/AuthContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function NavbarComponent() {
  const { login, isLoggedIn, logout } = useAuth(); 
  const navi = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [name, setName] = useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleFlip = () => setIsFlipped(!isFlipped);

  const handleProfile =(e)=>{
    e.preventDefault();
    navi('/profile')
  }

  const handleHome =(e)=>{
e.preventDefault();
navi('/')
  }

  const handleLogout = ()=>{
    logout();
    navi('/')
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/auth/login', { email, password });
      login(res.data); 
      handleClose(); 
    } catch (err) {
      alert('Login failed!');
      console.error(err);
    }
  };

 const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://127.0.0.1:8000/users', { name, email, password });
    login(res.data); 
    setIsFlipped(false);
  } catch (err) {
    alert('Registration failed!');
    console.error(err);
  }
};


  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold text-primary">HotelMate</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={handleHome}>Home</Nav.Link>
          </Nav>
          <Nav className="ms-auto d-flex align-items-center">
            {isLoggedIn ? (
              <>
              <Button className='profile-icon' onClick={handleProfile}><FontAwesomeIcon icon={faUser} /></Button>
                <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Nav.Link href="#login" className="me-2" onClick={handleShow}>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Login/Register Modal */}
      <Modal show={show} onHide={handleClose} centered dialogClassName="login-modal">
        <div className={`flip-card-container ${isFlipped ? 'flipped' : ''}`}>
          <div className="flip-card-inner">

            {/* Login */}
            <div className="flip-card-front">
              <Modal.Header closeButton><Modal.Title>Login</Modal.Title></Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleLogin}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                  </Form.Group>
                  <br />
                  <Button variant="primary" type="submit">Login</Button>
                </Form>
                <p className="text-center mt-3">
                  New here? <span className="text-primary" onClick={toggleFlip} style={{ cursor: 'pointer' }}>Register</span>
                </p>
              </Modal.Body>
            </div>

            {/* Register (UI only for now) */}
            <div className="flip-card-back">
  <Modal.Header closeButton><Modal.Title>Register</Modal.Title></Modal.Header>
  <Modal.Body>
    <Form onSubmit={handleRegister}>
      <Form.Group>
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <p className="text-center mt-3">
        Already have an account? <span className="text-primary" onClick={toggleFlip} style={{ cursor: 'pointer' }}>Login</span>
      </p>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="success" type="submit">Register</Button>
      </Modal.Footer>
    </Form>
  </Modal.Body>
</div>

          </div>
        </div>
      </Modal>
    </Navbar>
  );
}

export default NavbarComponent;
