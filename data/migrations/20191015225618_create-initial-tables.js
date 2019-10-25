exports.up = function(knex) {
  return knex.schema
    .createTable("teachers", function(teacher) {
      teacher.increments();
      teacher.string("prefix", 10);
      teacher.string("teacherFirstName", 128).notNullable();
      teacher.string("teacherLastName", 128).notNullable();
      teacher
        .string("teacherEmail", 128)
        .notNullable()
        .unique();
      teacher.string("teacherPassword").notNullable();
      teacher.string("schoolName", 128);
      teacher.string("schoolDistrict", 255);
      teacher.string("city", 128);
      teacher.string("state", 128);
      teacher.string("country", 128);
    })
    .createTable("parents", function(parent) {
      parent.increments();
      parent.string("parentName", 128).notNullable();
      parent
        .string("parentEmail", 128)
        .notNullable()
        .unique();
      parent.string("parentPassword").notNullable();
      parent.string("relationship", 128);
    })
    .createTable("learners", function(learner) {
      learner.increments();
      learner.string("lastName").notNullable();
      learner.string("firstName").notNullable();
      learner.string("gender");
      learner.date("birthdate");
    })
    .createTable("classes", function(classes) {
      classes.increments();
      classes.string("className", 128).notNullable();
      classes.string("subject", 128).notNullable();
      classes.string("gradeLevel", 128).notNullable();
      classes.string("classCode", 128).unique();
      classes.string("classRigor", 128);
      classes
        .integer("teacherId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("teachers");
    })
    .createTable("class_learners", function(learner) {
      learner.increments();
      learner
        .integer("learnId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("learners");
      learner
        .integer("classId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("classes");
    })
    .createTable("learner_parent", function(lp) {
      lp.increments();
      lp.integer("parentId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("parents");
      lp.integer("learnerId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("learners");
    })
    .createTable("questions", function(question) {
      question.increments();
      question.string("question", 255).notNullable();
      question.string("imageURL", 255);
      question.string("sampleAnswer");
      question.string("language", 128);
      question.date("date").notNullable();
      question
        .integer("classId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("classes");
    })

    .createTable("ratings", function(rating) {
      rating.increments();
      rating
        .integer("rating")
        .unsigned()
        .notNullable();
      rating.date("ratingDate");
      rating
        .integer("questionId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("questions");
      rating
        .integer("learnerParentId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("learner_parent");
      rating
        .integer("classId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("classes");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("ratings")
    .dropTableIfExists("questions")
    .dropTableIfExists("learner_parent")
    .dropTableIfExists("class_learners")
    .dropTableIfExists("classes")
    .dropTableIfExists("learners")
    .dropTableIfExists("parents")
    .dropTableIfExists("teachers");
};
