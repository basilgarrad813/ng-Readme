import winston = require("winston");
import fs = require("fs");

const logDir: string = "../logs";
const tsFormat: string = new Date().toLocaleTimeString();

export function log(logData: string): void {
  // create the log directory if it does not exist
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  // create logger
  let log: winston.Logger = new winston.Logger({
    transports: [
      new winston.transports.File({
        filename: `${logDir}/server.log`,
        level: process.env.NODE_ENV === "dev" ? "debug" : "info",
        timestamp: tsFormat
      })
    ]
  });
}
