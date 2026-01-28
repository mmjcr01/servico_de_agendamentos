const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "AgendaAddress",
    {
      agenda_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        comment: "Referência à agenda",
      },
      address_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        comment: "Referência ao endereço",
      },
    },
    {
      tableName: "agenda_addresses",
      timestamps: false,
      comment: "Tabela de junção para endereços de agendas",
    },
  );
};
