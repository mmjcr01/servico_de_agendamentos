const express = require("express");

module.exports = (models) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const { page = 1, limit = 20 } = req.query;
      const offset = (Number(page) - 1) * Number(limit);
      const items = await models.Report.findAndCountAll({
        limit: Number(limit),
        offset,
        order: [["generated_at", "DESC"]],
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
      const report = await models.Report.findByPk(req.params.id);
      if (!report) {
        return res.status(404).json({ error: "Relatório não encontrado!" });
      }
      res.json(report);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { type } = req.body;
      if (!type) {
        return res
          .status(400)
          .json({ error: "Tipo do relatório é obrigatório!" });
      }
      const newReport = await models.Report.create(req.body);
      res.status(201).json(newReport);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const report = await models.Report.findByPk(req.params.id);
      if (!report) {
        return res.status(404).json({ error: "Relatório não encontrado!" });
      }
      await report.update(req.body);
      res.json(report);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const report = await models.Report.findByPk(req.params.id);
      if (!report) {
        return res.status(404).json({ error: "Relatório não encontrado!" });
      }
      await report.destroy();
      res.json({ message: "Relatório deletado com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
