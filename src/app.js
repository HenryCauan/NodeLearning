import express from "express";

const PORT = 3000;

let ingredients = [
  { id: 1, name: "farinha" },
  { id: 2, name: "feijao" },
  { id: 3, name: "rice" },
  { id: 4, name: "chicken" },
];
const app = express();
app.use(express.json());

app.get("/ingredients", (req, res) => {
  res.json(ingredients);
});

app.post("/ingredients", (req, res) => {
  // O que estava errado:
  // - const { name } = ingredients;  // ingredients é array, não objeto individual
  // - DataTransfer.now() não existe, o certo é Date.now()
  // - O push estava inserindo um array como um item, não um objeto novo
  // - Status 401 é erro de autorização, mas aqui o correto seria 400
  // - Faltou enviar .json() no res.status(201)

  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ error: "O nome do ingrediente é obrigatório." });
  }

  const novoItem = { id: Date.now(), name };
  ingredients.push(novoItem);
  return res.status(201).json(novoItem);
});

// app.put('/ingredients/:id', (req, res) => {
//   const novo = req.body;
//   const id = Number(req.params.id);
//   const searchIn = ingredients.map(i => i.id === id);
//   if (!searchIn) {
//     return res.status(500).json({ error : 'ingredient nao encontrado ou nao existe' })
//   }
//   ingredients[id] = [...ingredients, { id: Date.now(), novo }];
//   res.status(201).json(novo);
// })

app.put("/ingredients/:id", (req, res) => {
  const novo = req.body;
  const id = Number(req.params.id);

  // Encontrar o índice do ingrediente
  const index = ingredients.findIndex((i) => i.id === id);

  //   O -1 é o valor de retorno padrão do método findIndex() quando ele não encontra o elemento procurado.
  // Como funciona o findIndex():
  // Retorna a posição (índice) do elemento se encontrar (0, 1, 2, 3...)
  // Retorna -1 se NÃO encontrar o elemento
  if (index === -1) {
    return res.status(404).json({ error: "Ingrediente não encontrado" });
  }

  // Atualizar o ingrediente existente
  ingredients[index] = { ...ingredients[index], ...novo };

  res.status(200).json(ingredients[index]);
});

app.delete("/ingredients/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = ingredients.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Ingrediente não encontrado" });
  }

  ingredients.splice(index, 1);
  res.status(200).json({ mensagem: `Item ${index} removido com sucess` });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:3000`);
});
