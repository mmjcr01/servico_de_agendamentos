const express = require("express");

module.exports = (models) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const { page = 1, limit = 20 } = req.query;
      const offset = (Number(page) - 1) * Number(limit);
      const items = await models.Agenda.findAndCountAll({
        limit: Number(limit),
        offset,
        order: [["created_at", "DESC"]],
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
      const agenda = await models.Agenda.findByPk(req.params.id);
      if (!agenda) {
        return res.status(404).json({ error: "Agenda não encontrada!" });
      }
      res.json(agenda);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { name, organization_id } = req.body;
      if (!name || !organization_id) {
        return res
          .status(400)
          .json({ error: "Nome e organização são obrigatórios!" });
      }
      const newAgenda = await models.Agenda.create(req.body);
      res.status(201).json(newAgenda);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const agenda = await models.Agenda.findByPk(req.params.id);
      if (!agenda) {
        return res.status(404).json({ error: "Agenda não encontrada!" });
      }
      await agenda.update(req.body);
      res.json(agenda);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const agenda = await models.Agenda.findByPk(req.params.id);
      if (!agenda) {
        return res.status(404).json({ error: "Agenda não encontrada!" });
      }
      await agenda.destroy();
      res.json({ message: "Agenda deletada com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
