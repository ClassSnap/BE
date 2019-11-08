const db = require("../../../data/dbConfig");

module.exports = { addTeacher, findTeacherBy };

async function addTeacher(info) {
  const [newTeacher] = await db("teachers")
    .insert(info)
    .returning("*");
  return newTeacher;
}

function findTeacherBy(filter) {
  return db("teachers").where(filter);
}
