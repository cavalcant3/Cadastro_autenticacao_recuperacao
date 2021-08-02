const config = require("config.json");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
  const { host, port, user, password, database } = config.database;
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`Criando db \`${database}\`;`);

  //conectando ao db
  const sequelize = new Sequelize(database, user, password, {
    dialect: "mysql",
  });

  //iniciando models e adicionando eles ao objeto exportado
  db.Account = require("../accounts/account.model")(sequelize);
  db.RefreshToken = require("../accounts/refresh-token.model")(sequelize);

  //definindo relações
  db.Account.hasMany(db.RefreshToken, { onDelete: "Cascade" });
  db.RefreshToken.belongsTo(db.Account);

  //sincronizandos todos os models com o data base
  await sequelize.sync();
}
