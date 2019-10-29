const request = require("supertest");
const server = require("../../server");
const db = require("../../../data/dbConfig");
const beforeAll = require("./default");

//Getting Time out error
// describe("add new class", () => {
//   it("Return 201 when class is added", async () => {
//     let token = await beforeAll();
//     await db("class_learners").truncate();
//     const clase = {
//       name: "Ms.Li's ELAR Period 1",
//       subject: "ELAR",
//       gradeLevel: "5th",
//       classCode: "missli217",
//       teacherId: 1,
//     };
//     const addClass = await request(server)
//       .post("/api/class/", clase)
//       .set("authorization", token);
//     // expect(addClass.text).toContain("New class created");
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
