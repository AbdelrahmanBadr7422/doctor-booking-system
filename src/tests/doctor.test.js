import request from "supertest";
import app from "../src/app.js";
import "./setup.js";

let token;

beforeAll(async () => {
  await request(app).post("/auth/register").send({
    name: "doc",
    email: "doc@test.com",
    password: "123456",
    role: "doctor",
  });

  const res = await request(app).post("/auth/login").send({
    email: "doc@test.com",
    password: "123456",
  });

  token = res.body.token;
});

describe("Doctor", () => {
  it("should create doctor profile", async () => {
    const res = await request(app)
      .post("/doctors")
      .set("Authorization", `Bearer ${token}`)
      .send({
        specialization: "cardio",
        workingDays: ["sun", "mon"],
        workingHours: { start: "17:00", end: "20:00" },
        breaks: [],
        offDates: [],
        sessionDuration: 30,
      });

    expect(res.statusCode).toBe(200);
  });
});