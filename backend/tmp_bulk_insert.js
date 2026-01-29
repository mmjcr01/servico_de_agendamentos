const { sequelize } = require("./src/database/database");

(async () => {
  try {
    const queryInterface = sequelize.getQueryInterface();
    const now = new Date();
    const data = [
      {
        name: "Bulk Org Test",
        description: "desc",
        address: "addr",
        phone: "123",
        email: "bulk@test.com",
        logo_url: "url",
        timezone: "tz",
        currency: "BRL",
        custom_settings: JSON.stringify({ tema: "escuro" }),
        created_at: now,
        updated_at: now,
      },
    ];

    await queryInterface.bulkInsert("organizations", data);
    console.log("bulk insert ok");
    process.exit(0);
  } catch (err) {
    console.error("BULK INSERT ERROR", err);
    process.exit(1);
  }
})();
