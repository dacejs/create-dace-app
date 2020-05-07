"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const execa_1 = __importDefault(require("execa"));
let cmd;
exports.default = () => {
    if (cmd) {
        return cmd;
    }
    try {
        execa_1.default.commandSync('yarn --version');
        // execa.sync('yarn', '--version');
        cmd = 'yarn';
    }
    catch (e) {
        cmd = 'npm';
    }
    return cmd;
};
