const request = require("supertest");
const server = require("../../server");
const db = require("../../../data/dbConfig");

describe("auth model", () => {
  it("should set testing environment", () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });
});

describe("teacher registration function check", () => {
  it("should return 201 when new registration is successful", async () => {
    await db("teachers").truncate();
    const teacher = {
      prefix: "Miss",
      teacherFirstName: "Karen",
      teacherLastName: "Li",
      teacherEmail: "karen@gmail.com",
      teacherPassword: "harakarin",
      schoolName: "Briscoe ES",
      city: "San Antonio",
    };
    const res = await request(server)
      .post("/api/auth/teacher/register")
      .send(teacher);

    expect(res.status).toBe(201);
  });
});

describe("registration function error check", () => {
  it("should return 404 when missing registration info", async () => {
    const parent = {
      parentName: "Jess Estrada",
      parentEmail: "jess@gmail.com",
    };
    const res = await request(server)
      .post("/api/auth/parent/register")
      .send(parent);
    expect(res.status).toBe(404);
  });
});

describe("user login function", () => {
  it("should return message and token after successful login", async () => {
    const teacherUser = {
      teacherEmail: "karen@gmail.com",
      teacherPassword: "harakarin",
    };
    const login = await request(server)
      .post("/api/auth/teacher/login")
      .send(teacherUser);
    expect(login.status).toBe(200);
    expect(login.text).toContain("token");
    expect(login.text).toContain("message");
  });
});

describe("user login function error", () => {
  it("should return 404 error message with wrong creds", async () => {
    const teacherUser = {
      teacherEmail: "jessica@gmail.com",
      teacherPassword: "jessica",
    };
    const login = await request(server)
      .post("/api/auth/parent/login")
      .send(teacherUser);
    expect(login.status).toBe(404);
  });
});
