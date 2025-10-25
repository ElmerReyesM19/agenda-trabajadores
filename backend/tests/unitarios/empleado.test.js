const request = require("supertest");
const app = require("../../app");
const { Empleado, sequelize } = require("../../models");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Empleado Controller – Unitarias", () => {
  test("Crear nuevo empleado", async () => {
    const res = await request(app)
      .post("/api/trabajadores")
      .send({ nombre: "EmpleadoTestUnitario2" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("nombre", "EmpleadoTestUnitario2");
  });

  test("Listar empleados", async () => {
    const res = await request(app).get("/api/trabajadores");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
