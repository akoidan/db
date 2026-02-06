// server.js
const http = require("http");

const PORT = 1234;

const server = http.createServer((req, res) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from host!\n");
});

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});