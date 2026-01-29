module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];

    const users = await queryInterface.sequelize.query(
      "SELECT user_id FROM users LIMIT 10",
      { type: Sequelize.QueryTypes.SELECT },
    );

    if (users.length === 0) {
      return;
    }

    const actions = ["CREATE", "UPDATE", "DELETE", "VIEW", "EXPORT"];

    for (let i = 0; i < Math.min(10, users.length); i++) {
      const timestamp = new Date();
      timestamp.setHours(timestamp.getHours() - i);

      data.push({
        user_id: users[i].user_id,
        action: actions[i % actions.length],
        entity_id: i + 1,
        timestamp: timestamp,
        details: `Ação de ${actions[i % actions.length]} realizada no sistema`,
      });
    }

    if (data.length > 0) {
      try {
        await queryInterface.bulkInsert("audits", data);
      } catch (err) {
        console.error(
          "Audit-logs seeder error (logged and continuing):",
          err.message || err,
        );
      }
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("audits", null, {});
  },
};
