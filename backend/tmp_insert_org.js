const { sequelize } = require("./src/database/database");

(async () => {
  try {
    const now = new Date();
    const sql =
      "INSERT INTO organizations (name, created_at, updated_at) VALUES (:name, :created_at, :updated_at)";
    await sequelize.query(sql, {
      replacements: { name: "Test Org", created_at: now, updated_at: now },
    });
    console.log("insert ok");
    process.exit(0);
  } catch (err) {
    console.error("INSERT ERR", err);
    process.exit(1);
  }
})();
