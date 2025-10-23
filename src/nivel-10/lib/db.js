import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter caminho absoluto do diretório atual (necessário para ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para o arquivo do banco de dados
const dbPath = path.join(__dirname, '../database/app.db');

// Criar conexão com o banco de dados
const db = new Database(dbPath, { verbose: console.log });

// Criar tabela de usuários se não existir
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    age INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Preparar statements SQL para melhor performance
const stmt = {
  // CREATE - Inserir novo usuário
  insert: db.prepare(`
    INSERT INTO users (name, email, age) 
    VALUES (?, ?, ?)
  `),
  
  // READ - Buscar todos os usuários
  selectAll: db.prepare('SELECT * FROM users'),
  
  // READ - Buscar usuário por ID
  selectById: db.prepare('SELECT * FROM users WHERE id = ?'),
  
  // UPDATE - Atualizar usuário
  update: db.prepare(`
    UPDATE users 
    SET name = ?, email = ?, age = ? 
    WHERE id = ?
  `),
  
  // DELETE - Remover usuário
  delete: db.prepare('DELETE FROM users WHERE id = ?'),
  
  // Verificar se email já existe
  checkEmail: db.prepare('SELECT id FROM users WHERE email = ?')
};

// Funções de CRUD
export const userModel = {
  // Criar usuário
  create: (name, email, age) => {
    try {
      const result = stmt.insert.run(name, email, age);
      return { id: result.lastInsertRowid, name, email, age };
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new Error('Email já cadastrado');
      }
      throw error;
    }
  },
  
  // Buscar todos os usuários
  findAll: () => {
    return stmt.selectAll.all();
  },
  
  // Buscar usuário por ID
  findById: (id) => {
    return stmt.selectById.get(id);
  },
  
  // Atualizar usuário
  update: (id, name, email, age) => {
    try {
      const result = stmt.update.run(name, email, age, id);
      if (result.changes === 0) {
        throw new Error('Usuário não encontrado');
      }
      return { id, name, email, age };
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new Error('Email já cadastrado');
      }
      throw error;
    }
  },
  
  // Deletar usuário
  delete: (id) => {
    const result = stmt.delete.run(id);
    if (result.changes === 0) {
      throw new Error('Usuário não encontrado');
    }
    return { message: 'Usuário deletado com sucesso' };
  },
  
  // Verificar se email existe
  emailExists: (email, excludeId = null) => {
    const user = stmt.checkEmail.get(email);
    return user && user.id !== excludeId;
  }
};

// Fechar conexão quando o processo terminar
process.on('exit', () => db.close());
process.on('SIGINT', () => process.exit());

export default db;
