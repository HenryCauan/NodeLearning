// === Explicação detalhada do código ===

// Este código usa Node.js puro para criar um servidor HTTP que responde com uma página em HTML.

// 1. Importa o módulo 'http' embutido do Node.js para criar o servidor.
import http from 'http';

// 2. Criação do servidor HTTP:
// - http.createServer recebe uma função callback que é executada a cada requisição.
// - req: representa a requisição feita ao servidor (por exemplo, navegador acessando localhost:3000).
// - res: representa a resposta que será enviada para quem fez o pedido.
const server = http.createServer((req, res) => {
  // 3. Configura o cabeçalho da resposta HTTP:
  // - res.writeHead define Status Code (200 = OK) e os cabeçalhos (headers)
  // - "Content-Type": "text/html" indica que a resposta será em HTML
  res.writeHead(200, { "Content-Type": "text/html" });

  // 4. Envia uma página HTML “básica” como resposta.
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Servidor Node</title>
      </head>
      <body>
        <h1>Servidor Node puro funcionando!</h1>
        <p>Mensagem retornada em <strong>HTML</strong> 😀</p>
      </body>
    </html>
  `);
});

// 5. Faz o servidor escutar na porta 3000 e mostra uma mensagem no terminal.
server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});


/*
====================
Explicando os argumentos de res.writeHead
====================

A função res.writeHead recebe:
  1. Um status code (ex: 200 para sucesso, 404 para não encontrado, 500 para erro de servidor etc)
  2. Um objeto com os cabeçalhos HTTP de resposta.

O cabeçalho mais comum é "Content-Type", que diz ao navegador o tipo da resposta.

Alguns exemplos úteis de Content-Type:

- "text/html": Resposta é HTML.
- "text/plain": Resposta é texto puro (sem formatação).
- "application/json": Resposta é JSON (muito usado em APIs).
- "image/png": Quando você retorna uma imagem PNG.
- "text/css": Arquivo CSS.
- "application/javascript": Arquivo JS.

Exemplos de uso:
res.writeHead(200, { "Content-Type": "application/json" });
res.writeHead(404, { "Content-Type": "text/plain" });
res.writeHead(200, { "Content-Type": "image/jpeg" });

Também podemos passar outros cabeçalhos, como:
res.writeHead(200, {
  "Content-Type": "text/html",
  "X-Powered-By": "Node.js"
});

====================
Quando usar o parâmetro req dentro do http.createServer
====================

O parâmetro req (request) representa a requisição feita pelo cliente (navegador, API, etc), e você usa ele para:

- Saber qual URL/rota o usuário acessou (req.url)
- Verificar o método HTTP usado (GET, POST, etc) através de req.method
- Ler headers enviados pelo cliente (req.headers)
- Pegar dados enviados, por exemplo, em métodos POST (lendo o corpo da requisição – body)

Exemplos práticos de uso do req:

// Responder diferente dependendo da URL acessada:
const server = http.createServer((req, res) => {
  if (req.url === "/sobre") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Página Sobre</h1>");
  } else if (req.url === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ msg: "Esta é uma mini API!" }));
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Home</h1>");
  }
});

// Verificar o método HTTP:
if (req.method === "POST") {
  // Processar dados enviados pelo usuário
}

// Acessar headers da requisição:
console.log(req.headers);

// Para ler dados enviados em POST (exemplo simples):
let body = "";
req.on("data", chunk => {
  body += chunk;
});
req.on("end", () => {
  console.log("Dados recebidos no body:", body);
});
*/