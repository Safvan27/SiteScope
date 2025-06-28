
const { createTables } = require('./config/initDB');

const initializeDatabase = async () => {
  console.log('Initializing database...');
  await createTables();
  console.log('Database initialization complete');
};

// Initialize database on startup
initializeDatabase().catch(console.error);

// Start the main server
require('./index');
