const express = require("express");

module.exports = (models) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const { page = 1, limit = 20 } = req.query;
      const offset = (Number(page) - 1) * Number(limit);
      const items = await models.Service.findAndCountAll({
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
      const service = await models.Service.findByPk(req.params.id);
      if (!service) {
        return res.status(404).json({ error: "Serviço não encontrado!" });
      }
      res.json(service);
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
      const newService = await models.Service.create(req.body);
      res.status(201).json(newService);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const service = await models.Service.findByPk(req.params.id);
      if (!service) {
        return res.status(404).json({ error: "Serviço não encontrado!" });
      }
      await service.update(req.body);
      res.json(service);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const service = await models.Service.findByPk(req.params.id);
      if (!service) {
        return res.status(404).json({ error: "Serviço não encontrado!" });
      }
      await service.destroy();
      res.json({ message: "Serviço deletado com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
