exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("learner_parent")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("learner_parent").insert([
        { id: 1, parentId: 1, learnerId: 1 },
        { id: 2, parentId: 1, learnerId: 2 },
        { id: 3, parentId: 2, learnerId: 3 },
      ]);
    });
};
