// const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define UserSchema
const CourseSchema = new mongoose.Schema(
  {
    name: String,

    author: String,
    cover: String,
    about: { type: String, maxLength: 90 },
    type: String,
    status: { type: String, default: "Draft" },
    category: String
  },
  { timestamps: true }
);

// model
module.exports = mongoose.model("Course", CourseSchema);
