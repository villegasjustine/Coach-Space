const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.userController.getUsers(res);
});

router.get("/:id", (req, res) => {
  Controllers.userController.getUsersbyID(req, res);
});

router.get("/groups/:group", (req, res) => {
  Controllers.userController.getUsersbyGroup(req, res);
});

router.post("/create", (req, res) => {
  Controllers.userController.createUser(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.userController.updateUser(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.userController.deleteUser(req, res);
});

router.post("/login", (req, res) => {
  Controllers.userController.loginUser(req, res);
});

router.post('/register', (req, res) => {
  Controllers.userController.registerUser(req, res)
})

module.exports = router;
