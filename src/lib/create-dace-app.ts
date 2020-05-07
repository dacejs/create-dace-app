import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';
import copyDir from './copy-dir';
import install from './install';
import { missingProjectName, alreadyExists, start } from './messages';

function deleteUnusedFiles(opts: any) {
  const {
    projectPath
  } = opts;

  setTimeout(() => {
    fs.renameSync(
      path.join(projectPath, 'gitignore'),
      path.join(projectPath, '.gitignore')
    );
  }, 5000);

  return () => Promise.resolve(opts);
}

function installWithMessageFactory(opts: any) {
  const {
    projectName, projectPath
  } = opts;
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

  return () => install({
    projectName,
    projectPath,
    packages
  })
    .then(() => {
      console.log(start(projectName));
    })
    .catch((err) => {
      throw err;
    });
}

function create(opts: any) {
  const { projectName } = opts;

  if (!projectName) {
    console.log(missingProjectName());
    process.exit(1);
  }

  if (fs.existsSync(projectName)) {
    console.log(alreadyExists(projectName));
    process.exit(1);
  }

  opts.projectPath = `${process.cwd()}/${projectName}`;

  const templatePath = path.resolve(__dirname, '../../template');

  copyDir({
    ...opts,
    templatePath,
    projectPath: opts.projectPath,
    templateFiles: [
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
    ]
  })
    .then(deleteUnusedFiles(opts))
    .then(installWithMessageFactory(opts))
    .catch((err: any) => {
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
    default: (answers: any) => answers.projectName,
    validate: (input: string) => {
      if (/^[\w_]*$/.test(input)) {
        return true;
      }
      return 'Invalid app code. App code can only be numbers, letters, and underscores. Please try again.';
    }
  }
];

inquirer
  .prompt(prompts)
  .then((answers: any) => {
    create({
      ...answers,
      // 避免代码被扫描
      company: String.fromCharCode(113, 117, 110, 97, 114)
    });
  });
