module.exports = {
  up: async (queryInterface) => {
    const data = [];

    for (let i = 1; i <= 10; i++) {
      data.push({
        name: `Tag ${i}`,
        color: "#FF0000",
        description: `Descrição da tag ${i}`,
      });
    }

    try {
      await queryInterface.bulkInsert("tags", data);
    } catch (err) {
      console.error(
        "Tags seeder error (logged and continuing):",
        err.message || err,
      );
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("tags", null, {});
  },
};
