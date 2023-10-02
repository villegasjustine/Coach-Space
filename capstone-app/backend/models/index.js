"use strict";
const User = require("./user");
const Exercise = require("./exercise");
const AssignedExercise = require("./assignedExercise");
const Points = require("./points")



async function init() {
  await User.sync();
  await Exercise.sync();
  await AssignedExercise.sync();
  await Points.sync();
}

init();

module.exports = {
  User,
  Exercise,
  AssignedExercise,
  Points
};
