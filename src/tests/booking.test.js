import request from "supertest";
import app from "../app.js";
import "./setup.js";

let patientToken;
let doctorToken;
let doctorId;

beforeAll(async () => {
  // doctor register
  await request(app).post("/auth/register").send({
    name: "doctor",
    email: "doc@test.com",
    password: "123456",
    role: "doctor",
  });

  const docLogin = await request(app).post("/auth/login").send({
    email: "doc@test.com",
    password: "123456",
  });

  doctorToken = docLogin.body.token;

  const doctor = await request(app)
    .post("/doctors")
    .set("Authorization", `Bearer ${doctorToken}`)
    .send({
      specialization: "cardiology",
      workingDays: ["fri"],
      workingHours: { start: "10:00", end: "12:00" },
      breaks: [],
      offDates: [],
      sessionDuration: 30,
    });

  doctorId = doctor.body._id;

  // patient register
  await request(app).post("/auth/register").send({
    name: "patient",
    email: "patient@test.com",
    password: "123456",
    role: "patient",
  });

  const pLogin = await request(app).post("/auth/login").send({
    email: "patient@test.com",
    password: "123456",
  });

  patientToken = pLogin.body.token;
});

describe("Booking API", () => {
  it("should get available slots", async () => {
    const res = await request(app).get(
      `/bookings/slots?doctorId=${doctorId}&date=2026-05-01`
    );

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should create booking", async () => {
    const res = await request(app)
      .post("/bookings")
      .set("Authorization", `Bearer ${patientToken}`)
      .send({
        doctorId,
        time: "2026-05-01T10:00:00.000Z",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBeDefined();
  });

  it("should prevent double booking", async () => {
    const time = "2026-05-01T10:30:00.000Z";

    await request(app)
      .post("/bookings")
      .set("Authorization", `Bearer ${patientToken}`)
      .send({ doctorId, time });

    const res = await request(app)
      .post("/bookings")
      .set("Authorization", `Bearer ${patientToken}`)
      .send({ doctorId, time });

    expect(res.statusCode).toBe(400);
  });
});