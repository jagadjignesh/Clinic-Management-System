import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function PatientForm(){
  const [form, setForm] = useState({ name:'', age:'', gender:'other', phone:'', address:'', notes:''});
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/patients', form);
      alert(`Patient created. Token #${data.token.tokenNumber}`);
      nav('/reception');
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="card">
      <h3>New Patient</h3>
      <form onSubmit={submit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
        <input placeholder="Age" value={form.age} onChange={e => setForm({...form, age: e.target.value})}/>
        <select value={form.gender} onChange={e => setForm({...form, gender:e.target.value})}>
          <option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
        </select>
        <input placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})}/>
        <textarea placeholder="Address/Notes" value={form.notes} onChange={e => setForm({...form, notes:e.target.value})}/>
        <button type="submit">Create & Generate Token</button>
      </form>
    </div>
  );
}
