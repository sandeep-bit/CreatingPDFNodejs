const express = require("express");
const router = express.Router();
const {
  getUser,
  getPdf,
  register,
  getUsers,
  sendmail,
} = require("../controllers/userController");

router.get("/:id", getUser);
router.get("/pdf/:id", getPdf);
router.post("/register", register);
router.get("/", getUsers);
router.put("/sendmail/:id", sendmail);

module.exports = router;
