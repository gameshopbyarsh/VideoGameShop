const mysql = require("mysql2");
const config = require("config");
const path = require("path");
const sqlFile = path.join(__dirname, config.get("db_init_file"));
const fs = require("fs");


const db_config = config.get('db_config_azure')
console.log(db_config)
var connection;

function connect() {
  connection = mysql.createConnection(db_config);

  connection.connect(function (err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(connect, 2000);
    }
    console.log("Connection to db success!");
    const init_db = fs.readFileSync(sqlFile, "utf-8");

    connection.query(init_db, (err, res) => {
      if (err) connect();
      console.log("Tables created");
    });
  });
  connection.on("error", function (err) {
    console.log("db error reconnecting");
    if (err.code === "ECONNRESET") {
      connect();
    } else {
      throw err;
    }
  });
}

module.exports.connectToDatabase = function () {
    connect();
};

module.exports.getDatabase = function () {
  return connection;
};

