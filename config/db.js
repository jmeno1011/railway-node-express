const mysql = require("mysql");
const { db_config, db_pool_config } = require("./db_config");

exports.db;

function handleDisconnect() {
  db = mysql.createConnection(db_config);

  db.connect(function (err) {
    if (err) {
      console.log("error when connecting to db: ", err);
      setTimeout(handleDisconnect, 2000);
    }
  });
  ``;
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

exports.pool = mysql.createPool(db_pool_config);

// module.exports = db;
