"use strict";
const Models = require("../models");

const getExercises = (res) => {
  Models.Exercise.findAll({})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.send({ result: 500, data: err.message });
      res.status(500).json({ data: err.message });
    });
};

const createExercise = (data, res) => {
  Models.Exercise.create(data)
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.send({ result: 500, data: err.message });
      res.status(500).json({ data: err.message });
    });
};

const updateExercise = (req, res) => {
  Models.Exercise.update(req.body, { where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.send({ result: 500, data: err.message });
      res.status(500).json({ data: err.message });
    });
};

const deleteExercise = (req, res) => {
  Models.Exercise.destroy({ where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.send({ result: 500, data: err.message });
      res.status(500).json({ data: err.message });
    });
};

module.exports = {
  getExercises,
  createExercise,
  updateExercise,
  deleteExercise,
};