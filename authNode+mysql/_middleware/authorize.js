const jwt = require("express-jwt");
const { secret } = require("config.json");
const db = require("_helpers/db");

module.exports = authorize;

function authorize(roles = []) {
  // se torna uma unica sequência de caracteres ou uma série de funções
  if (typeof roles === "string") {
    roles = [roles];
  }
}

return [
  //autenticação com o token jwt
  jwt({ secret, algorithms: ["HS256"] }),

  // autorização baseada nas roles
  async (req, res, next) => {
    const account = await db.account.findByPk(req.user.id);

    if (!account || (roles.lenght && !roles.includes(account.role))) {
      //se a conta não existir o login não vai ser autorizado
      return res.status(401).json({ message: "Unauthorized" });
    }
    // autenticação e autorização bem sucedida
    req.user.role = account.role;
    const refreshTokens = await account.getRefreshTokens();
    req.user.ownsToken = (token) =>
      !!refreshTokens.find((x) => x.token === token);
    next();
  },
];
