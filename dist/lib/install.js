"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const execa_1 = __importDefault(require("execa"));
const promise_1 = __importDefault(require("promise"));
const messages_1 = require("./messages");
const get_install_cmd_1 = __importDefault(require("./get-install-cmd"));
const output_1 = require("./output");
function getInstallArgs(cmd, packages) {
    let args;
    if (cmd === 'npm') {
        args = ['install', '--save', '--save-exact', '--registry=https://registry.npm.taobao.org'];
        return args.concat(packages, ['--verbose']);
    }
    args = ['add'];
    return args.concat(packages);
}
exports.default = (opts) => {
    const { projectName, projectPath, packages = [] } = opts;
    if (packages.length === 0) {
        console.log('Missing packages in `install`, try running again.');
        process.exit(1);
    }
    const installCmd = get_install_cmd_1.default();
    const installArgs = getInstallArgs(installCmd, packages);
    console.log(messages_1.installing(packages));
    process.chdir(projectPath);
    return new promise_1.default((resolve, reject) => {
        const stopInstallSpinner = output_1.wait('Installing modules');
        execa_1.default(installCmd, installArgs)
            // .then(() => execa(installCmd, ['install']))
            .then(() => {
            stopInstallSpinner();
            output_1.success(`Installed dependencies for ${projectName}`);
            resolve();
        })
            .catch(() => {
            stopInstallSpinner();
            console.log(messages_1.installError(packages));
            return reject(new Error(`${installCmd} installation failed`));
        });
    });
};
