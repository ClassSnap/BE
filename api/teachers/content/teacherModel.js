const db = require("../../../data/dbConfig");

module.exports = {
  getClassByTeacherId,
  getClassByClassId,
  addClass,
  updateClass,
  deleteClass,
  getAllStudentsByTeacherId,
  getOneStudentByStudentId,
  addStudent,
  addStudenttoClass,
  editStudent,
  deleteStudent,
  getQuestionByClassId,
  getQuestionByQuestionId,
  addQuestion,
  editQuestion,
  deleteQuestion,
  getRatingByClassId,
  getRatingByQuestionId,
  getRatingByStudentId,
};

//Get Class By Teacher ID
function getClassByTeacherId(id) {
  return db("classes").where("teacherId", id);
}

//Get Class By Class Id
function getClassByClassId(id) {
  return db("classes").where("id", id);
}

//Add Class
function addClass(info) {
  return db("classes")
    .insert(info)
    .then(ids => ({ id: ids[0] }));
}

//Edit Class By Class Id
function updateClass(info, id) {
  return db("classes")
    .where("id", id)
    .update(info);
}
//Delete Class by Class Id
function deleteClass(id) {
  return db("classes")
    .where("id", id)
    .del();
}

//Get All Student By ClassId
function getAllStudentsByTeacherId(id) {
  return db("class_learners").where("classId", id);
}

//Get One Student By Student Id on class List
function getOneStudentByStudentId(id) {
  return db("class_learners").where("learnId", id);
}

//Add Learner to learners table
function addStudent(info) {
  return db("learners")
    .insert(info)
    .then(ids => ({ id: ids[0] }));
}

function addStudenttoClass(info) {
  return "class_learners".insert(info).then(ids => ({ id: ids[0] }));
}

//Edit Student by Student Id
function editStudent(info, id) {
  return db("students")
    .where("id", id)
    .update(info);
}

//Delete Student by Student Id
function deleteStudent(id) {
  return db("students")
    .where("id", id)
    .del();
}

//Get Question By ClassID
function getQuestionByClassId(id) {
  return db("questions").where("classId", id);
}

//Get Question By Question Id
function getQuestionByQuestionId(id) {
  return db("questions".where({ id }));
}

//Add Question
function addQuestion(info) {
  return db("questions")
    .insert(info)
    .then(ids => ({ id: ids[0] }));
}

//Edit Question
function editQuestion(info, id) {
  return db("questions")
    .where("id", id)
    .update(info);
}

//Delete Question
function deleteQuestion(id) {
  return db("questions")
    .where("id", id)
    .del();
}

//Get Rating By Class ID
function getRatingByClassId(id) {
  return db("ratings").where("ratings.classId", id);
}

//Get Ratings By Question ID
function getRatingByQuestionId(id) {
  return db("ratings").where("ratings.questionId", id);
}
//Get Rating By Class and Student ID
function getRatingByStudentId(classId, studentId) {
  return db("ratings as r")
    .join("studentsParent as sp", "sp.id", "r.studentParentId")
    .where("r.classId", classId)
    .where("sp.studentId", studentId)
    .select(r.rating, r.ratingDate, r.questionId);
}
