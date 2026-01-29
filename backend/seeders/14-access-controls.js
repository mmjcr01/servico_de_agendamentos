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

    const permissions = ["read", "write", "delete", "create", "approve"];

    for (let i = 0; i < Math.min(10, users.length); i++) {
      data.push({
        user_id: users[i].user_id,
        permission: permissions[i % permissions.length],
        granted_by: users[0].user_id,
      });
    }

    if (data.length > 0) {
      try {
        await queryInterface.bulkInsert("access_controls", data);
      } catch (err) {
        console.error(
          "Access-controls seeder error (logged and continuing):",
          err.message || err,
        );
      }
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("access_controls", null, {});
  },
};
