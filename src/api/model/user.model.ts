import mongoose = require("mongoose");
import db = require("../lib/mongoLib");
import logger = require("../lib/loggerLib");

let schema: mongoose.Schema = mongoose.Schema;

let userSchema: mongoose.Schema = new mongoose.Schema({
  created: {
    default: Date.now,
    type: Date
  },
  hashedPassword: {
    required: true,
    type: String
  },
  role: {
    required: true,
    trim: true,
    type: String
  },
  userName: {
    required: true,
    trim: true,
    type: String,
    unqiue: true
  }
});

export class User{


getModel(callback: any):void {
  db.createModel("Users", userSchema, callback);
}

createUser (userModel, userObject, callback) {
  db.createDocument(userModel, userObject, function(result) {
    if (result instanceof Error) {
      handleError(err, "Failed to create user", callback);
    } else {
      callback(result);
    }
  });
}

var handleError = function(err, message, callback) {
  var error = new Error(message);
  logger.log(error + ": " + err);
  callback(error);
};

}
