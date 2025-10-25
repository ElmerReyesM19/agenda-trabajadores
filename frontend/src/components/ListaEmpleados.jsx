import React, { useEffect, useState } from 'react';
import { obtenerEmpleados, crearEmpleado } from '../services/api';

function ListaEmpleados({ empleados, seleccionados, onToggle }) {
  if (empleados && onToggle) {
    return (
      <div>
        <h2>Empleados</h2>
        <ul>
          {empleados.map(e => (
            <li key={e.id}>
              <label>
                <input
                  type="checkbox"
                  checked={seleccionados.includes(e.id)}
                  onChange={() => onToggle(e.id)}
                />
                {e.nombre}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Si no hay props, renderiza lista y formulario para crear nuevos
  const [lista, setLista] = useState([]);
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    try {
      const resp = await obtenerEmpleados();
      setLista(resp.data);
    } catch (err) {
      console.error('Error al cargar empleados:', err);
    }
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await crearEmpleado({ nombre, contacto });
      setLista([...lista, resp.data]);
      setNombre('');
      setContacto('');
    } catch (err) {
      console.error('Error al crear empleado:', err);
    }
  };

  return (
    <div>
      <h2>Empleados</h2>
      <ul>
        {lista.map(e => (
          <li key={e.id}>{e.nombre} — {e.contacto || 'N/A'}</li>
        ))}
      </ul>

      <h3>Nuevo Empleado</h3>
      <form onSubmit={manejarSubmit}>
        <div>
          <label>Nombre: </label>
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required />
        </div>
        <div>
          <label>Contacto: </label>
          <input type="text" value={contacto} onChange={e => setContacto(e.target.value)} />
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}

export default ListaEmpleados;
