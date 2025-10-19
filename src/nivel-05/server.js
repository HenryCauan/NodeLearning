import express from 'express';

const app = express();
app.get('/', (req, res) => res.send('Ola! Node com Express'));
app.listen(3000, () => { console.log('Servidor rodando na http://localhost:3000') })