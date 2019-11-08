exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("class_learners")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("class_learners").insert([
        { id: 1, learnerId: 1, classId: 1 },
        { id: 2, learnerId: 2, classId: 1 },
        { id: 3, learnerId: 3, classId: 2 },
      ]);
    });
};
