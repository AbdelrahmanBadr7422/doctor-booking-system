import request from "supertest";
import app from "../app.js";
import "./setup.js";

describe("Auth API", () => {
  it("should register user", async () => {
    const res = await request(app).post("/auth/register").send({
      name: "test user",
      email: "test@test.com",
      password: "123456",
      role: "patient",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe("test@test.com");
  });

  it("should login user and return token", async () => {
    await request(app).post("/auth/register").send({
      name: "login user",
      email: "login@test.com",
      password: "123456",
      role: "patient",
    });

    const res = await request(app).post("/auth/login").send({
      email: "login@test.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});