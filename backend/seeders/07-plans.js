module.exports = {
  up: async (queryInterface) => {
    const data = [];

    for (let i = 1; i <= 10; i++) {
      data.push({
        plan_id: i,
        name: `Plano ${i}`,
        price: 49.9 + i * 10,
        features: JSON.stringify([
          "agendamentos ilimitados",
          "suporte prioritário",
        ]),
        duration_months: 12,
      });
    }
    try {
      await queryInterface.bulkInsert("plans", data);
    } catch (err) {
      console.error(
        "Plans seeder error (logged and continuing):",
        err.message || err,
      );
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("plans", null, {});
  },
};
