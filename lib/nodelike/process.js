export default {
  argv: ["node", "*.js", ...Deno.args],
  stderr: {
    isTTY: true,
    columns: Deno.consoleSize ? Deno.consoleSize().columns : 40,
    write: (s) => {
      //console.stderr.write(s);
      console.debug(s);
    },
  },
  stdout: {
    isTTY: true,
    columns: Deno.consoleSize ? Deno.consoleSize().columns : 40,
    write: (s) => {
      //console.stderr.write(s);
      console.log(s);
    },
  },
  exit: (n) => Deno.exit(n),
  on: (signal, func) => {
    //console.log("on", signal, func);
  },
  env: Deno.env.toObject(),
};
