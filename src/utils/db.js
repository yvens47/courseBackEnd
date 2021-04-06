const mongoose = require("mongoose");
// connection to DB
//mongoose.connection.dropDatabase();

// Rebuild all indexes
const connect = (url, opts = {}) => {
  return mongoose.connect(url, {
    ...opts,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
};

module.exports = connect;
