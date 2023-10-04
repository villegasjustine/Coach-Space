"use strict";
const Models = require("../models");
const { Op } = require("sequelize");

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

const getExercisesByID = (req, res) => {
  Models.Exercise.findOne({where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      
      res.status(500).json({ data: err.message });
    });
};

const getExercisesbyCategory = (req, res) => {
  Models.Exercise.findAll({where: { category: req.params.category } })
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
  const exerciseIds = req.params.id.split(',');
  
 
  Models.AssignedExercise.destroy({
    where: {
      ExerciseId: { [Op.in]: exerciseIds },
    },
  })
    .then(function () {
      
      Models.Exercise.destroy({
        where: { id: { [Op.in]: exerciseIds } }, 
      })
        .then(function () {
          res.status(200).json({ message: 'Exercise and associated records deleted successfully' });
        })
        .catch((err) => {
          console.error('Error deleting exercise:', err);
          res.status(500).json({ message: 'Error deleting exercise' });
        });
    })
    .catch((err) => {
      console.error('Error deleting associated records:', err);
      res.status(500).json({ message: 'Error deleting associated records' });
    });
};

module.exports = {
  getExercises,
  getExercisesByID,
  getExercisesbyCategory,
  createExercise,
  updateExercise,
  deleteExercise,
};
