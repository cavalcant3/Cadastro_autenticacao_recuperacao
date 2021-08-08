// garantindo uma única conexão com o banco.
// Podemos substituir pelo ORM
async function connect() {
  if (global.connection && global.connection.state !== "disconnected")
    return global.connection;

  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection(
    `mysql://${process.env.MYSQL_USER}: ${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}/${process.env.MYSQL_DB}`
  );
}

module.exports = { connect };
