import express from "express";
import userRouter from "./router/userRouter.js";

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rota principal
app.get("/", (req, res) => {
  res.json({
    message: "API de Usuários com SQLite",
    endpoints: {
      "GET /users": "Listar todos os usuários",
      "GET /users/:id": "Buscar usuário por ID",
      "POST /users": "Criar novo usuário",
      "PUT /users/:id": "Atualizar usuário",
      "DELETE /users/:id": "Deletar usuário",
    },
  });
});

// Usar rotas de usuários
app.use("/users", userRouter);

// Middleware para rotas não encontradas
app.use("*", (req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  console.error("Erro:", error);
  res.status(500).json({ error: "Erro interno do servidor" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(
    `📊 Banco de dados SQLite criado em: src/nivel-10/database/app.db`
  );
});
