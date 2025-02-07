const XLSX = require("xlsx");
const chatRepository = require("./chat-demo.repositry");
const { Configuration, OpenAIApi } = require("openai");

class ChatDemoService {
  repositry = new chatRepository();
  async fetchData() {
    return new Promise(async (resolve, reject) => {
      let workbook = XLSX.readFile("./public/SheetJS.xlsx");
      let sheet_name_list = workbook.SheetNames;
      let xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      resolve({ type: "success", data: xlData });
    });
  }

  insertFavRecord(param) {
    return new Promise(async (resolve, reject) => {
      this.repositry
        .updateTable(
          `CREATE TABLE IF NOT EXISTS favourite_list (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fav_list TEXT,
      is_active BOOLEAN NOT NULL,
      created_by TEXT NOT NULL,
      created_on DATETIME DEFAULT CURRENT_TIMESTAMP)`
        )
        .then((res) => this.updateFavouriteList(res, JSON.parse(param)))
        .then((result) => {
          resolve(JSON.stringify(result));
        });
    });
  }

  async updateFavouriteList(res, param) {
    console.log(res);
    return new Promise(async (resolve, reject) => {
      if (res.id || res.id === 0) {
        console.log("Table created successfully");
        if (param && param.favList && param.isActive && param.createdBy) {
          //insert query
          let details = {
            query: `INSERT INTO favourite_list (fav_list, is_active, created_by)
              VALUES (?, ?, ?)`,
            param: [param.favList, param.isActive, param.createdBy],
          };
          //update query
          if (param.id) {
            console.log("Update Query");
            details = {
              query: `UPDATE favourite_list
                SET is_active = ?, created_by = ?
                WHERE id = ?`,
              param: [param.isActive, param.createdBy, param.id],
            };
          }
          this.repositry
            .updateTable(details.query, details.param)
            .then((result) => {
              resolve({
                message: param.id
                  ? "data updated successfully"
                  : "data inserted successfully",
                type: "success",
              });
            })
            .catch((err) => {
              console.log(
                "Error in updateFavouriteList: " + JSON.stringify(err)
              );
              resolve({ message: err, type: "failure" });
            });
        } else {
          resolve({ message: "param is undefined", type: "failure" });
        }
      } else {
        resolve({
          message: "favourite_list table not created",
          type: "failure",
        });
      }
    });
  }

  async fetchFavouriteList(param) {
    return new Promise(async (resolve, reject) => {
      console.log("started");
      this.repositry
        .fetchRecord(
          `SELECT * FROM favourite_list WHERE is_active=? AND created_by=?`,
          param.name
        )
        .then((result) => {
          console.log("result ------------+" + param.name);
          resolve({ type: "success", data: result });
        })
        .catch((err) => {
          console.log("Error in fetchFavouriteList: " + JSON.stringify(err));
          resolve({ message: err, type: "failure" });
        });
    });
  }
  async removeFavList(list) {
    return new Promise(async (resolve) => {
      const req = JSON.parse(list);
      if (req?.length > 0) {
        //insert query
        const ids = req.map((e) => e.id);
        const idHolder = ids.map(() => "?").join(",");
        let details = {
          query: `UPDATE favourite_list
                SET is_active = 0
                WHERE id in (${idHolder})`,
          param: ids,
        };

        this.repositry
          .updateTable(details.query, details.param)
          .then((result) => {
            console.log(result);
            resolve(
              JSON.stringify({
                message: " data removed successfully",
                type: "success",
              })
            );
          })
          .catch((err) => {
            console.log("Error in removeFavList: " + JSON.stringify(err));
            resolve(JSON.stringify({ message: err, type: "failure" }));
          });
      } else {
        resolve(JSON.stringify({ message: "List is empty", type: "failure" }));
      }
    });
  }
  async fetchChatResponse(req) {
    return new Promise(async (resolve, reject) => {
      console.log(req);
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const { message } = req;
      try {
        const completion = await openai.createCompletion({
          model: "gpt-4o",
          prompt: message,
          max_tokens: 200,
        });
        console.log("Completion----" + JSON.stringify(completion));

        resolve({ response: completion.data.choices[0].text });
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
          resolve(
            JSON.stringify({ type: "failure", message: error.response.data })
          );
        } else {
          console.log(error.message);
          resolve(JSON.stringify({ type: "failure", message: error.message }));
        }
      }
    });
  }

  createHistoryTable(param) {
    return new Promise(async (resolve, reject) => {
      this.repositry
        .updateTable(
          `CREATE TABLE IF NOT EXISTS history_list (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      header TEXT,
      value TEXT,
      is_active BOOLEAN NOT NULL,
      created_by TEXT NOT NULL,
      created_on DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_on DATETIME DEFAULT CURRENT_TIMESTAMP)`
        )
        .then((res) => this.updateHistoryChat(res, param))
        .then((result) => {
          resolve(JSON.stringify(result));
        });
    });
  }
  async fetchHistoryData(param) {
    return new Promise(async (resolve) => {
      console.log(param);
      this.repositry
        .fetchRecord(
          `SELECT * FROM history_list WHERE is_active=? AND created_by=? ORDER BY created_on DESC LIMIT 3 `,
          param.name
        )
        .then((result) => {
          console.log("result ------------+" + result);
          resolve({ type: "success", data: result });
        })
        .catch((err) => {
          console.log("Error in fetchFavouriteList: " + JSON.stringify(err));
          resolve({ message: err, type: "failure" });
        });
    });
  }
  async updateHistoryChat(res, param) {
    return new Promise(async (resolve) => {
      if (res.id || res.id === 0) {
        console.log(param);
        //insert query
        let details = {
          query: `INSERT INTO history_list (header, value, is_active, created_by)
                VALUES (?, ?, ?, ?)`,
          param: [
            param.header,
            JSON.stringify(param.value),
            param.isActive,
            param.createdBy,
          ],
        };

        this.repositry
          .updateTable(details.query, details.param)
          .then((result) => {
            console.log(result);
            resolve({
              message: " data inserted successfully",
              type: "success",
            });
          })
          .catch((err) => {
            console.log("Error in updateHistoryChat: " + JSON.stringify(err));
            resolve({ message: err, type: "failure" });
          });
      } else {
        resolve(
          JSON.stringify({
            message: "history_list table not created",
            type: "failure",
          })
        );
      }
    });
  }
}

module.exports = ChatDemoService;
