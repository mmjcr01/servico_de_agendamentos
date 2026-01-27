const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "AuditLog",
    {
      log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "ID do Log",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Referência ao usuário que realizou a ação",
      },
      action: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Descrição da ação",
      },
      entity_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Referência à entidade afetada",
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        comment: "Data e hora da ação",
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Detalhes adicionais",
      },
    },
    {
      tableName: "AuditLogs",
      timestamps: false,
      comment: "Representa logs de atividades",
    },
  );
};
