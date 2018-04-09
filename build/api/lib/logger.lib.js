"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var winston = require("winston");
var logDir = process.cwd() + "/logs";
var tsFormat = new Date().toLocaleTimeString();
exports.log = new winston.Logger({
    level: "info",
    format: tsFormat,
    transports: [
        new winston.transports.File({ name: "allLog", filename: logDir + "/api.log" }),
        new winston.transports.File({ name: "errorLog", filename: logDir + "/api.error.log", level: "error" })
    ]
});
function init() {
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }
    // if (process.env.NODE_ENV !== "prod") {
    //   logger.add(new winston.transports.Console({
    //     format: tsFormat
    //   }));
    // }
}
exports.init = init;
//# sourceMappingURL=logger.lib.js.map