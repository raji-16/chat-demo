const { retry } = require("rxjs");
const ChatDAO = require("./db.service");

class ChatRepository {
  dao = new ChatDAO("./database.sqlite3");

  async updateTable(sql, param) {
    return this.dao.run(sql, param);
  }

  async fetchFavRecords() {
    return this.dao.all(`SELECT * FROM favourite_list WHERE is_active=?`, 1);
  }
}

module.exports = ChatRepository;
