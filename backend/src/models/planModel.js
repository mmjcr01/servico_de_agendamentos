const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Plan",
    {
      plan_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "ID do Plano",
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Nome do plano",
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        comment: "Preço do plano",
      },
      features: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "Recursos do plano em JSON",
      },
      duration_months: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Duração em meses",
      },
    },
    {
      tableName: "Plans",
      timestamps: false,
      comment: "Representa planos de assinatura",
    },
  );
};
