const db = require("../../../data/dbConfig");

module.exports = { addTeacher, findTeacherBy };

function addTeacher(info) {
  return db("teachers")
    .insert(info)
    .then(ids => ({ id: ids[0] }));
}

function findTeacherBy(filter) {
  return db("teachers").where(filter);
}
