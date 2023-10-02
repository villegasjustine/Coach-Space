const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.pointsController.getAssignedPoints(res);
});

router.get("/:id", (req, res) => {
  Controllers.pointsController.getAssignedPointsbyID(req, res);
});

// router.get("/user/:UserId", (req, res) => {
//   Controllers.pointsController.getAssignedPointsByUserID (req, res);
// });

router.get("/user/:UserId", (req, res) => {
  Controllers.pointsController.getPointsByUserID (req, res);
});

router.get("/user/weekly/:UserId", (req, res) => {
  Controllers.pointsController.getWeeklyPointsByUserID (req, res);
});

// router.post("/create", (req, res) => {
//   Controllers.pointsController.createAssignedExercise(req.body, res);
// });

router.post("/create", (req, res) => {
    Controllers.pointsController.createAssignedPointsMany(req.body, res);
  });
  
router.put("/:id", (req, res) => {
  Controllers.pointsController.updateAssignedPoints(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.pointsController.deleteAssignedPoints(req, res);
});



module.exports = router;
