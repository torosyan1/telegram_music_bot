"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadAndConvert = void 0;
require("../../env");
var fs_1 = __importStar(require("fs"));
var aws_1 = require("../aws");
var youtube_dl_1 = __importDefault(require("youtube-dl"));
var fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
var index_1 = require("../index");
var downloadAndConvert = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var file_1, newName_1, video, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, youtube_dl_1.default(query.update.callback_query.data, ["--format=18"], {
                        cwd: __dirname,
                    })];
            case 1:
                video = _a.sent();
                return [4 /*yield*/, video.pipe(fs_1.default.createWriteStream("myvideo.mp4"))];
            case 2:
                _a.sent();
                return [4 /*yield*/, video.on("info", function (info) {
                        console.log("Download started");
                        console.log("filename: " + info._filename);
                        console.log("size: " + info.size);
                        var name = info._filename;
                        name.replace(".mp4", ".mp3");
                        var arr = name.split(".");
                        arr[arr.length - 1] = "mp3";
                        newName_1 = arr.join(".");
                    })];
            case 3:
                _a.sent();
                video.on("end", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log("finished downloading!");
                                return [4 /*yield*/, fluent_ffmpeg_1.default("/home/vahag/Desktop/telegraf/myvideo.mp4")
                                        .withAudioCodec("libmp3lame")
                                        .toFormat("mp3")
                                        .saveToFile("/home/vahag/Desktop/telegraf/musics/" + newName_1)
                                        .on("end", function () { return __awaiter(void 0, void 0, void 0, function () {
                                        var params;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    file_1 = fs_1.readFileSync("/home/vahag/Desktop/telegraf/musics/" + newName_1);
                                                    params = {
                                                        Bucket: process.env.BucketName,
                                                        Key: newName_1,
                                                        Body: file_1,
                                                        ACL: "public-read",
                                                    };
                                                    return [4 /*yield*/, aws_1.S3.upload(params)
                                                            .promise()
                                                            .then(function (res) {
                                                            console.log(res.Location);
                                                            index_1.bot.telegram.sendAudio(query.from.id, res.Location);
                                                        })];
                                                case 1:
                                                    _a.sent();
                                                    fs_1.default.unlink("/home/vahag/Desktop/telegraf/musics/" + newName_1, function (err) {
                                                        if (err) {
                                                            console.error(err);
                                                            return;
                                                        }
                                                    });
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.downloadAndConvert = downloadAndConvert;
//# sourceMappingURL=dowloadeAndConvert.js.map