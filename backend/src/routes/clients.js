const express = require('express');

module.exports = (models) =>{
  const router = express.Router();

    router.get('/', async (req, res) => {
      const { page = 1, limit = 20} = req.query;
      const offset = (Number(page) - 1) * Number(limit);
      const itens = await models.Client.findAndCountAll({ limit: Number(limit), offset, order: [['data_criacao', 'DESC']] });
      res.json({ total: itens.count, page: Number(page), limit: Number(limit), data: itens.rows });
    });

    router.get('/:id', async (req, res)=>{
      const client = await models.Client.findByPk(req.params.id)
      if (!client){
        return res.status(404).send("Cliente não encontrado!!");
      }
      res.json(client)
    });
    router.post("/", async(req, res) =>{
      const {client_id, name, email, phone, address } = req.body
      if ( !client_id || !name || !email || !phone || !address )
        return res.status(401).send("Campos obrigatórios não preenchidos!");
      const newClient = await models.Client.create({...req.body});
      res.json(newClient);
    })
    
    
    router.put("/", async(req,res)=>{
      const {client_id, name, email, phone, address } = req.body;
      const client = await models.Client.findByPk(client_id)
      if (!client){
        return res.status(404).send("Cliente não encontrado!");
      };
      if ( !client_id || !name || !email || !phone || !address )
        return res.status(401).send("Campos obrigatórios não preenchidos!");
      await client.update({...req.body});
      res.json(client);  
    });

    router.delete("/:id", async(req, res)=>{
      const client = await models.Client.findByPk(req.params.id);
      if (!client) return res.status(404).send("Usuário não encontrado!");
      await client.destroy()
      res.json(client)
     
    })

    return router;
  }

