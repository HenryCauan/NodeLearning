import express from "express";
import { userModel } from "../lib/db.js";
import { validateUser, validateId } from "../middleware/validation.js";

const router = express.Router();

// GET /users - Buscar todos os usuários
router.get("/", (req, res) => {
  try {
    const users = userModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
  
});
// GET /users/:id - Buscar usuário por ID
router.get("/:id", validateId, (req, res) => {
  try {
    const user = userModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

// POST /users - Criar novo usuário
router.post("/", validateUser, (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Verificar se email já existe
    if (userModel.emailExists(email)) {
      return res.status(409).json({ error: "Email já cadastrado" });
    }

    const newUser = userModel.create(name, email, age);
    res.status(201).json(newUser);
  } catch (error) {
    if (error.message === "Email já cadastrado") {
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

// PUT /users/:id - Atualizar usuário
router.put("/:id", validateId, validateUser, (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    // Verificar se email já existe (excluindo o usuário atual)
    if (userModel.emailExists(email, id)) {
      return res.status(409).json({ error: "Email já cadastrado" });
    }

    const updatedUser = userModel.update(id, name, email, age);
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error.message === "Usuário não encontrado") {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === "Email já cadastrado") {
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

// DELETE /users/:id - Deletar usuário
router.delete("/:id", validateId, (req, res) => {
  try {
    const result = userModel.delete(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "Usuário não encontrado") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
});

export default router;
