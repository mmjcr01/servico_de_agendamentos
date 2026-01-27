const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Appointment",
    {
      appointment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "ID do Agendamento",
      },
      agenda_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Referência à agenda",
      },
      service_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Referência ao serviço",
      },
      client_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Referência ao cliente",
      },
      professional_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Referência ao profissional",
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "Hora de início do agendamento",
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "Hora de término do agendamento",
      },
      status: {
        type: DataTypes.ENUM(
          "pending",
          "confirmed",
          "waiting_list",
          "canceled",
          "completed",
        ),
        defaultValue: "pending",
        allowNull: true,
        comment: "Status do agendamento",
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Notas adicionais",
      },
      custom_appointment_data: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "Dados customizados do agendamento em JSON",
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
      tableName: "Appointments",
      timestamps: false,
      comment: "Representa agendamentos de serviços",
    },
  );
};
