const http = require("http");
const fs = require("fs");
const path = require("path");
const port = 7777;

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

  if (req.url === "/read-message" && req.method === "GET") {
    res.setHeader("Content-Type", "text/html");
    const txtPath = path.join(__dirname, "message.txt");

    fs.readFile(txtPath, (err, content) => {
      if (err) {
        if (err.code === "ENOENT") {
        } else {
          res.writeHead(500);
          res.end(`Server Error ${err.code}`);
        }
      } else {
        // res.writeHead(200, { "Content-Type": "text/plain" });
        // res.write(content);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(
          `<html>
          <h1>${content}</h1>
          </html>`
        );
        res.end();
      }
    });
  }

  if (req.url === "/write-message" && req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(`
    <html>
    <form action="/write-message" method="POST">
    <input type="text" name="message" placeholder="Enter your message">
    <button type="submit">Send</button>
    </form>
    </html>`);
    res.end();
  }
  if (req.url === "/write-message" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      // console.log(chunk);
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      console.log(message);

      fs.writeFile("message.txt", message, (err) => {
        if (err) {
          throw err;
        }
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
});

server.on("listening", () => {
  console.log(`Listening on port ${port}`);
});

server.listen(port);
