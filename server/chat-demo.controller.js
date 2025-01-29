const XLSX = require("xlsx");
const service = require("./chat-demo.service.js");
const { response } = require("express");
class requestClassComponent {
  chatService = new service();
  constructor() {}
  /**
   * @method: Get Request
   * @param {*} req
   * @param {*} res
   */
  getRequest(req, res) {
    if (req.url === "/api/fetchDownloadedData") {
      this.setResponseHeader(res);
      let data = this.chatService.fetchData();
      if (data.length > 0) {
        res.statusCode = 200;
        res.write(JSON.stringify(data));
        res.end();
      } else {
        this.sendErrStatus();
      }
    } else {
      this.sendFailureResponse(res);
    }
  }
  /**
   * @method: Post request
   * @param {*} req
   * @param {*} res
   */
  postRequest(req, res) {
    if (req.url === "/api/setFavouriteMessage") {
      this.setResponseHeader(res);
      var body = [];
      req
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", async () => {
          body = Buffer.concat(body).toString();
          console.log(req.url);
          if (body) {
            this.chatService
              .insertFavRecord(body)
              .then((data) => {
                console.log("Controller: " + data);
                res.statusCode = 200;
                res.write(data);
                res.end();
              })
              .catch((err) => {
                res.statusCode = 500;
                res.write(err);
                res.end();
              });
          } else {
            res.write(
              JSON.stringify({ message: "object is empty", type: "failure" })
            );
            res.end();
          }
        });
    } else if (req.url === "/api/fetchFavouriteRecord") {
      this.setResponseHeader(res);
      var body = [];
      req
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", async () => {
          body = Buffer.concat(body).toString();
          console.log(req.url);
          if (body) {
            this.chatService
              .fetchFavouriteList(JSON.parse(body))
              .then((data) => {
                console.log(
                  "fetchFavouriteRecord Controller: " + JSON.stringify(data)
                );
                res.statusCode = 200;
                if (data.type === "success") {
                  console.log("Result: ");
                  res.write(JSON.stringify(data));
                  res.end();
                } else {
                  res.write({ message: "No data found", type: "success" });
                  res.end();
                }
              })
              .catch((err) => {
                res.statusCode = 500;
                console.log("Error");
                console.log(err);
                res.end();
              });
          } else {
            res.write(
              JSON.stringify({ message: "object is empty", type: "failure" })
            );
            res.end();
          }
        });
    }
  }

  /**
   * @method: Send failure response: 400
   * @param {*} res
   */
  sendFailureResponse(res) {
    res.statusCode = 400;
    res.end();
  }

  /**
   * @method: Send error status: 500
   */
  sendErrStatus() {
    res.statusCode = 500;
    res.write("No data to process");
  }

  /**
   * @method: Set response header
   * @param {*} res
   */
  setResponseHeader(res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
    );
    res.setHeader("Content-Type", "application/json");
  }

  async fetchJSONContent(req) {
    var body = [];
    req
      .on("data", function (chunk) {
        body.push(chunk);
      })
      .on("end", function () {
        body = Buffer.concat(body).toString();
        // if (body) console.log(body);
        return body;
      });
  }
}
module.exports = requestClassComponent;
