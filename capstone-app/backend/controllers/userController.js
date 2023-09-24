"use strict";

const Models = require("../models");
const bcrypt = require('bcryptjs');
const { createToken } = require('../middleware/auth');

const getUsers = (res) => {
  Models.User.findAll({})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.send({ result: 500, data: err.message });
      res.status(500).json({ data: err.message });
    });
};

const createUser = (data, res) => {
  Models.User.create(data)
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.send({ result: 500, data: err.message });
      res.status(500).json({ data: err.message });
    });
};


const updateUser = (req, res) => {
  Models.User.update(req.body, { where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.send({ result: 500, data: err.message });
      res.status(500).json({ data: err.message });
    });
};

const deleteUser = (req, res) => {
  Models.User.destroy({ where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.send({ result: 500, data: err.message });
      res.status(500).json({ data: err.message });
    });
};

const loginUser = async (req, res) => {
  try {
      // Get user input from request body
      const { email, password } = req.body;

      // Validate user input
      if (!(email && password)) {
          res.status(400).json({ result: "All input is required" });
          return; // when sending responses and finishing early, manually return or end the function to stop further processing
      }
      // Validate if user exists in our database
      const user = await Models.User.findOne({ raw: true, where: { email: email }});


      // if they do exist, make sure their password matches - need to check encrypted version of password
      if (user && (await bcrypt.compare(password, user.password))) {
          // Create token for use based on their id and email
          const token = createToken(user.id, email);
          // save user token
          user.token = token;

          console.log(user)

          // send back logged in user details including token
          res.status(200).json({ result: 'User successfully logged in', data: user });
      }
      else res.status(400).json({ result: "Invalid user credentials" });
  } catch (err) {
      console.log(err);
      res.status(500).json({ result: err.message })
  }
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser
};
