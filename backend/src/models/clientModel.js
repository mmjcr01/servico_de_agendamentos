const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Client",
    {
      client_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "ID do Cliente",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Referência ao usuário associado",
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "Nome do cliente",
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "Email do cliente",
      },
      phone: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: "Número de telefone do cliente",
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "Endereço do cliente",
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Notas adicionais sobre o cliente",
      },
      custom_client_data: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "Dados customizados do cliente em JSON",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        comment: "Data de criação",
      },
    },
    {
      tableName: "clients",
      timestamps: false,
      comment: "Representa clientes específicos",
    },
  );
};
