module.exports = {
  up: async (queryInterface) => {
    const data = [];

    for (let i = 1; i <= 10; i++) {
      data.push({
        street: `Rua Exemplo ${i}`,
        city: "Salvador",
        state: "Bahia",
        zip_code: `40000-00${i}`,
        country: "BR",
        latitude: -12.97 + i * 0.001,
        longitude: -38.5 - i * 0.001,
        link_url: "https://maps.google.com",
      });
    }

    try {
      await queryInterface.bulkInsert("addresses", data);
    } catch (err) {
      console.error(
        "Addresses seeder error (logged and continuing):",
        err.message || err,
      );
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("addresses", null, {});
  },
};
