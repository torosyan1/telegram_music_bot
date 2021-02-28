"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var wizard_1 = __importDefault(require("telegraf/scenes/wizard"));
exports.default = new wizard_1.default('super-wizard', function (ctx) {
    ctx.reply("What's your name?");
    ctx.wizard.state.data = {};
    return ctx.wizard.next();
}, function (ctx) {
    ctx.wizard.state.data.name = ctx.message.text;
    ctx.reply('Enter your phone number');
    return ctx.wizard.next();
}, function (ctx) {
    ctx.wizard.state.data.phone = ctx.message.text;
    ctx.reply("Your name is " + ctx.wizard.state.data.name);
    ctx.reply("Your phone is " + ctx.wizard.state.data.phone);
    return ctx.scene.leave();
});
//# sourceMappingURL=wizard.js.map