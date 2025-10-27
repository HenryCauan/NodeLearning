import db from "../lib/db.js";

const seedData = () => {
  const users = [
    { name: "Ana Oliveira", email: "ana@email.com", age: 28 },
    { name: "Carlos Lima", email: "carlos@email.com", age: 35 },
    { name: "Julia Mendes", email: "julia@email.com", age: 19 },
  ];

  const insertStmt = db.prepare(`
    INSERT INTO users (name, age, email) 
    VALUES (?, ?, ?)
  `);

  users.forEach((user) => {
    insertStmt.run(user.name, user.age, user.email);
  });

  console.log("🌱 Dados de seed inseridos!");
};

// Executar apenas se chamado diretamente
// Esse bloco verifica se o arquivo está sendo executado diretamente com Node.js (e não importado como módulo em outro arquivo).
// Ele compara o caminho do arquivo atual (`import.meta.url`) com o caminho do arquivo chamado no terminal (`process.argv[1]`).
// Se for igual, chama a função seedData() para popular o banco de dados com os dados de seed.
seedData();

export default seedData;
