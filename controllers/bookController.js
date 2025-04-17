const Book = require('../models/book');

const bookController = {
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.getAllBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getBookById: async (req, res) => {
    try {
      const book = await Book.getBookById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createBook: async (req, res) => {
    try {
      const { title, author, price, quantity } = req.body;
      const newBook = await Book.createBook(title, author, price, quantity);
      res.status(201).json(newBook);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateBook: async (req, res) => {
    try {
      const { title, author, price, quantity } = req.body;
      const updatedBook = await Book.updateBook(req.params.id, title, author, price, quantity);
      if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(updatedBook);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteBook: async (req, res) => {
    try {
      const deletedBook = await Book.deleteBook(req.params.id);
      if (!deletedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = bookController; 