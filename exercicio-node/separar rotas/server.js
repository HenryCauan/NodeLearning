import express from 'express';
import useRouter from './routes/userRouter';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`Testando Rotas com Node,Express e Router`)
})

app.use('/user', useRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
})