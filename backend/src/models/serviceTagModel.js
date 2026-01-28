const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "ServiceTag",
    {
      service_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        comment: "Referência ao serviço",
      },
      tag_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        comment: "Referência à etiqueta",
      },
    },
    {
      tableName: "service_tags",
      timestamps: false,
      comment: "Tabela de junção para etiquetas de serviços",
    },
  );
};
