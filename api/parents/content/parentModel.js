const db = require("../../../data/dbConfig");

module.exports = {
  findByLearnerCode,
  matchLearnertoParent,
  getLearnerByParentId,
  getClassByLearnerId,
  getQuestionByClassId,
  getQuestionByQuestionId,
  addRating,
  getRatingByLearnerParnetId,
  getClassByLId,
  getClass
};

//find Learner By Name
function findByLearnerCode(code) {
  return db("learners").where("learnerCode", code);
}

//Match Learner with Parent
function matchLearnertoParent(learnerId, parentId) {
  return db("learner_parent")
    .insert(learnerId, parentId)
    .then(ids => ({ id: ids[0] }));
}
//Get Learners By Parent Id (works)
function getLearnerByParentId(id) {
  return db("learner_parent as lp")
    .join("learners as l", "lp.learnerId", "l.id")
    .where("lp.parentId", id)
    .select(
      "l.id",
      "l.firstName",
      "l.lastName",
      "l.learnerCode",
      "lp.parentId",
      "lp.learnerId"
    );
}

// Get Class By Learner Id
function getClassByLearnerId(id) {
  return db("class_learners as cl")
    .join("classes as c", "c.id", "cl.classId")
    .join("teachers as t", "t.id", "c.teacherId")
    .where("cl.learnerId", "=", id)
    .select(
      "cl.classId",
      "c.name",
      "c.subject",
      "c.gradeLevel",
      "c.classCode",
      "c.classRigor",
      "t.id as teacherId",
      "t.prefix",
      "t.teacherLastName"
    );
  // .join("classes as c", "cl.classId", "c.id")
  // .join("teachers as t", "c.teacherId", "t.id")
  // .where("cl.learnerId", "=", id)
  // .select("c.className", "c.subject", "t.prefix", "t.teacherLastName");
}

function getClassByLId(id) {
  return db("learners").where("learner.id", id);
}

//Get Questions By Class Id
function getQuestionByClassId(id) {
  return db("questions").where("questions.classId", id);
}

//Get Question By Question Id
function getQuestionByQuestionId(id) {
  return db("questions").where("questions.id", id);
}
//** */Post rating By Question Id
function addRating(info, learnerid) {
  return db("ratings")
    .insert(info)
    .where("learnerParentId", learnerid)
    .then(ids => ({ id: ids[0] }));
}

//Get List of Rating by learn parent id
function getRatingByLearnerParnetId() {
  return db("ratings").where("ratings.learnParentId", id);
}

// //Get rating by question id
// function getRatingByQuestionIdl

function getClass() {
  return db("class_learners");
}
