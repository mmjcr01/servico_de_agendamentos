module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];

    const users = await queryInterface.sequelize.query(
      "SELECT user_id FROM users LIMIT 10",
      { type: Sequelize.QueryTypes.SELECT },
    );

    const appointments = await queryInterface.sequelize.query(
      "SELECT appointment_id FROM appointments LIMIT 10",
      { type: Sequelize.QueryTypes.SELECT },
    );

    if (users.length === 0) {
      return;
    }

    const communicationTypes = ["sms", "email", "notification"];
    const messages = [
      "Seu agendamento foi confirmado",
      "Lembrete: Você tem um agendamento amanhã",
      "Obrigado por utilizar nosso serviço",
      "Sua consulta foi reagendada",
      "Confirmação de pagamento recebida",
    ];

    for (let i = 0; i < Math.min(10, users.length); i++) {
      const sentTime = new Date();
      sentTime.setHours(sentTime.getHours() - (10 - i));

      data.push({
        type: communicationTypes[i % communicationTypes.length],
        recipient_id: users[i].user_id,
        appointment_id:
          appointments.length > 0
            ? appointments[i % appointments.length].appointment_id
            : null,
        message: messages[i % messages.length],
        sent_at: sentTime,
        status: "sent",
      });
    }

    if (data.length > 0) {
      try {
        await queryInterface.bulkInsert("communications", data);
      } catch (err) {
        console.error(
          "Communications seeder error (logged and continuing):",
          err.message || err,
        );
      }
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("communications", null, {});
  },
};
