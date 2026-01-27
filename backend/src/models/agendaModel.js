const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Agenda",
    {
      agenda_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "ID da Agenda",
      },
      organization_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Referência à organização",
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "Nome da agenda",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Descrição da agenda",
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: "Indica se a agenda está ativa",
      },
      custom_rules: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "Regras customizadas em JSON",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        comment: "Data de criação",
      },
    },
    {
      tableName: "Agendas",
      timestamps: false,
      comment: "Representa calendários ou agendas",
    },
  );
};
