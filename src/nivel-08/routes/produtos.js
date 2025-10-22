// Controla TUDO relacionado a produtos (rotas, lógica, dados)

import express from 'express';
const router = express.Router();

// Array de produtos
const produtos = [
  { id: 1, nome: "Café Arábica Orgânico", origem: "Sul de Minas", peso: 250, tipo: "Grão" },
  { id: 2, nome: "Café Bourbon Amarelo", origem: "Chapada Diamantina", peso: 500, tipo: "Moído" },
  { id: 3, nome: "Café Catuaí Vermelho", origem: "Cerrado Mineiro", peso: 250, tipo: "Grão" },
];

// Rota GET para listar todos os produtos
router.get('/', (req, res) => {
  res.status(200).json(produtos);
});

// Rota GET para buscar produto por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === id);
  
  if (produto) {
    res.status(200).json(produto);
  } else {
    res.status(404).json({ error: 'Produto não encontrado' });
  }
});

// Exporta o router para ser usado em outros arquivos
export default router;
