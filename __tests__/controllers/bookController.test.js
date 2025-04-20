const request = require('supertest');
const express = require('express');
const bookRoutes = require('../../routes/bookRoutes');
const { setupTestDatabase, teardownTestDatabase } = require('../setup');
const testDb = require('../../config/testDb');

// Mock the db module
jest.mock('../../config/db', () => require('../../config/testDb'));

const app = express();
app.use(express.json());
app.use('/api/books', bookRoutes);

describe('Book Controller', () => {
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

  describe('GET /api/books', () => {
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
        await testDb.query(
          'INSERT INTO books (title, author, price, quantity) VALUES ($1, $2, $3, $4)',
          [book.title, book.author, book.price, book.quantity]
        );
      }

      const response = await request(app).get('/api/books');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].title).toBe(bookData[0].title);
      expect(response.body[1].title).toBe(bookData[1].title);
    });
  });

  describe('GET /api/books/:id', () => {
    it('should return a book by id', async () => {
      const bookData = {
        title: 'Test Book',
        author: 'Test Author',
        price: 19.99,
        quantity: 10
      };

      const result = await testDb.query(
        'INSERT INTO books (title, author, price, quantity) VALUES ($1, $2, $3, $4) RETURNING id',
        [bookData.title, bookData.author, bookData.price, bookData.quantity]
      );

      const response = await request(app).get(`/api/books/${result.rows[0].id}`);
      expect(response.status).toBe(200);
      expect(response.body.title).toBe(bookData.title);
      expect(response.body.author).toBe(bookData.author);
    });

    it('should return 404 for non-existent book', async () => {
      const response = await request(app).get('/api/books/999');
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Book not found');
    });
  });

  describe('POST /api/books', () => {
    it('should create a new book', async () => {
      const bookData = {
        title: 'New Book',
        author: 'New Author',
        price: 29.99,
        quantity: 15
      };

      const response = await request(app)
        .post('/api/books')
        .send(bookData);

      expect(response.status).toBe(201);
      expect(response.body.title).toBe(bookData.title);
      expect(response.body.author).toBe(bookData.author);
      expect(response.body.price).toBe(bookData.price);
      expect(response.body.quantity).toBe(bookData.quantity);
    });
  });

  describe('PUT /api/books/:id', () => {
    it('should update a book', async () => {
      const bookData = {
        title: 'Original Title',
        author: 'Original Author',
        price: 10.99,
        quantity: 5
      };

      const result = await testDb.query(
        'INSERT INTO books (title, author, price, quantity) VALUES ($1, $2, $3, $4) RETURNING id',
        [bookData.title, bookData.author, bookData.price, bookData.quantity]
      );

      const updatedData = {
        title: 'Updated Title',
        author: 'Updated Author',
        price: 15.99,
        quantity: 10
      };

      const response = await request(app)
        .put(`/api/books/${result.rows[0].id}`)
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(updatedData.title);
      expect(response.body.author).toBe(updatedData.author);
      expect(response.body.price).toBe(updatedData.price);
      expect(response.body.quantity).toBe(updatedData.quantity);
    });

    it('should return 404 for non-existent book', async () => {
      const updatedData = {
        title: 'Updated Title',
        author: 'Updated Author',
        price: 15.99,
        quantity: 10
      };

      const response = await request(app)
        .put('/api/books/999')
        .send(updatedData);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Book not found');
    });
  });

  describe('DELETE /api/books/:id', () => {
    it('should delete a book', async () => {
      const bookData = {
        title: 'Test Book',
        author: 'Test Author',
        price: 19.99,
        quantity: 10
      };

      const result = await testDb.query(
        'INSERT INTO books (title, author, price, quantity) VALUES ($1, $2, $3, $4) RETURNING id',
        [bookData.title, bookData.author, bookData.price, bookData.quantity]
      );

      const response = await request(app).delete(`/api/books/${result.rows[0].id}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Book deleted successfully');

      // Verify the book is deleted
      const getResponse = await request(app).get(`/api/books/${result.rows[0].id}`);
      expect(getResponse.status).toBe(404);
    });

    it('should return 404 for non-existent book', async () => {
      const response = await request(app).delete('/api/books/999');
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Book not found');
    });
  });
}); 