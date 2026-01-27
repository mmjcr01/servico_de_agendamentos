const express = require("express");

module.exports = (models) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const { page = 1, limit = 20 } = req.query;
      const offset = (Number(page) - 1) * Number(limit);
      const items = await models.Form.findAndCountAll({
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
      const form = await models.Form.findByPk(req.params.id);
      if (!form) {
        return res.status(404).json({ error: "Formulário não encontrado!" });
      }
      res.json(form);
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
          .json({ error: "Nome do formulário é obrigatório!" });
      }
      const newForm = await models.Form.create(req.body);
      res.status(201).json(newForm);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const form = await models.Form.findByPk(req.params.id);
      if (!form) {
        return res.status(404).json({ error: "Formulário não encontrado!" });
      }
      await form.update(req.body);
      res.json(form);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const form = await models.Form.findByPk(req.params.id);
      if (!form) {
        return res.status(404).json({ error: "Formulário não encontrado!" });
      }
      await form.destroy();
      res.json({ message: "Formulário deletado com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
