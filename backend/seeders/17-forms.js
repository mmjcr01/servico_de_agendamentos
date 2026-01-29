module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];

    const services = await queryInterface.sequelize.query(
      "SELECT service_id FROM services LIMIT 10",
      { type: Sequelize.QueryTypes.SELECT },
    );

    for (let i = 0; i < Math.min(10, services.length); i++) {
      data.push({
        name: `Formulário ${i + 1}`,
        fields: JSON.stringify([
          {
            name: "observacoes",
            label: "Observações",
            type: "text",
            required: false,
          },
          {
            name: "historico",
            label: "Histórico Médico",
            type: "textarea",
            required: true,
          },
          {
            name: "alergias",
            label: "Alergias",
            type: "text",
            required: false,
          },
        ]),
        service_id: services[i].service_id,
      });
    }

    if (data.length > 0) {
      try {
        await queryInterface.bulkInsert("forms", data);
      } catch (err) {
        console.error(
          "Forms seeder error (logged and continuing):",
          err && err.parent ? err.parent.sqlMessage : err,
          err,
        );
      }
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("forms", null, {});
  },
};
