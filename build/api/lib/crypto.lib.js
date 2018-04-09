"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var path = require("path");
var fs = require("fs");
var CryptoLib = /** @class */ (function () {
    function CryptoLib() {
    }
    CryptoLib.prototype.encryptStringWithRsaPublicKey = function (toEncrypt, pathToPublicKey) {
        var absolutePath = path.resolve(pathToPublicKey);
        var publicKey = fs.readFileSync(absolutePath, "utf8");
        var buffer = new Buffer(toEncrypt);
        var encrypted = crypto.publicEncrypt(publicKey, buffer);
        return encrypted.toString("base64");
    };
    CryptoLib.prototype.decryptStringWithRsaPrivateKey = function (toDecrypt, pathToPrivateKey) {
        var absolutePath = path.resolve(pathToPrivateKey);
        var privateKey = fs.readFileSync(absolutePath, "utf8");
        var buffer = new Buffer(toDecrypt, "base64");
        var decrypted = crypto.privateDecrypt(privateKey, buffer);
        return decrypted.toString("utf8");
    };
    return CryptoLib;
}());
exports.CryptoLib = CryptoLib;
//# sourceMappingURL=crypto.lib.js.map