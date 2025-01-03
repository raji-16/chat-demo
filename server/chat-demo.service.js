const XLSX = require("xlsx");
const chatRepository = require("./chat-demo.repositry");
class ChatDemoService {
  repositry = new chatRepository();
  fetchData() {
    let workbook = XLSX.readFile("./public/SheetJS.xlsx");
    let sheet_name_list = workbook.SheetNames;
    let xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    console.log(xlData);
    //processData(xlData);
    return xlData;
  }

  insertFavRecord(param) {
    this.createFavRecord(param);
  }

  createFavRecord(param) {
    this.repositry
      .updateTable(
        `CREATE TABLE IF NOT EXISTS favourite_list (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fav_list TEXT,
        is_active BOOLEAN NOT NULL,
        created_by TEXT NOT NULL,
        created_on DATETIME DEFAULT CURRENT_TIMESTAMP)`
      )
      .then((data) => {
        this.updateFavouriteList(param);
      })
      .catch((err) => {
        console.log("Error: ");
        console.log(JSON.stringify(err));
      });
  }
  updateFavouriteList(data) {
    console.log("Service update");
    console.log(JSON.parse(data));
    const param = JSON.parse(data);
    const result = this.repositry.updateTable(
      `INSERT INTO favourite_list (fav_list, is_active, created_by)
        VALUES (?, ?, ?)`,
      [param.favList, param.isActive, param.createdBy]
    );
    console.log(result);
  }
}

module.exports = ChatDemoService;
