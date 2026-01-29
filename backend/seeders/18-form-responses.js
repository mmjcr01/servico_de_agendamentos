module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];

    const forms = await queryInterface.sequelize.query(
      "SELECT form_id FROM forms LIMIT 10",
      { type: Sequelize.QueryTypes.SELECT },
    );

    const appointments = await queryInterface.sequelize.query(
      "SELECT appointment_id FROM appointments LIMIT 10",
      { type: Sequelize.QueryTypes.SELECT },
    );

    if (forms.length === 0 || appointments.length === 0) {
      return;
    }

    for (let i = 0; i < Math.min(10, forms.length, appointments.length); i++) {
      const submittedTime = new Date();
      submittedTime.setHours(submittedTime.getHours() - (10 - i));

      data.push({
        form_id: forms[i].form_id,
        appointment_id: appointments[i].appointment_id,
        data: JSON.stringify({
          observacoes: `Observações do cliente ${i + 1}`,
          historico: `Histórico médico do cliente ${i + 1}`,
          alergias: "Nenhuma alergia registrada",
        }),
        submitted_at: submittedTime,
      });
    }

    if (data.length > 0) {
      try {
        await queryInterface.bulkInsert("formresponses", data);
      } catch (err) {
        console.error(
          "Form-responses seeder error (logged and continuing):",
          err.message || err,
        );
      }
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("formresponses", null, {});
  },
};
