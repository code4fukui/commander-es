export default {
  basename: (filename, ext) => { // todo: check the reference
    //console.log("basename", filename, ext);
    return filename;
  },
  extname: (fn) => {
    const n = fn.lastIndexOf("/");
    const n2 = n < 0 ? 0 : n;
    const m = fn.lastIndexOf(".", n2);
    if (m < 0) {
      return "";
    }
    return fn.substring(m + 1);
  },
  dirname: (fn) => {
    const n = fn.lastIndexOf("/");
    if (n < 0) {
      return "";
    }
    return fn.substring(0, n);
  },
  resolve: (path1, path2) => { // todo: check the reference
    //console.log("resolve", path1, path2);
    return path1 + path2;
  },
};