const request = require("supertest");
const app = require("../../app");
const { Actividad, Empleado, sequelize } = require("../../models");

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await Empleado.create({ nombre: "EmpleadoTestUnitario" });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Actividad Controller – Unitarias", () => {
  test("Crear actividad sin nuevos empleados ni IDs", async () => {
    const res = await request(app)
      .post("/api/actividades")
      .send({
        fecha: "2025‑10‑30",
        descripcion: "Test unidad 1",
        lugar: "LugarA",
        empleadoIds: [],
        nuevosEmpleados: []
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.actividad).toHaveProperty("id");
  });
});
