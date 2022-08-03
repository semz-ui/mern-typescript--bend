const express = require("express");
const { getTasks, postTask } = require("../controller/taskController");

const router = express.Router();

const { protect } = require("../middleware/authMiddleWare");

router.get("/", protect, getTasks);
router.post("/", protect, postTask);

module.exports = router;
