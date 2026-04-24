import request from "supertest";
import app from "../app.js";
import "./setup.js";

let token;

beforeAll(async () => {
  await request(app).post("/auth/register").send({
    name: "doctor user",
    email: "doctor@test.com",
    password: "123456",
    role: "doctor",
  });

  const res = await request(app).post("/auth/login").send({
    email: "doctor@test.com",
    password: "123456",
  });

  token = res.body.token;
});

describe("Doctor API", () => {
  it("should create doctor profile", async () => {
    const res = await request(app)
      .post("/doctors")
      .set("Authorization", `Bearer ${token}`)
      .send({
        specialization: "cardiology",
        workingDays: ["fri"],
        workingHours: { start: "10:00", end: "12:00" },
        breaks: [],
        offDates: [],
        sessionDuration: 30,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBeDefined();
  });
});