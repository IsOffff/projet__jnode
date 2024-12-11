const pool = require('../config/database');

class Emargement {
  static async create({ session_id, etudiant_id }) {
    const [result] = await pool.execute(
      'INSERT INTO emargements (session_id, etudiant_id) VALUES (?, ?)',
      [session_id, etudiant_id]
    );
    return result.insertId;
  }

  static async findBySessionId(session_id) {
    const [rows] = await pool.execute(`
      SELECT e.*, u.name, u.email 
      FROM emargements e 
      JOIN users u ON e.etudiant_id = u.id 
      WHERE e.session_id = ?
      ORDER BY e.created_at DESC
    `, [session_id]);
    return rows;
  }

  static async hasAttended(session_id, etudiant_id) {
    const [rows] = await pool.execute(
      'SELECT id FROM emargements WHERE session_id = ? AND etudiant_id = ?',
      [session_id, etudiant_id]
    );
    return rows.length > 0;
  }
}

module.exports = Emargement;