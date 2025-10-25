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
if (import.meta.url === `file://${process.argv[1]}`) {
  seedData();
}

export default seedData;