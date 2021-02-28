"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
require("../env");
var express_1 = __importDefault(require("express"));
var telegraf_1 = __importDefault(require("telegraf"));
var session_1 = __importDefault(require("telegraf/session"));
var search_1 = require("./functions/search");
var dowloadeAndConvert_1 = require("./functions/dowloadeAndConvert");
var app = express_1.default();
exports.bot = new telegraf_1.default(process.env.BOT_TOKEN);
exports.bot.command('start', function (ctx) { return ctx.telegram.sendMessage(ctx.from.id, 'welcome to music channel 🥳'); });
exports.bot.on("message", search_1.search);
exports.bot.on("callback_query", dowloadeAndConvert_1.downloadAndConvert);
exports.bot.use(session_1.default());
exports.bot.launch();
app.listen(process.env.PORT, function () { console.log("Example app listening at http://localhost:" + process.env.PORT); });
//# sourceMappingURL=index.js.map