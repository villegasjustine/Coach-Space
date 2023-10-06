"use strict";
const User = require("./user");
const Exercise = require("./exercise");
const AssignedExercise = require("./assignedExercise");


async function init() {
  await User.sync();
  await Exercise.sync();
  await AssignedExercise.sync();
}

init();

module.exports = {
  User,
  Exercise,
  AssignedExercise,

};
