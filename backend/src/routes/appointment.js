const express = require("express");

module.exports = (models) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const { page = 1, limit = 20 } = req.query;
      const offset = (Number(page) - 1) * Number(limit);
      const items = await models.Appointment.findAndCountAll({
        limit: Number(limit),
        offset,
        order: [["start_time", "DESC"]],
      });
      res.json({
        total: items.count,
        page: Number(page),
        limit: Number(limit),
        data: items.rows,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const appointment = await models.Appointment.findByPk(req.params.id);
      if (!appointment) {
        return res.status(404).json({ error: "Agendamento não encontrado!" });
      }
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { start_time, end_time, client_id, service_id } = req.body;
      if (!start_time || !end_time || !client_id || !service_id) {
        return res
          .status(400)
          .json({
            error:
              "start_time, end_time, client_id e service_id são obrigatórios!",
          });
      }
      const newAppointment = await models.Appointment.create(req.body);
      res.status(201).json(newAppointment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const appointment = await models.Appointment.findByPk(req.params.id);
      if (!appointment) {
        return res.status(404).json({ error: "Agendamento não encontrado!" });
      }
      await appointment.update(req.body);
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const appointment = await models.Appointment.findByPk(req.params.id);
      if (!appointment) {
        return res.status(404).json({ error: "Agendamento não encontrado!" });
      }
      await appointment.destroy();
      res.json({ message: "Agendamento deletado com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
