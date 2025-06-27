import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import NavbarComponent from './Components/NavbarComponent';
import Booking from './Pages/Booking';
import Profile from './Pages/Profile';
import { AuthProvider } from './context/AuthContext'; 

function App() {
  return (
    <AuthProvider> 
      <Router>
        <div className="App">
          <NavbarComponent />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
