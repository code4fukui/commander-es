#!/usr/bin/env node

// This example shows changing the flags and description for the version option.

// const { Command } = require('commander'); // (normal include)
import { Command } from '../index.js'; // include commander in git clone of commander repo
import process from '../lib/nodelike/process.js';
const program = new Command();

program
  .version('0.0.1', '-v, --VERSION', 'new version message')
  .option('-s, --sessions', 'add session support')
  .option('-t, --template <engine>', 'specify template engine', 'jade');

program.parse(process.argv);

// Try the following:
//    node custom-version -v
//    node custom-version --VERSION
