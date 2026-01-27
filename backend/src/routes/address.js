const express = require("express");

module.exports = (models) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const { page = 1, limit = 20 } = req.query;
      const offset = (Number(page) - 1) * Number(limit);
      const items = await models.Address.findAndCountAll({
        limit: Number(limit),
        offset,
        order: [["street", "ASC"]],
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
      const address = await models.Address.findByPk(req.params.id);
      if (!address) {
        return res.status(404).json({ error: "Endereço não encontrado!" });
      }
      res.json(address);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { street, city, state } = req.body;
      if (!street || !city || !state) {
        return res
          .status(400)
          .json({ error: "Rua, cidade e estado são obrigatórios!" });
      }
      const newAddress = await models.Address.create(req.body);
      res.status(201).json(newAddress);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const address = await models.Address.findByPk(req.params.id);
      if (!address) {
        return res.status(404).json({ error: "Endereço não encontrado!" });
      }
      await address.update(req.body);
      res.json(address);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const address = await models.Address.findByPk(req.params.id);
      if (!address) {
        return res.status(404).json({ error: "Endereço não encontrado!" });
      }
      await address.destroy();
      res.json({ message: "Endereço deletado com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
