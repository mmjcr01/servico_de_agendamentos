const express = require("express");

module.exports = (models) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const { page = 1, limit = 20 } = req.query;
      const offset = (Number(page) - 1) * Number(limit);
      const items = await models.Plan.findAndCountAll({
        limit: Number(limit),
        offset,
        order: [["name", "ASC"]],
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
      const plan = await models.Plan.findByPk(req.params.id);
      if (!plan) {
        return res.status(404).json({ error: "Plano não encontrado!" });
      }
      res.json(plan);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { name, price } = req.body;
      if (!name || !price) {
        return res
          .status(400)
          .json({ error: "Nome e preço são obrigatórios!" });
      }
      const newPlan = await models.Plan.create(req.body);
      res.status(201).json(newPlan);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const plan = await models.Plan.findByPk(req.params.id);
      if (!plan) {
        return res.status(404).json({ error: "Plano não encontrado!" });
      }
      await plan.update(req.body);
      res.json(plan);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const plan = await models.Plan.findByPk(req.params.id);
      if (!plan) {
        return res.status(404).json({ error: "Plano não encontrado!" });
      }
      await plan.destroy();
      res.json({ message: "Plano deletado com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
