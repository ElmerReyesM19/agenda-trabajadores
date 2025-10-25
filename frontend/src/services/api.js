import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
});

export const obtenerEmpleados = () => api.get('/trabajadores');
export const crearEmpleado = (empleado) => api.post('/trabajadores', empleado);

export const obtenerActividades = () => api.get('/actividades');
export const obtenerActividadesPorFecha = (fecha) =>
  api.get(`/actividades/por-fecha?fecha=${fecha}`);
export const crearActividad = (actividad) => api.post('/actividades', actividad);
export const actualizarActividadEstado = (id, estado) =>
  api.put(`/actividades/${id}/estado`, { estado });
