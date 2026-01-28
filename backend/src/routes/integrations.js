const express = require("express");

module.exports = (models) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const { page = 1, limit = 20 } = req.query;
      const offset = (Number(page) - 1) * Number(limit);
      const items = await models.Integration.findAndCountAll({
        limit: Number(limit),
        offset,
        order: [["type", "ASC"]],
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
      const integration = await models.Integration.findByPk(req.params.id);
      if (!integration) {
        return res.status(404).json({ error: "Integração não encontrada!" });
      }
      res.json(integration);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { type, organization_id } = req.body;
      if (!type || !organization_id) {
        return res
          .status(400)
          .json({ error: "Tipo e organização são obrigatórios!" });
      }
      const newIntegration = await models.Integration.create(req.body);
      res.status(201).json(newIntegration);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const integration = await models.Integration.findByPk(req.params.id);
      if (!integration) {
        return res.status(404).json({ error: "Integração não encontrada!" });
      }
      await integration.update(req.body);
      res.json(integration);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const integration = await models.Integration.findByPk(req.params.id);
      if (!integration) {
        return res.status(404).json({ error: "Integração não encontrada!" });
      }
      await integration.destroy();
      res.json({ message: "Integração deletada com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
