const express = require("express");
const {sequelize} = require('./src/database/database');
const {initModels} = require('./src/models/index');
const app  = express();
const port = 3000;
app.use(express.json);






app.use("/", (req, res) =>{
  res.send("hello world")
})


app.listen(port, (req,res) =>{
  console.log(`servidor iniciado na porta: ${port}`)
})