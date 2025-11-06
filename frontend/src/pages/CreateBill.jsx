import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function CreateBill(){
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState('');
  const [items, setItems] = useState([{ desc:'Consultation', qty:1, price:0 }]);
  const nav = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(()=>{
    API.get('/patients').then(r => {
      setPatients(r.data);
      const p = searchParams.get('patientId');
      if (p) setPatientId(p);
    }).catch(err => console.error(err));
  }, []);

  const addItem = () => setItems([...items, { desc:'', qty:1, price:0 }]);
  const updateItem = (idx, key, val) => {
    const arr = [...items];
    arr[idx][key] = key === 'qty' || key === 'price' ? Number(val) : val;
    setItems(arr);
  };
  const removeItem = (idx) => setItems(items.filter((_,i)=>i!==idx));

  const calcTotal = () => items.reduce((s,it) => s + (it.price || 0) * (it.qty || 1), 0);

  const submit = async (e) => {
    e.preventDefault();
    if (!patientId) return alert('Select patient');
    try {
      const { data } = await API.post('/bills', { patientId, items });
      alert(`Bill created — Total INR ${data.total}`);
      nav(`/patients/${patientId}/history`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error creating bill');
    }
  };

  return (
    <div className="card">
      <h3>Create Bill</h3>
      <form onSubmit={submit}>
        <label>Patient</label>
        <select value={patientId} onChange={e=>setPatientId(e.target.value)}>
          <option value="">-- Select patient --</option>
          {patients.map(p=> <option key={p._id} value={p._1d ?? p._id}>{p.name} ({p.phone})</option>)}
        </select>

        <h4>Items</h4>
        {items.map((it, i) => (
          <div key={i} style={{ marginBottom:8 }}>
            Description: <input placeholder="Description" value={it.desc} onChange={e=>updateItem(i,'desc', e.target.value)} />
            Qty: <input placeholder="Qty" type="number" min="1" value={it.qty} onChange={e=>updateItem(i,'qty', e.target.value)} />
            Price: <input placeholder="Price" type="number" min="0" value={it.price} onChange={e=>updateItem(i,'price', e.target.value)} />
            <button type="button" onClick={()=>removeItem(i)}>Remove</button>
          </div>
        ))}

        <button type="button" onClick={addItem}>Add item</button>

        <div style={{ marginTop:12 }}>
          <strong>Total: INR {calcTotal()}</strong>
        </div>

        <button type="submit" style={{ marginTop:8 }}>Create Bill</button>
      </form>
    </div>
  );
}
