const db = require("../../../data/dbConfig");

module.exports = {
  getClassByTeacherId,
  getClassByClassId,
  getClassBy,
  addClass,
  updateClass,
  deleteClass,
  getAllStudentsByTeacherId,
  getAllStudents,
  getOneStudentByStudentId,
  addStudent,
  addStudenttoClass,
  editStudent,
  deleteStudent,
  deleteStudentfromClass,
  getQuestionByClassId,
  getQuestionByQuestionId,
  addQuestion,
  editQuestion,
  deleteQuestion,
  getRatingByClassId,
  getRatingByQuestionId,
  getRatingByStudentId,
  getAllRating,
  getLearnersByClassId,
  getParentByLearnerId,
  addRatingtoNewQuestion,
  getLearnersParentsByClassId,
  deleteRatingbyQuestionId
};

//Get Class By Teacher ID
function getClassByTeacherId(id) {
  return db("classes").where("teacherId", id);
}

//Get Class By Class Id
function getClassByClassId(id) {
  return db("classes").where("id", id);
}

//Get Class By filter
function getClassBy(filter) {
  return db("classes").where(filter);
}

//Add Class
async function addClass(info) {
  const [newClass] = await db("classes")
    .insert(info)
    .returning("*");
  return newClass;
}

// function addClass(info) {
//   return db("classes")
//     .insert(info)
//     .then(ids => ({ id: ids[0] }));
// }

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

//Get all students
function getAllStudents() {
  return db("learners");
}

//Get One Student By Student Id on class List
function getOneStudentByStudentId(id) {
  return db("learners").where("id", id);
}

//Add Learner to learners table
// function addStudent(info) {
//   return db("learners")
//     .insert(info)
//     .then(ids => ({ id: ids[0] }));
// }

async function addStudent(info) {
  const [newStudent] = await db("learners")
    .insert(info)
    .returning("*");
  return newStudent;
}

// function addStudenttoClass(info) {
//   return db("class_learners")
//     .insert(info)
//     .then(ids => ({ id: ids[0] }));
// }

async function addStudenttoClass(info) {
  const [newLearner] = await db("class_learners")
    .insert(info)
    .returning("*");
  return newLearner;
}

//Edit Student by Student Id
function editStudent(info, id) {
  return db("learners")
    .where("id", id)
    .update(info);
}

//Delete Student by Student Id
function deleteStudent(id) {
  return db("learners")
    .where("id", id)
    .del();
}

//Delete class-student match in class_learner table
function deleteStudentfromClass(id) {
  return db("class_learners")
    .where("id", id)
    .del();
}

//Get Question By ClassID
function getQuestionByClassId(id) {
  return db("questions").where("classId", id);
}

//Get Question By Question Id
function getQuestionByQuestionId(id) {
  return db("questions").where({ id });
}

//Add Question
async function addQuestion(info) {
  const [newQuestion] = await db("questions")
    .insert(info)
    .returning("*");
  return newQuestion;
}
// function addQuestion(info) {
//   return db("questions")
//     .insert(info)
//     .then(ids => ({ id: ids[0] }));
// }

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
  return db("ratings").where("classId", id);
}

//Get Ratings By Question ID
function getRatingByQuestionId(id) {
  return db("ratings as r")
    .join("questions as q", "q.id", "r.questionId")
    .join("learner_parent as lp", "lp.id", "r.learnerParentId")
    .join("learners as l", "l.id", "lp.learnerId")
    .select(
      "r.rating",
      "ratingDate",
      "q.question",
      "q.date",
      "l.lastName",
      "l.firstName",
      "l.learnerCode"
    )
    .where("questionId", id);
}

//Get Rating By Class and Student ID
function getRatingByStudentId(classId, studentId) {
  return db("ratings as r")
    .join("studentsParent as sp", "sp.id", "r.studentParentId")
    .where("r.classId", classId)
    .where("sp.studentId", studentId)
    .where("learners as l")
    .select("r.rating", "r.ratingDate", "r.questionId");
}

function getAllRating() {
  return db("ratings");
}

//Get Learners By Class Id
function getLearnersByClassId(id) {
  return db("class_learners as cl")
    .join("learners as l", "l.id", "cl.learnerId")
    .where("cl.classId", "=", id);
}

//Get Parent by Learner Id
function getParentByLearnerId(id) {
  return db("learner_parent as lp").where("lp.learnerId", "=", id);
}

//Add Rating to New Question
function addRatingtoNewQuestion(info) {
  return db("ratings")
    .insert(info)
    .then(ids => ({ id: ids[0] }));
}

function getLearnersParentsByClassId(id) {
  return db("class_learners as cl")
    .join("learners as l", "l.id", "cl.learnerId")
    .join("learner_parent as lp", "lp.learnerId", "l.id")
    .where("cl.classId", "=", id)
    .select(
      "lp.id",
      "lp.learnerId",
      "lp.parentId",
      "l.firstName",
      "l.lastName",
      "cl.classId"
    );
}

function deleteRatingbyQuestionId(id) {
  return db("ratings as r")
    .where("r.questionId", id)
    .del();
}
