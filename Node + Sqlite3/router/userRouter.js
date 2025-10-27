import express from "express";
import { useModel } from "../lib/db";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const selectAll = useModel.getAll();
    res.status(200).json(selectAll);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

router.get("/:id", (req, res) => {
  try {
    const user = req.params.id;
    const selectId = useModel.selectId(user);

    if (!selectId) {
      return res.status(401).json({ message: `Usuario nao encontrado.` });
    }

    res.status(200).json(selectIdd);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put('/', (req, res) => {
  try {
    const { name, age, email } = req.body;
    const newUser  = useModel.create(name, age, email);

    if(!name && !age && !email) {
      res.status(401).json({ mensagem: `Informacao Imcompletas` })
    }

    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json({ errr : err });
  }
})

export default router;