const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Organization",
    {
      organization_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "ID da Organização",
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: "Nome da organização ou profissional",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Descrição detalhada da organização",
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "Endereço físico da organização",
      },
      phone: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: "Número de telefone de contato",
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: true,
        comment: "Endereço de email único para contato",
      },
      logo_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "URL da imagem do logo",
      },
      timezone: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: "Fuso horário padrão",
      },
      currency: {
        type: DataTypes.STRING(10),
        allowNull: true,
        comment: "Moeda padrão",
      },
      custom_settings: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "Configurações customizadas em JSON",
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
      tableName: "organizations",
      timestamps: false,
      comment: "Representa organizações ou profissionais autônomos",
    },
  );
};
