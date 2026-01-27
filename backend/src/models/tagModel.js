const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Tag",
    {
      tag_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "ID da Etiqueta",
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        comment: "Nome único da etiqueta",
      },
      color: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: "Cor associada à etiqueta",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Descrição da etiqueta",
      },
    },
    {
      tableName: "Tags",
      timestamps: false,
      comment: "Representa etiquetas customizáveis",
    },
  );
};
