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
      let data = service.fetchData();
      if (data.length > 0) {
        res.statusCode = 200;
        res.write(JSON.stringify(data));
      } else {
        this.sendErrStatus();
      }
    } else if (req.url === "/api/fetchFavourite") {
    } else {
      this.sendFailureResponse(res);
    }
    res.end();
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
        .on("end", () => {
          body = Buffer.concat(body).toString();
          // if (body) console.log(body);
          this.chatService.insertFavRecord(body);
        });
    }

    console.log(req.url);
    res.end("It Works!!");
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
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
    );
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
