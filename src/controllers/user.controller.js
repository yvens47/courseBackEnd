const User = require("../models/user.model");
const Course = require("../models/course.model");
var ObjectId = require("mongoose").Types.ObjectId;

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
//const { sendMail } = require("../utils/email");

signup = async (req, res) => {
  try {
    //await User.syncIndexes();
    // create a new user and save to db
    const doc = await User.create(req.body);
    res.status(201).json({
      doc,
      success: true
    });
  } catch (e) {
    // unable to create and save user
    res.json({ error: e.message }).end();
  }
};

login = async (req, res) => {
  const { email, password } = req.body;
  // check if user is in db
  try {
    User.findOne(
      {
        email: email
      },
      function (err, u) {
        if (err || !u) {
          return res.status(401).json({
            error: "email does not exist. Please signup."
          });
        }

        // check if user password matches one found from database
        u.checkPassword(password).then(function (result) {
          if (result) {
            const {
              _id,
              email,
              name,
              bio,
              user_image,
              registered_course,
              courseLists
            } = u;

            // set token
            const token = jwt.sign(
              {
                id: _id
              },
              "secret",
              {
                expiresIn: 60 * 60
              }
            );

            // set cookie
            res.cookie("t", token, {
              expires: new Date(Date.now() + 900000),
              httpOnly: true
            });

            return res.json({
              token,
              user: {
                id: _id,
                email: email,
                name: name,
                bio: bio,
                user_image: user_image,
                registered_course,
                courseLists
              }
            });
          } else {
            return res.json({
              error: " Invalid email or password"
            });
          }
        });
      }
    );

    // res.json(req.body);
  } catch (error) {
    res.json({
      error
    });
  }
};

logout = async (req, res) => {
  // destroy cookie
  res.clearCookie("t");
  res.json({
    message: "signed out"
  });
};

update = async (req, res) => {
  const account = req.body;

  User.findOneAndUpdate({ _id: req.params.id }, account, (error, doc) => {
    if (error) {
      return res.json(error);
    }
    res.json({ doc, success: true });
  });
};

forgotPassword = (req, res) => {
  const { email } = req.body;
  var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.mailtrapUsername,
      pass: process.env.mailtrapPassword
    }
  });

  // check email against DB
  try {
    const newPassword = Math.random().toString(36).substring(2, 10);
    // find one and update
    User.findOne(
      { email: email },

      (error, doc) => {
        if (error || !doc) {
          res.json({
            erromsg: "Email does not exist. Please register.",
            registered: false
          });
        }

        // update password and save new password
        doc.password = newPassword;
        doc.save();
        // email password to user
        var mailOptions = {
          from: '"Fred Foo 👥"info@A&P.com', // sender address
          to: email, // list of receivers
          subject: "Updated Password", // Subject line
          text: "Hello world 🐴", // plaintext body
          html: `<p>Your password is <b>${newPassword}</b></p>` // html body
        };
        // send email here
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
            return res.json({
              error: true,
              errormsg: "Could not send password"
            });
          }

          res.json({
            registered: true,
            message:
              "You password was changed succesfully. please check your email for more instructions."
          });
        });
      }
    );
  } catch (e) {
    res.json({ error: e });
  }
};

// get user course by id
courses = async (req, res) => {
  console.log(req.params.id);
  const { id } = req.params;
  try {
    const c = Course.find({ user_id: new ObjectId(id) }, (error, docs) => {
      res.json(docs);
    });
  } catch (error) {
    res.json(error);
  }
};
subscribeToCourse = (req, res, next) => {
  // { $push: { <field1>: <value1>, ... } }
  const { id, courseid } = req.params;
  const { course } = req.body;

  if (course.user_id === id) {
    //return next(new Error("You cannot register to your own course"));
    return res.json({ error: "You cannot register to your own course" });
  }

  // find the user record and update

  // insert course subscribe to the registered_course [course1, course2 ....]
  User.findByIdAndUpdate(
    { _id: id },
    { $addToSet: { registered_course: course } },
    { new: true },
    function (err, result) {
      console.log(result);
      if (err) {
        res.json({ data: err.message });
      }
      res.json({ data: result });
    }
  );
};

removeUserCourseSubscribedCourse = (req, res) => {
  const { userid, courseid } = req.body;

  try {
    User.findByIdAndUpdate(
      { _id: userid },
      { $pull: { registered_course: { _id: courseid } } },
      { new: true },
      function (err, result) {
        if (err) {
          res.json(err);
        }
        res.json(result);
      }
    );
  } catch (error) {
    res.json(error);
  }
};

module.exports = userController = {
  logout,
  login,
  signup,
  courses,
  update,
  forgotPassword,
  subscribeToCourse,
  removeUserCourseSubscribedCourse
};
