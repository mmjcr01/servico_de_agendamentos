module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];

    const users = await queryInterface.sequelize.query(
      "SELECT user_id FROM users LIMIT 10",
      { type: Sequelize.QueryTypes.SELECT },
    );

    const plans = await queryInterface.sequelize.query(
      "SELECT plan_id FROM plans LIMIT 10",
      { type: Sequelize.QueryTypes.SELECT },
    );

    for (let i = 0; i < Math.min(users.length, plans.length); i++) {
      data.push({
        user_id: users[i].user_id,
        plan_id: plans[i].plan_id,
        start_date: "2024-01-01",
        end_date: "2024-12-31",
        status: "active",
      });
    }

    if (data.length > 0) {
      try {
        await queryInterface.bulkInsert("userplans", data);
      } catch (err) {
        console.error(
          "User-plans seeder error (logged and continuing):",
          err.message || err,
        );
      }
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("userplans", null, {});
  },
};
