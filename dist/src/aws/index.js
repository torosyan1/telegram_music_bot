"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3 = void 0;
require("../../env");
var aws_sdk_1 = __importDefault(require("aws-sdk"));
exports.S3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region,
});
//# sourceMappingURL=index.js.map