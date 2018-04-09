import fs = require("fs");

import * as winston from "winston";

const logDir: string = process.cwd() + "/logs";
const tsFormat: string = new Date().toLocaleTimeString();

export const log: winston.Logger = new winston.Logger({
  level: "info",
  format: tsFormat,
  transports: [
    new winston.transports.File({name: "allLog", filename: `${logDir}/api.log`}),
    new winston.transports.File({ name: "errorLog", filename: `${logDir}/api.error.log`, level: "error"})
  ]
});

export function init(): void {

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  // if (process.env.NODE_ENV !== "prod") {
  //   logger.add(new winston.transports.Console({
  //     format: tsFormat
  //   }));
  // }
}