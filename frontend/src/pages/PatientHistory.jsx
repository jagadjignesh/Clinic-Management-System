import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function PatientHistory(){
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [bills, setBills] = useState([]);
  const nav = useNavigate();

  const loadAll = async () => {
    try {
      const [pRes, prRes, bRes] = await Promise.all([
        API.get(`/patients/${id}`),
        API.get(`/prescriptions/${id}`),
        API.get(`/bills/${id}`)
      ]);
      setPatient(pRes.data);
      setPrescriptions(prRes.data);
      setBills(bRes.data);
    } catch (err) {
      console.error(err);
      alert('Error loading patient data');
    }
  };

  useEffect(()=>{ loadAll(); },[id]);

  if (!patient) return <div>Loading...</div>;
  return (
    <div>
      <h3>{patient.name} - History</h3>
      <div style={{ display:'flex', gap:8, marginBottom:12 }}>
        <button onClick={() => nav(`/bills/new?patientId=${id}`)}>Create Bill</button>
        <button onClick={loadAll}>Refresh</button>
      </div>

      <div className="card">
        <strong>Basic Info</strong>
        <div>Phone: {patient.phone}</div>
        <div>Address: {patient.address}</div>
      </div>

      <h4>Prescriptions</h4>
      {prescriptions.length === 0 && <div className="card">No prescriptions</div>}
      {prescriptions.map(p => (
        <div className="card" key={p._id}>
          <div>Doctor: {p.doctor?.name}</div>
          <div>Date: {new Date(p.date).toLocaleString()}</div>
          {p.medicines.map((m,i)=>(
            <div key={i}>{m.name} - {m.dosage} - {m.duration}</div>
          ))}
          <div>Notes: {p.notes}</div>
        </div>
      ))}

      <h4>Bills</h4>
      {bills.length === 0 && <div className="card">No bills</div>}
      {bills.map(b => (
        <div className="card" key={b._id}>
          <div><strong>Total: INR {b.total}</strong></div>
          <div>Created At: {new Date(b.createdAt).toLocaleString()}</div>
          {b.items.map((it,i)=> <div key={i}>{it.desc} x {it.qty} - INR {it.price}</div>)}
        </div>
      ))}

      <h4>Timeline</h4>
      {patient.history.length === 0 && <div className="card">No history entries</div>}
      {patient.history.map((h,i)=>(
        <div className="card" key={i}>
          <div>{new Date(h.visitDate).toLocaleString()}</div>
          <div>{h.complaint}</div>
        </div>
      ))}
    </div>
  );
}
