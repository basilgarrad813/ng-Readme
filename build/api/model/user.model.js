"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var mongoLib = require("../lib/mongo.lib");
var logger = require("../lib/logger.lib");
var User = /** @class */ (function () {
    function User(_hashedPassword, _role, _userName) {
        this.userSchema = new mongoose.Schema({
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
    }
    User.prototype.getModel = function (callback) {
        mongoLib.createModel("Users", this.userSchema, callback);
    };
    User.prototype.createUser = function (userModel, userObject, callback) {
        mongoLib.createDocument(userModel, userObject, function (result) {
            if (result instanceof Error) {
                this.handleError("Failed to create user", callback); // used this because it didn't find the function without it for some reason
            }
            else {
                callback(result);
            }
        });
    };
    User.prototype.handleError = function (message, callback) {
        var error = new Error(message);
        logger.log.error(message);
        callback(error);
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.model.js.map