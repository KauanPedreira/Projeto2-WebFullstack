const pool = require("../config/database");

class Weather {
  static async create({ city, temperature, windspeed, winddirection, description }) {
    const result = await pool.query(
      `INSERT INTO weather_records 
       (city, temperature, windspeed, winddirection, description)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [city, temperature, windspeed, winddirection, description]
    );

    return result.rows[0];
  }

  static async search(city) {
    const result = await pool.query(
      `SELECT *
       FROM weather_records
       WHERE LOWER(city) LIKE LOWER($1)
       ORDER BY created_at DESC`,
      [`%${city}%`]
    );

    return result.rows;
  }

  static async findAll() {
    const result = await pool.query(
      `SELECT *
       FROM weather_records
       ORDER BY created_at DESC`
    );

    return result.rows;
  }
}

module.exports = Weather;