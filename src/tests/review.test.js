import request from "supertest";
import app from "../src/app.js";
import "./setup.js";

describe("Review", () => {
  it("should add review", async () => {
    const res = await request(app).post("/reviews").send({
      doctorId: "507f191e810c19729de860ea",
      patientId: "507f191e810c19729de860eb",
      rating: 5,
      comment: "good",
    });

    expect(res.statusCode).toBe(200);
  });
});