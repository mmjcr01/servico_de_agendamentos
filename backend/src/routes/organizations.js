const express = require("express");

module.exports = (models) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const { page = 1, limit = 20 } = req.query;
      const offset = (Number(page) - 1) * Number(limit);
      const items = await models.Organization.findAndCountAll({
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
      const organization = await models.Organization.findByPk(req.params.id);
      if (!organization) {
        return res.status(404).json({ error: "Organização não encontrada!" });
      }
      res.json(organization);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { name, email } = req.body;
      if (!name || !email) {
        return res
          .status(400)
          .json({ error: "Nome e email são obrigatórios!" });
      }
      const newOrganization = await models.Organization.create(req.body);
      res.status(201).json(newOrganization);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const organization = await models.Organization.findByPk(req.params.id);
      if (!organization) {
        return res.status(404).json({ error: "Organização não encontrada!" });
      }
      await organization.update(req.body);
      res.json(organization);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const organization = await models.Organization.findByPk(req.params.id);
      if (!organization) {
        return res.status(404).json({ error: "Organização não encontrada!" });
      }
      await organization.destroy();
      res.json({ message: "Organização deletada com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
