const http = require("http");
require("dotenv").config();
const getReq = require("./server/chat-demo.controller");
const PORT = process.env["PORT"] || 5000;
const AppDAO = require("./server/db.service");
const dao = new AppDAO("./database.sqlite3");
const requestClass = new getReq();
const server = http.createServer((req, res) => {
  // ✅ Handle CORS headers for all responses
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins (change this for security)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

  // ✅ Handle preflight (OPTIONS) requests
  if (req.method === "OPTIONS") {
    res.writeHead(204); // No content response for preflight
    res.end();
    return;
  }
  switch (req.method) {
    case "GET":
      // getReq(req, res);
      requestClass.getRequest(req, res);
      break;
    case "POST":
      requestClass.postRequest(req, res);
      break;
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify({ title: "Not found", message: "Page not found" })
      );
      res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

// const db = new sqlite3.Database("./test.db", sqlite3.OPEN_READWRITE, (err) => {
//   if (err) {
//     return console.error(err.message);
//   } else {
//     return console.log("DB connected");
//   }
// });
