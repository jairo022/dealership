import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import HomePage from './Components/HomePage';
import Sedan from './Components/Sedan';
import Coupe from './Components/Coupe';
import Suvs from './Components/Suvs';
import Sports from './Components/Sports';
import Cruisers from './Components/Cruisers';
import Touring from './Components/Touring';
import Compact from './Components/Compact';
import MidSize from './Components/MidSize';
import FullSize from './Components/FullSize';
import BusinessDashboard from './Components/BusinessDashboard';
import About from './Components/About';
import AddVehicle from './Components/AddVehicule';
import EditVehicle from './Components/EditVehicle'; // Import the new component



const App = () => (
  <Router>
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/cars/sedan" element={<Sedan />} />
        <Route path="/cars/coupe" element={<Coupe />} />
        <Route path="/cars/suv" element={<Suvs />} />
        <Route path="/motorcycles/sport" element={<Sports />} />
        <Route path="/motorcycles/cruiser" element={<Cruisers />} />
        <Route path="/motorcycles/touring" element={<Touring />} />
        <Route path="/trucks/compact" element={<Compact />} />
        <Route path="/trucks/midsize" element={<MidSize />} />
        <Route path="/trucks/fullsize" element={<FullSize />} />
        <Route path="/business-dashboard" element={<BusinessDashboard />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
        <Route path="/edit-vehicle/:id" element={<EditVehicle />} />

        <Route path="/" element={<HomePage />} />
        
      </Routes>
    </div>
  </Router>
);

export default App;
