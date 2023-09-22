"use strict";
const User = require("./user");
const Exercise = require("./exercise");



async function init() {
  await User.sync();
  await Exercise.sync();
}

init();

module.exports = {
  User,
  Exercise
};
