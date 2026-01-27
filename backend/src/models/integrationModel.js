const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Integration",
    {
      integration_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "ID da Integração",
      },
      organization_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Referência à organização",
      },
      type: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Tipo de integração",
      },
      api_key: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "Chave de API",
      },
      config: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "Configurações em JSON",
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true,
        comment: "Indica se a integração está ativa",
      },
    },
    {
      tableName: "Integrations",
      timestamps: false,
      comment: "Representa integrações externas",
    },
  );
};
