//  this file has the configration key to production or devloping

const config = {
  production: {
    SECRET: process.env.SECRET, // save these in heroko
    DATABASE: process.env.MONGODB_URI
  },
  default: {
    SECRET: "metal158", // 
    DATABASE: "mongodb://localhost:27017/booksShelf" // my local mongo database 
  }
};

exports.get = function get(env){
    return config[env] || config.default
}