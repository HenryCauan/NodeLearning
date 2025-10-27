import Database from "better-sqlite3";
import path from 'path';
import { fileURLToPath } from 'url';

// Obter caminho absoluto do diretório atual (necessário para ES modules)
// Essas duas variáveis servem para obter os caminhos dos arquivos e diretórios atuais no contexto de ES Modules.
// __filename retorna o caminho absoluto do arquivo atual.
// __dirname retorna o diretório onde este arquivo está localizado.

const __filename = fileURLToPath(import.meta.url); // Caminho absoluto do arquivo atual

// path.dirname pega o diretório do arquivo, por exemplo, se __filename é /home/usuario/projeto/lib/db.js
// então __dirname será /home/usuario/projeto/lib
const __dirname = path.dirname(__filename);

// Aqui estamos montando o caminho para onde ficará o arquivo do banco de dados SQLite.
// path.join une diretórios e nomes de arquivos de forma segura para cada sistema operacional.
// Neste caso, ../database/app.db cria o arquivo database/app.db um nível acima da pasta atual (normalmente em src/database/app.db por exemplo)
const dbPath = path.join(__dirname, '../database/app.db');

// Esta linha é onde criamos de fato a "conexão" com o banco de dados usando a biblioteca better-sqlite3.
// O construtor Database recebe dois parâmetros:
//   1. O caminho do arquivo do banco de dados (dbPath) — pode ser um caminho relativo ou absoluto.
//      Exemplo de aplicação: Se dbPath for 'mybanco.db', o arquivo será criado (caso não exista) e conectado para uso.
//   2. Um objeto de opções — nesse caso, passamos { verbose: console.log }.
//      A opção verbose faz com que toda query SQL executada seja impressa no console. É bem útil para debugar e ver exatamente o que está rodando no banco.
// Exemplo básico de criação sem opções extras seria: const db = new Database('meuBanco.db');
// Usando verbose: const db = new Database('meuBanco.db', { verbose: msg => console.log('[SQL]', msg) });
const db = new Database(dbPath, { verbose: console.log });

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER,
    email TEXT
  )
`);

const stmt = {
  selectId: db.prepare(`SELECT * FROM users WHERE id = ?`),
  selectAll: db.prepare(`SELECT * FROM users`),
  delete: db.prepare(`DELETE FROM users WHERE id = ?`),
  inserir: db.prepare(`INSERT INTO users (name, age, email) VALUES (?, ?, ?)`),
  modificar: db.prepare(`UPDATE users SET name = ?, age = ?, email = ? WHERE id = ?`)
}

export const useModel = {
  create: (name, age, email) => {
    const result = stmt.inserir.run(name, age, email);
    // result.lastInsertRowid retorna o ID do novo registro inserido no banco de dados.
    // Ele serve para identificar o novo usuário criado e pode ser útil para retornar ao frontend.
    return result.lastInsertRowid;
  },
  getAll: () => {
    return stmt.selectAll.all();
  },
  selectId: (id) => {
    return stmt.selectId.get(id);
  },
  delete: (id) => {
    return stmt.delete.run(id);
  },
  update: (id, name, age, email) => {
    return stmt.modificar.run(name, age, email, id);
  }
}

export default db;