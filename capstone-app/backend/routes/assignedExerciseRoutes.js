const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.assignedExerciseController.getAssignedExercises(res);
});

router.get("/:id", (req, res) => {
  Controllers.assignedExerciseController.getAssignedExercisesbyID(req, res);
});

// router.get("/user/:UserId", (req, res) => {
//   Controllers.assignedExerciseController.getAssignedExercisesByUserID (req, res);
// });

router.get("/user/:UserId", (req, res) => {
  Controllers.assignedExerciseController.getAssignedExercisesByUserID (req, res);
});

router.get("/user/weekly/:UserId", (req, res) => {
  Controllers.assignedExerciseController.getAssignedWeeklyExercisesByUserID (req, res);
});

// router.post("/create", (req, res) => {
//   Controllers.assignedExerciseController.createAssignedExercise(req.body, res);
// });

router.post("/create", (req, res) => {
    Controllers.assignedExerciseController.createAssignedExerciseMany(req.body, res);
  });
  
router.put("/:id", (req, res) => {
  Controllers.assignedExerciseController.updatePoints(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.assignedExerciseController.deleteAssignedExercise(req, res);
});



module.exports = router;
