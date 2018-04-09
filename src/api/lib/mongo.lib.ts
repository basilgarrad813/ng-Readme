import mongoose = require("mongoose");
import logger = require("./logger.lib");
import configLib = require("./config.lib");
import {Schema, Model} from "mongoose";
import {level} from "winston";

export function connectToDB(): void {
    mongoose.connect("mongodb://localhost:27017/ccdev");
  }

export function createModel(name: string, schema: Schema, callback: any): void {
    logger.log.debug("Creating model");
    try {
      let modeledModel: any = mongoose.model(name, schema);
      logger.log.debug("In model process");
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
    logger.log.debug("Query executing: " + query);
    model.findOne(query, function(err: any, document: Document): void {
      if (!err) {
        logger.log.debug("Query succeeded");
        callback(document);
      } else {
        handleError(err, "Query failed", callback);
      }
    });
  }

function handleError(err: any, message: string, callback: any): void {
    let error: Error = new Error(message);
    logger.log.error(this.message + ": " + err);
    callback(error);
  }

