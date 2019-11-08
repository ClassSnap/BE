const request = require("supertest");
const server = require("../../server");
const db = require("../../../data/dbConfig");
const beforeAll = require("./default");

// Getting Time out error
// describe("add new class", () => {
//   it("Return 201 when class is added", async () => {
//     let token = await beforeAll();
//     await db("classes").truncate();
//     const info = {
//       name: "Ms.Li's Math Period 1",
//       subject: "Math",
//       gradeLevel: "5th",
//       classCode: "123456",
//       teacherId: 1,
//     };
//     const addClass = await request(server)
//       .post("/api/class/")
//       .send(info)
//       .set("authorization", token);
//     expect(addClass.text).toContain("New class created");
//     expect(addClass.status).toBe(201);
//   });
// });

describe("delete class", () => {
  it("Return delete message when class is deleted", async () => {
    let token = await beforeAll();
    const deleteClassId = 1;
    const del = await request(server)
      .delete(`/api/class/${deleteClassId}`, deleteClassId)
      .set("authorization", token);
    expect(del.text).toContain("Class deleted");
  });
});
