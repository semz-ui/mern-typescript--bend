const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please add a user"],
    },
    text: {
      type: String,
      required: [true, "Please assign a text"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
