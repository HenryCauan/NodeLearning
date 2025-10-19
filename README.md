Perfeito 👏 — aprender **Node.js** e **Express** de forma prática é o melhor caminho.
Abaixo vou te passar **exercícios progressivos**, divididos em **níveis (básico → intermediário → avançado)**, pra você aprender **Node puro** primeiro e depois **Express**.
Cada exercício vem com o **objetivo**, **o que você deve praticar**, e **dicas**.

---

## 🟩 **PARTE 1 — Node.js Puro**

Aprender o que está por trás do Express (sem frameworks).

### 🧩 1. “Olá, Node!”

**Objetivo:** entender como rodar um arquivo Node.

* Crie um arquivo `app.js`
* Adicione:

  ```js
  console.log("Olá, Node.js!");
 ```
* Rode com:

  ```bash
  node app.js
  ```

> 🧠 Pratique: `node`, `npm init`, `package.json`.

---

### 📂 2. Ler e escrever arquivos

**Objetivo:** entender o módulo `fs` (file system).
Crie um script que:

1. Cria um arquivo `dados.txt` com um texto.
2. Lê o conteúdo e mostra no console.

```js
const fs = require('fs');

fs.writeFileSync('dados.txt', 'Aprendendo Node!');
const conteudo = fs.readFileSync('dados.txt', 'utf8');
console.log(conteudo);
```

> 🧠 Pratique: `fs.writeFileSync`, `fs.readFileSync`.

---

### 🌐 3. Criar um servidor HTTP manualmente

**Objetivo:** entender o que o Express simplifica.
Use o módulo `http` para criar um servidor básico:

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Servidor Node puro funcionando!');
});

server.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
```

> 🧠 Pratique: `http.createServer`, `res.writeHead`, `res.end`.

---

### 💡 4. Servidor que retorna HTML

**Objetivo:** manipular tipos de resposta.
Mude o `Content-Type` para `text/html` e retorne uma página simples com tags HTML.

---

### 🧾 5. Criar uma mini API sem Express

**Objetivo:** simular rotas.
Faça o servidor responder diferente conforme o `req.url`:

```js
if (req.url === '/sobre') res.end('Página Sobre');
else if (req.url === '/api') res.end(JSON.stringify({ msg: 'API Node pura' }));
```

> 🧠 Pratique: `req.url`, `JSON.stringify`.

---

## 🟨 **PARTE 2 — Introdução ao Express**                                                  

### ⚙️ 6. Criar servidor com Express

**Objetivo:** usar o básico do framework.
Instale:

```bash
npm install express
```

Crie `server.js`:

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Olá, Express!'));
app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
```

> 🧠 Pratique: `app.get`, `app.listen`.

---

### 🧭 7. Rotas múltiplas

**Objetivo:** entender roteamento.
Adicione:

```js
app.get('/sobre', (req, res) => res.send('Sobre nós'));
app.get('/contato', (req, res) => res.send('Página de contato'));
```

> 🧠 Pratique: `req.params`, `req.query`.

---

### 📤 8. Criar uma API de produtos

**Objetivo:** simular um CRUD (sem banco).
Crie um array de produtos e rotas:

```js
let produtos = [
  { id: 1, nome: 'Notebook' },
  { id: 2, nome: 'Mouse' },
];

app.get('/produtos', (req, res) => res.json(produtos));
app.post('/produtos', express.json(), (req, res) => {
  const novo = { id: Date.now(), ...req.body };
  produtos.push(novo);
  res.status(201).json(novo);
});
```

> 🧠 Pratique: `req.body`, `express.json()`, `res.status()`.

---

### 🧰 9. Atualizar e excluir itens (PUT e DELETE)

**Objetivo:** completar o CRUD.
Adicione:

```js
app.put('/produtos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = produtos.findIndex(p => p.id === id);
  produtos[index] = { ...produtos[index], ...req.body };
  res.json(produtos[index]);
});

app.delete('/produtos/:id', (req, res) => {
  produtos = produtos.filter(p => p.id !== Number(req.params.id));
  res.sendStatus(204);
});
```

> 🧠 Pratique: rotas dinâmicas com `:id`.

---

## 🟥 **PARTE 3 — Avançando com Express**

### 🧩 10. Separar rotas em arquivos

Crie uma pasta `routes/` e um arquivo `produtos.js`:

```js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Todos os produtos'));
module.exports = router;
```

E no `server.js`:

```js
const produtosRouter = require('./routes/produtos');
app.use('/produtos', produtosRouter);
```

> 🧠 Pratique: `express.Router`, `module.exports`.

---

### 🧑‍💻 11. Middleware personalizado

Crie um middleware que loga a rota acessada:

```js
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
```

> 🧠 Pratique: `next()`, ordem dos middlewares.

---

### 🗄️ 12. Integração com Banco de Dados

**Objetivo:** usar SQLite ou Supabase.

* Crie um CRUD real com `sqlite3` (local) ou Supabase (API).
* Use `async/await` e rotas REST.

---

### 🚀 13. Projeto final

**Desafio:** Crie uma API completa com:

* CRUD de usuários ou tarefas
* Validação dos dados
* Middlewares de autenticação (token fictício)
* Banco de dados (SQLite ou Supabase)

---

Quer que eu monte um **plano de estudo semanal com esses exercícios**, tipo “Semana 1 → Node básico”, “Semana 2 → Express”, com tarefas diárias e desafios práticos? Isso ajuda muito na retenção.
