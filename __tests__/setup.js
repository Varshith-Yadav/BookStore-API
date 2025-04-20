const testDb = require('../config/testDb');
const fs = require('fs');
const path = require('path');

const setupTestDatabase = async () => {
  // Read and execute the schema file
  const schemaPath = path.join(__dirname, '../schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');
  
  try {
    await testDb.query(schema);
  } catch (error) {
    console.error('Error setting up test database:', error);
    throw error;
  }
};

const teardownTestDatabase = async () => {
  try {
    // Clean up the test database
    await testDb.query('DROP TABLE IF EXISTS books CASCADE');
    await testDb.pool.end();
  } catch (error) {
    console.error('Error tearing down test database:', error);
    throw error;
  }
};

module.exports = {
  setupTestDatabase,
  teardownTestDatabase,
}; 