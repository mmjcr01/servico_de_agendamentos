module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];

    const services = await queryInterface.sequelize.query(
      "SELECT service_id FROM services LIMIT 10",
      { type: Sequelize.QueryTypes.SELECT },
    );

    const tags = await queryInterface.sequelize.query(
      "SELECT tag_id FROM tags LIMIT 10",
      { type: Sequelize.QueryTypes.SELECT },
    );

    for (let i = 0; i < Math.min(services.length, tags.length); i++) {
      data.push({
        service_id: services[i].service_id,
        tag_id: tags[i].tag_id,
      });
    }

    if (data.length > 0) {
      try {
        await queryInterface.bulkInsert("service_tags", data);
      } catch (err) {
        console.error(
          "Service-tags seeder error (logged and continuing):",
          err.message || err,
        );
      }
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("service_tags", null, {});
  },
};
