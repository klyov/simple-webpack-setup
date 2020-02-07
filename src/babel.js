async function start() {
  return await Promise.resolve("aync is working");
}

start().then(console.log);

const unused = 42;

class Util {
  static id = Date.now();
}

console.log("Util id", Util.id);
console.log("unused", unused);

import("lodash").then(_ => {
  console.log("LODASH", _.random(0, 42, true));
});
