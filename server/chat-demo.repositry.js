const ChatDAO = require("./db.service");

class ChatRepository {
  dao = new ChatDAO("./database.sqlite3");

  updateTable(sql, param) {
    // const sql = `
    //   CREATE TABLE IF NOT EXISTS favourite_list (
    //       id INTEGER PRIMARY KEY,
    //       fav_list TEXT NOT NULL,
    //       is_active BOOLEAN NOT NULL,
    //       created_by TEXT NOT NULL,
    //       created_on TEXT NOT NULL)`;
    return this.dao.run(sql, param);
  }
}

module.exports = ChatRepository;
