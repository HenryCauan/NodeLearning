import express from 'express';

const usuarios = [
  { nome: "Ana", idade: 28, nacionalidade: "Brasileira" },
  { nome: "Miguel", idade: 34, nacionalidade: "Português" },
  { nome: "Sara", idade: 22, nacionalidade: "Argentina" },
  { nome: "Lee", idade: 31, nacionalidade: "Coreana" },
  { nome: "Fatima", idade: 26, nacionalidade: "Marroquina" }
];


const router = express.Router();

router.get('/', (req, res) => {
  // Se o cliente aceitar HTML, envia HTML, senão envia JSON
  if (req.accepts('html')) {
    const html = `
      <h1>Lista de Usuários</h1>
      <ul>
        ${usuarios.map(p => `<li>${p.nome}</li>`).join('')}
      </ul>
    `;
    return res.send(html);
  }
  // Padrão: JSON
  res.status(200).json(usuarios);
});


export default router;
// tambem poderiamos usar module.exports = router;