// Set up MySQL connection.
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "v02yrnuhptcod7dk.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "m7rln4vwhq526uxg",
  password: "v5i7rdzylv5o5mu0",
  database: "wmwnhbsgyrd4noyc"
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
