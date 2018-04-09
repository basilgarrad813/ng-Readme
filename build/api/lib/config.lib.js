"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var loadedConfigs = { "configs": [] };
var ReturnErrors;
(function (ReturnErrors) {
    ReturnErrors[ReturnErrors["CONFIG_NOT_LOADED"] = 0] = "CONFIG_NOT_LOADED";
    ReturnErrors[ReturnErrors["NO_CONFIGS_LOADED"] = 1] = "NO_CONFIGS_LOADED";
})(ReturnErrors || (ReturnErrors = {}));
function loadConfig(pathToConfig, callback) {
    var absolutePath = path.resolve(pathToConfig);
    var configContents = fs.readFileSync(absolutePath, "utf8");
    loadedConfigs.configs.push(configContents);
    callback(JSON.parse(configContents));
}
exports.loadConfig = loadConfig;
function getConfig(configName, callback) {
    if (loadedConfigs.configs.length > 0) {
        loadedConfigs.configs.forEach(function (element) {
            if (element.name === configName) {
                callback(element);
            }
            else {
                callback(ReturnErrors.CONFIG_NOT_LOADED);
            }
        });
    }
    else {
        callback(ReturnErrors.NO_CONFIGS_LOADED);
    }
}
exports.getConfig = getConfig;
//# sourceMappingURL=config.lib.js.map