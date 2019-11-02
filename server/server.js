const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/config").get(process.env.NODE_ENV); //if we are at heroku will be prod
const app = express();

mongoose.connect(config.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.json()); // we are using json data
app.use(cookieParser()); // for using cookies

// ! start books routes
require("./routes/books")(app);
// ! End book routes

// ! statrt user routes
require("./routes/user")(app);
// ! End user routes

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`start server at ${port}`);
});
