// Com o framework Express

import express from 'express';

const app = express();

app.get('/', (req ,res) => res.send('Pagina Home'))
app.get('/sobre', (req, res) => res.send('Pagina Sobre'));

app.listen(3000, () => {
  console.log('Servidor rodando no http://localhost:3000')
})

// Sem o framework Express, apenas Node Puro
// o res.send so funciona com o Express

import http from 'http';

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end('Pagina Home'); // use end com Node puro
  } else {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end('Qualquer Pagina exceto o home');
  }
})

server.listen(3000, () => console.log('Servidor rodando no http://locaslhost:3000'));