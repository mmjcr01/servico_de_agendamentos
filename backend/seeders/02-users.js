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
        email: `user${i}@email.com`,
        password_hash: "hash_fake",
        name: `Usuário ${i}`,
        phone: `(71) 98888-000${i}`,
        role: i <= 5 ? "professional" : "admin",
        profile_picture_url: `https://avatar.com/${i}.png`,
        is_active: true,
        custom_profile_data: JSON.stringify({ nivel: "senior" }),
        created_at: now,
        updated_at: now,
      });
    }

    try {
      await queryInterface.bulkInsert("users", data);
    } catch (err) {
      console.error(
        "Users seeder error (logged and continuing):",
        err.message || err,
      );
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
