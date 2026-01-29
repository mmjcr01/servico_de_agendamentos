module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];

    const agendas = await queryInterface.sequelize.query(
      "SELECT agenda_id FROM agendas LIMIT 10",
      { type: Sequelize.QueryTypes.SELECT },
    );

    const services = await queryInterface.sequelize.query(
      "SELECT service_id FROM services LIMIT 10",
      { type: Sequelize.QueryTypes.SELECT },
    );

    // Se não houver clientes especificados, usar clientes da tabela clients
    const clients = await queryInterface.sequelize.query(
      "SELECT client_id FROM clients LIMIT 10",
      { type: Sequelize.QueryTypes.SELECT },
    );

    const professionals = await queryInterface.sequelize.query(
      "SELECT user_id as professional_id FROM users WHERE role = 'professional' LIMIT 10",
      { type: Sequelize.QueryTypes.SELECT },
    );

    // Se algum array estiver vazio, pular
    if (
      agendas.length === 0 ||
      services.length === 0 ||
      clients.length === 0 ||
      professionals.length === 0
    ) {
      console.log("Pulando seeder de appointments - dados insuficientes");
      return;
    }

    const now = new Date();
    const startTime = new Date(now.getTime() + 3600000);

    for (
      let i = 0;
      i <
      Math.min(
        agendas.length,
        services.length,
        clients.length,
        professionals.length,
      );
      i++
    ) {
      const start = new Date(startTime.getTime() + i * 3600000);
      const end = new Date(start.getTime() + 3600000);

      data.push({
        agenda_id: agendas[i].agenda_id,
        service_id: services[i].service_id,
        client_id: clients[i].client_id,
        professional_id: professionals[i].professional_id,
        start_time: start,
        end_time: end,
        status: "confirmed",
        notes: "Agendamento teste",
        custom_appointment_data: JSON.stringify({ tipo: "normal" }),
        created_at: now,
        updated_at: now,
      });
    }

    if (data.length > 0) {
      try {
        await queryInterface.bulkInsert("appointments", data);
      } catch (err) {
        console.error(
          "Appointments seeder error (logged and continuing):",
          err.message || err,
        );
      }
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("appointments", null, {});
  },
};
