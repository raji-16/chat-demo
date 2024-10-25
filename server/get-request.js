const XLSX = require("xlsx");
const controller = require("./controller.js");
module.exports = (req, res) => {
  if (req.url === "/api/fetchDownloadedData") {
    data = controller.fetchData();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
    );
    res.write(JSON.stringify(data));
    res.end();
  } else {
    res.statusCode = 400;
    res.writeHead("Content-Type", "application/json");
    res.write(JSON.stringify(req.movies));
    res.end();
  }
};
