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

    const reportTypes = [
      "appointments",
      "revenue",
      "clients",
      "services",
      "professionals",
    ];

    for (let i = 0; i < Math.min(10, users.length); i++) {
      const generatedTime = new Date();
      generatedTime.setDate(generatedTime.getDate() - i);

      data.push({
        type: reportTypes[i % reportTypes.length],
        generated_at: generatedTime,
        data: JSON.stringify({
          title: `Relatório de ${reportTypes[i % reportTypes.length]}`,
          period: "2024",
          total: Math.floor(Math.random() * 1000) + 100,
          details: `Relatório detalhado do tipo ${reportTypes[i % reportTypes.length]}`,
        }),
        user_id: users[i].user_id,
      });
    }

    if (data.length > 0) {
      try {
        await queryInterface.bulkInsert("reports", data);
      } catch (err) {
        console.error(
          "Reports seeder error (logged and continuing):",
          err.message || err,
        );
      }
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("reports", null, {});
  },
};
