import express from 'express';

const PORT = 3000;

let produtos = [
  { id: 1, nome: 'Notebook' },
  { id: 2, nome: 'Smartphone' },
];

const app = express();

app.use(express.json());

// Rota para listar os produtos
app.get('/produtos', (req, res) => {
  res.json(produtos);
});

// Rota para criar um novo produto
app.post('/produtos', (req, res) => {
  /*
    Por que foi utilizada a desestruturação de objeto com o req.body?
    -----------------------------------------------------------------
    - O req.body é um objeto que contém todos os dados enviados pelo cliente no corpo da requisição.
    - Usar a desestruturação ({ nome } = req.body) permite extrair diretamente apenas as propriedades desejadas, 
      facilitando o acesso e evitando a necessidade de acessar req.body.nome toda vez.
    - Isso torna o código mais limpo, legível e reduz a chance de erros caso trabalhe com várias propriedades.
    - Por exemplo:
        const { nome, preco, quantidade } = req.body;
      Dessa forma, já temos cada valor separado em uma variável, em vez de acessar um por um via req.body.
    
    Exemplo prático:
      Se o JSON enviado ao POST for: { "nome": "Teclado" }
      Após a desestruturação: nome === "Teclado"
  */
  const { nome } = req.body;

  if (!nome) {
    // Validação simples: nome é obrigatório
    return res.status(400).json({ erro: 'O nome do produto é obrigatório.' });
  }

  // Gerar um id simples para o novo produto
  const novoProduto = { id: Date.now(), nome };
  produtos.push(novoProduto);

  // Retorna o novo produto criado (201 = Created)
  res.status(201).json(novoProduto);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

/*
Como criar um novo produto no Postman:

1. Abra o Postman.
2. Selecione o método "POST".
3. No campo de URL, digite: http://localhost:3000/produtos
4. Clique na aba "Body".
5. Selecione a opção "raw" e, à direita, escolha "JSON".
6. No campo de texto, insira o seguinte JSON:
{
  "nome": "Teclado"
}
7. Clique em "Send".

Se tudo estiver correto, a resposta será o novo produto criado, com o id gerado automaticamente.
*/