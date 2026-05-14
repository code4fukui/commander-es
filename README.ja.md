# commander-es

[Deno](https://deno.land/) 向けコマンドラインインターフェースの完全なソリューション。（[Node.js](https://nodejs.org/en/) 向けの [commander.js by tj](https://github.com/tj/commander.js) からフォーク）

---

## クイックスタート

コマンドラインインターフェースを記述するだけで、引数の解析、ヘルプテキストの生成、使用法エラーの報告は `commander-es` が処理します。

最もよく使われるオプションのタイプは、シンプルな真偽値（boolean）フラグと、値を取るオプションの2つです。

**例: `split.js`**

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

**Deno での実行:**

```console
$ deno run split.js -s / --first a/b/c
[ 'a' ]

$ deno run split.js "a-b-c"
[ 'a-b-c' ]

$ deno run split.js -s - "a-b-c"
[ 'a', 'b', 'c' ]
```

---

## 主な機能

- **シンプルな API**: メソッドチェーンを使って宣言的に CLI を構築できます。
- **オプションの解析**: ショートフラグとロングフラグ、必須/任意の値、デフォルト値、否定フラグ（例: `--no-sauce`）をサポートします。
- **サブコマンド**: 独自のオプションとアクションハンドラを持つネストされたコマンドを定義できます。
- **自動化されたヘルプ**: プログラムの定義に基づいてヘルプメッセージを自動生成します。ヘルプの出力は完全にカスタマイズ可能です。
- **引数とオプションの検証**: 必須オプションの強制、引数の選択肢の検証を行い、タイプミスに対しては役立つ提案を表示します。
- **拡張性**: ライフサイクルフック、カスタム引数パーサー、イベントリスナーを使用して動作をカスタマイズできます。

---

## 使い方

インストールの手順はありません。URL から直接 `commander-es` をインポートします。

### グローバルな program オブジェクトの使用

シンプルなスクリプトの場合は、エクスポートされたグローバルな `program` オブジェクトを使用できます。

```javascript
import { program } from 'https://code4fukui.github.io/commander-es/index.js';

program
  .name('my-cli')
  .version('1.0.0')
  .description('A simple command-line tool');

program.parse();
```

### ローカルコマンドの作成

より複雑なアプリケーションやテストの場合は、ローカルに `Command` インスタンスを作成することをお勧めします。

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

## API 概要

### オプション

`.option()` でオプションを定義します。解析された値は `.opts()` から取得できます。

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

### コマンドと引数

`.command()` でサブコマンドを定義し、`.argument()` でその引数を指定します。`.action()` ハンドラは、解析された引数とオプションを受け取ります。

**例: `string-util.js`**

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

**サブコマンドの実行:**

```console
$ deno run string-util.js split --separator=/ a/b/c
[ 'a', 'b', 'c' ]
```

### 自動化されたヘルプ

Commander は、プログラムとそのサブコマンドのヘルプを自動的に生成します。

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

`.addHelpText()` や `.helpOption()` などのメソッドを使用して、ヘルプの出力をカスタマイズできます。
