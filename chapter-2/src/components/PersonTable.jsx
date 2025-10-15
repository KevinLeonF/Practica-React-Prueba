import React from 'react';

export default function PersonTable({ people, onEdit, onDelete }) {
  return (
    <table border="1" cellPadding="8" style={{width:'100%', borderCollapse:'collapse'}}>
      <thead><tr><th>Nombre</th><th>Email</th><th>Teléfono</th><th>Acciones</th></tr></thead>
      <tbody>
        {people.map((p,i)=>(
          <tr key={i}>
            <td>{p.name}</td>
            <td>{p.email}</td>
            <td>{p.phone}</td>
            <td>
              <button onClick={()=>onEdit(i)}>Editar</button>
              <button onClick={()=>{ if (confirm('¿Eliminar?')) onDelete(i); }}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
