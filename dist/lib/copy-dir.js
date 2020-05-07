"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const promise_1 = __importDefault(require("promise"));
const fs_1 = __importDefault(require("fs"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const ejs_1 = __importDefault(require("ejs"));
const isbinaryfile_1 = require("isbinaryfile");
const messages_1 = require("./messages");
const output_1 = require("./output");
function copyTpl(from, to, context) {
    if (!isbinaryfile_1.isBinaryFileSync(from)) {
        const contents = fs_1.default.readFileSync(from, 'utf8');
        const result = ejs_1.default.render(contents, context);
        // 文件名称也支持 ejs 变量替换
        const newTo = ejs_1.default.render(to, context);
        // 删除文件名称替换前的文件
        if (to !== newTo && fs_1.default.existsSync(to)) {
            fs_1.default.unlinkSync(to);
        }
        fs_1.default.writeFileSync(newTo, result);
    }
}
exports.default = (opts) => {
    const { templatePath, projectPath, templateFiles = [] } = opts, features = __rest(opts, ["templatePath", "projectPath", "templateFiles"]);
    console.log(messages_1.copying(features.projectName));
    return new promise_1.default((resolve, reject) => {
        const stopCopySpinner = output_1.wait('Copying files');
        fs_extra_1.default.copy(templatePath, projectPath)
            .then(() => {
            templateFiles.forEach((file) => {
                const from = typeof file === 'string' ? file : file.from;
                const to = typeof file === 'string' ? file : file.to;
                copyTpl(path_1.default.resolve(templatePath, from), path_1.default.resolve(projectPath, to), features);
            });
            return this;
            // return fsExtra.move(
            //   path.resolve(projectPath, './gitignore'),
            //   path.resolve(projectPath, './.gitignore')
            // );
        })
            .then(() => {
            stopCopySpinner();
            output_1.success(`Created files for ${output_1.cmd(features.projectName)}`);
            return this;
        })
            .then(resolve)
            .catch((err) => {
            console.error(err);
            stopCopySpinner();
            output_1.error('Copy command failed, try again.');
            reject(err);
            process.exit(1);
        });
    });
};
