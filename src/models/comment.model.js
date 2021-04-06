// const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// define UserSchema
const CommentSchema = new mongoose.Schema(
  {
    name: String, //  author name- signed user
    text: { type: String, maxLength: 90 },
    likes: Number,
    sectionid: { type: ObjectId }, // post, course, section comment id
    user_image: String, // signed use pic
    userid: { type: ObjectId, unique: true } // signed user id
  },
  { timestamps: true }
);

// model
module.exports = mongoose.model("Comment", CommentSchema);
