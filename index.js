#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const { Command } = require('commander');

const program = new Command();

program
  .version('0.0.1')
  .argument('<directory>', 'directory to create the project in')
  .action(async (directory) => {
    const projectPath = path.resolve(directory);
    if (fs.existsSync(projectPath)) {
      console.error(`Directory ${projectPath} already exists.`);
      process.exit(1);
    }

    console.log(`Creating project in ${projectPath}`);
    fs.mkdirSync(projectPath, { recursive: true });

    console.log('Cloning template repository...');
    try {
      await git.clone({
        fs,
        http,
        dir: projectPath,
        url: 'https://github.com/qtencent7/ts-backend-template.git',
        singleBranch: true,
        depth: 1
      });
      console.log('Template cloned successfully.');
    } catch (error) {
      console.error('Failed to clone repository', error);
    }
  });

program.parse(process.argv);
