const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (models) => {
  const router = express.Router();
  const { User } = models;

  // POST /login - Autenticação de usuário
  router.post("/", async (req, res) => {
    try {
      const { email, password_hash } = req.body;

      // Validar se email e senha foram fornecidos
      if (!email || !password_hash) {
        return res.status(400).json({
          erro: "Email e senha são obrigatórios",
        });
      }

      // Buscar usuário no banco pelo email
      const user = await User.findOne({
        where: { email },
        attributes: [
          "user_id",
          "email",
          "name",
          "role",
          "password_hash",
          "is_active",
        ],
      });

      // Validar se usuário existe
      if (!user) {
        return res.status(401).json({
          erro: "Email ou senha incorretos",
        });
      }

      // Validar se usuário está ativo
      if (!user.is_active) {
        return res.status(403).json({
          erro: "Usuário inativo. Entre em contato com o administrador",
        });
      }

      // Comparar senha fornecida com hash armazenado
      const senhaValida = await bcrypt.compare(password_hash, user.password_hash);

      if (!senhaValida) {
        return res.status(401).json({
          erro: "Email ou senha incorretos",
        });
      }

      // Login bem-sucedido
      res.status(200).json({
        mensagem: "Login realizado com sucesso",
        usuario: {
          user_id: user.user_id,
          email: user.email,
          name: user.name,
          role: user.role,
        }, });
      const token = jwt.sign(
      { id: usuario.usuario_id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" });
      
      console.log(token);
      res.json({ token });
      
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      res.status(500).json({
        erro: "Erro interno do servidor",
        detalhes: error.message,
      });
    }
  });

  return router;
};
