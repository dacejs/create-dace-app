"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const get_install_cmd_1 = __importDefault(require("./get-install-cmd"));
const output_1 = require("./output");
const program = {
    name: 'create-dace-app'
};
exports.help = () => `
Only ${chalk_1.default.green('<project-directory>')} is required.
If you have any problems, do not hesitate to file an issue:
  ${chalk_1.default.cyan('https://github.com/dacejs/dace/issues/new')}
`;
exports.missingProjectName = () => `
Please specify the project directory:
  ${chalk_1.default.cyan(program.name)} ${chalk_1.default.green('<project-directory>')}
For example:
  ${chalk_1.default.cyan(program.name)} ${chalk_1.default.green('my-dace-app')}
Run ${chalk_1.default.cyan(`${program.name} --help`)} to see all options.
`;
exports.alreadyExists = (projectName) => `
Uh oh! Looks like there's already a directory called ${chalk_1.default.red(projectName)}. Please try a different name or delete that folder.`;
exports.installing = (packages) => {
    const pkgText = packages
        .map((pkg) => `    ${chalk_1.default.cyan(chalk_1.default.bold(pkg))}`)
        .join('\n');
    return `
  Installing npm modules:
${pkgText}
`;
};
exports.installError = (packages) => {
    const pkgText = packages
        .map((pkg) => `${chalk_1.default.cyan(chalk_1.default.bold(pkg))}`)
        .join(', ');
    output_1.error(`Failed to install ${pkgText}, try again.`);
};
exports.copying = (projectName) => `
Creating ${chalk_1.default.bold(chalk_1.default.green(projectName))}...
`;
exports.start = (projectName) => {
    const installCmd = get_install_cmd_1.default();
    const commands = {
        install: installCmd === 'npm' ? 'npm install' : 'yarn',
        build: installCmd === 'npm' ? 'npm run build' : 'yarn build',
        start: installCmd === 'npm' ? 'npm run start:prod' : 'yarn start:prod',
        dev: installCmd === 'npm' ? 'npm start' : 'yarn start',
        lint: installCmd === 'npm' ? 'npm run lint' : 'yarn lint'
    };
    return `
  ${chalk_1.default.green('Awesome!')} You're now ready to start coding.
  
  I already ran ${output_1.cmd(commands.install)} for you, so your next steps are:
    ${output_1.cmd(`cd ${projectName}`)}
  
  To start a local server for development:
    ${output_1.cmd(commands.dev)}
  
  To build a version for production:
    ${output_1.cmd(commands.build)}

  To run compiled project code:
    ${output_1.cmd(commands.start)}
    
  To run code lint:
    ${output_1.cmd(commands.lint)}
    
  Questions? Feedback? Please let me know!
  ${chalk_1.default.green('https://github.com/dacejs/dace/issues')}
`;
};
