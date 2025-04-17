const db = require('../config/db');

class Book {
  static async getAllBooks() {
    const result = await db.query('SELECT * FROM books');
    return result.rows;
  }

  static async getBookById(id) {
    const result = await db.query('SELECT * FROM books WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async createBook(title, author, price, quantity) {
    const result = await db.query(
      'INSERT INTO books (title, author, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, author, price, quantity]
    );
    return result.rows[0];
  }

  static async updateBook(id, title, author, price, quantity) {
    const result = await db.query(
      'UPDATE books SET title = $1, author = $2, price = $3, quantity = $4 WHERE id = $5 RETURNING *',
      [title, author, price, quantity, id]
    );
    return result.rows[0];
  }

  static async deleteBook(id) {
    const result = await db.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Book; 