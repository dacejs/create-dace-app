"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ansi_escapes_1 = require("ansi-escapes");
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const ms_1 = __importDefault(require("ms"));
exports.info = (msg) => {
    console.log(`${chalk_1.default.gray('>')} ${msg}`);
};
exports.error = (msg) => {
    if (msg instanceof Error) {
        msg = msg.message;
    }
    console.error(`${chalk_1.default.red('> Error!')} ${msg}`);
};
exports.success = (msg) => {
    console.log(`${chalk_1.default.green('> Success!')} ${msg}`);
};
exports.time = () => {
    const start = Date.now();
    return chalk_1.default.gray(`[${ms_1.default(Date.now() - start)}]`);
};
exports.wait = (msg) => {
    const spinner = ora_1.default(chalk_1.default.green(msg));
    spinner.color = 'blue';
    spinner.start();
    return () => {
        spinner.stop();
        process.stdout.write(ansi_escapes_1.eraseLine);
    };
};
exports.prompt = (opts) => new Promise((resolve, reject) => {
    opts.forEach((val, i) => {
        const text = val[1];
        console.log(`${chalk_1.default.gray('>')} [${chalk_1.default.bold(i + 1)}] ${text}`);
    });
    const ondata = (v) => {
        const s = v.toString();
        function cleanup() {
            process.stdin.setRawMode(false);
            process.stdin.removeListener('data', ondata);
        }
        if (s === '\u0003') {
            cleanup();
            reject(new Error('Aborted'));
            return;
        }
        const n = Number(s);
        if (opts[n - 1]) {
            cleanup();
            resolve(opts[n - 1][0]);
        }
    };
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', ondata);
});
exports.cmd = (command) => chalk_1.default.bold(chalk_1.default.cyan(command));
exports.code = (command) => `${chalk_1.default.gray('`')}${chalk_1.default.bold(command)}${chalk_1.default.gray('`')}`;
exports.param = (p) => chalk_1.default.bold(`${chalk_1.default.gray('{')}${chalk_1.default.bold(p)}${chalk_1.default.gray('}')}`);
