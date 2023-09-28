var cluster = require("cluster");

if (cluster.isMaster) {
  const cpuNums = require("os").cpus().length;

  for (var i = 0; i < cpuNums; i++) {
    cluster.fork();
  }

  cluster.on("exit", () => {
    cluster.fork();
  });
} else {
  require("../bin/www.js");
}
