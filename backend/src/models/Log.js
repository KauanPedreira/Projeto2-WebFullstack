const pool = require("../config/database");

class Log {
  static async create(userId, action, details) {
    await pool.query(
      `INSERT INTO logs (user_id, action, details)
       VALUES ($1, $2, $3)`,
      [userId, action, details]
    );
  }

  static async findAll() {
    const result = await pool.query(
      `SELECT 
        logs.id,
        logs.action,
        logs.details,
        logs.created_at,
        users.email
       FROM logs
       LEFT JOIN users ON users.id = logs.user_id
       ORDER BY logs.created_at DESC`
    );

    return result.rows;
  }
}

module.exports = Log;