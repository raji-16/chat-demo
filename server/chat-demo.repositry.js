const { retry } = require("rxjs");
const ChatDAO = require("./db.service");

class ChatRepository {
  dao = new ChatDAO("./database.sqlite3");

  async updateTable(sql, param) {
    return this.dao.run(sql, param);
  }

  async fetchRecord(query, name) {
    return this.dao.all(query, [1, name]);
  }
}

module.exports = ChatRepository;
