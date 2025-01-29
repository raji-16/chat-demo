const { retry } = require("rxjs");
const ChatDAO = require("./db.service");

class ChatRepository {
  dao = new ChatDAO("./database.sqlite3");

  async updateTable(sql, param) {
    return this.dao.run(sql, param);
  }

  async fetchFavRecords(name) {
    return this.dao.all(
      `SELECT * FROM favourite_list WHERE is_active=? AND created_by=?`,
      [1, name]
    );
  }
}

module.exports = ChatRepository;
