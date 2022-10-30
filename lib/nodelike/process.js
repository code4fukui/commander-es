export default {
  argv: ["node", "*.js", ...Deno.args],
  stderr: {
    isTTY: true,
    columns: Deno.consoleSize().columns,
    write: (s) => {
      //console.stderr.write(s);
      console.debug(s);
    },
  },
  stdout: {
    isTTY: true,
    columns: Deno.consoleSize().columns,
    write: (s) => {
      //console.stderr.write(s);
      console.log(s);
    },
  },
  exit: (n) => Deno.exit(n),
  on: (signal, func) => {
    //console.log("on", signal, func);
  },
};
