import express from 'express';
import logRequest from './middleware/logRequest.js';
import useRouter from './routes/useRouter.js'

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(logRequest);
app.use('/users', useRouter);

app.get('/', (req, res) => {
  res.status(200).json({ mensagem: 'Requisicao feita com sucess' })
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
});