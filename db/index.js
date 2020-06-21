// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'linkenator'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods
async function getAllLinks(){
  try {
    const response = await client.query(`
    SELECT * FROM links;
    `)
    if (response.rows.length > 0) {
      return response.rows
    } else {
      return []
    }
  } catch (error) {
    throw error
  }
}
// export
module.exports = {
  client,
  // db methods
}