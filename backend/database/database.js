const { Pool, Client } = require('pg')

const client = new Client({
  user: 'kevinz',
  host: 'localhost',
  database: 'product_reviews_database',
  password: '',
  port: 5432,
});

client.connect();
module.exports = client;
