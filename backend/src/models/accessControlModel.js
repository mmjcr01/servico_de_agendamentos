const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "AccessControl",
    {
      access_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "ID do Acesso",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Referência ao usuário",
      },
      permission: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Nome da permissão",
      },
      granted_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Referência ao usuário que concedeu a permissão",
      },
    },
    {
      tableName: "AccessControls",
      timestamps: false,
      comment: "Representa permissões e acessos de usuários",
    },
  );
};
