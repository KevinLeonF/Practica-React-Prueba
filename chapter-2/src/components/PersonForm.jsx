import React, { useState, useEffect } from 'react';

export default function PersonForm({ onAdd, onUpdate, editing, person, onCancel }) {
  const [name, setName] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');

  useEffect(() => {
    if (person) {
      setName(person.name); setEmail(person.email); setPhone(person.phone);
    } else {
      setName(''); setEmail(''); setPhone('');
    }
  }, [person]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const p = { name: name.trim(), email: email.trim(), phone: phone.trim() };
    if (editing >= 0) onUpdate(p); else onAdd(p);
    setName(''); setEmail(''); setPhone('');
  };

  return (
    <form onSubmit={handleSubmit} style={{marginBottom:12}}>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre" required />
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" required />
      <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Teléfono" required />
      <button type="submit">{editing>=0 ? 'Actualizar' : 'Guardar'}</button>
      {editing>=0 && <button type="button" onClick={onCancel}>Cancelar</button>}
    </form>
  );
}
