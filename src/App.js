const { URL } = require("url");
const http = require("http");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1:3003");

  if (url.searchParams.has("users")) {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(getUsers());
    response.end();
    return;
  }

  if (url.searchParams.has("hello")) {
    if (url.searchParams.get("hello").length > 0) {
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.write("Hello, " + url.searchParams.get("hello"));
      response.end();
      return;
    } else {
      response.writeHead(400, { "Content-Type": "text/plain" });
      response.write("Enter a name");
      response.end();
      return;
    }
  }

  console.log(url.searchParams.keys());

  for (const key of url.searchParams.keys()) {
    if (key !== "name" || key !== "user") {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end();
      return;
    }
  }

  response.writeHead(200, { "Content-Type": "text/plain" });
  response.write("Hello, World!");
  response.end();
});

server.listen(3003, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:3003");
});
