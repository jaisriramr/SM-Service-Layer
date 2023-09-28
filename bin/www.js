var app = require("../app");
var http = require("http");

var port = process.env.PORT || "1800";

app.set("port", port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log("Server started at port " + port);
});

server.on("error", (err) => {
  console.log("Server crashed with error ", err);
});
