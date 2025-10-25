import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter caminho absoluto do diretório atual (necessário para ES modules)
// Essas duas variáveis servem para obter os caminhos dos arquivos e diretórios atuais no contexto de ES Modules.
// __filename retorna o caminho absoluto do arquivo atual.
// __dirname retorna o diretório onde este arquivo está localizado.

const __filename = fileURLToPath(import.meta.url); // Caminho do arquivo atual
const __dirname = path.dirname(__filename);        // Caminho da pasta do arquivo atual

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
// Por que (pq) e para que (pra que) fazer statements em banco de dados?
// 
// Statements preparados (prepared statements) são usados para:
// 1. Aumentar a performance: O banco de dados compila o SQL uma vez, reutilizando para várias execuções.
// 2. Ter mais segurança: Evitam SQL Injection porque os dados são passados separadamente dos comandos SQL.
// 3. Código mais organizado e fácil de manter.
//
// Exemplo prático: No backend com sqlite, podemos preparar vários statements que serão usados repetidamente.

const stmt = {
  // INSERT: Criação de usuário novo
  insert: db.prepare(`
    INSERT INTO users (name, email, age)
    VALUES (?, ?, ?)
  `),
  // SELECT: Buscar todos os usuários
  selectAll: db.prepare('SELECT * FROM users'),
  // SELECT: Buscar usuário por id
  selectById: db.prepare('SELECT * FROM users WHERE id = ?'),
  // UPDATE: Editar dados do usuário
  update: db.prepare(`
    UPDATE users
    SET name = ?, email = ?, age = ?
    WHERE id = ?
  `),
  // DELETE: Remover usuário
  delete: db.prepare('DELETE FROM users WHERE id = ?'),
  // Checar se já existe o email cadastrado
  checkEmail: db.prepare('SELECT id FROM users WHERE email = ?'),
};

// CRUD é um acrônimo para Create (Criar), Read (Ler), Update (Atualizar) e Delete (Deletar).
// Essas são as quatro operações básicas usadas para manipular dados em um banco de dados.
// As funções abaixo implementam essas operações para o modelo de usuário.
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
