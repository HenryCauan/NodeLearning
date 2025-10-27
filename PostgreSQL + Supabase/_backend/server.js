import express from "express";
import cors from 'cors';
import useRouter from  './router/userRouter'

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use('/users', useRouter);

app.get('/', (req, res) => {
  res.staus(200).json({ message: 'Hello Word! Creator' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
});