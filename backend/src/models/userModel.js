const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "ID do Usuário",
      },
      organization_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "ID da Organização",
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        comment: "Email único do usuário",
      },
      password_hash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "Senha criptografada",
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "Nome completo do usuário",
      },
      phone: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: "Número de telefone",
      },
      role: {
        type: DataTypes.ENUM("client", "professional", "admin", "attendant"),
        allowNull: false,
        comment: "Papel do usuário",
      },
      profile_picture_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "URL da foto de perfil",
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true,
        comment: "Indica se o usuário está ativo",
      },
      custom_profile_data: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "Dados adicionais do perfil em JSON",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        comment: "Data de criação",
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
        allowNull: false,
        comment: "Data de atualização",
      },
    },
    {
      tableName: "Users",
      timestamps: false,
      comment: "Representa usuários do sistema",
    },
  );
};
