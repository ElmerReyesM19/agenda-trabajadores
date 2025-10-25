import React, { useEffect, useState } from 'react';
import { obtenerActividadesPorFecha } from '../services/api';
import './TablaActividadesDia.css';

export default function TablaActividadesDia({ fecha }) {
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      if (!fecha) {
        setActividades([]);
        return;
      }

      setCargando(true);
      try {
        const fechaISO = fecha.toISOString().split('T')[0];
        const res = await obtenerActividadesPorFecha(fechaISO);
        setActividades(res.data);
      } catch (err) {
        console.error('Error al cargar actividades por fecha:', err);
        setActividades([]);
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, [fecha]);

  const formatearFecha = (f) => {
    return f.toLocaleDateString('es-ES', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="tabla-actividades-container">
      <div className="tabla-actividades-caption">
        Actividades del {fecha ? formatearFecha(fecha) : 'día'}
      </div>

      {cargando ? (
        <p className="mensaje-sin-actividades">Cargando actividades…</p>
      ) : actividades.length > 0 ? (
        <table className="tabla-actividades">
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Lugar</th>
              <th>Empleados</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {actividades.map((act) => (
              <tr key={act.id}>
                <td>{act.descripcion}</td>
                <td>{act.lugar || '-'}</td>
                <td>{act.empleados?.map((e) => e.nombre).join(', ') || '-'}</td>
                <td>{act.estado || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="mensaje-sin-actividades">
          {fecha ? 'No hay actividades para esta fecha.' : 'Seleccione una fecha para ver las actividades.'}
        </div>
      )}
    </div>
  );
}
