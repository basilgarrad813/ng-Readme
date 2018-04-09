"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var logger = require("./logger.lib");
function connectToDB() {
    mongoose.connect("mongodb://localhost:27017/ccdev");
}
exports.connectToDB = connectToDB;
function createModel(name, schema, callback) {
    logger.log.debug("Creating model");
    try {
        var modeledModel = mongoose.model(name, schema);
        logger.log.debug("In model process");
        callback(modeledModel);
    }
    catch (err) {
        handleError(err, "Unable to create model ", callback);
    }
}
exports.createModel = createModel;
function createDocument(model, data, callback) {
    model.create(JSON.parse(data), function (err, result) {
        if (!err) {
            callback(result);
        }
        else {
            handleError(err, "Unable to create document", callback);
        }
    });
}
exports.createDocument = createDocument;
function findDocument(model, query, callback) {
    logger.log.debug("Query executing: " + query);
    model.findOne(query, function (err, document) {
        if (!err) {
            logger.log.debug("Query succeeded");
            callback(document);
        }
        else {
            handleError(err, "Query failed", callback);
        }
    });
}
exports.findDocument = findDocument;
function handleError(err, message, callback) {
    var error = new Error(message);
    logger.log.error(this.message + ": " + err);
    callback(error);
}
//# sourceMappingURL=mongo.lib.js.map