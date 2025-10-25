import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 20,
  duration: '30s',
};

export default function () {
  const payload = JSON.stringify({
    fecha: '2025-11-02',
    descripcion: 'Carga test',
    lugar: 'Zona C',
    empleadoIds: [],
    nuevosEmpleados: ['CargaEmp']
  });
  const headers = { 'Content-Type': 'application/json' };
  const res = http.post('http://localhost:3000/api/actividades', payload, { headers });
  check(res, { 'status es 201': r => r.status === 201 });
  sleep(1);
}
