import mongoose = require("mongoose");
import logger = require("./logger.lib");
import config = require("./config.lib");
import Schema = mongoose.Schema;
import Model = mongoose.Model;

export function connectToDB(): void {
    // if (process.env.NODE_ENV === "dev") {


    mongoose.connect("mongodb://localhost:27017/ccdev");
    // }

    // if (process.env.NODE_ENV === "production") {
    //   mongoose.connect("mongodb//localhost:27017/ccprod");
    // }
  }

export function createModel(name: string, schema: Schema, callback: any): void {
    logger.log("Creating model");
    try {
      let modeledModel: any = mongoose.model(name, schema);
      logger.log("In model process");
      callback(modeledModel);
    } catch (err) {
      handleError(err, "Unable to create model ", callback);
    }
  }

export function createDocument(model: Model, data: string, callback: any): void {
    model.create(JSON.parse(data), function(err: any, result: Document): void {
      if (!err) {
        callback(result);
      } else {
        handleError(err, "Unable to create document", callback);
      }
    });
  }

export function findDocument(model: Model, query: string, callback: any): void {
    logger.log("Query executing: " + query);
    model.findOne(query, function(err: any, document: Document): void {
      if (!err) {
        logger.log("Query succeeded");
        callback(document);
      } else {
        handleError(err, "Query failed", callback);
      }
    });
  }

function handleError(err: any, message: string, callback: any): void {
    let error: Error = new Error(message);
    logger.log(this.message + ": " + err);
    callback(error);
  }

