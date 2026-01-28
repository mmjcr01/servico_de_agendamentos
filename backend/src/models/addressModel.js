const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Address",
    {
      address_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "ID do Endereço",
      },
      street: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: "Nome da rua",
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "Cidade",
      },
      state: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "Estado ou província",
      },
      zip_code: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: "Código postal",
      },
      country: {
        type: DataTypes.STRING(100),
        defaultValue: "BR",
        allowNull: false,
        comment: "País",
      },
      latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
        comment: "Coordenada de latitude",
      },
      longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true,
        comment: "Coordenada de longitude",
      },
      link_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "URL para mapa ou link relacionado",
      },
    },
    {
      tableName: "addresses",
      timestamps: false,
      comment: "Representa endereços de atendimento",
    },
  );
};
