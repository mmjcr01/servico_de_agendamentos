const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Form",
    {
      form_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "ID do Formulário",
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "Nome do formulário",
      },
      fields: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "Esquema de campos em JSON",
      },
      service_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Referência ao serviço associado",
      },
    },
    {
      tableName: "forms",
      timestamps: false,
      comment: "Representa formulários customizados",
    },
  );
};
