const express = require("express");

module.exports = (models) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const { page = 1, limit = 20 } = req.query;
      const offset = (Number(page) - 1) * Number(limit);
      const items = await models.Communication.findAndCountAll({
        limit: Number(limit),
        offset,
        order: [["sent_at", "DESC"]],
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
      const communication = await models.Communication.findByPk(req.params.id);
      if (!communication) {
        return res.status(404).json({ error: "Comunicação não encontrada!" });
      }
      res.json(communication);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { type, recipient_id, message } = req.body;
      if (!type || !recipient_id || !message) {
        return res
          .status(400)
          .json({ error: "Tipo, destinatário e mensagem são obrigatórios!" });
      }
      const newCommunication = await models.Communication.create(req.body);
      res.status(201).json(newCommunication);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const communication = await models.Communication.findByPk(req.params.id);
      if (!communication) {
        return res.status(404).json({ error: "Comunicação não encontrada!" });
      }
      await communication.update(req.body);
      res.json(communication);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const communication = await models.Communication.findByPk(req.params.id);
      if (!communication) {
        return res.status(404).json({ error: "Comunicação não encontrada!" });
      }
      await communication.destroy();
      res.json({ message: "Comunicação deletada com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
