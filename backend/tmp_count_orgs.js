const { sequelize } = require("./src/database/database");

(async () => {
  try {
    const [results] = await sequelize.query(
      "SELECT COUNT(*) as cnt FROM organizations",
    );
    console.log(results);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
