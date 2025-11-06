import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Link, useNavigate } from 'react-router-dom';

export default function ReceptionDashboard(){
  const [tokens, setTokens] = useState([]);
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  const load = async () => {
    const t = await API.get('/tokens');
    setTokens(t.data);
    const p = await API.get('/patients');
    setPatients(p.data);
  };

  useEffect(()=>{ load(); },[]);

  return (
    <div>
      <h3>Reception Dashboard</h3>
      <Link to="/patients/new"><button>Add Patient & Generate Token</button></Link>
      <h4>Today's Tokens</h4>
      {tokens.map(tok => (
        <div key={tok._id} className="card">
          <strong>#{tok.tokenNumber}</strong> - {tok.patient?.name} - {tok.status}
        </div>
      ))}

      <h4>All Patients</h4>
      {patients.map(p => (
        <div key={p._id} className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div style={{fontWeight:600}}>{p.name} ({p.phone})</div>
              <div style={{fontSize:12, color:'#666'}}>{p.address}</div>
            </div>
            <div style={{display:'flex', gap:8}}>
              <button onClick={() => navigate(`/patients/${p._id}/history`)}>History</button>
              <button onClick={() => navigate(`/bills/new?patientId=${p._id}`)}>Create Bill</button>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}
