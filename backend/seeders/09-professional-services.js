module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];

    // Buscar os usuários que são profissionais
    const professionals = await queryInterface.sequelize.query(
      "SELECT user_id FROM users WHERE role = 'professional' LIMIT 10",
      { type: Sequelize.QueryTypes.SELECT },
    );

    // Buscar os serviços
    const services = await queryInterface.sequelize.query(
      "SELECT service_id FROM services LIMIT 10",
      { type: Sequelize.QueryTypes.SELECT },
    );

    // Criar registros
    if (professionals.length > 0 && services.length > 0) {
      for (let i = 0; i < Math.min(10, services.length); i++) {
        data.push({
          professional_id: professionals[i % professionals.length].user_id,
          service_id: services[i].service_id,
          custom_price: 150 + (i + 1) * 5,
          custom_duration_minutes: 90,
          availability_rules: JSON.stringify({
            dias: ["segunda", "quarta", "sexta"],
          }),
        });
      }

      try {
        await queryInterface.bulkInsert("professionals_services", data);
      } catch (err) {
        console.error(
          "Professional-services seeder error (logged and continuing):",
          err.message || err,
        );
      }
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("professionals_services", null, {});
  },
};
