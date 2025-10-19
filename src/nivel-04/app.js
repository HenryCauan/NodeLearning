import http from 'http';

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-type': 'text/html' })
    res.end('Pagina Sobre');
  } else if (req.url === '/api') {
    res.end(JSON.stringify({ msg: ' API Node pura' }));
  }
})

server.listen(3000, () => { console.log('o server esta funcionado no http://localhost:3000/') })