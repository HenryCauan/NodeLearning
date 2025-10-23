import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send(`Lista de Usuarios`);
});

export default router;