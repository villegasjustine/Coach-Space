const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.assignedExerciseController.getAssignedExercises(res);
});

router.get("/:id", (req, res) => {
  Controllers.assignedExerciseController.getAssignedExercisesbyID(req, res);
});

// router.post("/create", (req, res) => {
//   Controllers.assignedExerciseController.createAssignedExercise(req.body, res);
// });

router.post("/create", (req, res) => {
    Controllers.assignedExerciseController.createAssignedExerciseMany(req.body, res);
  });
  
router.put("/:id", (req, res) => {
  Controllers.assignedExerciseController.updateAssignedExercise(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.assignedExerciseController.deleteAssignedExercise(req, res);
});



module.exports = router;
