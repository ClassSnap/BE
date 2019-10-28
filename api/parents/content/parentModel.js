const db = "../../../data/dbConfig";

module.exports = {
  findByLearnerCode,
  matchLearnertoParent,
  getLearnerByParentId,
  getClassByLearnerId,
  getQuestionByClassId,
  getQuestionByQuestionId,
  addRating,
  getRatingByLearnerParnetId,
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
//Get Learners By Parent Id
function getLearnerByParentId(id) {
  return db("learn_parent as lp")
    .join("learners as l", "lp.learnId", "l.id")
    .where("l.parentId", id)
    .select("l.firstName", "l.lastName");
}

//Get Class By Learner Id
function getClassByLearnerId(id) {
  return db("class_learners as cl")
    .join("classes as c", "cl.classId", "c.id")
    .join("teachers as t", "c.teacherId", "t.id")
    .where("cl.learnerId", id)
    .select("c.className", "c.subject", "t.prefix", "t.teacherLastName");
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
function addRating(info) {
  return db("ratings")
    .insert(info)
    .then(ids => ({ id: ids[0] }));
}

//Get List of Rating by learn parent id
function getRatingByLearnerParnetId() {
  return db("ratings").where("ratings.learnParentId", id);
}
