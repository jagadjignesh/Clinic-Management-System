import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';

export default function DoctorDashboard(){
  const [patients, setPatients] = useState([]);

  useEffect(()=>{
    API.get('/patients').then(r => setPatients(r.data));
  },[]);

  return (
    <div>
      <h3>Doctor Dashboard</h3>
      <Link to="/prescriptions/new"><button>Write Prescription</button></Link>
      <h4>Patients</h4>
      {patients.map(p => (
        <div key={p._id} className="card">
          <div>{p.name} - {p.phone}</div>
          <div><Link to={`/patients/${p._id}/history`}>History</Link></div>
        </div>
      ))}
    </div>
  );
}
