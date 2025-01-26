export const APP_SERVER_CONSTANT = {
  RESPONSE: {
    RESPONSE_SUCCESS_INSERTION: {
      message: "Data inserted successfully",
      type: "success",
    },
    RESPONSE_FAILURE_PARAM: { message: "param is undefined" },
    RESPONSE_FAILURE_TABLE_CREATION: {
      message: "favourite_list table not created",
    },
  },
  DB_QUERIES: {
    FAVOURITE_LIST: `CREATE TABLE IF NOT EXISTS favourite_list (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fav_list TEXT,
            is_active BOOLEAN NOT NULL,
            created_by TEXT NOT NULL,
            created_on DATETIME DEFAULT CURRENT_TIMESTAMP)`,
  },
};
