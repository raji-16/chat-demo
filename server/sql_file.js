const sqlite3 = require("sqlite3").verbose();
const sql = require("./test.db");

const execute = async (db, sql) => {
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};
export const main = async () => {
  const db = new sqlite3.Database("chat.db");
  try {
    await execute(
      db,
      `CREATE TABLE IF NOT EXISTS favourite_list (
          id INTEGER PRIMARY KEY,
          fav_list TEXT NOT NULL,
          is_active BOOLEAN NOT NULL,
          created_by TEXT NOT NULL,
          created_on TEXT NOT NULL)`
    );
    console.log("DB connected");
  } catch (error) {
    console.log("Error while connecting to DB" + error);
  } finally {
    db.close();
  }
};

main();
