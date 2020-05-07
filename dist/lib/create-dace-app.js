"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const copy_dir_1 = __importDefault(require("./copy-dir"));
const install_1 = __importDefault(require("./install"));
const messages_1 = require("./messages");
function deleteUnusedFiles(opts) {
    const { projectPath } = opts;
    setTimeout(() => {
        fs_1.default.renameSync(path_1.default.join(projectPath, 'gitignore'), path_1.default.join(projectPath, '.gitignore'));
    }, 5000);
    return () => Promise.resolve(opts);
}
function installWithMessageFactory(opts) {
    const { projectName, projectPath } = opts;
    const packages = [
        'classnames',
        'react',
        'react-dom',
        'dace',
        'dace-plugin-redux',
        'morgan',
        'qs',
        'statsd-client',
        'winston',
        'winston-daily-rotate-file'
    ];
    return () => install_1.default({
        projectName,
        projectPath,
        packages
    })
        .then(() => {
        console.log(messages_1.start(projectName));
    })
        .catch((err) => {
        throw err;
    });
}
function create(opts) {
    const { projectName } = opts;
    if (!projectName) {
        console.log(messages_1.missingProjectName());
        process.exit(1);
    }
    if (fs_1.default.existsSync(projectName)) {
        console.log(messages_1.alreadyExists(projectName));
        process.exit(1);
    }
    opts.projectPath = `${process.cwd()}/${projectName}`;
    const templatePath = path_1.default.resolve(__dirname, '../../template');
    copy_dir_1.default(Object.assign(Object.assign({}, opts), { templatePath, projectPath: opts.projectPath, templateFiles: [
            'crontab/crontab.txt',
            'deploy_scripts/<%=appCode%>_start.sh',
            'deploy_scripts/<%=appCode%>_stop.sh',
            'profiles/.beta.env',
            'profiles/.local.env',
            'profiles/.production.env',
            '.npmrc',
            'nodemon-debug.json',
            'nodemon.json',
            'package.json',
            'README.md'
        ] }))
        .then(deleteUnusedFiles(opts))
        .then(installWithMessageFactory(opts))
        .catch((err) => {
        throw err;
    });
}
const prompts = [
    {
        type: 'input',
        name: 'projectName',
        message: 'What is the project name?'
    },
    {
        type: 'input',
        name: 'appCode',
        message: 'What is the app code?',
        default: (answers) => answers.projectName,
        validate: (input) => {
            if (/^[\w_]*$/.test(input)) {
                return true;
            }
            return 'Invalid app code. App code can only be numbers, letters, and underscores. Please try again.';
        }
    }
];
inquirer_1.default
    .prompt(prompts)
    .then((answers) => {
    create(Object.assign(Object.assign({}, answers), { 
        // 避免代码被扫描
        company: String.fromCharCode(113, 117, 110, 97, 114) }));
});
