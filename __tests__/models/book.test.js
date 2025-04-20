const Book = require('../../models/book');
const { setupTestDatabase, teardownTestDatabase } = require('../setup');
const testDb = require('../../config/testDb');

// Mock the db module
jest.mock('../../config/db', () => require('../../config/testDb'));

describe('Book Model', () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });

  afterAll(async () => {
    await teardownTestDatabase();
  });

  beforeEach(async () => {
    // Clear the books table before each test
    await testDb.query('TRUNCATE TABLE books RESTART IDENTITY CASCADE');
  });

  describe('createBook', () => {
    it('should create a new book', async () => {
      const bookData = {
        title: 'Test Book',
        author: 'Test Author',
        price: 19.99,
        quantity: 10
      };

      const book = await Book.createBook(
        bookData.title,
        bookData.author,
        bookData.price,
        bookData.quantity
      );

      expect(book).toHaveProperty('id');
      expect(book.title).toBe(bookData.title);
      expect(book.author).toBe(bookData.author);
      expect(book.price).toBe(bookData.price);
      expect(book.quantity).toBe(bookData.quantity);
    });
  });

  describe('getAllBooks', () => {
    it('should return all books', async () => {
      const bookData = [
        {
          title: 'Book 1',
          author: 'Author 1',
          price: 10.99,
          quantity: 5
        },
        {
          title: 'Book 2',
          author: 'Author 2',
          price: 15.99,
          quantity: 3
        }
      ];

      // Insert test data
      for (const book of bookData) {
        await Book.createBook(
          book.title,
          book.author,
          book.price,
          book.quantity
        );
      }

      const books = await Book.getAllBooks();
      expect(books).toHaveLength(2);
      expect(books[0].title).toBe(bookData[0].title);
      expect(books[1].title).toBe(bookData[1].title);
    });
  });

  describe('getBookById', () => {
    it('should return a book by id', async () => {
      const bookData = {
        title: 'Test Book',
        author: 'Test Author',
        price: 19.99,
        quantity: 10
      };

      const createdBook = await Book.createBook(
        bookData.title,
        bookData.author,
        bookData.price,
        bookData.quantity
      );

      const book = await Book.getBookById(createdBook.id);
      expect(book).toBeDefined();
      expect(book.title).toBe(bookData.title);
    });

    it('should return undefined for non-existent book', async () => {
      const book = await Book.getBookById(999);
      expect(book).toBeUndefined();
    });
  });

  describe('updateBook', () => {
    it('should update a book', async () => {
      const bookData = {
        title: 'Original Title',
        author: 'Original Author',
        price: 10.99,
        quantity: 5
      };

      const createdBook = await Book.createBook(
        bookData.title,
        bookData.author,
        bookData.price,
        bookData.quantity
      );

      const updatedData = {
        title: 'Updated Title',
        author: 'Updated Author',
        price: 15.99,
        quantity: 10
      };

      const updatedBook = await Book.updateBook(
        createdBook.id,
        updatedData.title,
        updatedData.author,
        updatedData.price,
        updatedData.quantity
      );

      expect(updatedBook.title).toBe(updatedData.title);
      expect(updatedBook.author).toBe(updatedData.author);
      expect(updatedBook.price).toBe(updatedData.price);
      expect(updatedBook.quantity).toBe(updatedData.quantity);
    });
  });

  describe('deleteBook', () => {
    it('should delete a book', async () => {
      const bookData = {
        title: 'Test Book',
        author: 'Test Author',
        price: 19.99,
        quantity: 10
      };

      const createdBook = await Book.createBook(
        bookData.title,
        bookData.author,
        bookData.price,
        bookData.quantity
      );

      const deletedBook = await Book.deleteBook(createdBook.id);
      expect(deletedBook.id).toBe(createdBook.id);

      const book = await Book.getBookById(createdBook.id);
      expect(book).toBeUndefined();
    });
  });
}); 