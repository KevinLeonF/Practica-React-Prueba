'use client'; // obligatorio para usar hooks


import { useState, useEffect } from 'react';
import PersonForm from '../components/PersonForm';
import PersonTable from '../components/PersonTable';

export default function Page() {
  const [people, setPeople] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  // cargar del localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem('people');
    if (stored) setPeople(JSON.parse(stored));
  }, []);

  // guardar en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('people', JSON.stringify(people));
  }, [people]);

  const addPerson = (p) => setPeople(prev => [...prev, p]);
  const updatePerson = (p) => {
    setPeople(prev => prev.map((item, idx) => idx === editIndex ? p : item));
    setEditIndex(-1);
  };
  const deletePerson = (i) => setPeople(prev => prev.filter((_, idx) => idx !== i));

  return (
    <main style={{ padding: 20 }}>
      <h1>Registro de Personas (Next.js App Router)</h1>
      <PersonForm
        onAdd={addPerson}
        onUpdate={updatePerson}
        editing={editIndex}
        person={editIndex >= 0 ? people[editIndex] : null}
        onCancel={() => setEditIndex(-1)}
      />
      <PersonTable
        people={people}
        onEdit={(i) => setEditIndex(i)}
        onDelete={deletePerson}
      />
    </main>
  );
}
