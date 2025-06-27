import React, {useState} from 'react'
import './Common.css'
import {Button, Col, Form, Row, Card} from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';


function Home() {
    const [selected, setSelected] = useState('');
     const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [rooms, setRooms] = useState('');
  const [people, setPeople] = useState('');
const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
  setSelected(value);
  };

  const handleBooking = (e)=>{
    e.preventDefault();
    const bookingDetails = {
        selected,
        checkInDate,
        checkOutDate,
        rooms,
        people
    }
    if(!selected || !checkInDate || !checkOutDate || !rooms || !people){
        alert("Please Enter the required details first");
        return;
    }
    if(checkInDate.toDateString() === checkOutDate.toDateString()){
        alert("Your are trying to book same check in date and check out date! Are you sure?");
        return;
    }
    navigate('/booking', { state: bookingDetails })
  }
  const reviews = [
  {
    name: "Ritika M., Delhi",
    text: "The staff was super friendly and helpful. Rooms were clean and spacious. Will definitely come back with family!",
    rating: 5
  },
  {
    name: "Aarav & Nisha, Mumbai",
    text: "Perfect for a romantic getaway! Loved the ambiance and private dinner setup.",
    rating: 4
  },
  {
    name: "John K., London",
    text: "Booking was smooth, check-in took just 2 minutes! Highly recommend the pool view rooms.",
    rating: 5
  },
  {
    name: "Kavya P., Bangalore",
    text: "Great value for money. Breakfast was good. Wi-Fi could be faster though.",
    rating: 4
  },
  {
    name: "Zoya A., Dubai",
    text: "One of the best weekend stays I’ve had in a while. Clean, calm, and classy!",
    rating: 5
  },
  {
    name: "Manan & Rhea, Jaipur",
    text: "Our honeymoon package was everything we dreamed of. Special thanks to the chef for customizing our meals!",
    rating: 4
  }
];


  return (
    <>
        <section className='one'>
            <div className="booking-container">
                <Form  onSubmit={handleBooking}>
                    <Form.Label>Booking Type</Form.Label>
                    <br/>
                     <Form.Check
                    inline
                    label="solo"
                    name='plan'
                    type='radio'
                    id='radio-solo'
                    value="solo"
                    checked={selected === "solo"}
                    onChange={handleChange}/>

                    <Form.Check
                    inline
                    label="Couple"
                    name='plan'
                    type='radio'
                    id='radio-couple'
                    value="couple"
                    checked={selected === "couple"}
                    onChange={handleChange}/>

                    <Form.Check
                    inline
                    label="family"
                    name='plan'
                    type='radio'
                    id='radio-family'
                    value="family"
                    checked={selected === "family"}
                    onChange={handleChange}/>

                    <Form.Check
                    inline
                    label="group"
                    name='plan'
                    type='radio'
                    id='radio-group'
                    value="group"
                    checked={selected === "group"}
                    onChange={handleChange}/>

                    <br/>
                    <Row>
                        <Col xs={12} md={6}>
                        <Form.Group>
                            <Form.Label>Check-in Date</Form.Label>
                            <br/>
                            <DatePicker
                                selected={checkInDate}
                                onChange={(date) => setCheckInDate(date)}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select check-in date"
                                className="form-control"
                                minDate={new Date()}
                            />
                        </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                        <Form.Group>
                            <Form.Label>Check-Out Date</Form.Label>
                            <br/>
                            <DatePicker
                                selected={checkOutDate}
                                onChange={(date) => setCheckOutDate(date)}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select check-out date"
                                className="form-control"
                                minDate={new Date()}
                            />
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                        <Form.Label>Total Rooms</Form.Label>
                        <Form.Select value={rooms} onChange={(e) => setRooms(e.target.value)}>
                            <option value="">Select rooms</option>
                            <option value="1">1 Room</option>
                            <option value="2">2 Rooms</option>
                            <option value="3">3 Rooms</option>
                            <option value="4">4 Rooms</option>
                            <option value="5">5 Rooms</option>
                        </Form.Select>
                        </Form.Group>
                        </Col>

                        <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                        <Form.Label>Total Guests</Form.Label>
                        <Form.Select value={people} onChange={(e) => setPeople(e.target.value)}>
                            <option value="">Select Guests</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Form.Select>
                        </Form.Group>
                        </Col>
                    </Row>    
                    <div className="d-flex justify-content-center">
                        <Button className="btn btn-success booking-btn" type='submit'>Book</Button>
                    </div>              
                </Form>
            </div>
        </section>        

        <section className='two'>
            <h1 className='text-center two-header'>The Luxury Awaits</h1>
            <Row>
                <Col xs={12} md={6}>
                <div className="content text-center">
                    <h1>About Us</h1>
                    <p>
                        The keeper of grand legacies. The custodian of rich cultures. The epitome of true Indian luxury, where every space is a celebration of India's rich heritage, expressed through our opulent architecture, intricate art and gracious service.<br/>
                        Rooted in the philosophy of Atithi Devo Bhava - Guest is God, every experience is thoughtfully curated to honour our guests with warmth, splendour and timeless elegance.
                    </p>
                    <Button className='btn btn-warning read-more'>Read More</Button>
                </div>
                </Col>
                <Col xs={12} md={6}>
                <img src='Images/about.jpg' alt='about-img' className='about-img'/>
                </Col>
            </Row>
        </section>

        <section className='three'>
            <h1 className='text-center'>Offers</h1>
            <Row style={{marginTop:"50px"}}>
                <Col xs={12} md={3}>
                     <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="Images/family.jpg" />
                    <Card.Body>
                    <Card.Title>Family Escape Package</Card.Title>
                        <Card.Text>
                        Quality time with your loved ones, made memorable.
                        </Card.Text>
                        <Button className='card-btn' variant="primary">Check offers</Button>
                    </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={3}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="Images/honeymoon.jpg" />
                    <Card.Body>
                    <Card.Title>HoneyMoon Packages</Card.Title>
                        <Card.Text>
                        Celebrate love in style and <br/>serenity.
                        </Card.Text>
                        <Button className='card-btn' variant="primary">Check offers</Button>
                    </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={3}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="Images/weekend.jpg" />
                    <Card.Body>
                    <Card.Title>Weekend Getaway</Card.Title>
                        <Card.Text>
                        Recharge, relax, and return refreshed.
                        </Card.Text>
                        <Button className='card-btn' variant="primary">Check offers</Button>
                    </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={3}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="Images/leisure.jpg" />
                    <Card.Body>
                    <Card.Title>Pleasure & Leisure Offer</Card.Title>
                        <Card.Text>
                        For those who work hard and unwind harder
                        </Card.Text>
                        <Button className='card-btn' variant="primary">Check offers</Button>
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
        </section>
        <section className='contact' style={{padding:"2%"}}>
            <Row> 
                <Col md={6} xs={12}>
                    <div className="contact-form">
                        <h4>Contact</h4>
                        <Form>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' placeholder='Name'></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' placeholder='Email'></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Query</Form.Label>
                                <Form.Control type='text' as="textarea" placeholder='Query'></Form.Control>
                            </Form.Group>
                            <br/>
                            <Button type='submit' className='btn-warning'>Submit</Button>
                        </Form>
                    </div>
                </Col>
                <Col xs={12} md={6}>
                        <section className='review-slider-section' style={{ padding: '4% 0', backgroundColor: '#f8f9fa' }}>
          <h2 className='text-center mb-4'>What Our Guests Say</h2>
          <div style={{ maxWidth: "700px", margin: "auto" }} >
            <Slider
              dots={true}
              infinite={true}
              speed={600}
              slidesToShow={1}
              slidesToScroll={1}
              autoplay={true}
              autoplaySpeed={3500}
              arrows={true}
            >
              {reviews.map((rev, index) => (
                <div key={index} className="p-4 text-center shadow-sm bg-white rounded sliders">
                  <p style={{ fontSize: "1.2rem" }}>
                    {"⭐".repeat(rev.rating)}{" "}
                  </p>
                  <p className="fst-italic">"{rev.text}"</p>
                  <p className="fw-bold mt-2">— {rev.name}</p>
                </div>
              ))}
            </Slider>
          </div>
        </section>

                </Col>
            </Row>
        </section>
        <section className='footer' >
            <Row>
                <Col xs={12} md={6} style={{padding:"2%"}}>
                ©2025 The Leela Palaces, Hotels and Resorts. All Rights Reserved.
                </Col>
                <Col xs={12} md={3} style={{padding:"2%"}}>
                <p> Social Media Platforms</p>
                <a href='#'>X</a><br/>
                <a href='#'>Instagram</a>
                <br/>
                <a href='#'>Facebook</a>
                </Col>
                <Col xs={12} md={3} style={{padding:"2%"}}>
                    <h5>Subscribe to Newsletter</h5>
                    <Form>
                        <Form.Group>
                            <Form.Control placeholder='Email id'></Form.Control>
                        </Form.Group>
                        <Button style={{marginTop:"10px"}} className='btn btn-warning btn-subscribe'>Subscribe</Button>
                    </Form>
                </Col>
            </Row>
        </section>
    </>
  )
}

export default Home