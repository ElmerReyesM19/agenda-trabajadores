import React, { useState } from 'react';
import { FaEye, FaPlus, FaArrowLeft } from 'react-icons/fa';
import CalendarioMesFiltro from '../components/CalendarioMesFiltro';
import FormularioCrearActividad from '../components/FormularioCrearActividad';
import TablaActividadesDia from '../components/TablaActividadesDia';
import './Dashboard.css';

export default function Dashboard() {
  const [vista, setVista] = useState('inicio');  
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [recargar, setRecargar] = useState(false);

  const manejarSeleccionFecha = (date) => {
    setFechaSeleccionada(date);
    setRecargar(prev => !prev);
    setVista('ver');
  };

  const manejarActividadCreada = () => {
    setRecargar(prev => !prev);
    setVista('ver');
  };

  const volverInicio = () => {
    setVista('inicio');
    setFechaSeleccionada(null);
  };

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">AGENDA TRABAJADORES</h1>

      {vista === 'inicio' && (
        <div className="dashboard-cards">
          <div className="card-button" onClick={() => setVista('ver')}>
            <FaEye className="card-icon" />
            <span className="card-label">Ver actividad</span>
          </div>
          <div className="card-button" onClick={() => setVista('crear')}>
            <FaPlus className="card-icon" />
            <span className="card-label">Crear actividad</span>
          </div>
        </div>
      )}

      {vista === 'ver' && (
        <div>
          <button className="btn-back" onClick={volverInicio}>
            <FaArrowLeft style={{ marginRight: '8px' }} /> Volver al inicio
          </button>
          <div className="dashboard-content">
            <div className="dashboard-side calendar-side">
              <h2 className="section-title">Calendario</h2>
              <CalendarioMesFiltro onSelectSlotDate={manejarSeleccionFecha} />
            </div>
            <div className="dashboard-side table-side">
              <h2 className="section-title">Actividades del día</h2>
              <TablaActividadesDia key={recargar.toString()} fecha={fechaSeleccionada} />
            </div>
          </div>
        </div>
      )}

      {vista === 'crear' && (
        <div className="create-view">
          <button className="btn-back" onClick={volverInicio}>
            <FaArrowLeft style={{ marginRight: '8px' }} /> Volver al inicio
          </button>
          <h2 className="section-title">Crear nueva actividad</h2>
          <FormularioCrearActividad onActividadCreada={manejarActividadCreada} />
        </div>
      )}
    </div>
  );
}
