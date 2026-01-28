const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "ProfessionalService",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "ID",
      },
      professional_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Referência ao profissional",
      },
      service_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Referência ao serviço",
      },
      custom_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        comment: "Preço customizado",
      },
      custom_duration_minutes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Duração customizada em minutos",
      },
      availability_rules: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "Regras de disponibilidade em JSON",
      },
    },
    {
      tableName: "professionals_services",
      timestamps: false,
      comment: "Junção para customizações de serviços por profissional",
    },
  );
};
