// Controla a aplicação principal, configurações globais

import express from 'express';
import produtosRouter from './produtos.js'; // Importa as rotas de produtos

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Usa as rotas de produtos no caminho '/produtos'
app.use('/produtos', produtosRouter);

// Rota principal
app.get('/', (req, res) => {
  res.status(200).send('API de Cafés Especiais');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
