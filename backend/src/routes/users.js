const express = require("express");

module.exports = (models) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const { page = 1, limit = 20 } = req.query;
      const offset = (Number(page) - 1) * Number(limit);
      const items = await models.User.findAndCountAll({
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
      const user = await models.User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { email, name, role } = req.body;
      if (!email || !name || !role) {
        return res
          .status(400)
          .json({ error: "Email, nome e role são obrigatórios!" });
      }
      const newUser = await models.User.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const user = await models.User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
      }
      await user.update(req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const user = await models.User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
      }
      await user.destroy();
      res.json({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
