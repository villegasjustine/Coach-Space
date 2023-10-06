"use strict";
const { Op } = require("sequelize");
const Models = require("../models");
const { sequelize } = require("../models/user");

const getAssignedExercises = (res) => {
  // Models.AssignedExercise.findAll({})

  sequelize.query(
    `SELECT CAE.id, name, category, description, CAE.startDate, CAE.endDate, CAE.UserId, ExerciseId,  CU.firstName, CU.lastName, CU.username, CU.group, CAE.totalPoints `+
    `FROM assigned_exercises AS CAE `+
    `JOIN exercises AS CE ON CAE.ExerciseId = CE.id `+
    `JOIN users AS CU ON CAE.UserId= CU.id `
  )
    .then(function (data) {
      res.send({ result: 200, data: data[0] });
    })
    .catch((err) => {
      res.status(500).json({ data: err.message });
    });
};

const getAssignedExercisesByUserID = (req, res) => {
  console.log(req.params.UserId);
  const today = new Date();
  Models.AssignedExercise.findAll({
    where: { UserId: req.params.UserId, endDate: { [Op.gt]: today } },
   
  })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.status(500).json({ data: err.message });
    });
};

const getAssignedWeeklyExercisesByUserID = (req, res) => {
  console.log(req.params.UserId);
  const today = new Date();
  const week = new Date();
  week.setDate(week.getDate() + 7);
  // Models.AssignedExercise.findAll({
  //   where: { UserId: req.params.UserId, startDate: {[Op.lte]: today}, endDate: { [Op.lte]: week },endDate: { [Op.gte]: today } },
  // })

  sequelize.query(
    "SELECT CAE.id, name, category, description, CAE.startDate, CAE.endDate, CAE.UserId, ExerciseId, CU.firstName, CU.username, CU.group, CAE.totalpoints" +  
    " FROM assigned_exercises AS CAE " +
   "JOIN exercises AS CE ON CAE.ExerciseId = CE.id "+
    "JOIN users AS CU ON CAE.UserId= CU.id "+
    
    "WHERE CAE.UserId =  "+ req.params.UserId +
    " AND CAE.startDate <= NOW() AND CAE.endDate <= DATE_ADD(NOW(), INTERVAL 7 DAY) AND CAE.endDate >= NOW() "
  )
    .then(function (data) {
      res.send({ result: 200, data: data[0] });
    })
    .catch((err) => {
      res.status(500).json({ data: err.message });
    });
};

const getAssignedExercisesbyID = (req, res) => {
  Models.AssignedExercise.findOne({ where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.status(500).json({ data: err.message });
    });
};

const createAssignedExerciseMany = (data, res) => {
  console.log(data);
  Models.AssignedExercise.bulkCreate(data)
    .then(function (createdExercises) {
      res.send({ result: 200, data: createdExercises });
    })
    .catch((err) => {
      res.status(500).json({ data: err.message });
    });
};

const updateAssignedExercise = (req, res) => {
  const tableIDs = req.params.id.split(",");
  console.log(tableIDs);
  Models.AssignedExercise.update({ where: { id: { [Op.in]: tableIDs } } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ data: err.message });
    });
};

const updatePoints = (req, res) => {
  Models.AssignedExercise.update(req.body, { where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.send({ result: 500, data: err.message });
      res.status(500).json({ data: err.message });
    });
};

const deleteAssignedExercise = (req, res) => {
  const tableIDs = req.params.id.split(",");
  console.log(tableIDs);
  Models.AssignedExercise.destroy({ where: { id: { [Op.in]: tableIDs } } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ data: err.message });
    });
};

module.exports = {
  getAssignedExercises,
  getAssignedExercisesByUserID,
  getAssignedWeeklyExercisesByUserID,
  // createAssignedExercise,
  updateAssignedExercise,
  updatePoints,
  deleteAssignedExercise,
  getAssignedExercisesbyID,
  createAssignedExerciseMany,
};
