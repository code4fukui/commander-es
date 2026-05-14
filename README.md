# commander-es

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

The complete solution for [Deno](https://deno.land/) command-line interfaces. (forked from [commander.js by tj](https://github.com/tj/commander.js) for [Node.js](https://nodejs.org/en/))

---

## Quick Start

Describe your command-line interface, and `commander-es` handles parsing arguments, generating help text, and reporting usage errors.

The two most common option types are a simple boolean flag and an option that takes a value.

**Example: `split.js`**

```javascript
import { program } from 'https://code4fukui.github.io/commander-es/index.js';

program
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  .option('-s, --separator <char>', 'separator character', ',');

program.parse();

const options = program.opts();
const limit = options.first ? 1 : undefined;
console.log(program.args[0].split(options.separator, limit));
```

**Run it with Deno:**

```console
$ deno run split.js -s / --first a/b/c
[ 'a' ]

$ deno run split.js "a-b-c"
[ 'a-b-c' ]

$ deno run split.js -s - "a-b-c"
[ 'a', 'b', 'c' ]
```

---

## Features

- **Simple API**: Chainable methods to build your CLI declaratively.
- **Option Parsing**: Supports short and long flags, required/optional values, default values, and negatable flags (e.g., `--no-sauce`).
- **Subcommands**: Define nested commands with their own options and action handlers.
- **Automated Help**: Generates help messages based on your program's definition. The help output is fully customizable.
- **Argument & Option Validation**: Enforce required options, validate argument choices, and provide helpful suggestions for typos.
- **Extensible**: Customize behavior with life-cycle hooks, custom argument parsers, and event listeners.

---

## Usage

There is no installation step. Import `commander-es` directly from its URL.

### Using the Global Program Object

For simple scripts, you can use the exported global `program` object.

```javascript
import { program } from 'https://code4fukui.github.io/commander-es/index.js';

program
  .name('my-cli')
  .version('1.0.0')
  .description('A simple command-line tool');

program.parse();
```

### Creating a Local Command

For more complex applications or testing, it's better to create a local `Command` instance.

```javascript
import { Command } from 'https://code4fukui.github.io/commander-es/index.js';
const program = new Command();

program
  .option('-v, --verbose', 'enable verbose logging');

program.parse(); // Deno.args is used by default

if (program.opts().verbose) {
  console.log('Verbose mode enabled!');
}
```

---

## API Overview

### Options

Define options with `.option()`. The parsed values are available from `.opts()`.

```javascript
program
  // Boolean option
  .option('-d, --debug', 'output extra debugging')
  // Option with a required value
  .option('-p, --pizza-type <type>', 'flavour of pizza')
  // Option with a default value
  .option('-c, --cheese <type>', 'add cheese type', 'mozzarella');

program.parse();

const options = program.opts();
if (options.debug) console.log(options);
console.log(`Pizza type: ${options.pizzaType}`);
if (options.cheese) console.log(`Cheese: ${options.cheese}`);
```

### Commands and Arguments

Use `.command()` to define a subcommand and `.argument()` to specify its arguments. An `.action()` handler receives the parsed arguments and options.

**Example: `string-util.js`**

```javascript
import { Command } from 'https://code4fukui.github.io/commander-es/index.js';
const program = new Command();

program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');

program.command('split')
  .description('Split a string into substrings')
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  .option('-s, --separator <char>', 'separator character', ',')
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
  });

program.parse();
```

**Run the subcommand:**

```console
$ deno run string-util.js split --separator=/ a/b/c
[ 'a', 'b', 'c' ]
```

### Automated Help

Commander automatically generates help for your program and its subcommands.

```console
$ deno run string-util.js help split
Usage: string-util split [options] <string>

Split a string into substrings

Arguments:
  string                  string to split

Options:
  --first                 display just the first substring
  -s, --separator <char>  separator character (default: ",")
  -h, --help              display help for command
```

You can customize the help output using methods like `.addHelpText()` and `.helpOption()`.

---