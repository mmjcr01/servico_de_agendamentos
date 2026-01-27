const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "UserPlan",
    {
      user_plan_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "ID do Plano de Usuário",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Referência ao usuário",
      },
      plan_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Referência ao plano",
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "Data de início da assinatura",
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "Data de término da assinatura",
      },
      status: {
        type: DataTypes.ENUM("active", "expired"),
        defaultValue: "active",
        allowNull: true,
        comment: "Status da assinatura",
      },
    },
    {
      tableName: "UserPlans",
      timestamps: false,
      comment: "Representa assinaturas de usuários",
    },
  );
};
