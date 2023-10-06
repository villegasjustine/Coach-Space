"use strict";
const User = require("./user");
const Exercise = require("./exercise");
const AssignedExercise = require("./assignedExercise");
// const Points = require("./points")



async function init() {
  await User.sync();
  await Exercise.sync();
  // await Points.sync();
  await AssignedExercise.sync();
}

init();

module.exports = {
  User,
  Exercise,
  AssignedExercise,
  // Points
};
