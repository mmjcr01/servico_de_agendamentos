module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];

    const agendas = await queryInterface.sequelize.query(
      "SELECT agenda_id FROM agendas LIMIT 10",
      { type: Sequelize.QueryTypes.SELECT },
    );

    const addresses = await queryInterface.sequelize.query(
      "SELECT address_id FROM addresses LIMIT 10",
      { type: Sequelize.QueryTypes.SELECT },
    );

    for (let i = 0; i < Math.min(agendas.length, addresses.length); i++) {
      data.push({
        agenda_id: agendas[i].agenda_id,
        address_id: addresses[i].address_id,
      });
    }

    if (data.length > 0) {
      try {
        await queryInterface.bulkInsert("agenda_addresses", data);
      } catch (err) {
        console.error(
          "Agenda-addresses seeder error (logged and continuing):",
          err.message || err,
        );
      }
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("agenda_addresses", null, {});
  },
};
