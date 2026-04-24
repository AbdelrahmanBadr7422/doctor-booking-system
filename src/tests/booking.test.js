import request from "supertest";
import app from "../src/app.js";
import "./setup.js";

let patientToken;
let doctorToken;
let doctorId;

beforeAll(async () => {
  // create doctor
  await request(app).post("/auth/register").send({
    name: "doc",
    email: "doc2@test.com",
    password: "123456",
    role: "doctor",
  });

  const docLogin = await request(app).post("/auth/login").send({
    email: "doc2@test.com",
    password: "123456",
  });

  doctorToken = docLogin.body.token;

  const doc = await request(app)
    .post("/doctors")
    .set("Authorization", `Bearer ${doctorToken}`)
    .send({
      specialization: "cardio",
      workingDays: ["sun"],
      workingHours: { start: "10:00", end: "12:00" },
      breaks: [],
      offDates: [],
      sessionDuration: 30,
    });

  doctorId = doc.body._id;

  // create patient
  await request(app).post("/auth/register").send({
    name: "patient",
    email: "p@test.com",
    password: "123456",
    role: "patient",
  });

  const pLogin = await request(app).post("/auth/login").send({
    email: "p@test.com",
    password: "123456",
  });

  patientToken = pLogin.body.token;
});

describe("Booking", () => {
  it("should get slots", async () => {
    const res = await request(app).get(
      `/bookings/slots?doctorId=${doctorId}&date=2026-05-01`
    );

    expect(res.statusCode).toBe(200);
  });

  it("should create booking", async () => {
    const time = new Date("2026-05-01T10:00:00");

    const res = await request(app)
      .post("/bookings")
      .set("Authorization", `Bearer ${patientToken}`)
      .send({
        doctorId,
        time,
      });

    expect(res.statusCode).toBe(200);
  });

  it("should prevent double booking", async () => {
    const time = new Date("2026-05-01T10:00:00");

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