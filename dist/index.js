"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var telegraf_1 = __importDefault(require("telegraf"));
var session_1 = __importDefault(require("telegraf/session"));
var stage_1 = __importDefault(require("telegraf/stage"));
var wizard_1 = __importDefault(require("./wizard"));
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var port = 3000;
var bot = new telegraf_1.default('1615185483:AAEywApRYauDP5oxZymhm6XQjHDYeuiGFBU');
var stage = new stage_1.default([wizard_1.default]);
bot.command('id', function (ctx) { ctx.scene.enter('super-wizard'); });
bot.use(session_1.default());
bot.use(stage.middleware());
bot.launch();
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
//# sourceMappingURL=index.js.map