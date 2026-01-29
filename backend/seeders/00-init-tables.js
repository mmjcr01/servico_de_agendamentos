module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inicializa modelos e sincroniza (cria tabelas faltantes)
    const { initModels } = require("../src/models");
    initModels(queryInterface.sequelize);
    // Não forçar (não apagar dados existentes)
    await queryInterface.sequelize.sync({ alter: true });
  },

  down: async () => {
    // Não remove tabelas automaticamente
    return;
  },
};
