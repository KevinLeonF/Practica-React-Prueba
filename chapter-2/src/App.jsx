import React, { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import PersonTable from './components/PersonTable';
import './styles.css';

export default function App(){
  const [people, setPeople] = useState(() => JSON.parse(localStorage.getItem('people')||'[]'));
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => localStorage.setItem('people', JSON.stringify(people)), [people]);

  const addPerson = (p) => setPeople(prev => [...prev, p]);
  const updatePerson = (idx, p) => setPeople(prev => prev.map((it,i)=> i===idx ? p : it));
  const deletePerson = (idx) => setPeople(prev => prev.filter((_,i)=> i!==idx));

  return (
    <main style={{padding:20}}>
      <h1>Registro de Personas (React)</h1>
      <PersonForm
        onAdd={addPerson}
        onUpdate={(p) => { updatePerson(editIndex, p); setEditIndex(-1); }}
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

