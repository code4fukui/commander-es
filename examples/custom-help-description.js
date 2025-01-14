#!/usr/bin/env node

// This example shows changing the flags and description for the help option.

// const { Command } = require('commander'); // (normal include)
import { Command } from '../index.js'; // include commander in git clone of commander repo
import process from '../lib/nodelike/process.js';
const program = new Command();

program
  .helpOption('-c, --HELP', 'custom help message')
  .option('-s, --sessions', 'add session support')
  .option('-t, --template <engine>', 'specify template engine', 'jade');

program
  .command('child')
  .option('--gender', 'specific gender of child')
  .action((options) => {
    console.log('Childsubcommand...');
  });

program.parse(process.argv);

// Try the following:
//    node custom-help-description -c
//    node custom-help-description child --HELP
