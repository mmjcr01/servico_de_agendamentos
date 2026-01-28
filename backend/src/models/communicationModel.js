const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Communication",
    {
      comm_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "ID da Comunicação",
      },
      type: {
        type: DataTypes.ENUM("sms", "email", "notification"),
        allowNull: true,
        comment: "Tipo de comunicação",
      },
      recipient_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Referência ao destinatário",
      },
      appointment_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Referência ao agendamento",
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Conteúdo da mensagem",
      },
      sent_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        comment: "Data de envio",
      },
      status: {
        type: DataTypes.ENUM("sent", "failed"),
        defaultValue: "sent",
        allowNull: true,
        comment: "Status do envio",
      },
    },
    {
      tableName: "communications",
      timestamps: false,
      comment: "Representa notificações enviadas",
    },
  );
};
