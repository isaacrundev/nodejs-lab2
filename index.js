const http = require("http");
const fs = require("fs");
const port = 8000;

const server = http.createServer();

server.on("request", (req, res) => {
  console.log(req);
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(
      `<html>
      <h1>Hello Node!</h1>
      <a href="/read-message">Read Message</a>
      <br/>
      <a href="/write-message">Write Message</a>
      </html>`
    );
    res.end();
  }
  if (req.url === "/read-message") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end();
  }
  if (req.url === "/write-message" && req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(`
    <html>
    <form action="/" method="POST">
    <input type="text" name="text-input" placeholder="Enter your message">
    <button type="submit">Send</button>
    </form>
    </html>`);
    res.end();
  }
  if (req.url === "/write-message" && req.method === "POST") {
    res.statusCode = 200;

    res.end();
  }
});

server.listen(port, (err) => {
  if (err) {
    return console.log("ERROR!");
  }
});

server.listen(port);
