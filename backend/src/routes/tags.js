const express = require("express");

module.exports = (models) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const { page = 1, limit = 20 } = req.query;
      const offset = (Number(page) - 1) * Number(limit);
      const items = await models.Tag.findAndCountAll({
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
      const tag = await models.Tag.findByPk(req.params.id);
      if (!tag) {
        return res.status(404).json({ error: "Etiqueta não encontrada!" });
      }
      res.json(tag);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res
          .status(400)
          .json({ error: "Nome da etiqueta é obrigatório!" });
      }
      const newTag = await models.Tag.create(req.body);
      res.status(201).json(newTag);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const tag = await models.Tag.findByPk(req.params.id);
      if (!tag) {
        return res.status(404).json({ error: "Etiqueta não encontrada!" });
      }
      await tag.update(req.body);
      res.json(tag);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const tag = await models.Tag.findByPk(req.params.id);
      if (!tag) {
        return res.status(404).json({ error: "Etiqueta não encontrada!" });
      }
      await tag.destroy();
      res.json({ message: "Etiqueta deletada com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
