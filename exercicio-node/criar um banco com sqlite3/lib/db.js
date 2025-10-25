import Database from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const db = new Database('','');

db.exec(`
  CREATE TABLE IF NOT EXITS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  age INTERGER,
  email TEXT
  )
  `)

const smtm = {
  getAll: db.prepare(`SELECT * FROM  users`),
  getId: db.prepare(`SELECT * FROM users WHERE id = ?`),
  inserir: db.prepare(`INSERT INTO users( name, age, email )`),
  remover: db.prepare(`DELETE FROM users WHERE id = ?`),
};

export const useModel = {
  create: (name, age, email) => {
    try {
      const result = smtm.inserir.run(name, age, email);
    }
    catch(err) {}
  },
  findAll: () => {
    return smtm.getAll.run();
  },
  findId: (id) => {
    return smtm.getAll.run(id);
  },
  delete: (id) =>  {
    try {
      const remove = smtm.delete.run(id)
    } catch (err) {

    }
  }

}