const db = require("../../../data/dbConfig");

module.exports = {
  findByLearnerCode,
  matchLearnertoParent,
  getLearnerByParentId,
  getClassByLearnerId,
  getQuestionByClassId,
  getQuestionByQuestionId,
  addRating,
  getRatingByLearnerParentId,
  getRatingByQuestionId,
  getRatingByParentId,
  getClassByLId,
  getClass,
  getClassBy,
  getLearnersByClass,
  addParentChild,
  editRatingByRatingId,
  getRatingByRatingId
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
function getRatingByLearnerParentId(id) {
  return db("ratings as r")
    .join("questions as q", "q.id", "r.questionId")
    .join("learner_parent as lp", "lp.id", "r.learnerParentId")
    .join("learners as l", "l.id", "lp.learnerId")
    .where("r.learnerParentId", id);
}

function getRatingByParentId(id) {
  return db("ratings as r")
    .join("questions as q", "q.id", "r.questionId")
    .join("classes as c", "c.id", "q.classId")
    .join("learner_parent as lp", "lp.id", "r.learnerParentId")
    .join("learners as l", "l.id", "lp.learnerId")
    .join("parents as p", "lp.parentId", "p.id")
    .where("p.id", id)
    .select(
      "r.id",
      "r.rating",
      "r.comment",
      "r.questionId",
      "r.learnerParentId",
      "r.classId",
      "r.completed",
      "q.question",
      "q.questionType",
      "q.language",
      "q.date",
      "q.classId",
      "lp.parentId",
      "lp.learnerId",
      "l.firstName",
      "l.lastName",
      "c.name"
    );
}

// //Get rating by question id
function getRatingByQuestionId(id) {
  return db("ratings as r")
    .join("learner_parent as lp", "lp.id", "r.learnerParentId")
    .join("learners as l", "l.id", "lp.learnerId")
    .join("questions as q", "q.id", "r.questionId")
    .where("r.questionId", id);
}

function getClass() {
  return db("class_learners");
}

function getClassBy(filter) {
  return db("classes").where(filter);
}

// function getClassByClassCode (code) {
//   return db("classes")
// }

function getLearnersByClass(id) {
  return db("class_learners as cl")
    .join("classes as c", "c.id", "cl.classId")
    .join("learners as l", "l.id", "cl.learnerId")
    .where("cl.classId", id);
}

async function addParentChild(info) {
  const [newParentChild] = await db("learner_parent")
    .insert(info)
    .returning("*");
  return newParentChild;
}

function editRatingByRatingId(id, info) {
  return db("ratings")
    .where("id", "=", id)
    .update(info);
}

function getRatingByRatingId(id) {
  return db("ratings").where("id", id);
}
