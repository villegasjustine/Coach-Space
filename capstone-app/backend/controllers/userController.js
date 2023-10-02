"use strict";
const { Op } = require('sequelize');

const Models = require("../models");
const bcrypt = require('bcryptjs');
const { createToken } = require('../middleware/auth');

const getUsers = (res) => {
  Models.User.findAll({})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      // res.send({ result: 500, data: err.message });
      res.status(500).json({ data: err.message });
    });
};

const getUsersbyID = (req, res) => {
  Models.User.findOne({where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      // res.send({ result: 500, data: err.message });
      res.status(500).json({ data: err.message });
    });
};

const getUsersbyGroup = (req, res) => {
  Models.User.findAll({where: { group: req.params.group } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      // res.send({ result: 500, data: err.message });
      res.status(500).json({ data: err.message });
    });
};


const createUser = (data, res) => {
  console.log(data)
  Models.User.create(data)
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err)
      // res.send({ result: 500, data: err.message });
      res.status(500).json({ data: err.message });
    });
};

const createUserMany = (data, res) => {
  //find how to create many
  Models.User.create(data)
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      // res.send({ result: 500, data: err.message });
      res.status(500).json({ data: err.message });
    });
};


const updateUser = (req, res) => {
  Models.User.update(req.body, { where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      // res.send({ result: 500, data: err.message });
      res.status(500).json({ data: err.message });
    });
};

const deleteUser = (req, res) => {
  //find how to delete many
  const tableIDs = req.params.id.split(',')
console.log(tableIDs)
  Models.User.destroy({ where: { id: {[Op.in]: tableIDs }}})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      // res.send({ result: 500, data: err.message });
      console.log(err)
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
      console.log(user)

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

const registerUser = async (req, res) => {

  try {
      // Get user input by destructuring request body
      const { firstName, lastName, username, email, password, group } = req.body;

      // Validate user input
      if (!(email && password && firstName && lastName)) {
          res.status(400).json({ result: "All input is required"});
          return; // when sending responses and finishing early, manually return or end the function to stop further processing
      }

      // Validate if user exists in our database
      const oldUser = await Models.User.findOne({ where: { email }});

      if (oldUser) {
          res.status(409).json({ result: "User already exists. Please login" });
          return; // when sending responses and finishing early, manually return or end the function to stop further processing
      }

      // Encrypt user password
      let encryptedPassword = await bcrypt.hash(password, 10);

      // Create user in our database
      const userMetadata = await Models.User.create({
          firstName,
          lastName,
          username,
          group,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
      });
      const user = userMetadata.get({plain: true}) // get just the user fields, no extra sequelize metadata

      // Create token
      const token = createToken(user.id, email);

      // save user token to send back to front-end
      user.token = token;

      // return new user
      res.status(201).json({ result: "User successfully registered", data: user });
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
  loginUser,
  registerUser,
  getUsersbyID,
  getUsersbyGroup,
  createUserMany,
};
