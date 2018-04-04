import path = require("path");
import fs = require("fs");

let loadedConfigs: any = { "configs" : [] };

enum ReturnErrors {
    CONFIG_NOT_LOADED,
    NO_CONFIGS_LOADED
}

export function loadConfig(pathToConfig: string, callback: any): void {
  let absolutePath: string = path.resolve(pathToConfig);
  let configContents: string = fs.readFileSync(absolutePath, "utf8");
  loadedConfigs.configs.push(configContents);
  callback(JSON.parse(configContents));
}

export function getConfig(configName: string, callback: any): void {
  if (loadedConfigs.configs.length > 0) {
    loadedConfigs.configs.forEach(element => {
      if (element.name === configName) {
        callback(element);
      } else {
        callback(ReturnErrors.CONFIG_NOT_LOADED);
      }
    });
  } else {
      callback(ReturnErrors.NO_CONFIGS_LOADED);
  }
}
