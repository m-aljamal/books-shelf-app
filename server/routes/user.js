const { User } = require("../models/user"); // user schema
const { Book } = require("../models/book");
const { auth } = require("../middleware/auth");
module.exports = app => {
  //? first define new user to work with

  // POST

  app.post("/api/register", (req, res) => {
    const user = new User(req.body);
    user.save((err, doc) => {
      if (err) return res.json({ success: false });
      res.status(200).json({
        success: true,
        user: doc
      });
    });
  });

  app.post("/api/login", (req, res) => {
    // catch user email
    // check if email exests
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user)
        return res.json({
          isAuth: false,
          message: "Auth faild, email not found"
        });
      // get user and need to compare password use method from user
      user.comparePassword(req.body.password, (err, isMatch) => {
        // if not match show json message
        if (!isMatch)
          return res.json({ isAuth: false, message: "Wrong Password" });

        // create user token
        user.genreateToken((err, user) => {
          if (err) return res.status(400).send(err);
          // send res to browser and store token as cookie
          res
            .cookie("auth", user.token) // name any thing and value is user token
            .json({
              // catch any information you need from user
              isAuth: true,
              id: user._id,
              email: user.email
            });
        });
      });
    });
  });

  //  GET
  // route to display the user name info on the app
  app.get("/api/getReviewer", (req, res) => {
    let id = req.query.id;
    User.findById(id, (err, doc) => {
      if (err) return res.status(400).send(err);
      res.json({
        name: doc.name,
        lastname: doc.lastname
      });
    });
  });

  // get all users in database

  app.get("/api/users", (req, res) => {
    User.find({}, (err, users) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(users);
    });
  });

  // get users posts by the id of owner
  app.get("/api/user_posts", (req, res) => {
    Book.find({ ownerId: req.query.user }).exec((err, docs) => {
      if (err) return res.status(400).send(err);
      res.send(docs);
    });
  });

  // logout
  // first we need to create middleware to check if user is loged in called auth

  app.get("/api/logout", auth, (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
      if (err) return res.status(400).send(err);
      res.sendStatus(200);
    });
  });
  // check if user is auth to go to other routes
  app.get("/api/auth", auth, (req, res) => {
    res.json({
      isAuth: true,
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname
    });
  });
};
