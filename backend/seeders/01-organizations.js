module.exports = {
  up: async (queryInterface) => {
    const data = [];

    for (let i = 1; i <= 10; i++) {
      const now = new Date();
      data.push({
        name: `Organização ${i}`,
        description: `Descrição da organização ${i}`,
        address: `Rua ${i}, Salvador`,
        phone: `(71) 99999-000${i}`,
        email: `org${i}@email.com`,
        logo_url: `https://logo.com/${i}.png`,
        timezone: "America/Sao_Paulo",
        currency: "BRL",
        custom_settings: JSON.stringify({ tema: "escuro" }),
        created_at: now,
        updated_at: now,
      });
    }

    console.log("Organizations seeder: inserting", data.length, "records");
    console.log("sample:", JSON.stringify(data[0]));
    try {
      await queryInterface.bulkInsert("organizations", data);
    } catch (err) {
      console.error(
        "Organizations seeder error (logged and continuing):",
        err.message || err,
      );
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("organizations", null, {});
  },
};
