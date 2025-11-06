import React, { useState, useEffect } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function PrescriptionForm(){
  const [patientId, setPatientId] = useState('');
  const [patients, setPatients] = useState([]);
  const [medicines, setMedicines] = useState([{ name:'', dosage:'', duration:'' }]);
  const [notes, setNotes] = useState('');
  const nav = useNavigate();

  useEffect(()=>{ API.get('/patients').then(r=>setPatients(r.data)); },[]);

  const addMed = () => setMedicines([...medicines, {name:'', dosage:'', duration:''}]);
  const changeMed = (i, key, val) => {
    const arr = [...medicines]; arr[i][key]=val; setMedicines(arr);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/prescriptions', { patientId, medicines, notes });
      alert('Prescription saved');
      nav('/doctor');
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="card">
      <h3>Write Prescription</h3>
      <form onSubmit={submit}>
        <select value={patientId} onChange={e=>setPatientId(e.target.value)}>
          <option value="">Select patient</option>
          {patients.map(p=> <option key={p._id} value={p._id}>{p.name} ({p.phone})</option>)}
        </select>
        {medicines.map((m,i)=>(
          <div key={i}>
            <input placeholder="Medicine name" value={m.name} onChange={e=>changeMed(i,'name',e.target.value)}/>
            <input placeholder="Dosage" value={m.dosage} onChange={e=>changeMed(i,'dosage',e.target.value)}/>
            <input placeholder="Duration" value={m.duration} onChange={e=>changeMed(i,'duration',e.target.value)}/>
          </div>
        ))}
        <button type="button" onClick={addMed}>Add medicine</button>
        <textarea placeholder="Notes" value={notes} onChange={e=>setNotes(e.target.value)} />
        <button type="submit">Save Prescription</button>
      </form>
    </div>
  );
}
