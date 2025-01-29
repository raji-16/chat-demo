const XLSX = require("xlsx");
const chatRepository = require("./chat-demo.repositry");
class ChatDemoService {
  repositry = new chatRepository();

  fetchData() {
    let workbook = XLSX.readFile("./public/SheetJS.xlsx");
    let sheet_name_list = workbook.SheetNames;
    let xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    console.log(xlData);
    return xlData;
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

  async fetchFavouriteList() {
    return new Promise(async (resolve, reject) => {
      console.log("started");
      this.repositry
        .fetchFavRecords()
        .then((result) => {
          console.log("result -------------");
          resolve({ type: "success", data: result });
        })
        .catch((err) => {
          console.log("Error in fetchFavouriteList: " + JSON.stringify(err));
          resolve({ message: err, type: "failure" });
        });
    });
  }
}

module.exports = ChatDemoService;
