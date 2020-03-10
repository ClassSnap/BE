const db = require("../../../data/dbConfig");

module.exports = { addParent, findParentBy };

async function addParent(parent) {
  const [newParent] = await db("parents")
    .insert(parent)
    .returning("*");
  return newParent;
}

function findParentBy(filter) {
  return db("parents as p")
    .where(filter)
    .select("p.id", "p.parentEmail", "p.parentName");
}
