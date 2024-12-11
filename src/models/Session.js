const pool = require('../config/database');

class Session {
  static async create({ title, date, formateur_id }) {
    const [result] = await pool.execute(
      'INSERT INTO sessions (title, date, formateur_id) VALUES (?, ?, ?)',
      [title, date, formateur_id]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await pool.execute('SELECT * FROM sessions');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM sessions WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, { title, date }) {
    await pool.execute(
      'UPDATE sessions SET title = ?, date = ? WHERE id = ?',
      [title, date, id]
    );
  }

  static async delete(id) {
    await pool.execute('DELETE FROM sessions WHERE id = ?', [id]);
  }
}

module.exports = Session;