module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];
    const organizations = await queryInterface.sequelize.query(
      "SELECT organization_id FROM organizations",
      { type: Sequelize.QueryTypes.SELECT },
    );

    for (let i = 1; i <= 10; i++) {
      const now = new Date();
      data.push({
        organization_id:
          organizations[(i - 1) % organizations.length].organization_id,
        name: `Agenda ${i}`,
        description: `Agenda da organização ${i}`,
        is_active: true,
        custom_rules: JSON.stringify({ integracao: "N8N" }),
        created_at: now,
      });
    }

    try {
      await queryInterface.bulkInsert("agendas", data);
    } catch (err) {
      console.error(
        "Agendas seeder error (logged and continuing):",
        err.message || err,
      );
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("agendas", null, {});
  },
};
