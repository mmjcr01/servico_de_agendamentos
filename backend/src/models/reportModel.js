const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Report",
    {
      report_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "ID do Relatório",
      },
      type: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Tipo de relatório",
      },
      generated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        comment: "Data de geração",
      },
      data: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "Dados do relatório em JSON",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Referência ao usuário que gerou",
      },
    },
    {
      tableName: "reports",
      timestamps: false,
      comment: "Representa relatórios gerados",
    },
  );
};
