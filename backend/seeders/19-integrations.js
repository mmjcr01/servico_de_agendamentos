module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];

    const organizations = await queryInterface.sequelize.query(
      "SELECT organization_id FROM organizations LIMIT 10",
      { type: Sequelize.QueryTypes.SELECT },
    );

    if (organizations.length === 0) {
      return;
    }

    const integrationTypes = [
      "stripe",
      "google_calendar",
      "slack",
      "zapier",
      "webhook",
    ];

    for (let i = 0; i < Math.min(10, organizations.length); i++) {
      data.push({
        organization_id:
          organizations[i % organizations.length].organization_id,
        type: integrationTypes[i % integrationTypes.length],
        api_key: `api_key_${i + 1}_${Date.now()}`,
        config: JSON.stringify({
          webhook_url: `https://api.example.com/webhooks/${i + 1}`,
          timeout: 30,
          retry: true,
          max_retries: 3,
        }),
        is_active: i % 2 === 0,
      });
    }

    if (data.length > 0) {
      try {
        await queryInterface.bulkInsert("integrations", data);
      } catch (err) {
        console.error(
          "Integrations seeder error (logged and continuing):",
          err.message || err,
        );
      }
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("integrations", null, {});
  },
};
