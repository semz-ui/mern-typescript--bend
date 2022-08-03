const asyncHandler = require("express-async-handler");
const Task = require("../model/taskModel");

//get tasks

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
});

// post task

const postTask = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(404);
    throw new Error("No text provided");
  }
  const task = await Task.create({
    text,
  });
  res.status(200).json(task);
});

module.exports = {
  getTasks,
  postTask,
};
