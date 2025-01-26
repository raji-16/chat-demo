const { retry } = require("rxjs");
const ChatDAO = require("./db.service");

class ChatRepository {
  dao = new ChatDAO("./database.sqlite3");

  async updateTable(sql, param) {
    return  this.dao.run(sql, param);
  }
}

module.exports = ChatRepository;
