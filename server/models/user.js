const mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken"),
  config = require("../config/config").get(process.env.NODE_ENV); //if we are at heroku will be prod,
SALT_I = 10;

// define schema
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    maxlength: 100
  },
  lastname: {
    type: String,
    maxlength: 100
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
});

// hash the password of user
userSchema.pre("save", function(next) {
  var user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(SALT_I, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// compart user password
// this method is used in user routes after geting the user input email
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  // un hash user password
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// store user token used in user routes
userSchema.methods.genreateToken = function(cb) {
  var user = this;
  // sign need user id and password from us which from config file
  var token = jwt.sign(user._id.toHexString(), config.SECRET);
  // store token in schema
  user.token = token;
  // save user
  user.save(function(err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function(token, cb) {
  const user = this;
  jwt.verify(token, config.SECRET, function(err, docode) {
    user.findOne({ _id: docode, token: token }, function(err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

userSchema.methods.deleteToken = function(token, cb) {
  var user = this;
  user.update({ $unset: { token: 1 } }, (err, user) => {
    if (err) return cb(err);
    cb(null, user);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
