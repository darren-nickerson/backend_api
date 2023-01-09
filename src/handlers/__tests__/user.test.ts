import * as user from '../user';
import app from "../../server";
import request from "supertest";


describe("POST /user", function () {
  beforeEach(() => {
    console.log("adding user")
  });
  it("responds with status 200", async () => {
    const res = await request(app)
      .post("/user")
      .send({ email: "hello@example.com", password: "password" })
      .set("Accept", "application/json")

    expect(res.status).toEqual(200);
  });
})

describe("GET /", function () {
  beforeEach(() => {
    console.log("getting jobs")
  });
  it("responds with status 200", async () => {
    const res = await request(app)
      .get("/")
    expect(res.status).toEqual(200);
  });
})

describe("GET /status", function () {
  beforeEach(() => {
    console.log(" Checking status is ok")
  });
  it("responds with message ok", async () => {
    const res = await request(app)
      .get("/status")
    expect(res.body).toEqual({ message: "ok" })
    expect(res.status).toEqual(200);
  });
})