const XLSX = require("xlsx");
const controller = require("./controller.js");
const { response } = require("express");
class requestClassComponent {
  constructor() {}
  /**
   * @method: Get Request
   * @param {*} req
   * @param {*} res
   */
  getRequest(req, res) {
    if (req.url === "/api/fetchDownloadedData") {
      this.setResponseHeader(res);
      let data = controller.fetchData();
      if (data.length > 0) {
        res.statusCode = 200;
        res.write(JSON.stringify(data));
      } else {
        this.sendErrStatus();
      }
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
    console.log("POST 1");

    console.log("------------------------------------");
    if (req.url === "/api/setFavouriteMessage") {
      this.setResponseHeader(res);
      console.log(req);
      console.log("POST");
      res.write(req);
    }
    console.log(req.url);
    res.end();
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
}
module.exports = requestClassComponent;
