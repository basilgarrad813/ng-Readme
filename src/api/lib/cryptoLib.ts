import crypto = require("crypto");
import path = require("path");
import fs = require("fs");

export class CryptoLib {

    encryptStringWithRsaPublicKey(toEncrypt: string, pathToPublicKey: string): string {
        let absolutePath: string = path.resolve(pathToPublicKey);
        let publicKey: any = fs.readFileSync(absolutePath, "utf8");
        let buffer: Buffer = new Buffer(toEncrypt);
        let encrypted: Buffer = crypto.publicEncrypt(publicKey, buffer);
        return encrypted.toString("base64");
    }

    decryptStringWithRsaPrivateKey(toDecrypt: string, pathToPrivateKey: string): string {
        let absolutePath: string = path.resolve(pathToPrivateKey);
        let privateKey: string = fs.readFileSync(absolutePath, "utf8");
        let buffer: Buffer = new Buffer(toDecrypt, "base64");
        let decrypted: Buffer = crypto.privateDecrypt(privateKey, buffer);
        return decrypted.toString("utf8");
    }

}




