const request = require("supertest");
const app = require("../../app");
const { Actividad, Empleado, sequelize } = require("../../models");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Integración – Actividades", () => {
  test("Crear actividad con nuevo empleado y verificar asociación", async () => {
    const res = await request(app)
      .post("/api/actividades")
      .send({
        fecha: "2025‑10‑31",
        descripcion: "Integracion Test",
        lugar: "ZonaB",
        empleadoIds: [],
        nuevosEmpleados: ["NuevoEmpIntegracion"]
      });
    expect(res.statusCode).toBe(201);
    const actividadId = res.body.actividad.id;
    const actividad = await Actividad.findByPk(actividadId, {
      include: { model: Empleado, as: "empleados" }
    });
    const nombres = actividad.empleados.map(e => e.nombre);
    expect(nombres).toContain("NuevoEmpIntegracion");
  });
});
