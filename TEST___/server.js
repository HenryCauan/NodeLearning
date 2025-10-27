import express from 'express';
import userRouter from './router/userRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Servir arquivos estáticos
app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor Rodando em http://localhost:${PORT}`);
});