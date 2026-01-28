const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "FormResponse",
    {
      response_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "ID da Resposta",
      },
      form_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Referência ao formulário",
      },
      appointment_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Referência ao agendamento",
      },
      data: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "Dados da resposta em JSON",
      },
      submitted_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        comment: "Data de submissão",
      },
    },
    {
      tableName: "formresponses",
      timestamps: false,
      comment: "Representa respostas de formulários",
    },
  );
};
