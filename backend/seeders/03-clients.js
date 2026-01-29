module.exports = {
  up: async (queryInterface) => {
    const clients = [];

    for (let i = 1; i <= 10; i++) {
      const now = new Date();
      clients.push({
        user_id: null,
        name: `Cliente ${i}`,
        email: `cliente${i}@email.com`,
        phone: `(71) 98888-00${i}`,
        address: `Rua Cliente ${i}`,
        notes: "Cliente cadastrado via seeder",
        created_at: now,
      });
    }

    try {
      await queryInterface.bulkInsert("clients", clients);
    } catch (err) {
      console.error(
        "Clients seeder error (logged and continuing):",
        err.message || err,
      );
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Clients", null, {});
  },
};
