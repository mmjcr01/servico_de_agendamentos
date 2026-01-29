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
        name: `Serviço ${i}`,
        description: `Descrição do serviço ${i}`,
        default_duration_minutes: 60,
        price: 100 + i,
        category: "Geral",
        is_active: true,
        requires_confirmation: false,
        custom_fields_definition: JSON.stringify([{ key: "tipo" }]),
        created_at: now,
        updated_at: now,
      });
    }

    try {
      await queryInterface.bulkInsert("services", data);
    } catch (err) {
      console.error(
        "Services seeder error (logged and continuing):",
        err.message || err,
      );
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("services", null, {});
  },
};
