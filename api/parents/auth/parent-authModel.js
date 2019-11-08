const db = require("../../../data/dbConfig");

module.exports = { addParent, findParentBy };

async function addParent(parent) {
  const [newParent] = await db("parents")
    .insert(parent)
    .returning("*");
  return newParent;
}

function findParentBy(filter) {
  return db("parents").where(filter);
}
