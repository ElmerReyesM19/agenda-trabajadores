const request = require("supertest");
const app = require("../../app");
const { Empleado, sequelize } = require("../../models");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Integración – Empleados", () => {
  test("Crear y luego recuperar empleado", async () => {
    const createRes = await request(app)
      .post("/api/trabajadores")
      .send({ nombre: "EmpInt" });
    expect(createRes.statusCode).toBe(201);
    const listRes = await request(app).get("/api/trabajadores");
    expect(listRes.statusCode).toBe(200);
    const nombres = listRes.body.map(e => e.nombre);
    expect(nombres).toContain("EmpInt");
  });
});
