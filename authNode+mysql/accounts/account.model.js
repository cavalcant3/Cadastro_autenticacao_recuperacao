const { options } = require("joi");
const { DataTypes } = require("sequelize");

module.exports = model;
function model(sequelize) {
  const attributes = {
    email: { type: DataTypes.STRING, allowNull: false },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    acceptTerms: { type: DataTypes.BOOLEAN },
    role: { type: DataTypes.STRING, allowNull: false },
    verificationToken: { type: DataTypes.STRING },
    verified: { type: DataTypes.DATE },
    resetToken: { type: DataTypes.DATE },
    resetTokenExpires: { type: DataTypes.DATE },
    passwordReset: { type: DataTypes.DATE },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    isVerified: {
      type: DataTypes.VIRTUAL,
      get() {
        return !!(thos.verified || this.passwordReset);
      },
    },
  };
  const options = {
    //desabilitando o tempo do hash
    timestamps: false,
    defaultScope: {
      atributes: { exclude: ["passwordHash"] },
    },
    scopes: {
      // incluindo o hash com este esocopo
      withHash: { attributes: {} },
    },
  };
}
return sequelize.define("account", attributes, options);
