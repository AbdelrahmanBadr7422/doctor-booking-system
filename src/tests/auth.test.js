import request from "supertest";
import app from "../src/app.js";
import "./setup.js";

describe("Auth", () => {
  it("should register user", async () => {
    const res = await request(app).post("/auth/register").send({
      name: "test",
      email: "test@test.com",
      password: "123456",
      role: "patient",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe("test@test.com");
  });

  it("should login user", async () => {
    await request(app).post("/auth/register").send({
      name: "test",
      email: "login@test.com",
      password: "123456",
      role: "patient",
    });

    const res = await request(app).post("/auth/login").send({
      email: "login@test.com",
      password: "123456",
    });

    expect(res.body.token).toBeDefined();
  });
});