const mysql = require("mysql");
const { db_config } = require("./db_config");
const { db_config_local } = require("./db_config_local");

let db;

function handleDisconnect() {
  // db = mysql.createConnection(db_config);
  db = mysql.createConnection(db_config_local);

  db.connect(function (err) {
    if (err) {
      console.log("error when connecting to db: ", err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  db.on("error", function (err) {
    console.log("db error", err);

    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}
handleDisconnect();

module.exports = db;
