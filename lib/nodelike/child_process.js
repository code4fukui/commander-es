export default {
  spawn: (fn, args, options) => {
    console.log("spawn", fn, args, options);
    //return Deno.run(fn, args, options);
    return {
      on: (signal, func) => {
        console.log("spawn#on", signal, func);
      },
    };
  },
};
