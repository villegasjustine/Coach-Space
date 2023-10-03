"use strict";
const { Op } = require("sequelize");
const Models = require("../models");

const getAssignedPoints = (res) => {
  Models.Points.findAll({})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.status(500).json({ data: err.message });
    });
};

const getAssignedPointsbyID = (req, res) => {
  Models.Points.findOne({ where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.status(500).json({ data: err.message });
    });
};

const getPointsByUserID = (req, res) => {
  console.log(req.params.UserId);
  const today = new Date();
  Models.Points.findAll({
    where: { UserId: req.params.UserId, endDate: { [Op.gt]: today } },
  })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.status(500).json({ data: err.message });
    });
};

const getWeeklyPointsByUserID = (req, res) => {
  console.log(req.params.UserId);
  const today = new Date();
  const week = new Date();
  week.setDate(week.getDate() + 7);
  Models.Points.findAll({
    where: { UserId: req.params.UserId, startDate: {[Op.lte]: today}, endDate: { [Op.lte]: week },endDate: { [Op.gte]: today } },
  })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.status(500).json({ data: err.message });
    });
};

const updateWeeklyPointsByUserID = (req, res) => {
  console.log(req.params.UserId);
  const today = new Date();
  const week = new Date();
  week.setDate(week.getDate() + 7);
  Models.Points.update({
    where: { UserId: req.params.UserId, startDate: {[Op.lte]: today}, endDate: { [Op.lte]: week },endDate: { [Op.gte]: today } },
  })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.status(500).json({ data: err.message });
    });
};


const createAssignedPointsMany = (data, res) => {
  console.log(data);
  Models.Points.bulkCreate(data)
    .then(function (createdPoints) {
      console.log('Created Points', createdPoints)
      res.send({ result: 200, data: createdPoints });
    })
    .catch((err) => {
      res.status(500).json({ data: err.message });
    });
};

const updateAssignedPoints = (req, res) => {
  const pointsId = req.params.id;
  console.log(pointsId);
  Models.Points.update(req.body, { where: { id: pointsId  } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ data: err.message });
    });
};

const deleteAssignedPoints = (req, res) => {
  const tableIDs = req.params.id.split(",");
  console.log(tableIDs);
  Models.Points.destroy({ where: { id: { [Op.in]: tableIDs } } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ data: err.message });
    });
};

module.exports = {
  getAssignedPoints,
  getPointsByUserID,
  getWeeklyPointsByUserID,
  updateAssignedPoints,
  updateWeeklyPointsByUserID,
  deleteAssignedPoints,
  getAssignedPointsbyID,
  createAssignedPointsMany,
};
