import express from 'express';

const PORT = 3000;

let ingredients = [
  { id: 1, name: 'farinha' },
  { id: 2, name: 'feijao' },
  { id: 3, name: 'rice' },
  { id: 4, name: 'chicken' }
]
const app = express();
app.use(express.json());

app.get('/ingredients', (req, res) => {
  res.json(ingredients);
})

app.post('/ingredients', (req, res) => {
  // O que estava errado:
  // - const { name } = ingredients;  // ingredients é array, não objeto individual
  // - DataTransfer.now() não existe, o certo é Date.now()
  // - O push estava inserindo um array como um item, não um objeto novo
  // - Status 401 é erro de autorização, mas aqui o correto seria 400
  // - Faltou enviar .json() no res.status(201)

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'O nome do ingrediente é obrigatório.' });
  }

  const novoItem = { id: Date.now(), name };
  ingredients.push(novoItem);
  return res.status(201).json(novoItem);
});

app.put('/ingredients/:id', (req, res) => {
  const id = Number(req.params.id);
})

app.listen(PORT, () => { console.log(`Servidor rodando em http://localhost:3000`)  })