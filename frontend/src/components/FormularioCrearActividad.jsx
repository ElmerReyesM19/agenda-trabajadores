import React, { useEffect, useState } from 'react';
import { crearActividad, obtenerEmpleados } from '../services/api';
import './FormularioCrearActividad.css';

export default function FormularioCrearActividad({ onActividadCreada }) {
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [lugar, setLugar] = useState('');
  const [empleados, setEmpleados] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);

  const [nuevosEmpleados, setNuevosEmpleados] = useState([]);
  const [nuevoEmpleadoInput, setNuevoEmpleadoInput] = useState('');

  // Función para cargar empleados desde la base de datos
  const cargarEmpleados = async () => {
    const res = await obtenerEmpleados();
    setEmpleados(res.data);
  };

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const toggleEmpleado = (id) => {
    setSeleccionados(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await crearActividad({
      fecha,
      descripcion,
      lugar,
      empleadoIds: seleccionados,
      nuevosEmpleados, // ✅ Importante
    });

    onActividadCreada();         // Para actualizar el calendario u otras vistas
    await cargarEmpleados();     // 🔄 Recarga la lista de empleados desde la BD

    setFecha('');
    setDescripcion('');
    setLugar('');
    setSeleccionados([]);
    setNuevosEmpleados([]);
    setNuevoEmpleadoInput('');
  };

  const agregarNuevoEmpleado = () => {
    const nombre = nuevoEmpleadoInput.trim();
    if (nombre) {
      setNuevosEmpleados(prev => [...prev, nombre]);
      setNuevoEmpleadoInput('');
    }
  };

  return (
    <div className="actividad-formulario">
      <h2>Crear Nueva Actividad</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Fecha:</label>
          <input
            type="date"
            value={fecha}
            onChange={e => setFecha(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Actividad:</label>
          <input
            type="text"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Lugar:</label>
          <input
            type="text"
            value={lugar}
            onChange={e => setLugar(e.target.value)}
          />
        </div>

        <div className="form-group empleados">
          <label>Selecciona empleados:</label>
          <div className="empleados-lista">
            {empleados.map(emp => (
              <label key={emp.id} className="empleado-checkbox">
                <input
                  type="checkbox"
                  checked={seleccionados.includes(emp.id)}
                  onChange={() => toggleEmpleado(emp.id)}
                />
                {emp.nombre}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group empleados-extras">
          <label style={{ marginTop: '1rem' }}>Agregar empleados:</label>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Nombre del empleado"
              value={nuevoEmpleadoInput}
              onChange={(e) => setNuevoEmpleadoInput(e.target.value)}
            />
            <button type="button" onClick={agregarNuevoEmpleado} className="btn-principal">
              + Añadir empleado
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {nuevosEmpleados.map((nombre, idx) => (
              <div
                key={idx}
                style={{
                  background: '#dce6f9',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>{nombre}</span>
                <button
                  type="button"
                  onClick={() =>
                    setNuevosEmpleados(nuevosEmpleados.filter((_, i) => i !== idx))
                  }
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#333',
                    fontWeight: 'bold'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn-principal">Crear Actividad</button>
      </form>
    </div>
  );
}
