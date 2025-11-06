import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import ReceptionDashboard from './pages/ReceptionDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientForm from './pages/PatientForm';
import PrescriptionForm from './pages/PrescriptionForm';
import PatientHistory from './pages/PatientHistory';
import PrivateRoute from './components/PrivateRoute';
import CreateBill from './pages/CreateBill';

function App(){
  return (
    <div className="container">
      <nav>
        <Link to="/">Home</Link>{' | '}
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div><h2>Clinic Management</h2><p>Please login to continue</p></div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/reception" element={<PrivateRoute role="receptionist"><ReceptionDashboard/></PrivateRoute>} />
        <Route path="/doctor" element={<PrivateRoute role="doctor"><DoctorDashboard/></PrivateRoute>} />
        <Route path="/patients/new" element={<PrivateRoute><PatientForm/></PrivateRoute>} />
        <Route path="/prescriptions/new" element={<PrivateRoute role="doctor"><PrescriptionForm/></PrivateRoute>} />
        <Route path="/patients/:id/history" element={<PrivateRoute><PatientHistory/></PrivateRoute>} />
        <Route path="/bills/new" element={<PrivateRoute role="receptionist"><CreateBill/></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
