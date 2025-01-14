#!/usr/bin/env node

// This example shows adding a description which is displayed in the help.

// const { Command } = require('commander'); // (normal include)
import { Command } from '../index.js'; // include commander in git clone of commander repo
import process from '../lib/nodelike/process.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Application simple description')
  .option('-f, --foo', 'enable some foo')
  .option('-b, --bar', 'enable some bar')
  .option('-B, --baz', 'enable some baz');

program.parse(process.argv);

if (!program.args.length) program.help();

// Try the following on macOS or Linux:
//    ./description -h
//
// Try the following:
//    node description -h
