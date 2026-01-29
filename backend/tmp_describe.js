const { sequelize } = require("./src/database/database");

(async () => {
  try {
    const [results] = await sequelize.query("DESCRIBE organizations");
    console.log(results);
    process.exit(0);
  } catch (err) {
    console.error("ERR", err);
    process.exit(1);
  }
})();
