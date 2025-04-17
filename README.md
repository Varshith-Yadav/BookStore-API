# Book Store API

A RESTful API for managing a book store using Node.js, Express, and PostgreSQL.

## Features

- CRUD operations for books
- PostgreSQL database integration
- RESTful API endpoints
- Error handling
- CORS support

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a PostgreSQL database named `bookstore`
4. Update the `.env` file with your database credentials
5. Run the database schema:
   ```bash
   psql -U your_username -d bookstore -f schema.sql
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bookstore
PORT=3000
```

## API Endpoints

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a specific book
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

## Running the Application

```bash
npm start
```

The server will start on port 3000 (or the port specified in your .env file).

## Example Requests

### Create a Book
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 12.99,
    "quantity": 10
  }'
```

### Get All Books
```bash
curl http://localhost:3000/api/books
```

### Get a Specific Book
```bash
curl http://localhost:3000/api/books/1
```

### Update a Book
```bash
curl -X PUT http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 14.99,
    "quantity": 15
  }'
```

### Delete a Book
```bash
curl -X DELETE http://localhost:3000/api/books/1
``` 