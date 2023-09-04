const { URL } = require("url");
const http = require("http");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1:3003");
  if (request.url === "/users") {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: application/json";
    response.write(getUsers());
    response.end();
    return;
  }
  if (request.url === "/?hello=dima") {
    const helloValue = url.searchParams.get("hello");
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: text/html";
    response.write(`Hello, ${helloValue}`);
    response.end();

    return;
  }

  if (request.url === "/?hello=") {
    response.status = 400;
    response.header = "Content-Type: text/html";
    response.end("Enter a name");
    return;
  }

  response.status = 200;
  response.statusMessage = "OK";
  response.header = "Content-Type: text/plain";
  response.write("Hello, World!");
  response.end();
});

server.listen(3003, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:3003");
});
