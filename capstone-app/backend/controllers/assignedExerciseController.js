"use strict";
const { Op } = require('sequelize');
const Models = require("../models");


const getAssignedExercises = (res) => {
  Models.AssignedExercise.findAll({})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.status(500).json({ data: err.message });
    });
};

const getAssignedExercisesbyID = (req, res) => {
  Models.AssignedExercise.findOne({where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      
      res.status(500).json({ data: err.message });
    });
};

const createAssignedExercise = (data, res) => {
  console.log(data)
  Models.AssignedExercise.create(data)
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ data: err.message });
    });
};

const createAssignedExerciseMany = (data, res) => {
    Models.AssignedExercise.bulkCreate(data)
      .then(function (createdExercises) {
        res.send({ result: 200, data: createdExercises });
      })
      .catch((err) => {
        res.status(500).json({ data: err.message });
      });
  };


const updateAssignedExercise = (req, res) => {
    const tableIDs = req.params.id.split(',')
    console.log(tableIDs)
      Models.AssignedExercise.update({ where: { id: {[Op.in]: tableIDs }}})
        .then(function (data) {
          res.send({ result: 200, data: data });
        })
        .catch((err) => {
          console.log(err)
          res.status(500).json({ data: err.message });
        });
};

const deleteAssignedExercise = (req, res) => {
  const tableIDs = req.params.id.split(',')
console.log(tableIDs)
  Models.AssignedExercise.destroy({ where: { id: {[Op.in]: tableIDs }}})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ data: err.message });
    });
};

module.exports = {
  getAssignedExercises,
  createAssignedExercise,
  updateAssignedExercise,
  deleteAssignedExercise,
  getAssignedExercisesbyID,
  createAssignedExerciseMany,
};
