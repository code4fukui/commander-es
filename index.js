import { Argument } from './lib/argument.js';
import { Command } from './lib/command.js';
import { CommanderError, InvalidArgumentError } from './lib/error.js';
import { Help } from './lib/help.js';
import { Option } from './lib/option.js';

// @ts-check

/**
 * Expose the root command.
 */

const program = new Command();
 
export default program;
 
//exports.program = exports; // More explicit access to global command.
// Implicit export of createArgument, createCommand, and createOption.

/**
 * Expose classes
 */
export {
  program,
  Argument,
  Command,
  CommanderError,
  Help,
  InvalidArgumentError,
  Option,
};
