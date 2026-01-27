const sequelize = require('./database');


(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado ao MySQL com sucesso');
  } catch (error) {
    console.error('❌ Erro ao conectar no banco:', error);
  }
})();