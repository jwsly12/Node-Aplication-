const jwt = require("jsonwebtoken");
const pool = require("./db");
require("dotenv").config();

const requireAuth = (allowedRoles = []) => async (req, res, next) => {
  /*
  Esse código só checa se o token “parece um token”, 
  mas não valida se ele é verdadeiro ou assinado corretamente.
  */
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token não fornecido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET , { algorithms: ['HS256']});
    const [rows] = await pool.query("SELECT * FROM users WHERE user = ?", [decoded.username]);
    if (rows.length === 0)
      return res.status(401).json({ error: "Usuário não encontrado" });

    const user = rows[0];
    if (!allowedRoles.includes(user.role))
      return res.status(403).json({ error: "Acesso negado" });

    req.user = user;
    next();
  } catch (err) {
    console.error("ERRO NA AUTENTICAÇÃO:", err);
    res.status(500).json({ error: "Erro na verificação do token" });
  }
};

module.exports = requireAuth;


