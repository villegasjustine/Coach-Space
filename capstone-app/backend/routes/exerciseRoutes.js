const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.exerciseController.getExercises(res);
});

router.get("/:id", (req, res) => {
  Controllers.exerciseController.getExercisesByID(req,res);
});

router.get("/category/:category", (req, res) => {
  Controllers.exerciseController.getExercisesbyCategory(req, res);
});

router.post("/create", (req, res) => {
  Controllers.exerciseController.createExercise(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.exerciseController.updateExercise(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.exerciseController.deleteExercise(req, res);
});

module.exports = router;
