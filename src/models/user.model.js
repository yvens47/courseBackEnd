const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define UserSchema
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [3, "name is too short"],
      required: "Please enter name"
    },
    email: {
      type: String,
      required: "Please enter your email",
      unique: true,
      trim: true
    },

    password: {
      type: String,
      required: "Please enter password",
      trim: true,
      maxLength: 25,
      minlength: 8
    },
    user_image: String,
    registered_course: [], //list of course user want to learn from

    courseLists: Array, //list of course taught
    // user_type[1:teacher, 0:student]
    bio: String,
    logged: Number // 1= students, 0 =teacher
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

UserSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }

      resolve(same);
    });
  });
};
module.exports = mongoose.model("User", UserSchema);
