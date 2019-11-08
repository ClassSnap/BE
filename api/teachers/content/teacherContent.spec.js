const request = require("supertest");
const server = require("../../server");
const db = require("../../../data/dbConfig");
const beforeAll = require("./default");

describe("Get class by teacher Id", () => {
  it("return 200 when class is fetched", async () => {
    let token = await beforeAll();
    const getTeacherclass = await request(server)
      .get("/api/teacher/4")
      .set("authorization", token);

    expect(getTeacherclass.status).toBe(200);
    expect(getTeacherclass.text).toContain("Here are the classes");
  });
});
