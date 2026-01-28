const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Service",
    {
      service_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "ID do Serviço",
      },
      organization_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Referência à organização",
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: "Nome do serviço",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Descrição detalhada do serviço",
      },
      default_duration_minutes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Duração padrão em minutos",
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        comment: "Preço do serviço",
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Categoria do serviço",
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: "Indica se o serviço está ativo",
      },
      requires_confirmation: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: "Se o serviço requer confirmação",
      },
      custom_fields_definition: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "Definição de campos customizados em JSON",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        comment: "Data de criação",
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
        allowNull: false,
        comment: "Data de atualização",
      },
    },
    {
      tableName: "services",
      timestamps: false,
      comment: "Representa serviços oferecidos",
    },
  );
};
