import db from '../lib/db.js';

const seedData = () => {
  const users = [
    { name: 'Ana Oliveira', email: 'ana@email.com', age: 28 },
    { name: 'Carlos Lima', email: 'carlos@email.com', age: 35 },
    { name: 'Julia Mendes', email: 'julia@email.com', age: 19 }
  ];

  const insertStmt = db.prepare(`
    INSERT OR IGNORE INTO users (name, email, age) 
    VALUES (?, ?, ?)
  `);

  users.forEach(user => {
    insertStmt.run(user.name, user.email, user.age);
  });

  console.log('🌱 Dados de seed inseridos!');
};

// Executar apenas se chamado diretamente
// Esse bloco verifica se o arquivo está sendo executado diretamente com Node.js (e não importado como módulo em outro arquivo).
// Ele compara o caminho do arquivo atual (`import.meta.url`) com o caminho do arquivo chamado no terminal (`process.argv[1]`).
// Se for igual, chama a função seedData() para popular o banco de dados com os dados de seed.
// Ou seja, garante que a função de seed só é executada quando rodamos `node src/nivel-10/seeds/seedData.js` diretamente.
if (import.meta.url === `file://${process.argv[1]}`) {
  seedData();
}

export default seedData;