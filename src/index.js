const express = require("express");

const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
var bodyParser = require("body-parser");
const connect = require("./utils/db");

dotenv.config();

const app = express();
const port = 8080;

// routes
const courseRoute = require("./routes/course.route");
const userRoute = require("./routes/user.route");
const commentRoute = require("./routes/comment.route");
const chapterRoute = require("./routes/chapter.route");

var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
// parse application/json
app.use(bodyParser.json());
//routes
app.use("/courses", courseRoute);
app.use("/users", userRoute);
app.use("/comments", commentRoute);
app.use("/chapters", chapterRoute);

app.get("/", (req, res) => {
  res.redirect("/courses");
});
// db connection here
var url = `mongodb+srv://${process.env.username}:${process.env.password}@cluster0.sjcbu.mongodb.net/A&P?retryWrites=true&w=majority`;

connect(url);
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
